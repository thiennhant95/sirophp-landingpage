
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Internationalization Guide",
    description: "The `Lang` class provides translation support for multiple locales.",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "h2",
    "id": "lang-class",
    "text": "Lang Class"
  },
  {
    "type": "p",
    "text": "The Lang class provides translation support for multiple locales."
  },
  {
    "type": "h3",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "APP_LOCALE=en            # Default locale\r\nAPP_FALLBACK_LOCALE=en   # Fallback when translation is missing\r"
  },
  {
    "type": "h3",
    "id": "translation-files",
    "text": "Translation Files"
  },
  {
    "type": "p",
    "text": "Translations are stored in language files under the project's language directory:"
  },
  {
    "type": "code",
    "code": "lang/\r\n  en/\r\n    messages.php\r\n    validation.php\r\n  vi/\r\n    messages.php\r\n    validation.php\r"
  },
  {
    "type": "p",
    "text": "Example lang/en/messages.php:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "return [\r\n    'welcome' => 'Welcome',\r\n    'greeting' => 'Hello, :name!',\r\n    'apples' => '{0} No apples|[1,9] :count apples|[10,*] Many apples',\r\n];\r"
  },
  {
    "type": "p",
    "text": "Example lang/vi/messages.php:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "return [\r\n    'welcome' => 'Chào mừng',\r\n    'greeting' => 'Xin chào, :name!',\r\n];\r"
  },
  {
    "type": "h3",
    "id": "basic-usage",
    "text": "Basic Usage"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Lang;\r\n\r\n// Get a translation\r\necho Lang::get('messages.welcome');        // \"Welcome\" (en) / \"Chào mừng\" (vi)\r\n\r\n// With parameter replacement\r\necho Lang::get('messages.greeting', ['name' => 'John']);  // \"Hello, John!\"\r\n\r\n// Check key existence\r\nif (Lang::has('messages.welcome')) {\r\n    // Key exists\r\n}\r\n\r\n// Returns the key itself when translation is not found\r\necho Lang::get('nonexistent.key');         // \"nonexistent.key\"\r"
  },
  {
    "type": "h3",
    "id": "pluralization",
    "text": "Pluralization"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "echo Lang::plural('messages.apples', 0);   // \"No apples\"\r\necho Lang::plural('messages.apples', 1);   // \"1 apple\"\r\necho Lang::plural('messages.apples', 5);   // \"5 apples\"\r\necho Lang::plural('messages.apples', 100); // \"Many apples\"\r"
  },
  {
    "type": "p",
    "text": "Plural forms follow CLDR rules with pipe-separated conditions:"
  },
  {
    "type": "code",
    "code": "{0} Zero items|[1,9] Some items|[10,*] Many items\r"
  },
  {
    "type": "h3",
    "id": "counting-translations",
    "text": "Counting Translations"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$count = Lang::count('validation');  // Number of keys in validation file\r"
  },
  {
    "type": "h2",
    "id": "locale-detection",
    "text": "Locale Detection"
  },
  {
    "type": "p",
    "text": "Set locale manually:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Lang::setLocale('vi');\r\necho Lang::locale();  // \"vi\"\r"
  },
  {
    "type": "p",
    "text": "Detect from request (typical in a route):"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$router->get('/profile', function (Request $req): array {\r\n    $locale = $req->queryString('locale', 'en');\r\n    Lang::setLocale($locale);\r\n\r\n    return [\r\n        'success' => true,\r\n        'message' => Lang::get('messages.greeting', ['name' => $req->query('name', 'Guest')]),\r\n        'data' => [\r\n            'locale' => $locale,\r\n            'available_locales' => ['en', 'vi'],\r\n        ],\r\n    ];\r\n});\r"
  },
  {
    "type": "h2",
    "id": "validation-messages",
    "text": "Validation Messages"
  },
  {
    "type": "p",
    "text": "Validation automatically uses localized messages:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Validator;\r\n\r\nLang::setLocale('vi');\r\n$errors = Validator::make(['email' => ''], ['email' => 'required']);\r\n// Returns: ['email' => ['Email không được để trống']]\r\n\r\nLang::setLocale('en');\r\n$errors = Validator::make(['email' => ''], ['email' => 'required']);\r\n// Returns: ['email' => ['Email is required']]\r"
  },
  {
    "type": "p",
    "text": "Built-in validation messages supported: required, email, min, max, integer, numeric, in, date, url."
  },
  {
    "type": "h2",
    "id": "creating-language-packs",
    "text": "Creating Language Packs"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:lang fr     # Create French language pack\r\nphp siro make:lang ja     # Create Japanese language pack\r"
  },
  {
    "type": "p",
    "text": "This generates translation stub files under lang/{locale}/."
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "ul",
    "items": [
      "Always use `:param` placeholders in translation strings for dynamic values.",
      "Set `APP_FALLBACK_LOCALE` so your app degrades gracefully when translations are missing.",
      "Store locale preference per-user in the database and apply via middleware.",
      "Use `Lang::has()` to check for key existence before accessing.",
      "Group translations by feature/domain (e.g. `messages`, `validation`, `emails`).",
      "Keep translation files focused — one file per domain of content."
    ]
  }
],
}
