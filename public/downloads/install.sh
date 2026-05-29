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
BOLD='\033[1m'

PROJECT_NAME=""
PHP_VERSION="8.2"
NO_PROJECT=false
VERSION="0.32.1"
SIRO_DIR="$HOME/.siro"
SIRO_PHAR="$SIRO_DIR/siro.phar"

# Parse arguments
while [ $# -gt 0 ]; do
    case "$1" in
        --no-project) NO_PROJECT=true; shift ;;
        --php-version) PHP_VERSION="$2"; shift 2 ;;
        --php-version=*) PHP_VERSION="${1#*=}"; shift ;;
        --help|-h)
            echo "Usage:"
            echo "  curl -sS https://sirophp.com/downloads/install.sh | bash"
            echo "  curl -sS ... | bash -s my-project"
            echo "  curl -sS ... | bash -s -- --no-project"
            echo "  curl -sS ... | bash -s -- --php-version=8.3 my-project"
            exit 0
            ;;
        *) PROJECT_NAME="$1"; shift ;;
    esac
done

[ -z "$PROJECT_NAME" ] && [ "$NO_PROJECT" = false ] && PROJECT_NAME="my-api"

echo ""
echo "+--------------------------------------------+"
echo "|   ** Siro Framework Installer             |"
echo "|   v${VERSION}                                 |"
echo "|   1 command, 0 dependency                 |"
echo "+--------------------------------------------+"
echo ""

# ── Step 1: PHP ─────────────────────────────
PHP_BIN=""
if command -v php >/dev/null 2>&1; then
    PHP_VER=$(php -r "echo PHP_VERSION_ID;")
    if [ "$PHP_VER" -ge 80200 ]; then
        PHP_VERSION_INSTALLED=$(php -r "echo PHP_VERSION;")
        echo "[OK] Step 1: PHP $PHP_VERSION_INSTALLED found (system)"
        PHP_BIN="php"
    else
        echo "[FAIL] PHP too old, need 8.2+"
    fi
fi

if [ -z "$PHP_BIN" ]; then
    echo "[...] Step 1: Installing PHP $PHP_VERSION..."
    OS="$(uname -s)"
    case "$OS" in
        Darwin)
            if command -v brew >/dev/null 2>&1; then
                brew install php@"$PHP_VERSION" 2>/dev/null || brew upgrade php@"$PHP_VERSION" 2>/dev/null
                PHP_BIN="php"
            else
                echo "[FAIL] Install Homebrew first: https://brew.sh"
                exit 1
            fi
            ;;
        Linux)
            if command -v apt-get >/dev/null 2>&1; then
                sudo apt-get update -qq
                sudo apt-get install -y -qq php"$PHP_VERSION"-cli php"$PHP_VERSION"-pdo php"$PHP_VERSION"-mbstring 2>/dev/null || \
                sudo apt-get install -y -qq php-cli php-pdo php-mbstring
                PHP_BIN="php"
            elif command -v yum >/dev/null 2>&1; then
                sudo yum install -y php-cli php-pdo php-mbstring
                PHP_BIN="php"
            else
                echo "[FAIL] Please install PHP 8.2+ manually"
                exit 1
            fi
            ;;
    esac
    echo "[OK] Step 1: PHP $PHP_VERSION installed"
fi

# ── Step 2: Siro CLI ─────────────────────────
mkdir -p "$SIRO_DIR"

if [ ! -f "$SIRO_PHAR" ]; then
    echo "[...] Step 2: Installing Siro CLI..."
    PHAR_URL="https://sirophp.com/downloads/siro.phar"
    if command -v curl >/dev/null 2>&1; then
        curl -sSL --connect-timeout 15 --max-time 120 "$PHAR_URL" -o "$SIRO_PHAR"
    elif command -v wget >/dev/null 2>&1; then
        wget -q "$PHAR_URL" -O "$SIRO_PHAR"
    fi
    chmod +x "$SIRO_PHAR" 2>/dev/null || true
    echo "[OK] Step 2: Siro CLI downloaded"
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

# Add to PATH
export PATH="$HOME/.local/bin:$PATH"
for RC in "$HOME/.zshrc" "$HOME/.bashrc" "$HOME/.profile"; do
    if [ -f "$RC" ]; then
        if ! grep -q '\.local/bin' "$RC" 2>/dev/null; then
            echo "" >> "$RC"
            echo "# Siro" >> "$RC"
            echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$RC"
        fi
    fi
done

if [ -f "$SIRO_PHAR" ]; then
    echo "[OK] Step 2: Siro CLI installed"
fi

# ── Step 3: Install Composer ────────────────
COMPOSER_BIN="$HOME/.local/bin/composer"
export PATH="$HOME/.local/bin:$PATH"

echo "[...] Step 3: Installing Composer..."

if command -v composer >/dev/null 2>&1; then
    echo "[OK] Step 3: Composer already installed"
else
    COMPOSER_URL="https://getcomposer.org/composer.phar"
    if command -v curl >/dev/null 2>&1; then
        curl -sSL "$COMPOSER_URL" -o "$COMPOSER_BIN"
    elif command -v wget >/dev/null 2>&1; then
        wget -q "$COMPOSER_URL" -O "$COMPOSER_BIN"
    fi
    chmod +x "$COMPOSER_BIN"
    echo "[OK] Step 3: Composer installed"
fi

# ── Step 4: Create project ─────────────────
if [ "$NO_PROJECT" = false ]; then
    # Auto-dedup project name
    BASE_NAME="$PROJECT_NAME"
    COUNTER=2
    while [ -d "$PROJECT_NAME" ]; do
        PROJECT_NAME="${BASE_NAME}-${COUNTER}"
        COUNTER=$((COUNTER + 1))
    done
    if [ "$PROJECT_NAME" != "$BASE_NAME" ]; then
        echo "[WARN] Directory '$BASE_NAME' already exists, using '$PROJECT_NAME' instead"
    fi

    echo "[...] Step 4: Creating project '$PROJECT_NAME'..."
    $PHP_BIN "$SIRO_PHAR" new "$PROJECT_NAME"

    if [ ! -f "$PROJECT_NAME/composer.json" ]; then
        echo "[FAIL] Project creation failed"
        exit 1
    fi

    cd "$PROJECT_NAME"

    # Fix composer.json
    $PHP_BIN -r "
        \$json = json_decode(file_get_contents('composer.json'), true);
        \$json['name'] = 'app/$PROJECT_NAME';
        if (isset(\$json['require']['sirosoft/mcp-server'])) {
            \$ver = \$json['require']['sirosoft/mcp-server'];
            unset(\$json['require']['sirosoft/mcp-server']);
            if (!isset(\$json['suggest'])) {
                \$json['suggest'] = [];
            }
            \$json['suggest']['sirosoft/mcp-server'] = \$ver;
        }
        file_put_contents('composer.json', json_encode(\$json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    "

    # Copy .env
    if [ -f .env.example ] && [ ! -f .env ]; then
        cp .env.example .env
    fi

    echo "[...] Running composer install..."
    composer install --no-interaction --quiet 2>/dev/null || echo "[WARN] composer install had warnings"

    # Generate app key
    if [ -f vendor/autoload.php ]; then
        echo "[...] Generating app key..."
        php siro key:generate 2>/dev/null || true
    fi

    echo ""
    echo "+--------------------------------------------+"
    echo "|   >> Project ready (SQLite default)        |"
    echo "|                                            |"
    echo "|   cd $PROJECT_NAME                         |"
    echo "|   php siro serve                           |"
    echo "|   http://localhost:8080                    |"
    echo "|                                            |"
    echo "|   For MySQL:                               |"
    echo "|   php siro db init --mysql                 |"
    echo "|   (auto-installs MariaDB portable)         |"
    echo "+--------------------------------------------+"
    echo ""
else
    echo ""
    echo "[OK] Siro CLI installed. Usage:"
    echo "  siro new my-api"
    echo "  php siro runtime list"
    echo "  php siro runtime install 8.3"
    echo ""
fi
