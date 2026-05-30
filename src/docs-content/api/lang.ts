
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Lang API Reference",
    description: "Internationalization (i18n) system supporting multiple locales with fallback.",
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
    "text": "Internationalization (i18n) system supporting multiple locales with fallback."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Lang;\r"
  },
  {
    "type": "h2",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "APP_LOCALE=en\r\nAPP_FALLBACK_LOCALE=en\r"
  },
  {
    "type": "h2",
    "id": "language-files",
    "text": "Language Files"
  },
  {
    "type": "code",
    "code": "resources/lang/\r\n├── en/\r\n│   ├── messages.php\r\n│   └── validation.php\r\n└── vi/\r\n    ├── messages.php\r\n    └── validation.php\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// resources/lang/en/messages.php\r\nreturn [\r\n    'welcome' => 'Welcome to Siro',\r\n    'greeting' => 'Hello, :name!',\r\n    'order.created' => 'Order #:id created successfully',\r\n];\r"
  },
  {
    "type": "h2",
    "id": "usage",
    "text": "Usage"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Simple string\r\necho Lang::get('messages.welcome');\r\n// \"Welcome to Siro\"\r\n\r\n// With parameters\r\necho Lang::get('messages.greeting', ['name' => 'John']);\r\n// \"Hello, John!\"\r\n\r\n// Nested keys\r\necho Lang::get('messages.order.created', ['id' => 42]);\r\n// \"Order #42 created successfully\"\r"
  },
  {
    "type": "h2",
    "id": "locale",
    "text": "Locale"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Get current locale\r\n$locale = Lang::locale();         // 'en'\r\n\r\n// Set locale (per-request)\r\nLang::setLocale('vi');\r\n\r\n// Fallback\r\nLang::setFallbackLocale('en');    // Default\r\n\r\n// Check if key exists\r\nif (Lang::has('messages.welcome')) { ... }\r\n\r\n// Count available messages\r\n$count = Lang::count();           // number of loaded strings\r"
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
        "`boot(string $basePath)`",
        "Load language files"
      ],
      [
        "`basePath(string $path)`",
        "Set base path for lang files"
      ],
      [
        "`locale()`",
        "Get current locale"
      ],
      [
        "`setLocale(string $locale)`",
        "Set locale"
      ],
      [
        "`setFallbackLocale(string $locale)`",
        "Set fallback locale"
      ],
      [
        "`get(string $key, array $replace)`",
        "Get translated string"
      ],
      [
        "`has(string $key)`",
        "Check if key exists"
      ],
      [
        "`count()`",
        "Count loaded strings"
      ],
      [
        "`plural(string $key, int $count)`",
        "Get plural form"
      ]
    ]
  }
],
}
