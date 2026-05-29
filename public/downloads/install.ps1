#!/usr/bin/env pwsh
# Siro - 1 command, 0 dependency PHP API Framework
# Usage: iwr https://sirophp.com/downloads/install.ps1 -UseBasicParsing | iex

param(
    [string]$Name = "my-api",
    [switch]$NoProject,
    [switch]$Help
)

if ($Help) {
    Write-Host "Siro Framework Installer"
    Write-Host "Usage:"
    Write-Host "  iwr https://sirophp.com/downloads/install.ps1 -UseBasicParsing | iex"
    Write-Host "  iwr ... | iex --- -Name my-project"
    Write-Host "  iwr ... | iex --- -NoProject"
    exit 0
}

# Define functions
function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[FAIL] $Message" -ForegroundColor Red
}

# --- Banner ---
Write-Host ""
Write-Host "+--------------------------------------------+" -ForegroundColor Cyan
Write-Host "|   ** Siro Framework Installer             |" -ForegroundColor Cyan
Write-Host "|   v0.32.1                                 |" -ForegroundColor Cyan
Write-Host "|   1 command, 0 dependency                 |" -ForegroundColor Cyan
Write-Host "+--------------------------------------------+" -ForegroundColor Cyan
Write-Host ""

# --- Step 1: Detect / Install PHP ---
$phpExe = Get-Command php -ErrorAction SilentlyContinue

if (-not $phpExe) {
    $targetPhpDir = "$env:ProgramFiles\php"
    if (-not (Test-Path "$targetPhpDir\php.exe")) {
        Write-Host "[...] Step 1: Installing PHP 8.2.31..."
        
        $phpZip = "$env:TEMP\php.zip"
        $phpUrl = "https://windows.php.net/downloads/releases/php-8.2.31-nts-Win32-vs16-x64.zip"
        
        try {
            $webClient = New-Object System.Net.WebClient
            $webClient.DownloadFile($phpUrl, $phpZip)
        } catch {
            Write-Error "Failed to download PHP. Try installing PHP manually."
            exit 1
        }
        
        if (-not (Test-Path $targetPhpDir)) {
            New-Item -ItemType Directory -Force -Path $targetPhpDir | Out-Null
        }
        
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        [System.IO.Compression.ZipFile]::ExtractToDirectory($phpZip, $targetPhpDir)
        Remove-Item $phpZip -Force
        
        # Enable required extensions
        $iniPath = "$targetPhpDir\php.ini"
        if (-not (Test-Path $iniPath)) {
            Copy-Item "$targetPhpDir\php.ini-development" $iniPath
        }
        
        $extensions = @(
            "extension=curl",
            "extension=mbstring",
            "extension=openssl",
            "extension=pdo_mysql",
            "extension=pdo_sqlite",
            "extension=sockets"
        )
        
        $iniContent = Get-Content $iniPath -Raw
        foreach ($ext in $extensions) {
            $iniContent = $iniContent -replace ";$ext", $ext
        }
        
        $iniContent | Set-Content -Path $iniPath
        
        # Add PHP to PATH for current session
        $env:Path = "$targetPhpDir;$env:Path"
        
        Write-Host "[OK] Step 1: PHP installed to $targetPhpDir"
    } else {
        Write-Host "[OK] Step 1: PHP found at $targetPhpDir"
    }
    $phpExe = "$targetPhpDir\php.exe"
} else {
    Write-Success "Step 1: PHP $(& php -r 'echo PHP_VERSION;') found (system)"
    $phpExe = "php"
}

# --- Step 2: Download Siro CLI ---
Write-Host "[...] Step 2: Installing Siro CLI..."

$siroDir = "$env:USERPROFILE\.siro"
if (-not (Test-Path $siroDir)) {
    New-Item -ItemType Directory -Force -Path $siroDir | Out-Null
}

$siroPhar = "$siroDir\siro.phar"
$pharUrl = "https://sirophp.com/downloads/siro.phar"

try {
    $webClient = New-Object System.Net.WebClient
    $webClient.DownloadFile($pharUrl, $siroPhar)
} catch {
    Write-Error "Failed to download Siro CLI."
    exit 1
}

if (-not (Test-Path $siroPhar)) {
    Write-Error "Siro CLI download failed"
    exit 1
}

Write-Host "[OK] Step 2: Siro CLI downloaded"

# --- Step 3: Add Siro to PATH ---
$binDir = $siroDir
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")

if ($userPath -notlike "*$binDir*") {
    [Environment]::SetEnvironmentVariable("Path", "$binDir;$userPath", "User")
    $env:Path = "$binDir;$env:Path"
    Write-Success "Step 3: Siro added to PATH"
} else {
    Write-Success "Step 3: Siro already in PATH"
}

# --- Step 4: Install Composer ---
Write-Host "[...] Step 4: Installing Composer..."
$composerPhar = "$siroDir\composer.phar"
$composerBat = "$siroDir\composer.bat"

if (Get-Command composer -ErrorAction SilentlyContinue) {
    Write-Success "Step 4: Composer already installed"
} else {
    $composerUrl = "https://getcomposer.org/composer.phar"
    try {
        $webClient = New-Object System.Net.WebClient
        $webClient.DownloadFile($composerUrl, $composerPhar)
    } catch {
        Write-Error "Failed to download Composer. Install manually: https://getcomposer.org"
        exit 1
    }
    $batContent = '@php "%~dp0composer.phar" %*'
    $batContent | Set-Content -Path $composerBat -Encoding ASCII
    Write-Success "Step 4: Composer installed"
}

# --- Step 5: Create project ---
$CreateProject = -not $NoProject

if ($CreateProject) {
    # Auto-generate unique name if folder exists
    $projectName = $Name
    $counter = 2
    while (Test-Path ".\$projectName") {
        $projectName = "$Name-$counter"
        $counter++
    }
    if ($projectName -ne $Name) {
        Write-Warning "Directory '$Name' already exists, using '$projectName' instead"
    }
    
    Write-Host "[...] Step 5: Creating project '$projectName'..."
    
    if (-not (Test-Path ".\$projectName")) {
        php "$siroPhar" new $projectName
        
        if (-not (Test-Path ".\$projectName\composer.json")) {
            Write-Error "Project creation failed"
            exit 1
        }
        
        Push-Location ".\$projectName"
        
        # Fix composer.json: add vendor prefix, move mcp-server to suggest
        # (keep local siro-core path repo for db:init & runtime support)
        $composerJson = Get-Content composer.json -Raw | ConvertFrom-Json
        $composerJson.name = "app/$projectName"
        
        # Find local siro-core and fix path repos
        $siroCorePaths = @(
            "./siro-core",
            "../siro-core",
            "D:/VietVang/SiroSoft/siro-core",
            "$env:USERPROFILE/.siro/siro-core"
        )
        $foundSiroCore = $null
        foreach ($p in $siroCorePaths) {
            if (Test-Path "$p/composer.json") {
                $foundSiroCore = $p
                break
            }
        }
        $fixedRepos = @()
        foreach ($repo in $composerJson.repositories) {
            $url = $repo.url
            if ($url.EndsWith("siro-core")) {
                if ($foundSiroCore) {
                    $repo.url = $foundSiroCore
                    $fixedRepos += $repo
                    $composerJson.'minimum-stability' = 'dev'
                }
            } else {
                $fixedRepos += $repo
            }
        }
        $composerJson.repositories = $fixedRepos
        
        $require = $composerJson.require
        $mcpVersion = $require.'sirosoft/mcp-server'
        if ($mcpVersion) {
            $require.PSObject.Properties.Remove('sirosoft/mcp-server')
            if (-not $composerJson.suggest) {
                $composerJson | Add-Member -Name 'suggest' -Type NoteProperty -Value @{}
            }
            $composerJson.suggest | Add-Member -Name 'sirosoft/mcp-server' -Type NoteProperty -Value $mcpVersion -Force
        }
        $composerJson | ConvertTo-Json -Depth 10 | Set-Content composer.json
        
        # Copy .env if not exists
        if ((Test-Path .env.example) -and -not (Test-Path .env)) {
            Copy-Item .env.example .env
        }
        
        Write-Host "[...] Running composer install..."
        & composer install --no-interaction --quiet
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "composer install had warnings"
        }
        
        # Generate app key (needs vendor/autoload.php)
        if (Test-Path vendor/autoload.php) {
            Write-Host "[...] Generating app key..."
            php siro key:generate 2>$null
        }
        Pop-Location
        
        Write-Host ""
        Write-Host "+--------------------------------------------+" -ForegroundColor Green
        Write-Host "|   >> Project ready (SQLite default)        |" -ForegroundColor Green
        Write-Host "|                                            |" -ForegroundColor Green
        Write-Host "|   cd $projectName                          |" -ForegroundColor Green
        Write-Host "|   php siro serve                           |" -ForegroundColor Green
        Write-Host "|   http://localhost:8080                    |" -ForegroundColor Green
        Write-Host "|                                            |" -ForegroundColor Green
        Write-Host "|   For MySQL:                               |" -ForegroundColor Green
        Write-Host "|   php siro db init --mysql                 |" -ForegroundColor Green
        Write-Host "|   (auto-installs MariaDB portable)         |" -ForegroundColor Green
        Write-Host "+--------------------------------------------+" -ForegroundColor Green
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "[OK] Siro CLI installed. Usage:"
    Write-Host "  siro new my-api"
    Write-Host "  php siro runtime list"
    Write-Host "  php siro runtime install 8.3"
    Write-Host ""
}
