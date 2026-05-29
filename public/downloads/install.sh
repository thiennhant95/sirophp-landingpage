#!/bin/sh
# Siro - 1 command, 0 dependency PHP API Framework (v0.32.1)
# Usage: curl -sS https://sirophp.com/downloads/install.sh | bash
# Or:    curl -sS https://sirophp.com/downloads/install.sh | bash -s my-api

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
NC='\033[0m'

PROJECT_NAME=""
PHP_VERSION="8.2"
NO_PROJECT=false
VERSION="0.32.1"
SIRO_DIR="$HOME/.siro"
SIRO_PHAR="$SIRO_DIR/siro.phar"

while [ $# -gt 0 ]; do
    case "$1" in
        --no-project) NO_PROJECT=true; shift ;;
        --php-version) PHP_VERSION="$2"; shift 2 ;;
        --php-version=*) PHP_VERSION="${1#*=}"; shift ;;
        --quiet) exec >/dev/null 2>&1 ;;
        --help|-h)
            echo "Usage:"
            echo "  curl -sS https://sirophp.com/downloads/install.sh | bash"
            echo "  curl -sS ... | bash -s my-project"
            echo "  curl -sS ... | bash -s -- --no-project"
            echo "  curl -sS ... | bash -s -- --php-version=8.3"
            echo "  curl -sS ... | bash -s -- --quiet"
            exit 0
            ;;
        *) PROJECT_NAME="$1"; shift ;;
    esac
done

[ -z "$PROJECT_NAME" ] && [ "$NO_PROJECT" = false ] && PROJECT_NAME="my-api"

START_TIME=$(date +%s)

echo ""
echo "+--------------------------------------------+"
echo "|   ** Siro Framework Installer             |"
echo "|   v${VERSION}                                 |"
echo "|   1 command, 0 dependency                 |"
echo "+--------------------------------------------+"
echo ""

log_ok()   { echo "  ${GREEN}[OK]${NC} $1"; }
log_warn() { echo "  ${YELLOW}[WARN]${NC} $1"; }
log_fail() { echo "  ${RED}[FAIL]${NC} $1"; exit 1; }
log_step() { echo ""; echo "  ${CYAN}$1${NC}"; }

# ── Step 1: PHP ─────────────────────────────
PHP_BIN=""
if command -v php >/dev/null 2>&1; then
    PHP_VER=$(php -r "echo PHP_VERSION_ID;")
    if [ "$PHP_VER" -ge 80200 ]; then
        PHP_VER_STR=$(php -r "echo PHP_VERSION;")
        log_ok "PHP $PHP_VER_STR found"
        PHP_BIN="php"
    else
        log_fail "PHP too old, need 8.2+"
    fi
fi

if [ -z "$PHP_BIN" ]; then
    log_step "Step 1: Installing PHP $PHP_VERSION..."
    OS="$(uname -s)"
    case "$OS" in
        Darwin)
            command -v brew >/dev/null 2>&1 || log_fail "Install Homebrew first: https://brew.sh"
            brew install php@"$PHP_VERSION" 2>/dev/null || brew upgrade php@"$PHP_VERSION" 2>/dev/null
            PHP_BIN="php"
            log_ok "PHP $PHP_VERSION installed"
            ;;
        Linux)
            if command -v apt-get >/dev/null 2>&1; then
                sudo apt-get update -qq
                sudo apt-get install -y -qq php"$PHP_VERSION"-cli php"$PHP_VERSION"-pdo php"$PHP_VERSION"-mbstring 2>/dev/null || \
                sudo apt-get install -y -qq php-cli php-pdo php-mbstring
            elif command -v yum >/dev/null 2>&1; then
                sudo yum install -y php-cli php-pdo php-mbstring
            else
                log_fail "Please install PHP 8.2+ manually"
            fi
            PHP_BIN="php"
            log_ok "PHP $PHP_VERSION installed"
            ;;
    esac
fi

# ── Step 2: Siro CLI ─────────────────────────
log_step "Step 2: Installing Siro CLI..."
mkdir -p "$SIRO_DIR"

NEED_DOWNLOAD=true
if [ -f "$SIRO_PHAR" ]; then
    PHAR_VER=$($PHP_BIN -r "require '$SIRO_PHAR';" 2>/dev/null | head -1)
    if echo "$PHAR_VER" | grep -q "$VERSION" 2>/dev/null; then
        log_ok "Siro CLI already installed (cached)"
        NEED_DOWNLOAD=false
    fi
fi

if $NEED_DOWNLOAD; then
    PHAR_URL="https://sirophp.com/downloads/siro.phar"
    if command -v curl >/dev/null 2>&1; then
        curl -sSL --connect-timeout 15 --max-time 60 "$PHAR_URL" -o "$SIRO_PHAR"
    elif command -v wget >/dev/null 2>&1; then
        wget -q "$PHAR_URL" -O "$SIRO_PHAR"
    fi
    chmod +x "$SIRO_PHAR" 2>/dev/null || true
    log_ok "Siro CLI downloaded"
fi

# Create siro wrapper
SIRO_WRAPPER="$HOME/.local/bin/siro"
mkdir -p "$(dirname "$SIRO_WRAPPER")"
if [ ! -f "$SIRO_WRAPPER" ]; then
    cat > "$SIRO_WRAPPER" << 'EOF'
#!/bin/sh
SIRO_PHAR="$HOME/.siro/siro.phar"
exec php "$SIRO_PHAR" "$@"
EOF
    chmod +x "$SIRO_WRAPPER"
fi

export PATH="$HOME/.local/bin:$PATH"
for RC in "$HOME/.zshrc" "$HOME/.bashrc" "$HOME/.profile"; do
    [ -f "$RC" ] || continue
    grep -q '\.local/bin' "$RC" 2>/dev/null && continue
    echo "" >> "$RC"
    echo "# Siro" >> "$RC"
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$RC"
done

# ── Step 3: Composer ────────────────────────
log_step "Step 3: Installing Composer..."
COMPOSER_BIN="$HOME/.local/bin/composer"
export PATH="$HOME/.local/bin:$PATH"

if command -v composer >/dev/null 2>&1 || [ -f "$COMPOSER_BIN" ]; then
    log_ok "Composer already installed"
else
    COMPOSER_URL="https://getcomposer.org/composer.phar"
    if command -v curl >/dev/null 2>&1; then
        curl -sSL --connect-timeout 15 --max-time 60 "$COMPOSER_URL" -o "$COMPOSER_BIN"
    elif command -v wget >/dev/null 2>&1; then
        wget -q "$COMPOSER_URL" -O "$COMPOSER_BIN"
    fi
    chmod +x "$COMPOSER_BIN"
    log_ok "Composer installed"
fi

# ── Step 4: Project ─────────────────────────
if [ "$NO_PROJECT" = false ]; then
    BASE_NAME="$PROJECT_NAME"
    COUNTER=2
    while [ -d "$PROJECT_NAME" ]; do
        PROJECT_NAME="${BASE_NAME}-${COUNTER}"
        COUNTER=$((COUNTER + 1))
    done
    [ "$PROJECT_NAME" != "$BASE_NAME" ] && log_warn "Directory '$BASE_NAME' exists, using '$PROJECT_NAME'"

    log_step "Step 5: Creating project '$PROJECT_NAME'..."
    $PHP_BIN "$SIRO_PHAR" new "$PROJECT_NAME"
    [ -f "$PROJECT_NAME/composer.json" ] || log_fail "Project creation failed"

    cd "$PROJECT_NAME"

    $PHP_BIN -r "
        \$json = json_decode(file_get_contents('composer.json'), true);
        \$json['name'] = 'app/$PROJECT_NAME';
        if (isset(\$json['require']['sirosoft/mcp-server'])) {
            \$ver = \$json['require']['sirosoft/mcp-server'];
            unset(\$json['require']['sirosoft/mcp-server']);
            if (!isset(\$json['suggest'])) { \$json['suggest'] = []; }
            \$json['suggest']['sirosoft/mcp-server'] = \$ver;
        }
        file_put_contents('composer.json', json_encode(\$json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    " 2>/dev/null

    [ -f .env.example ] && [ ! -f .env ] && cp .env.example .env

    log_step "Running composer install..."
    composer install --no-interaction --quiet 2>/dev/null || log_warn "composer install had warnings"
    
    [ -f vendor/autoload.php ] && php siro key:generate 2>/dev/null || true

    END_TIME=$(date +%s)
    ELAPSED=$((END_TIME - START_TIME))

    echo ""
    echo "+--------------------------------------------+"
    echo "|   >> Project ready (SQLite default)        |"
    echo "|                                            |"
    echo "|   cd $PROJECT_NAME                         |"
    echo "|   php siro serve                           |"
    echo "|   http://localhost:8080                    |"
    echo "|                                            |"
    echo "|   For databases:                           |"
    echo "|   php siro db init --mysql             |"
    echo "|     (MariaDB portable)                 |"
    echo "|   php siro db init --mysql-official    |"
    echo "|     (MySQL Community Server)           |"
    echo "+--------------------------------------------+"
    echo ""
    echo "  Done in ${ELAPSED}s  |  To uninstall: rm -rf $SIRO_DIR && rm ~/.local/bin/siro"
    echo ""
else
    echo ""
    echo "  [OK] Siro CLI installed. Usage:"
    echo "    php siro new my-api"
    echo "    php siro runtime list"
    echo "    php siro runtime install 8.3"
    echo ""
fi
