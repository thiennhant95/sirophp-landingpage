
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Debug API Reference",
    description: "Siro's debug system provides request tracing, replay, and production debugging tools — no third-party services required.",
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
    "text": "Siro's debug system provides request tracing, replay, and production debugging tools — no third-party services required."
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro why                     # Last request analysis\r\nphp siro api:why POST /orders    # Trace specific request by method+path\r\nphp siro log:trace <id>          # View full trace\r\nphp siro log:replay <id>         # Replay request (risk-aware)\r\nphp siro log:replay <id> --force # Replay risky trace (DB writes, HTTP)\r\nphp siro log:replay <id> --dry-run  # Preview without executing\r\nphp siro fix <id>                # Replay + verify fix\r\nphp siro log:replay <id> --test  # Generate regression test from trace\r"
  },
  {
    "type": "h2",
    "id": "trace-system",
    "text": "Trace System"
  },
  {
    "type": "p",
    "text": "Every request gets a unique trace ID returned in the response header:"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "X-Siro-Trace-Id: siro_a1b2c3d4e5f6\r"
  },
  {
    "type": "h3",
    "id": "search-traces",
    "text": "Search Traces"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# By endpoint\r\nphp siro log:trace --path=/api/orders\r\n\r\n# By HTTP status\r\nphp siro log:trace --status=500\r\n\r\n# By IP address (customer says \"my IP is...\")\r\nphp siro log:trace --ip=203.0.113.42\r\n\r\n# By error message\r\nphp siro log:trace --error=\"Division by zero\"\r\n\r\n# By time\r\nphp siro log:trace --since=30m\r\nphp siro log:trace --since=1h\r\nphp siro log:trace --days=7\r\n\r\n# By HTTP method\r\nphp siro log:trace --method=POST\r\n\r\n# Slow requests only\r\nphp siro log:trace --slow\r\n\r\n# Limit results\r\nphp siro log:trace --limit=20\r"
  },
  {
    "type": "h3",
    "id": "view-trace-details",
    "text": "View Trace Details"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro log:trace siro_a1b2c3d4\r"
  },
  {
    "type": "p",
    "text": "Output includes:"
  },
  {
    "type": "ul",
    "items": [
      "Method, path, status code",
      "Request headers and body",
      "SQL queries with timing and row counts",
      "Outbound HTTP calls via Siro\\Http (method, URL, status, duration)",
      "Queued jobs dispatched during request",
      "Middleware execution timeline",
      "Exception message and stack trace",
      "Total execution time"
    ]
  },
  {
    "type": "h2",
    "id": "request-replay",
    "text": "Request Replay"
  },
  {
    "type": "p",
    "text": "The signature Siro feature — replay any captured request with risk-aware safety. Before replaying, Siro analyzes the trace for potential side effects (DB writes, outbound HTTP, queued jobs). Risky traces require --force to execute."
  },
  {
    "type": "h3",
    "id": "safe-replay",
    "text": "Safe Replay"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Auto-executes if no risks detected\r\nphp siro log:replay siro_a1b2c3d4\r\n\r\n# Preview without executing (always safe)\r\nphp siro log:replay siro_a1b2c3d4 --dry-run\r\n\r\n# With diff (compare before/after fix)\r\nphp siro log:replay siro_a1b2c3d4 --diff\r"
  },
  {
    "type": "h3",
    "id": "interactive-replay",
    "text": "Interactive Replay"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Edit request body before replay\r\nphp siro log:replay siro_a1b2c3d4 --edit\r\n\r\n# Override specific fields\r\nphp siro log:replay siro_a1b2c3d4 --set user_id=42\r\n\r\n# Output as curl command\r\nphp siro log:replay siro_a1b2c3d4 --format=curl\r\n\r\n# Output as httpie command\r\nphp siro log:replay siro_a1b2c3d4 --format=httpie\r"
  },
  {
    "type": "h3",
    "id": "force-execution",
    "text": "Force Execution (risky traces)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Execute replay (required for risky traces or write methods)\r\nphp siro log:replay siro_a1b2c3d4 --force\r\n\r\n# With HTTPS\r\nphp siro log:replay siro_a1b2c3d4 --force --https\r\n\r\n# Skip SSL verification\r\nphp siro log:replay siro_a1b2c3d4 --force --insecure\r"
  },
  {
    "type": "h3",
    "id": "export",
    "text": "Export"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Export trace to JSON\r\nphp siro log:export siro_a1b2c3d4\r\n\r\n# Export failed requests as JSON\r\nphp siro log:export --status=500 --format=json\r"
  },
  {
    "type": "h3",
    "id": "complete-debug-flow",
    "text": "Complete Debug Flow"
  },
  {
    "type": "code",
    "code": "INCIDENT → SEARCH → INSPECT → REPLAY → DIFF → VERIFY\r\n\r\n1. Customer reports error, no trace ID\r\n2. php siro log:trace --path=/api/orders --status=500 --since=1h\r\n3. php siro log:trace siro_a1b2c3d4        # See full context\r\n4. php siro log:replay siro_a1b2c3d4 --edit # Test fix\r\n5. php siro log:replay siro_a1b2c3d4 --diff # Before vs after\r\n6. php siro log:replay siro_a1b2c3d4 --force # Verify fix\r"
  },
  {
    "type": "p",
    "text": "No other framework — PHP, Node, Go, Rust, Python, Ruby — has this complete flow."
  },
  {
    "type": "h2",
    "id": "log-management",
    "text": "Log Management"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Tail logs in real-time\r\nphp siro log:tail\r\nphp siro log:tail --type=error\r\nphp siro log:tail --lines=50\r\n\r\n# Slow request report\r\nphp siro log:slow\r\nphp siro log:slow --limit=10\r\nphp siro log:slow --min=500   # requests over 500ms\r\n\r\n# Log statistics\r\nphp siro log:stats\r\nphp siro log:stats --days=7\r\n\r\n# Top slowest endpoints\r\nphp siro log:top\r\n\r\n# Clean old logs\r\nphp siro log:cleanup\r\nphp siro log:cleanup --days=14   # custom retention\r"
  },
  {
    "type": "h2",
    "id": "health-checks",
    "text": "Health Checks"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# System health\r\nphp siro doctor\r\n\r\n# Production health check\r\nphp siro doctor --prod\r\n\r\n# HTTP health endpoints\r\nGET /health/live    # Liveness probe\r\nGET /health/ready   # Readiness probe (includes DB check)\r"
  },
  {
    "type": "h2",
    "id": "debug-cli",
    "text": "Debug CLI"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Why did the last request fail?\r\nphp siro why\r\n# 5 seconds later: route, SQL, middleware, exception, N+1, suggested fix\r\n\r\n# Interactive PHP REPL (like Laravel tinker)\r\nphp siro tinker\r\n\r\n# Environment validation\r\nphp siro env:check\r\n\r\n# Benchmark\r\nphp siro benchmark\r"
  },
  {
    "type": "h2",
    "id": "trace-data-contents",
    "text": "Trace Data Contents"
  },
  {
    "type": "p",
    "text": "When a trace is captured, it includes:"
  },
  {
    "type": "table",
    "headers": [
      "Field",
      "Description"
    ],
    "rows": [
      [
        "`trace_id`",
        "Unique identifier"
      ],
      [
        "`method`",
        "HTTP method"
      ],
      [
        "`path`",
        "Request path"
      ],
      [
        "`status_code`",
        "Response status"
      ],
      [
        "`request_headers`",
        "Request headers (sensitive values redacted)"
      ],
      [
        "`request_body`",
        "Request body"
      ],
      [
        "`response_body`",
        "Response body"
      ],
      [
        "`queries`",
        "SQL queries with timing and row counts"
      ],
      [
        "`outbound_http`",
        "External HTTP calls via Siro\\Http"
      ],
      [
        "`queue_jobs`",
        "Jobs dispatched during request"
      ],
      [
        "`middleware`",
        "Middleware execution timeline"
      ],
      [
        "`exception`",
        "Exception class and message"
      ],
      [
        "`duration_ms`",
        "Total request duration"
      ],
      [
        "`ip`",
        "Client IP"
      ],
      [
        "`timestamp`",
        "Request timestamp"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "available-commands",
    "text": "Available Commands"
  },
  {
    "type": "table",
    "headers": [
      "Command",
      "Description"
    ],
    "rows": [
      [
        "`why`",
        "Last request analysis with N+1 detection"
      ],
      [
        "`log:trace <id>`",
        "View trace details"
      ],
      [
        "`log:replay <id>`",
        "Replay request (risk-aware: --force for risky traces, --dry-run to preview)"
      ],
      [
        "`log:tail`",
        "Tail log files"
      ],
      [
        "`log:slow`",
        "Show slow requests"
      ],
      [
        "`log:stats`",
        "Log statistics"
      ],
      [
        "`log:top`",
        "Top slowest endpoints"
      ],
      [
        "`log:export <id>`",
        "Export trace to JSON"
      ],
      [
        "`log:cleanup`",
        "Clean old logs"
      ],
      [
        "`tinker`",
        "Interactive PHP REPL"
      ],
      [
        "`doctor`",
        "System health check"
      ],
      [
        "`env:check`",
        "Environment validation"
      ],
      [
        "`benchmark`",
        "Performance benchmarks"
      ]
    ]
  }
],
}
