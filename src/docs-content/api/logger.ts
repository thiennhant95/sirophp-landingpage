
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
    "code": "Logger::debug('Query executed', ['sql' => $sql, 'time' => '2.3ms']);\r\nLogger::request('GET /api/products — 200', ['duration_ms' => 12.3]);\r\nLogger::slowRequest('Query took 450ms', ['sql' => $sql, 'duration' => 450]);\r\nLogger::warning('Slow query detected', ['sql' => $sql, 'duration' => 500]);\r\nLogger::error('Payment failed', ['order_id' => 100, 'reason' => 'insufficient_funds']);\r\nLogger::security('Failed login attempt', ['ip' => $ip, 'email' => $email]);\r\nLogger::trace('Trace captured', ['trace_id' => $traceId]);\r"
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
    "text": "Sanitized fields: authorization, cookie, x-api-key, x-csrf-token, session-id, password, token, otp, secret, credit_card, credit-card, card_number, cvv, pin, ssn, passport."
  },
  {
    "type": "h2",
    "id": "context-logging",
    "text": "Context Logging"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Log entries with context\r\nLogger::debug('Order created', ['order_id' => 100, 'user_id' => 42]);\r\n// Output: { \"message\": \"Order created\", \"context\": { \"order_id\": 100, \"user_id\": 42 } }\r"
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
        "`request(string $message, array $context)`",
        "Request logging"
      ],
      [
        "`slowRequest(string $message, array $context)`",
        "Slow request logging"
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
        "`security(string $message, array $context)`",
        "Security events (SIEM-ready)"
      ],
      [
        "`trace(string $message, array $context)`",
        "Request trace capture"
      ]
    ]
  }
],
}
