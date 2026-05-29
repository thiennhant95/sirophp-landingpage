#!/usr/bin/env pwsh
# Siro - 1 command, 0 dependency PHP API Framework
# Usage: iwr https://sirophp.com/downloads/install.ps1 -UseBasicParsing | iex

param(
    [string]$Name = "my-api",
    [switch]$NoProject,
    [switch]$Help,
    [switch]$Quiet
)

$ScriptVersion = "0.32.1"

if ($Help) {
    Write-Host "Siro Framework Installer v$ScriptVersion"
    Write-Host "Usage:"
    Write-Host "  iwr ... -UseBasicParsing | iex"
    Write-Host "  iwr ... -UseBasicParsing | iex --- -Name my-project"
    Write-Host "  iwr ... -UseBasicParsing | iex --- -NoProject"
    Write-Host "  iwr ... -UseBasicParsing | iex --- -Quiet"
    exit 0
}

# ── Helpers ────────────────────────────
$logOK = if ($Quiet) { $null } else { { Write-Host "  [OK] $args" -ForegroundColor Green } }
$logWarn = if ($Quiet) { $null } else { { Write-Host "  [WARN] $args" -ForegroundColor Yellow } }
$logFail = { Write-Host "  [FAIL] $args" -ForegroundColor Red }
$logStep = if ($Quiet) { $null } else { { Write-Host "`n  $args" -ForegroundColor Cyan } }

function Download-File($url, $dest, $label, [switch]$Progress) {
    $retries = 3
    for ($try = 1; $try -le $retries; $try++) {
        try {
            if (-not $Quiet -and $Progress) {
                Write-Host "    Downloading $label..."
                $wc = New-Object System.Net.WebClient
                $wc.DownloadFile($url, $dest)
                $size = (Get-Item $dest -ErrorAction SilentlyContinue).Length
                if ($size) {
                    $mb = [math]::Round($size / 1MB, 1)
                    Write-Host "    Downloaded $mb MB"
                }
            } else {
                $wc = New-Object System.Net.WebClient
                $wc.DownloadFile($url, $dest)
            }
            return $true
        } catch {
            Remove-Item $dest -Force -ErrorAction SilentlyContinue
            if ($try -lt $retries) {
                if (-not $Quiet) { Write-Host "    Retry $try/$retries..." }
                Start-Sleep -Seconds 2
            }
        }
    }
    return $false
}

# ── Banner ────────────────────────────
if (-not $Quiet) {
    Write-Host ""
    Write-Host "+--------------------------------------------+" -ForegroundColor Cyan
    Write-Host "|   ** Siro Framework Installer             |" -ForegroundColor Cyan
    Write-Host "|   v$ScriptVersion                                 |" -ForegroundColor Cyan
    Write-Host "|   1 command, 0 dependency                 |" -ForegroundColor Cyan
    Write-Host "+--------------------------------------------+" -ForegroundColor Cyan
}

$timer = [System.Diagnostics.Stopwatch]::StartNew()

# ── Step 1: PHP ───────────────────────
$phpExe = Get-Command php -ErrorAction SilentlyContinue
$phpInstalled = $false

if (-not $phpExe) {
    $targetPhpDir = "$env:ProgramFiles\php"
    if (-not (Test-Path "$targetPhpDir\php.exe")) {
        & $logStep "Step 1: Installing PHP 8.2.31..."
        
        $phpZip = "$env:TEMP\php-install-$PID.zip"
        $phpUrl = "https://windows.php.net/downloads/releases/php-8.2.31-nts-Win32-vs16-x64.zip"
        
        $ok = Download-File $phpUrl $phpZip "PHP 8.2.31" -Progress
        if (-not $ok) {
            & $logFail "Failed to download PHP. Install manually: https://windows.php.net"
            exit 1
        }
        
        # Extract
        if (-not (Test-Path $targetPhpDir)) { New-Item -ItemType Directory -Force -Path $targetPhpDir | Out-Null }
        
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        try {
            [System.IO.Compression.ZipFile]::ExtractToDirectory($phpZip, $targetPhpDir)
        } catch {
            & $logFail "Failed to extract PHP"
            Remove-Item $phpZip -Force -ErrorAction SilentlyContinue
            exit 1
        }
        Remove-Item $phpZip -Force -ErrorAction SilentlyContinue
        
        # Enable extensions
        $iniPath = "$targetPhpDir\php.ini"
        if (-not (Test-Path $iniPath)) {
            Copy-Item "$targetPhpDir\php.ini-development" $iniPath
        }
        $iniContent = Get-Content $iniPath -Raw
        foreach ($ext in @("curl","mbstring","openssl","pdo_mysql","pdo_sqlite","sockets")) {
            $iniContent = $iniContent -replace ";extension=$ext", "extension=$ext"
        }
        Set-Content -Path $iniPath -Value $iniContent
        
        $env:Path = "$targetPhpDir;$env:Path"
        $phpInstalled = $true
        
        & $logOK "PHP 8.2.31 installed"
    } else {
        $env:Path = "$targetPhpDir;$env:Path"
        & $logOK "PHP found at $targetPhpDir"
    }
    $phpExe = "$targetPhpDir\php.exe"
} else {
    $phpVer = & php -r "echo PHP_VERSION;" 2>$null
    & $logOK "PHP $phpVer found"
    $phpExe = "php"
}

# ── Step 2: Siro CLI ──────────────────
$siroDir = "$env:USERPROFILE\.siro"
if (-not (Test-Path $siroDir)) { New-Item -ItemType Directory -Force -Path $siroDir | Out-Null }

$siroPhar = "$siroDir\siro.phar"
$pharUrl = "https://sirophp.com/downloads/siro.phar"

& $logStep "Step 2: Installing Siro CLI..."
$skipPhar = $false
if (Test-Path $siroPhar) {
    # Check version to skip re-download
    $ver = & $phpExe -r @"
try { require '$siroPhar'; } catch {}
"@ 2>&1 | Out-String
    if ($ver -match "v(\d+\.\d+\.\d+)") {
        $pharVer = $Matches[1]
        if ($pharVer -eq $ScriptVersion) {
            $skipPhar = $true
            & $logOK "Siro CLI v$pharVer already installed (cached)"
        }
    }
}

if (-not $skipPhar) {
    $ok = Download-File $pharUrl $siroPhar "Siro CLI" -Progress
    if (-not $ok) {
        & $logFail "Failed to download Siro CLI."
        exit 1
    }
    & $logOK "Siro CLI downloaded"
}

# ── Step 3: PATH ──────────────────────
& $logStep "Step 3: Adding to PATH..."
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$siroDir*") {
    [Environment]::SetEnvironmentVariable("Path", "$siroDir;$userPath", "User")
    $env:Path = "$siroDir;$env:Path"
    & $logOK "Siro added to PATH"
} else {
    & $logOK "Siro already in PATH"
}

# ── Step 4: Composer ──────────────────
& $logStep "Step 4: Installing Composer..."
$composerPhar = "$siroDir\composer.phar"
$composerBat = "$siroDir\composer.bat"

$hasComposer = (Get-Command composer -ErrorAction SilentlyContinue) -or (Test-Path $composerBat)

if ($hasComposer) {
    & $logOK "Composer already installed"
} else {
    $ok = Download-File "https://getcomposer.org/composer.phar" $composerPhar "Composer" -Progress
    if (-not $ok) {
        & $logFail "Failed to download Composer. Install manually: https://getcomposer.org"
        exit 1
    }
    Set-Content -Path $composerBat -Value '@php "%~dp0composer.phar" %*' -Encoding ASCII
    & $logOK "Composer installed"
}

# ── Step 5: Project ───────────────────
$CreateProject = -not $NoProject

if ($CreateProject) {
    $projectName = $Name
    $counter = 2
    while (Test-Path ".\$projectName") {
        $projectName = "$Name-$counter"
        $counter++
    }
    if ($projectName -ne $Name) {
        & $logWarn "Directory '$Name' exists, using '$projectName'"
    }
    
    & $logStep "Step 5: Creating project '$projectName'..."
    
    & $phpExe "$siroPhar" new $projectName
    
    if (-not (Test-Path ".\$projectName\composer.json")) {
        & $logFail "Project creation failed"
        exit 1
    }
    
    Push-Location ".\$projectName"
    
    # Fix composer.json
    $composerJson = Get-Content composer.json -Raw | ConvertFrom-Json
    $composerJson.name = "app/$projectName"
    
    $siroCorePaths = @(
        "./siro-core", "../siro-core",
        "D:/VietVang/SiroSoft/siro-core",
        "$env:USERPROFILE/.siro/siro-core"
    )
    $foundSiroCore = $null
    foreach ($p in $siroCorePaths) {
        if (Test-Path "$p/composer.json") { $foundSiroCore = $p; break }
    }
    
    $fixedRepos = @()
    foreach ($repo in $composerJson.repositories) {
        if ($repo.url.EndsWith("siro-core")) {
            if ($foundSiroCore) {
                $repo.url = $foundSiroCore
                $fixedRepos += $repo
                $composerJson | Add-Member -NotePropertyName 'minimum-stability' -NotePropertyValue 'dev' -Force
            }
        } else {
            $fixedRepos += $repo
        }
    }
    $composerJson.repositories = $fixedRepos
    
    $require = $composerJson.require
    $mcpKey = 'sirosoft/mcp-server'
    if ($require.$mcpKey) {
        $require.PSObject.Properties.Remove($mcpKey)
        if (-not $composerJson.suggest) {
            $composerJson | Add-Member -NotePropertyName 'suggest' -NotePropertyValue @{} -Force
        }
        $composerJson.suggest | Add-Member -NotePropertyName $mcpKey -NotePropertyValue $require.$mcpKey -Force
    }
    $composerJson | ConvertTo-Json -Depth 10 | Set-Content composer.json
    
    # .env
    if ((Test-Path .env.example) -and -not (Test-Path .env)) {
        Copy-Item .env.example .env
    }
    
    & $logStep "Running composer install..."
    & composer install --no-interaction --quiet 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        & $logWarn "composer install had warnings"
    }
    
    if (Test-Path vendor/autoload.php) {
        & $phpExe siro key:generate 2>$null
    }
    
    Pop-Location
    
    $timer.Stop()
    $elapsed = "{0:N1}" -f $timer.Elapsed.TotalSeconds
    
    if (-not $Quiet) {
        Write-Host ""
        Write-Host "+--------------------------------------------+" -ForegroundColor Green
        Write-Host "|   >> Project ready (SQLite default)        |" -ForegroundColor Green
        Write-Host "|                                            |" -ForegroundColor Green
        Write-Host "|   cd $projectName                          |" -ForegroundColor Green
        Write-Host "|   php siro serve                           |" -ForegroundColor Green
        Write-Host "|   http://localhost:8080                    |" -ForegroundColor Green
        Write-Host "|                                            |" -ForegroundColor Green
        Write-Host "|   For databases:                           |" -ForegroundColor Green
        Write-Host "|   php siro db init --mysql             |" -ForegroundColor Green
        Write-Host "|     (MariaDB portable)                 |" -ForegroundColor Green
        Write-Host "|   php siro db init --mysql-official    |" -ForegroundColor Green
        Write-Host "|     (MySQL Community Server)           |" -ForegroundColor Green
        Write-Host "+--------------------------------------------+" -ForegroundColor Green
        Write-Host ""
        Write-Host "  Done in ${elapsed}s"
        Write-Host ""
    }
} else {
    $timer.Stop()
    if (-not $Quiet) {
        Write-Host ""
        Write-Host "  [OK] Siro CLI installed. Usage:"
        Write-Host "    php siro new my-api"
        Write-Host "    php siro runtime list"
        Write-Host "    php siro runtime install 8.3"
        Write-Host ""
    }
}
