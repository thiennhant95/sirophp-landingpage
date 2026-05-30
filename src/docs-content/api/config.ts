
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Config API Reference",
    description: "Siro's configuration system loads PHP files from `config/` directory and supports HMAC-signed caching for production.",
    category: "api",
    order: 0,
    icon: "⚙️",
  },
  content: [
  {
    "type": "h2",
    "id": "overview",
    "text": "Overview"
  },
  {
    "type": "p",
    "text": "Siro's configuration system loads PHP files from config/ directory and supports HMAC-signed caching for production."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Config;\r"
  },
  {
    "type": "h2",
    "id": "configuration-files",
    "text": "Configuration Files"
  },
  {
    "type": "code",
    "code": "config/\r\n├── app.php           # Application settings\r\n├── database.php      # Database connections\r\n├── jwt.php           # JWT configuration\r\n├── cache.php         # Cache settings\r\n├── cors.php          # CORS configuration\r\n├── mail.php          # Mail driver settings\r\n└── logging.php       # Logging configuration\r"
  },
  {
    "type": "p",
    "text": "Each file returns an array:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// config/app.php\r\nreturn [\r\n    'name' => env('APP_NAME', 'Siro API'),\r\n    'env' => env('APP_ENV', 'production'),\r\n    'debug' => (bool) env('APP_DEBUG', false),\r\n    'url' => env('APP_URL', 'http://localhost'),\r\n];\r"
  },
  {
    "type": "h2",
    "id": "accessing-config",
    "text": "Accessing Config"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Dot notation\r\n$name = Config::get('app.name');           // 'Siro API'\r\n$debug = Config::get('app.debug', false);  // with default\r\n$db = Config::get('database.connections.sqlite.database');\r\n\r\n// Check if exists\r\nif (Config::has('jwt.ttl')) { ... }\r\n\r\n// Get all\r\n$all = Config::all();\r\n\r\n// Set at runtime\r\nConfig::set('app.debug', true);\r"
  },
  {
    "type": "h2",
    "id": "config-caching-production",
    "text": "Config Caching (Production)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro config:cache\r\n# → Config cached to storage/framework/config.php (HMAC-signed)\r\n\r\nphp siro config:clear\r\n# → Clears cached config\r"
  },
  {
    "type": "p",
    "text": "In production, cached config is loaded in ~0.01ms instead of scanning the directory."
  },
  {
    "type": "h2",
    "id": "available-methods",
    "text": "Available Methods"
  },
  {
    "type": "table",
    "headers": [
      "Method",
      "Description"
    ],
    "rows": [
      [
        "`load(string $configPath)`",
        "Load config files from directory"
      ],
      [
        "`get(string $key, mixed $default)`",
        "Get config value (dot notation)"
      ],
      [
        "`set(string $key, mixed $value)`",
        "Set config value at runtime"
      ],
      [
        "`has(string $key)`",
        "Check if config key exists"
      ],
      [
        "`all()`",
        "Get all config values"
      ],
      [
        "`cache()`",
        "Cache config to file (HMAC-signed)"
      ],
      [
        "`clearCache()`",
        "Delete cached config"
      ],
      [
        "`reset()`",
        "Reset all loaded config"
      ],
      [
        "`isLoaded()`",
        "Check if config is loaded"
      ]
    ]
  }
],
}
