#!/usr/bin/env pwsh
# Siro — 1 command, 0 dependency PHP API Framework
# Usage: iwr https://sirophp.com/install.ps1 | iex
# Or:    .\install.ps1 my-api

param(
    [string]$Name = "",
    [string]$PhpVersion = "8.2",
    [switch]$NoProject = $false
)

$Host.UI.RawUI.WindowTitle = "Siro Installer"
$ErrorActionPreference = "Stop"

$siroDir = "$env:USERPROFILE\.siro"
$runtimeDir = "$siroDir\runtime"
$binDir = "$siroDir\bin"
$version = "0.32.1"

function Write-Step($msg) { Write-Host "  $msg" -ForegroundColor Gray }
function Write-Success($msg) { Write-Host "  ✅ $msg" -ForegroundColor Green }
function Write-Error($msg) { Write-Host "  ❌ $msg" -ForegroundColor Red; exit 1 }

Write-Host "╔══════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   ⚡ Siro Framework Installer       ║" -ForegroundColor Cyan
Write-Host "║   v$version                          ║" -ForegroundColor Cyan
Write-Host "║   1 command, 0 dependency            ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# ── Step 1: Siro Runtime ─────────────────────
$phpExe = Get-Command "php.exe" -ErrorAction SilentlyContinue

if (-not $phpExe) {
    $targetPhpDir = "$runtimeDir\$PhpVersion"
    if (-not (Test-Path "$targetPhpDir\php.exe")) {
        Write-Host "📥 Step 1: Installing Siro Runtime $PhpVersion..." -ForegroundColor Cyan
        New-Item -ItemType Directory -Path $targetPhpDir -Force | Out-Null

        $phpUrl = "https://windows.php.net/downloads/releases/php-8.2.31-Win32-vs16-x64.zip"
        $zipFile = "$env:TEMP\siro-php-$PhpVersion.zip"

        Write-Step "Downloading PHP $PhpVersion..."
        Invoke-WebRequest -Uri $phpUrl -OutFile $zipFile -UseBasicParsing

        Write-Step "Extracting..."
        Expand-Archive -Path $zipFile -DestinationPath $targetPhpDir -Force
        Remove-Item $zipFile -Force

        Write-Step "Configuring php.ini..."
@"
[PHP]
extension_dir = "ext"
extension=openssl
extension=pdo_mysql
extension=mbstring
extension=curl
extension=fileinfo
zend_extension=opcache
opcache.enable=1
opcache.enable_cli=1
date.timezone=UTC
memory_limit=256M
"@ | Set-Content -Path "$targetPhpDir\php.ini"

        Write-Success "Siro Runtime $PhpVersion installed"
    }
    $phpExe = "$targetPhpDir\php.exe"
} else {
    Write-Host "✅ Step 1: PHP $(php -r 'echo PHP_VERSION;') found (system)" -ForegroundColor Green
    $phpExe = "php"
}

# ── Step 2: Siro CLI ─────────────────────────
$siroPhar = "$siroDir\siro.phar"
if (-not (Test-Path $siroPhar)) {
    Write-Host "📥 Step 2: Installing Siro CLI..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Path $siroDir -Force | Out-Null

    Write-Step "Downloading siro.phar..."
    $pharUrl = "https://sirophp.com/downloads/siro.phar"
    Invoke-WebRequest -Uri $pharUrl -OutFile $siroPhar -UseBasicParsing
    Write-Success "Siro CLI installed"
}

# ── Step 3: PATH ─────────────────────────────
if (-not (Test-Path "$binDir\siro.bat")) {
    New-Item -ItemType Directory -Path $binDir -Force | Out-Null
@"
@echo off
php "%~dp0..\siro.phar" %*
"@ | Set-Content -Path "$binDir\siro.bat" -Encoding ASCII
}

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$binDir*") {
    Write-Host "📌 Step 3: Adding Siro to PATH..." -ForegroundColor Cyan
    [Environment]::SetEnvironmentVariable("Path", "$binDir;$userPath", "User")
    $env:Path = "$binDir;$env:Path"
    Write-Success "Siro added to PATH"
} else {
    Write-Host "✅ Step 3: Siro already in PATH" -ForegroundColor Green
}

# ── Step 4: Project (optional) ─────────────
if (-not $NoProject) {
    if ($Name -eq "") { $Name = "my-api" }
    Write-Host "📦 Step 4: Creating project '$Name'..." -ForegroundColor Cyan
    & $phpExe $siroPhar new $Name

    if (-not (Test-Path ".\$Name\composer.json")) {
        Write-Error "Project creation failed"
    }

    Write-Host ""
    Write-Host "╔══════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║   🚀 Siro is ready!                  ║" -ForegroundColor Green
    Write-Host "║                                      ║" -ForegroundColor Green
    Write-Host "║   cd $Name                           ║" -ForegroundColor Green
    Write-Host "║   siro serve                         ║" -ForegroundColor Green
    Write-Host "║   http://localhost:8080              ║" -ForegroundColor Green
    Write-Host "╚══════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    cd $Name
    & $phpExe siro serve
} else {
    Write-Host ""
    Write-Host "Si\u1ec7n Siro CLI installed. Usage:"
    Write-Host "  siro new my-api"
    Write-Host "  siro runtime:install 8.3"
    Write-Host ""
}

