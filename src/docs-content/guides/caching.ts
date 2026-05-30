
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Caching Guide",
    description: "Cache settings in `.env`:",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "h2",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "p",
    "text": "Cache settings in .env:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "CACHE_DRIVER=file         # file or redis\r\nCACHE_TTL=60              # Default TTL in seconds\r\nCACHE_PREFIX=siro:        # Key prefix\r\n\r\n# Redis settings (when CACHE_DRIVER=redis)\r\nREDIS_HOST=127.0.0.1\r\nREDIS_PORT=6379\r\nREDIS_PASSWORD=\r\nREDIS_DB=0\r\nREDIS_TIMEOUT=0.2\r"
  },
  {
    "type": "p",
    "text": "Config file: config/cache.php."
  },
  {
    "type": "h2",
    "id": "cache-drivers",
    "text": "Cache Drivers"
  },
  {
    "type": "h3",
    "id": "file-driver-default",
    "text": "File Driver (default)"
  },
  {
    "type": "p",
    "text": "Stores cache as files in storage/cache/. No external service needed — ideal for development."
  },
  {
    "type": "h3",
    "id": "redis-driver",
    "text": "Redis Driver"
  },
  {
    "type": "p",
    "text": "For production, Redis provides in-memory performance and supports cache invalidation:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "CACHE_DRIVER=redis\r\nREDIS_HOST=127.0.0.1\r\nREDIS_PORT=6379\r"
  },
  {
    "type": "h2",
    "id": "basic-usage",
    "text": "Basic Usage"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Cache;\r\n\r\n// Set a value (TTL in seconds)\r\nCache::set('user:1:profile', $userData, 3600);\r\n\r\n// Get a value\r\n$profile = Cache::get('user:1:profile');\r\n// Returns null if key doesn't exist\r\n\r\n// Check if key exists\r\nif (Cache::has('user:1:profile')) {\r\n    // Key exists\r\n}\r\n\r\n// Remove a key\r\nCache::forget('user:1:profile');\r\n\r\n// Remove all cache\r\nCache::flush();\r"
  },
  {
    "type": "h2",
    "id": "cache-remember",
    "text": "Cache::remember()"
  },
  {
    "type": "p",
    "text": "The remember() method caches a value or computes and stores it if missing:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$users = Cache::remember('active_users', 300, function () {\r\n    return DB::table('users')->where('status', '=', 1)->get();\r\n});\r\n// Returns cached value if available, otherwise executes callback and caches result\r"
  },
  {
    "type": "p",
    "text": "This is the preferred pattern for read-heavy data."
  },
  {
    "type": "h2",
    "id": "query-caching",
    "text": "Query Caching"
  },
  {
    "type": "p",
    "text": "Cache expensive query results manually:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$products = Cache::remember('products:active', 600, function () {\r\n    return DB::table('products')\r\n        ->where('status', '=', 'active')\r\n        ->orderBy('created_at', 'DESC')\r\n        ->limit(50)\r\n        ->get();\r\n});\r"
  },
  {
    "type": "p",
    "text": "Invalidate on data changes:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// When a product is updated\r\nCache::forget('products:active');\r\n\r\n// Or flush selectively with key patterns\r"
  },
  {
    "type": "h2",
    "id": "config-cache",
    "text": "Config Cache"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Cache configuration files for faster boot\r\nphp siro config:cache\r\n\r\n# Cache routes for faster routing\r\nphp siro route:cache\r\n\r\n# Full optimization\r\nphp siro optimize\r"
  },
  {
    "type": "h2",
    "id": "cache-status",
    "text": "Cache Status"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Get cache request statistics\r\n$status = Cache::requestStatus();\r\n// Returns array with hits, misses, sets, etc.\r\n\r\n// Reset in-memory request state\r\nCache::resetRequestState();\r"
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "ul",
    "items": [
      "Use `Cache::remember()` as the primary caching pattern — it handles both get and set.",
      "Choose TTL based on data staleness tolerance: seconds for real-time, minutes for dashboards, hours for reference data.",
      "Use distinct, namespaced keys: `{context}:{id}:{purpose}` (e.g. `products:1:details`).",
      "Invalidate cache entries when underlying data changes, not on a timer.",
      "Use Redis in production for better performance and cross-process cache consistency.",
      "Never cache sensitive data (passwords, tokens, PII) without encryption.",
      "Monitor cache hit ratio to identify ineffective caching."
    ]
  }
],
}
