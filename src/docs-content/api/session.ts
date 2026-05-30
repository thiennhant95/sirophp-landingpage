
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Session API Reference",
    description: "Siro provides file and Redis-based session management with automatic cleanup and CSRF protection integration.",
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
    "text": "Siro provides file and Redis-based session management with automatic cleanup and CSRF protection integration."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Session;\r"
  },
  {
    "type": "h2",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "SESSION_DRIVER=file           # file, redis\r\nSESSION_LIFETIME=120          # minutes\r\nSESSION_FILES=storage/sessions\r"
  },
  {
    "type": "h2",
    "id": "basic-usage",
    "text": "Basic Usage"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Start session\r\n$session = Session::instance();\r\n\r\n// Set value\r\n$session->set('user_id', 42);\r\n$session->set('cart', ['product_id' => 1, 'quantity' => 2]);\r\n\r\n// Get value\r\n$userId = $session->get('user_id', 0);\r\n$cart = $session->get('cart', []);\r\n\r\n// Check if key exists\r\nif ($session->has('user_id')) { ... }\r\n\r\n// Remove value\r\n$session->remove('user_id');\r\n\r\n// Clear all\r\n$session->clear();\r"
  },
  {
    "type": "h2",
    "id": "flash-data",
    "text": "Flash Data"
  },
  {
    "type": "p",
    "text": "Data that persists only for the next request:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Set flash\r\n$session->flash('status', 'Profile updated');\r\n\r\n// Get flash (auto-deleted after retrieval)\r\n$status = $session->get('status');\r\n\r\n// Keep flash for another request\r\n$session->reflash();\r\n\r\n// Keep specific flash values\r\n$session->keep(['status', 'message']);\r"
  },
  {
    "type": "h2",
    "id": "session-regeneration",
    "text": "Session Regeneration"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Regenerate session ID (call after login to prevent fixation)\r\n$session->regenerate();\r\n\r\n// Regenerate and delete old session\r\n$session->regenerate(true);\r"
  },
  {
    "type": "h2",
    "id": "csrf-token",
    "text": "CSRF Token"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Generate CSRF token\r\n$token = $session->token();\r\n\r\n// Verify CSRF token\r\n$isValid = $session->validateCsrf($token);\r\n\r\n// Regenerate CSRF token\r\n$session->regenerateToken();\r"
  },
  {
    "type": "h2",
    "id": "session-id",
    "text": "Session ID"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Get current session ID\r\n$id = $session->getId();\r\n\r\n// Set custom session ID\r\n$session->setId('custom-session-id');\r\n\r\n// Invalidate session\r\n$session->invalidate();\r"
  },
  {
    "type": "h2",
    "id": "security",
    "text": "Security"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// After successful login — ALWAYS regenerate\r\nSession::instance()->regenerate();\r\n\r\n// On logout — invalidate completely\r\nSession::instance()->invalidate();\r"
  },
  {
    "type": "p",
    "text": "Session files are stored with restrictive permissions. Redis sessions auto-expire via TTL."
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
        "`instance()`",
        "Get singleton session instance"
      ],
      [
        "`start()`",
        "Start session"
      ],
      [
        "`getId()`",
        "Get session ID"
      ],
      [
        "`setId(string $id)`",
        "Set session ID"
      ],
      [
        "`get(string $key, mixed $default)`",
        "Get session value"
      ],
      [
        "`set(string $key, mixed $value)`",
        "Set session value"
      ],
      [
        "`has(string $key)`",
        "Check if key exists"
      ],
      [
        "`remove(string $key)`",
        "Remove session value"
      ],
      [
        "`clear()`",
        "Clear all session data"
      ],
      [
        "`regenerate(bool $deleteOld)`",
        "Regenerate session ID"
      ],
      [
        "`invalidate()`",
        "Clear all data and regenerate"
      ],
      [
        "`flash(string $key, mixed $value)`",
        "Set flash data"
      ],
      [
        "`reflash()`",
        "Keep all flash data"
      ],
      [
        "`keep(array $keys)`",
        "Keep specific flash keys"
      ],
      [
        "`token()`",
        "Get CSRF token"
      ],
      [
        "`regenerateToken()`",
        "Regenerate CSRF token"
      ],
      [
        "`validateCsrf(string $token)`",
        "Validate CSRF token"
      ]
    ]
  }
],
}
