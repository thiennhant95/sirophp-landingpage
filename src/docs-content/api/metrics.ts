
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Metrics API Reference",
    description: "Built-in Prometheus metrics for request count, duration histograms, and memory usage. Exposed at `/metrics` endpoint.",
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
    "text": "Built-in Prometheus metrics for request count, duration histograms, and memory usage. Exposed at /metrics endpoint."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Metrics;\r"
  },
  {
    "type": "h2",
    "id": "setup",
    "text": "Setup"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In routes/api.php (auto-enabled)\r\nMetrics::init('siro', true);\r\nMetrics::registerRoute($app->router);\r\n\r\n// Now GET /metrics returns Prometheus-formatted data\r"
  },
  {
    "type": "h2",
    "id": "metrics-collected",
    "text": "Metrics Collected"
  },
  {
    "type": "table",
    "headers": [
      "Metric",
      "Type",
      "Labels",
      "Description"
    ],
    "rows": [
      [
        "`http_requests_total`",
        "Counter",
        "`method`, `path`, `status`",
        "Total request count"
      ],
      [
        "`http_request_duration_ms`",
        "Histogram",
        "`method`, `path`",
        "Request duration buckets"
      ],
      [
        "`http_request_memory_mb`",
        "Histogram",
        "`method`",
        "Memory usage per request"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "custom-metrics",
    "text": "Custom Metrics"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Counter\r\nMetrics::counter(\r\n    name: 'orders_created_total',\r\n    value: 1,\r\n    labels: ['status' => 'pending'],\r\n    help: 'Total orders created',\r\n);\r\n\r\n// Histogram\r\nMetrics::histogram(\r\n    name: 'payment_processing_ms',\r\n    value: 153.2,\r\n    labels: ['gateway' => 'stripe'],\r\n    help: 'Payment processing time',\r\n    buckets: [50, 100, 200, 500, 1000],\r\n);\r\n\r\n// Gauge (current value, not cumulative)\r\nMetrics::gauge(\r\n    name: 'active_users',\r\n    value: 42,\r\n    labels: ['plan' => 'premium'],\r\n    help: 'Currently active users',\r\n);\r"
  },
  {
    "type": "h2",
    "id": "export-format-openmetrics",
    "text": "Export Format (OpenMetrics)"
  },
  {
    "type": "code",
    "code": "# HELP http_requests_total Total request count\r\n# TYPE http_requests_total counter\r\nhttp_requests_total{method=\"GET\",path=\"/api/products\",status=\"200\"} 1542 1712345678\r\n\r\n# HELP http_request_duration_ms Request duration in milliseconds\r\n# TYPE http_request_duration_ms histogram\r\nhttp_request_duration_ms_bucket{method=\"GET\",path=\"/api/products\",le=\"10\"} 890\r\nhttp_request_duration_ms_bucket{method=\"GET\",path=\"/api/products\",le=\"50\"} 1420\r\nhttp_request_duration_ms_bucket{method=\"GET\",path=\"/api/products\",le=\"+Inf\"} 1542\r\nhttp_request_duration_ms_sum{method=\"GET\",path=\"/api/products\"} 28450.5\r\nhttp_request_duration_ms_count{method=\"GET\",path=\"/api/products\"} 1542\r"
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
        "`init(string $namespace, bool $persist)`",
        "Initialize metrics system"
      ],
      [
        "`counter(string $name, int $value, array $labels, string $help)`",
        "Increment counter"
      ],
      [
        "`histogram(string $name, float $value, array $labels, string $help, array $buckets)`",
        "Record observation"
      ],
      [
        "`export()`",
        "Get OpenMetrics text"
      ],
      [
        "`registerRoute(Router $router, string $path)`",
        "Auto-register `/metrics` endpoint"
      ],
      [
        "`persistNow()`",
        "Flush to cache immediately"
      ]
    ]
  }
],
}
