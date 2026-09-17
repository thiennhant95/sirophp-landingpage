# Siro Installer Guide

**1 command, 0 dependency â€” bootstrap Siro Framework from scratch.**

> **Zero to API:** `iwr https://sirophp.com/install.ps1 | iex` â†’ API running in 30 seconds.
> No PHP, Composer, XAMPP, MySQL, or Docker required.

---

## One-Line Install

| OS | Command |
|----|---------|
| **Windows** (PowerShell) | `iwr https://sirophp.com/install.ps1 \| iex` |
| **Windows** (CMD) | `@"%SystemRoot%\...\powershell.exe" -NoProfile -ExecutionPolicy Bypass -Command "iwr https://sirophp.com/install.ps1 \| iex"` |
| **macOS / Linux** | `curl -sS https://sirophp.com/install.sh \| bash` |

### With project name

```bash
# macOS / Linux
curl -sS https://sirophp.com/install.sh | bash -s my-api

# Windows (2 commands)
iwr https://sirophp.com/install.ps1 | iex
siro new my-api
```

### CLI only, skip project creation

```bash
# Windows
iwr https://sirophp.com/install.ps1 | iex --NoProject

# macOS / Linux
curl -sS https://sirophp.com/install.sh | bash -s -- --no-project
```

### Choose PHP version

```bash
# Windows
iwr https://sirophp.com/install.ps1 | iex --PhpVersion 8.3

# macOS / Linux
curl -sS https://sirophp.com/install.sh | bash -s -- --php-version=8.3
```

---

## What Gets Installed

```
~/.siro/
â”œâ”€â”€ siro.phar              # Siro CLI (multi-purpose binary)
â”œâ”€â”€ runtime/
â”‚   â”œâ”€â”€ 8.2.33/            # PHP runtime (Windows auto-download)
â”‚   â”œâ”€â”€ mariadb-11.4/      # MariaDB portable (db:init --mysql)
â”‚   â”‚   â”œâ”€â”€ bin/mysqld.exe
â”‚   â”‚   â”œâ”€â”€ data/
â”‚   â”‚   â””â”€â”€ my.ini
â”‚   â”œâ”€â”€ current            # Active PHP version marker
â”‚   â””â”€â”€ db_active.json     # Active DB port & PID
â””â”€â”€ bin/
    â”œâ”€â”€ siro.bat           # Windows wrapper
    â””â”€â”€ siro               # macOS/Linux wrapper
```

### Install flow

1. **PHP** â€” Windows: download + extract PHP 8.2 zip | macOS: `brew install` | Linux: `apt install`
2. **Siro CLI** â€” download `siro.phar` to `~/.siro/`
3. **PATH** â€” add `~/.siro/bin` to user PATH
4. **Project** â€” `siro new my-api` â†’ copy skeleton â†’ `composer install` â†’ generate JWT key
5. **Database** â€” SQLite (default, zero config) or MySQL/MariaDB (auto-detect or portable)

---

## Commands

### Installer commands (built into siro.phar)

#### `siro new <name>`
Create a new Siro project. Automatically runs `composer install` + generates JWT key.

```bash
siro new my-api
cd my-api
siro serve
# â†’ http://localhost:8080
```

#### `siro runtime:install <version>`
Download and install a PHP runtime.

```bash
siro runtime:install 8.2    # PHP 8.2.33
siro runtime:install 8.3    # PHP 8.3.33
```

#### `siro runtime:switch <version>`
Switch active PHP runtime.

```bash
siro runtime:switch 8.3     # Switch to PHP 8.3
php -v                      # Now shows PHP 8.3
```

#### `siro runtime:list`
List all installed runtimes.

```bash
siro runtime:list
# ðŸ‘‰ PHP 8.2.33 (v8.2.33)
#    PHP 8.3.33 (v8.3.33)
# Active: PHP 8.2.33
```

#### `siro runtime:remove <version>`
Remove a runtime.

```bash
siro runtime:remove 8.1
```

#### `siro runtime:current`
Show active version.

```bash
siro runtime:current
# 8.2.33
```

#### `siro runtime:path`
Show path to the active PHP binary.

```bash
siro runtime:path
# C:\Users\you\.siro\runtime\8.2.33\php.exe
```

#### `siro version`
Show installer version.

```bash
siro version
# Siro Installer v1.0.12
```

### Database commands (auto-delegated in project dir)

#### `siro db:init`
Configure SQLite (default, zero configuration).

```bash
siro db:init
# âœ… SQLite configured
```

No setup needed. SQLite file created at `storage/app/database.sqlite`.

#### `siro db:init --mysql`
Configure MySQL/MariaDB. Smart auto-detection:

| Your machine | Behavior |
|-------------|----------|
| **MySQL already installed & running** | Skips download. Just configures `.env` to use it |
| **No MySQL found** | Downloads MariaDB portable (~80MB) â†’ starts â†’ creates database â†’ configures `.env` |
| **Already installed via Siro** | Starts if stopped, reuses existing installation |

```bash
# Auto-detect or download
siro db:init --mysql

# With custom port (if 3306 is taken)
siro db:init --mysql --port=3307
```

Examples:

```bash
# MySQL already on this machine (XAMPP, Docker, etc.)
$ siro db:init --mysql
# âœ… Existing MySQL/MariaDB found on port 3306
#   Using system database â€” no download needed

# No MySQL found â€” downloads portable
$ siro db:init --mysql
# ðŸ“¦ Downloading MariaDB...
# âœ… MariaDB installed and started
#   Database: siro_dev
#   Port: 3306
#   Username: root
```

#### `siro db:start`
Start MariaDB if it was stopped.

```bash
siro db:start
# âœ… MariaDB started on port 3306
```

#### `siro db:stop`
Stop MariaDB.

```bash
siro db:stop
# âœ… MariaDB stopped
```

#### `siro db:status`
Show database status.

```bash
siro db:status
# MariaDB: installed
#   Port: 3306
#   Running: yes
#   PID: 12345
#   Data: C:\Users\you\.siro\runtime\mariadb-11.4\data
# Active driver: mysql
```

#### `siro db:remove`
Stop and remove MariaDB runtime.

```bash
siro db:remove
# âœ… MariaDB removed
```

### Project commands (auto-delegated)

When inside a project directory, `siro.phar` automatically delegates commands to the project's CLI:

```bash
cd my-api
siro serve              # â†’ php siro serve
siro make:crud Product  # â†’ php siro make:crud Product
siro migrate            # â†’ php siro migrate
siro db:init --mysql    # â†’ php siro db init --mysql
siro test               # â†’ php siro test
siro route:list         # â†’ php siro route:list
siro tinker             # â†’ php siro tinker
```

No need to remember when to use `siro` vs `php siro`. Just use `siro` everywhere.

---

## Full Workflow

### Zero to API (Windows, MySQL)

```powershell
# 1. Install everything
iwr https://sirophp.com/install.ps1 | iex

# 2. Create project
siro new shop-api
cd shop-api

# 3. Database (auto: if MySQL exists, uses it; if not, downloads portable)
siro db:init --mysql

# 4. Build features
siro make:auth
siro make:crud Product
siro make:crud Order

# 5. Run!
siro serve
# â†’ http://localhost:8080
```

Total time: ~1 minute. Zero manual setup.

### Zero to API (macOS/Linux, SQLite)

```bash
# 1. Install everything + create project
curl -sS https://sirophp.com/install.sh | bash -s blog-api

cd blog-api

# 2. SQLite is already configured (db:init is optional, just to confirm)
siro db:init

# 3. Build + run
siro make:auth
siro make:crud Post
siro serve
```

### With existing PHP + MySQL (XAMPP, Homebrew, Docker)

```bash
composer create-project sirosoft/api my-api
cd my-api

# Auto-detects your existing MySQL on port 3306
php siro db init --mysql

php siro serve
```

### Switching between SQLite and MySQL

```bash
# Currently using SQLite
siro db init --mysql       # Switch to MySQL/MariaDB

# Currently using MySQL
siro db init                # Switch back to SQLite
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| `siro: command not found` | PATH not reloaded | Restart terminal, or add `~/.siro/bin` to PATH manually |
| `PHP not found` | No runtime installed | `siro runtime:install 8.2` |
| `composer install` is slow | Slow network | Run manually: `cd my-api && composer install` |
| Port 8080 in use | Another process | `siro serve --port=8081` |
| Missing PHP extension | Not enabled | Edit `~/.siro/runtime/8.2.33/php.ini` |
| MariaDB won't start | Port conflict | `siro db:init --mysql --port=3307` |
| `MySQL server has gone away` | MariaDB stopped | `siro db:start` |
| `curl: command not found` | (Linux) | `sudo apt install curl` |
| PowerShell execution policy | (Windows) | Run: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |

---

## Requirements Matrix

| OS | PHP | MySQL | Composer | Internet | Disk |
|----|-----|-------|----------|----------|------|
| **Windows** 10+ | âŒ Auto | âŒ Auto (80MB) | âŒ Auto | âœ… Required | ~130MB |
| **macOS** 12+ | âœ… Homebrew | âœ… Homebrew | âœ… Homebrew | âœ… Required | ~200MB |
| **Linux** (apt/yum) | âœ… APT | âœ… APT | âœ… APT | âœ… Required | ~150MB |

---

## Architecture

```
User command: siro <cmd>
       â”‚
       â–¼
  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
  â”‚ siro.phar     â”‚â”€â”€â”€â–¶â”‚ RuntimeManager       â”‚
  â”‚ (installer)   â”‚    â”‚ - install PHP        â”‚
  â”‚               â”‚    â”‚ - switch version     â”‚
  â”‚               â”‚    â”‚ - install MariaDB    â”‚
  â”‚               â”‚    â”‚ - start/stop DB      â”‚
  â”‚               â”‚    â”‚ - detect existing DB â”‚
  â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â”‚
         â”‚ Inside project directory?
         â”œâ”€â”€ Yes â†’ delegate: php siro <cmd>
         â”‚           (serve, make:*, migrate, db:*, ...)
         â”‚
         â””â”€â”€ No  â†’ handle directly
                     (new, runtime:*, version, help)
```

---

*Siro Installer v1.0.12 — September 2026*
