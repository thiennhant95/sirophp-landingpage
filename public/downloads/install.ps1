#!/usr/bin/env pwsh
# Siro - 1 command, 0 dependency PHP API Framework
# Usage: iwr https://sirophp.com/downloads/install.ps1 -UseBasicParsing | iex

param(
    [string]$Name = "my-api",
    [switch]$NoProject,
    [switch]$Help,
    [switch]$Quiet
)

$ScriptVersion = "0.35.0"

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

function Verify-Checksum($file, $expectedHash) {
    if (-not $expectedHash) { return $true }
    try {
        $hash = (Get-FileHash -Path $file -Algorithm SHA256).Hash.ToLower()
        if ($hash -ne $expectedHash.ToLower()) {
            & $logWarn "Checksum mismatch (expected: $expectedHash, got: $hash)"
            return $false
        }
        return $true
    } catch {
        return $false
    }
}

function Download-File($url, $dest, $label) {
    $retries = 3
    for ($try = 1; $try -le $retries; $try++) {
        try {
            if (-not $Quiet) { Write-Host "    Downloading $label..." }
            $wc = New-Object System.Net.WebClient
            $wc.DownloadFile($url, $dest)
            $size = (Get-Item $dest -ErrorAction SilentlyContinue).Length
            if ($size -and -not $Quiet) {
                Write-Host "    Downloaded $([math]::Round($size / 1MB, 1)) MB"
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

function Start-BackgroundDownload($url, $dest, $label) {
    $script = @"
`$wc = New-Object System.Net.WebClient
try {
    `$wc.DownloadFile('$url', '$dest')
    exit 0
} catch { exit 1 }
"@
    $job = Start-Job -ScriptBlock ([scriptblock]::Create($script))
    return $job
}

# ── Pre-flight checks ─────────────────
if (-not $Quiet) {
    Write-Host ""
    Write-Host "+--------------------------------------------+" -ForegroundColor Cyan
    Write-Host "|   ** Siro Framework Installer             |" -ForegroundColor Cyan
    Write-Host "|   v$ScriptVersion                                 |" -ForegroundColor Cyan
    Write-Host "|   1 command, 0 dependency                 |" -ForegroundColor Cyan
    Write-Host "+--------------------------------------------+" -ForegroundColor Cyan
}

$timer = [System.Diagnostics.Stopwatch]::StartNew()
$isAdmin = ([System.Security.Principal.WindowsPrincipal][System.Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)

# Check VC++ redistributable (required for PHP on Windows)
$vcInstalled = Test-Path "$env:SystemRoot\System32\vcruntime140.dll"
if (-not $vcInstalled) {
    & $logWarn "VC++ Redistributable not found (required for PHP)"
    & $logWarn "Download: https://aka.ms/vs/17/release/vc_redist.x64.exe"
    if (-not $Quiet) {
        $choice = Read-Host "  Continue anyway? [Y/n]"
        if ($choice -eq 'n' -or $choice -eq 'N') { exit 1 }
    }
}

# ── Step 1: Detect / Install PHP ──────
$phpExe = Get-Command php -ErrorAction SilentlyContinue

if (-not $phpExe) {
    $phpDirCandidates = @()
    if ($isAdmin) { $phpDirCandidates += "$env:ProgramFiles\php" }
    $phpDirCandidates += "$env:USERPROFILE\.siro\php-runtime"

    $targetPhpDir = $null
    foreach ($d in $phpDirCandidates) {
        if (Test-Path "$d\php.exe") { $targetPhpDir = $d; break }
    }
    if (-not $targetPhpDir) { $targetPhpDir = $phpDirCandidates[0] }

    if (-not (Test-Path "$targetPhpDir\php.exe")) {
        & $logStep "Step 1: Installing PHP 8.2.31..."
        
        $phpZip = "$env:TEMP\php-install-$PID.zip"
        $phpJob = Start-BackgroundDownload "https://windows.php.net/downloads/releases/php-8.2.31-nts-Win32-vs16-x64.zip" $phpZip "PHP 8.2.31"
        
        # While PHP downloads, prepare directories
        if (-not (Test-Path $targetPhpDir)) { New-Item -ItemType Directory -Force -Path $targetPhpDir | Out-Null }
        
        $phpJob | Wait-Job | Out-Null
        $phpOk = ($phpJob | Receive-Job) -ne 1
        $phpJob | Remove-Job
        $phpOk = $phpOk -and (Test-Path $phpZip)
        
        if (-not $phpOk) {
            & $logFail "Failed to download PHP. Install manually: https://windows.php.net"
            exit 1
        }
        
        Add-Type -AssemblyName System.IO.Compression.FileSystem | Out-Null
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
            Copy-Item "$targetPhpDir\php.ini-development" $iniPath -ErrorAction SilentlyContinue
        }
        if (Test-Path $iniPath) {
            $iniContent = Get-Content $iniPath -Raw
            foreach ($ext in @("curl","mbstring","openssl","pdo_mysql","pdo_sqlite","sockets")) {
                $iniContent = $iniContent -replace ";extension=$ext", "extension=$ext"
            }
            Set-Content -Path $iniPath -Value $iniContent
        }
        
        $env:Path = "$targetPhpDir;$env:Path"
        & $logOK "PHP 8.2.31 installed at $targetPhpDir"
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
& $logStep "Step 2: Installing Siro CLI..."

$skipPhar = $false
if (Test-Path $siroPhar) {
    $ver = & $phpExe -r @"
try { require '$siroPhar'; } catch {}
"@ 2>&1 | Out-String
    if ($ver -match "v(\d+\.\d+\.\d+)") {
        $pharVer = $Matches[1]
        if ($pharVer -eq $ScriptVersion) { $skipPhar = $true }
    }
}

if ($skipPhar) {
    & $logOK "Siro CLI v$ScriptVersion already installed (cached)"
} else {
    $ok = Download-File "https://sirophp.com/downloads/siro.phar" $siroPhar "Siro CLI"
    if (-not $ok) { & $logFail "Failed to download Siro CLI."; exit 1 }
    # Verify SHA-256 checksum
    $shaFile = "$env:TEMP\siro.phar.sha256"
    $shaOk = Download-File "https://sirophp.com/downloads/siro.phar.sha256" $shaFile "checksum"
    if ($shaOk -and (Test-Path $shaFile)) {
        $expected = (Get-Content $shaFile -Raw).Trim().Split(' ')[0]
        if (-not (Verify-Checksum $siroPhar $expected)) {
            & $logFail "Siro CLI checksum mismatch. File may be corrupted."
            Remove-Item $siroPhar -Force -ErrorAction SilentlyContinue
            exit 1
        }
        & $logOK "Siro CLI verified (SHA-256)"
        Remove-Item $shaFile -Force -ErrorAction SilentlyContinue
    } else {
        & $logWarn "Checksum unavailable — skipping verification"
    }
    & $logOK "Siro CLI downloaded"
}

# ── Step 3: PATH ──────────────────────
& $logStep "Step 3: Adding to PATH..."
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$siroDir*") {
    [Environment]::SetEnvironmentVariable("Path", "$siroDir;$userPath", "User")
    $env:Path = "$siroDir;$env:Path"
    & $logOK "Siro added to PATH (User)"
} else {
    & $logOK "Siro already in PATH"
}
& $logWarn "To uninstall: remove '$siroDir' from PATH and delete the folder"

# ── Step 4: Composer ──────────────────
& $logStep "Step 4: Installing Composer..."
$composerPhar = "$siroDir\composer.phar"
$composerBat = "$siroDir\composer.bat"
$hasComposer = (Get-Command composer -ErrorAction SilentlyContinue) -or (Test-Path $composerBat)

if ($hasComposer) {
    & $logOK "Composer already installed"
} else {
    $ok = Download-File "https://getcomposer.org/composer.phar" $composerPhar "Composer"
    if (-not $ok) { & $logFail "Failed to download Composer."; exit 1 }
    Set-Content -Path $composerBat -Value '@php "%~dp0composer.phar" %*' -Encoding ASCII
    & $logOK "Composer installed"
}

# ── Step 5: Project ───────────────────
$CreateProject = -not $NoProject

if ($CreateProject) {
    $projectName = $Name
    $counter = 2
    while (Test-Path ".\$projectName") { $projectName = "$Name-$counter"; $counter++ }
    if ($projectName -ne $Name) { & $logWarn "Directory '$Name' exists, using '$projectName'" }
    
    & $logStep "Step 5: Creating project '$projectName'..."
    & $phpExe "$siroPhar" new $projectName
    if (-not (Test-Path ".\$projectName\composer.json")) { & $logFail "Project creation failed"; exit 1 }
    
    Push-Location ".\$projectName"
    
    # Fix composer.json
    $composerJson = Get-Content composer.json -Raw | ConvertFrom-Json
    $composerJson.name = "app/$projectName"
    
    $siroCorePaths = @(
        "./siro-core", "../siro-core",
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
    if ((Test-Path .env.example) -and -not (Test-Path .env)) { Copy-Item .env.example .env }
    
    & $logStep "Running composer install..."
    & composer install --no-interaction --quiet 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) { & $logWarn "composer install had warnings" }
    
    if (Test-Path vendor/autoload.php) { & $phpExe siro key:generate 2>$null }
    
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
        Write-Host "  Done in ${elapsed}s  |  To uninstall: delete '$siroDir'"
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
        Write-Host "  Done in $($timer.Elapsed.TotalSeconds.ToString('0.0'))s  |  To uninstall: delete '$siroDir'"
        Write-Host ""
    }
}
