#!/bin/sh
# Siro — 1 command, 0 dependency PHP API Framework
# Usage: curl -sS https://sirophp.com/install.sh | bash
# Or:    curl -sS https://sirophp.com/install.sh | bash -s my-api

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
GRAY='\033[0;90m'
NC='\033[0m'

PROJECT_NAME=""
PHP_VERSION="8.2"
NO_PROJECT=false

# Parse arguments
while [ $# -gt 0 ]; do
    case "$1" in
        --no-project) NO_PROJECT=true; shift ;;
        --php-version) PHP_VERSION="$2"; shift 2 ;;
        --php-version=*) PHP_VERSION="${1#*=}"; shift ;;
        --help|-h) echo "Usage: $0 [project-name] [--php-version=8.3] [--no-project]"; exit 0 ;;
        *) PROJECT_NAME="$1"; shift ;;
    esac
done
[ -z "$PROJECT_NAME" ] && [ "$NO_PROJECT" = false ] && PROJECT_NAME="my-api"
VERSION="0.32.0"
SIRO_DIR="$HOME/.siro"
BIN_DIR="$SIRO_DIR/bin"
SIRO_PHAR="$SIRO_DIR/siro.phar"

echo "${CYAN}╔══════════════════════════════════════╗${NC}"
echo "${CYAN}║   ⚡ Siro Framework Installer       ║${NC}"
echo "${CYAN}║   v${VERSION}                          ║${NC}"
echo "${CYAN}║   1 command, 0 dependency            ║${NC}"
echo "${CYAN}╚══════════════════════════════════════╝${NC}"
echo ""

# ── Step 1: PHP ─────────────────────────────
PHP_BIN=""
if command -v php >/dev/null 2>&1; then
    PHP_VER=$(php -r "echo PHP_VERSION_ID;")
    if [ "$PHP_VER" -ge 80200 ]; then
        echo "${GREEN}✅ Step 1: PHP $(php -r 'echo PHP_VERSION;') found${NC}"
        PHP_BIN="php"
    else
        echo "${RED}PHP too old, need 8.2+${NC}"
    fi
fi

if [ -z "$PHP_BIN" ]; then
    echo "${CYAN}📥 Step 1: Installing PHP $PHP_VERSION...${NC}"
    OS="$(uname -s)"
    case "$OS" in
        Darwin)
            if command -v brew >/dev/null 2>&1; then
                echo "${GRAY}   Installing via Homebrew...${NC}"
                brew install php@"$PHP_VERSION" 2>/dev/null || brew upgrade php@"$PHP_VERSION" 2>/dev/null
                PHP_BIN="php"
            else
                echo "${RED}Install Homebrew first: https://brew.sh${NC}"
                exit 1
            fi
            ;;
        Linux)
            if command -v apt-get >/dev/null 2>&1; then
                echo "${GRAY}   Installing via apt...${NC}"
                sudo apt-get update -qq
                sudo apt-get install -y -qq php"$PHP_VERSION"-cli php"$PHP_VERSION"-pdo php"$PHP_VERSION"-mbstring 2>/dev/null || \
                sudo apt-get install -y -qq php-cli php-pdo php-mbstring
                PHP_BIN="php"
            elif command -v yum >/dev/null 2>&1; then
                echo "${GRAY}   Installing via yum...${NC}"
                sudo yum install -y php-cli php-pdo php-mbstring
                PHP_BIN="php"
            else
                echo "${RED}Please install PHP 8.2+ manually${NC}"
                exit 1
            fi
            ;;
    esac
    echo "${GREEN}   ✅ PHP $PHP_VERSION installed${NC}"
fi

# ── Step 2: Siro CLI ─────────────────────────
if [ ! -f "$SIRO_PHAR" ]; then
    echo "${CYAN}📥 Step 2: Installing Siro CLI...${NC}"
    mkdir -p "$SIRO_DIR" "$BIN_DIR"

    echo "${GRAY}   Downloading siro.phar...${NC}"
    PHAR_URL="https://sirophp.com/siro.phar"
    if command -v curl >/dev/null 2>&1; then
        curl -sSL --connect-timeout 15 --max-time 120 "$PHAR_URL" -o "$SIRO_PHAR" || cp "$(dirname "$0")/siro.phar" "$SIRO_PHAR" 2>/dev/null
    elif command -v wget >/dev/null 2>&1; then
        wget -q "$PHAR_URL" -O "$SIRO_PHAR" || cp "$(dirname "$0")/siro.phar" "$SIRO_PHAR" 2>/dev/null
    fi
    chmod +x "$SIRO_PHAR" 2>/dev/null || true
    echo "${GREEN}   ✅ Siro CLI installed${NC}"
fi

# Create wrapper
WRAPPER="$BIN_DIR/siro"
if [ ! -f "$WRAPPER" ]; then
    cat > "$WRAPPER" << 'EOF'
#!/bin/sh
SIRO_PHAR="$HOME/.siro/siro.phar"
exec php "$SIRO_PHAR" "$@"
EOF
    chmod +x "$WRAPPER"
fi

# Add to PATH
for RC in "$HOME/.zshrc" "$HOME/.bashrc"; do
    if [ -f "$RC" ] && ! grep -q "export PATH=\$PATH:$BIN_DIR" "$RC" 2>/dev/null; then
        echo "${GRAY}   Adding Siro to PATH in $RC...${NC}"
        echo "" >> "$RC"
        echo "# Siro" >> "$RC"
        echo "export PATH=\"\$PATH:$BIN_DIR\"" >> "$RC"
    fi
done
export PATH="$PATH:$BIN_DIR"
echo "${GREEN}✅ Step 2: Siro CLI installed${NC}"

# ── Step 3: Project (optional) ─────────────
if [ "$NO_PROJECT" = false ]; then
    echo "${CYAN}📦 Step 3: Creating project '$PROJECT_NAME'...${NC}"
    $PHP_BIN "$SIRO_PHAR" new "$PROJECT_NAME"

    if [ ! -f "$PROJECT_NAME/composer.json" ]; then
        echo "${RED}   ❌ Project creation failed${NC}"
        exit 1
    fi

    echo ""
    echo "${GREEN}╔══════════════════════════════════════╗${NC}"
    echo "${GREEN}║   🚀 Siro is ready!                  ║${NC}"
    echo "${GREEN}║                                      ║${NC}"
    echo "${GREEN}║   cd $PROJECT_NAME                   ║${NC}"
    echo "${GREEN}║   siro serve                         ║${NC}"
    echo "${GREEN}║   http://localhost:8080              ║${NC}"
    echo "${GREEN}╚══════════════════════════════════════╝${NC}"
    echo ""

    cd "$PROJECT_NAME"
    $PHP_BIN "$SIRO_PHAR" serve
else
    echo ""
    echo "${GREEN}✅ Siro CLI installed. Usage:${NC}"
    echo "  siro new my-api"
    echo "  siro runtime:install 8.3"
    echo ""
fi
