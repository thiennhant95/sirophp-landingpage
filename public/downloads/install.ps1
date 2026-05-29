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
    Write-Host "  iwr https://sirophp.com/downloads/install.ps1 -UseBasicParsing | iex --- -Name my-project"
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

# --- Step 4: Create project ---
$CreateProject = -not $NoProject

if ($CreateProject) {
    Write-Host "[...] Step 4: Creating project '$Name'..."
    
    if (Test-Path ".\$Name") {
        Write-Error "Directory '$Name' already exists"
    } else {
        # Create project via Siro CLI
        php "$siroPhar" new $Name
        
        if (-not (Test-Path ".\$Name\composer.json")) {
            Write-Error "Project creation failed"
        }
        
        Write-Host ""
        Write-Host "+--------------------------------------------+" -ForegroundColor Green
        Write-Host "|   >> Siro is ready!                        |" -ForegroundColor Green
        Write-Host "|                                            |" -ForegroundColor Green
        Write-Host "|   cd $Name                                 |" -ForegroundColor Green
        Write-Host "|   siro serve                               |" -ForegroundColor Green
        Write-Host "|   http://localhost:8080                    |" -ForegroundColor Green
        Write-Host "+--------------------------------------------+" -ForegroundColor Green
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "[OK] Siro CLI installed. Usage:"
    Write-Host "  siro new my-api"
    Write-Host "  siro runtime:install 8.3"
    Write-Host ""
}
