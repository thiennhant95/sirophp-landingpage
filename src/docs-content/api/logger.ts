
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Logger API Reference",
    description: "Siro provides structured logging with multiple channels, log level filtering, automatic sanitization, and file rotation.",
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
    "text": "Siro provides structured logging with multiple channels, log level filtering, automatic sanitization, and file rotation."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Logger;\r"
  },
  {
    "type": "h2",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "LOG_LEVEL=debug              # debug, info, notice, warning, error, critical, alert, emergency\r\nLOG_RETENTION_DAYS=30       # Auto-clean logs older than N days\r\nLOG_MAX_SIZE_MB=1024        # Max total log storage\r"
  },
  {
    "type": "h2",
    "id": "log-levels",
    "text": "Log Levels"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Logger::debug('Query executed', ['sql' => $sql, 'time' => '2.3ms']);\r\nLogger::info('User registered', ['user_id' => 42]);\r\nLogger::notice('Rate limit approaching', ['remaining' => 5]);\r\nLogger::warning('Slow query detected', ['sql' => $sql, 'duration' => 500]);\r\nLogger::error('Payment failed', ['order_id' => 100, 'reason' => 'insufficient_funds']);\r\nLogger::critical('Database connection lost');\r\nLogger::alert('Disk space critical');\r\nLogger::emergency('System is down');\r"
  },
  {
    "type": "h2",
    "id": "log-channels",
    "text": "Log Channels"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Default channel\r\nLogger::info('Request completed');\r\n\r\n// Request log\r\nLogger::channel('request')->info('GET /api/products — 200');\r\n\r\n// Slow query log\r\nLogger::channel('slow')->warning('Query took 450ms', ['sql' => $sql]);\r\n\r\n// Security log (SIEM-ready)\r\nLogger::channel('security')->warning('Failed login attempt', [\r\n    'ip' => $ip,\r\n    'email' => $email,\r\n    'attempts' => 3,\r\n]);\r\n\r\n// Error log\r\nLogger::channel('error')->error('Unhandled exception', [\r\n    'exception' => get_class($e),\r\n    'message' => $e->getMessage(),\r\n]);\r\n\r\n// Debug log\r\nLogger::channel('debug')->debug('Variable dump', $data);\r\n\r\n// Trace log (per-request)\r\nLogger::channel('trace')->info('Trace captured', ['trace_id' => $traceId]);\r"
  },
  {
    "type": "h2",
    "id": "log-sanitization",
    "text": "Log Sanitization"
  },
  {
    "type": "p",
    "text": "Sensitive data is automatically redacted from logs:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// These values are REDACTED in log output\r\nLogger::info('Login', [\r\n    'password' => 'secret123',           // → [REDACTED]\r\n    'token' => 'eyJ...',                 // → [REDACTED]  \r\n    'authorization' => 'Bearer eyJ...',  // → [REDACTED]\r\n    'credit_card' => '4111-1111-1111',   // → [REDACTED]\r\n    'x-api-key' => 'abc123',            // → [REDACTED]\r\n    'cookie' => 'session=abc',          // → [REDACTED]\r\n]);\r"
  },
  {
    "type": "p",
    "text": "Sanitized fields: authorization, cookie, x-api-key, password, passwd, token, secret, credit_card, cc_number, jwt, bearer, refresh_token, api_key, private_key."
  },
  {
    "type": "h2",
    "id": "context-logging",
    "text": "Context Logging"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Global context (included in every log entry)\r\nLogger::setContext([\r\n    'trace_id' => $traceId,\r\n    'user_id' => $userId,\r\n    'ip' => $request->ip(),\r\n]);\r\n\r\n// Log entries automatically include context\r\nLogger::info('Order created', ['order_id' => 100]);\r\n// Output: { \"message\": \"Order created\", \"context\": { \"order_id\": 100 }, \"global\": { \"trace_id\": \"...\", \"user_id\": 42 } }\r"
  },
  {
    "type": "h2",
    "id": "log-storage",
    "text": "Log Storage"
  },
  {
    "type": "code",
    "code": "storage/logs/\r\n├── daily/          # Rotated daily (archive)\r\n│   ├── 2026-05-19.log\r\n│   └── 2026-05-20.log\r\n├── main/           # Current logs\r\n│   ├── request.log\r\n│   ├── slow.log\r\n│   └── error.log\r\n└── traces/         # Request traces\r\n    └── siro_a1b2c3d4.json\r"
  },
  {
    "type": "h3",
    "id": "auto-cleanup",
    "text": "Auto-Cleanup"
  },
  {
    "type": "p",
    "text": "Logs older than LOG_RETENTION_DAYS are automatically deleted. Max total size is limited by LOG_MAX_SIZE_MB."
  },
  {
    "type": "h2",
    "id": "log-format",
    "text": "Log Format"
  },
  {
    "type": "code",
    "code": "[2026-05-20 10:30:00] {channel}.{level}: {message} {context_json}\r"
  },
  {
    "type": "p",
    "text": "Example:"
  },
  {
    "type": "code",
    "code": "[2026-05-20 10:30:00] request.info: GET /api/products — 200 {\"duration_ms\":12.3,\"trace_id\":\"siro_a1b2c3\"}\r\n[2026-05-20 10:30:01] slow.warning: Query took 450ms {\"sql\":\"SELECT * FROM orders WHERE...\",\"trace_id\":\"siro_a1b2c3\"}\r"
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
        "`debug(string $message, array $context)`",
        "Debug level"
      ],
      [
        "`info(string $message, array $context)`",
        "Info level"
      ],
      [
        "`notice(string $message, array $context)`",
        "Notice level"
      ],
      [
        "`warning(string $message, array $context)`",
        "Warning level"
      ],
      [
        "`error(string $message, array $context)`",
        "Error level"
      ],
      [
        "`critical(string $message, array $context)`",
        "Critical level"
      ],
      [
        "`alert(string $message, array $context)`",
        "Alert level"
      ],
      [
        "`emergency(string $message, array $context)`",
        "Emergency level"
      ],
      [
        "`channel(string $name)`",
        "Get/create log channel"
      ],
      [
        "`setContext(array $context)`",
        "Set global context"
      ],
      [
        "`sanitize(array $data)`",
        "Sanitize sensitive data"
      ],
      [
        "`log(string $level, string $message, array $context)`",
        "Log at arbitrary level"
      ]
    ]
  }
],
}
