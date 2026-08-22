
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Performance Optimization Guide",
    description: "SiroPHP is engineered for maximum performance. This guide covers benchmarking, optimization techniques, and best practices to achieve sub-millisecond response t",
    category: "root",
    order: 0,
    icon: "📄",
  },
  content: [
  {
    "type": "h2",
    "id": "overview",
    "text": "Overview"
  },
  {
    "type": "p",
    "text": "SiroPHP is engineered for maximum performance. This guide covers benchmarking, optimization techniques, and best practices to achieve sub-millisecond response times."
  },
  {
    "type": "h2",
    "id": "benchmark-results",
    "text": "📊 Benchmark Results"
  },
  {
    "type": "h3",
    "id": "cold-boot-performance",
    "text": "Cold Boot Performance"
  },
  {
    "type": "p",
    "text": "Benchmarked on Linux 6.8, PHP 8.2, OPcache enabled:"
  },
  {
    "type": "code",
    "code": "App boot + dispatch:    0.87ms  (Linux, OPcache warm)\r\nApp boot + dispatch:    1.10ms  (Linux, cold)\r\nApp boot + dispatch:    7.85ms  (Windows, no OPcache)\r\nMemory overhead:        +16KB  (all platforms)\r"
  },
  {
    "type": "note",
    "variant": "info",
    "text": "Windows cold boot is slower due to filesystem I/O (directory creation, config file scanning). Production should always use Linux + OPcache for optimal performance."
  },
  {
    "type": "h3",
    "id": "warm-request-throughput",
    "text": "Warm Request Throughput"
  },
  {
    "type": "code",
    "code": "GET / (root):           522,459 ops/s\r\nGET /nonexistent:       831,214 ops/s\r\nPOST /auth/login:       161 ops/s (with middleware)\r\nPOST /auth/register:    147 ops/s (with validation)\r"
  },
  {
    "type": "h3",
    "id": "router-performance",
    "text": "Router Performance"
  },
  {
    "type": "code",
    "code": "Static route match:     514,954 ops/s\r\nParam route match:      290,022 ops/s\r\nMulti-param route:      243,064 ops/s\r\nGrouped route:          893,736 ops/s ⭐\r\n404 miss:               688,720 ops/s\r"
  },
  {
    "type": "h3",
    "id": "summary",
    "text": "Summary"
  },
  {
    "type": "code",
    "code": "Average throughput:     398,563 ops/s\r\nBest throughput:        893,736 ops/s\r\nFastest request:        ~0.00ms (sub-millisecond!)\r\nMemory per request:     +0KB (zero overhead!)\r"
  },
  {
    "type": "h2",
    "id": "run-benchmarks",
    "text": "🔍 Run Benchmarks"
  },
  {
    "type": "h3",
    "id": "built-in-benchmark-command",
    "text": "Built-in Benchmark Command"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Run comprehensive benchmarks\r\nphp siro benchmark\r\n\r\n# Output includes:\r\n# - Cold boot time\r\n# - Warm request throughput\r\n# - Router performance\r\n# - Memory usage\r\n# - Comparison with other frameworks\r"
  },
  {
    "type": "h3",
    "id": "custom-benchmarks",
    "text": "Custom Benchmarks"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n// tests/benchmark_custom.php\r\n\r\nrequire_once __DIR__ . '/../vendor/autoload.php';\r\n\r\nuse Siro\\Core\\App;\r\nuse Siro\\Core\\Route;\r\n\r\n$app = new App();\r\n\r\nRoute::get('/test', function() {\r\n    return ['message' => 'Hello'];\r\n});\r\n\r\n$iterations = 10000;\r\n$start = microtime(true);\r\n\r\nfor ($i = 0; $i < $iterations; $i++) {\r\n    $_SERVER['REQUEST_URI'] = '/test';\r\n    $_SERVER['REQUEST_METHOD'] = 'GET';\r\n    $app->run();\r\n}\r\n\r\n$end = microtime(true);\r\n$time = ($end - $start) * 1000; // ms\r\n$opsPerSec = ($iterations / ($end - $start));\r\n\r\necho \"Time: {$time}ms\\n\";\r\necho \"Ops/sec: \" . number_format($opsPerSec) . \"\\n\";\r\necho \"Avg per request: \" . number_format($time / $iterations, 4) . \"ms\\n\";\r"
  },
  {
    "type": "h2",
    "id": "optimization-techniques",
    "text": "⚡ Optimization Techniques"
  },
  {
    "type": "h3",
    "id": "1-config-caching",
    "text": "1. Config Caching"
  },
  {
    "type": "p",
    "text": "Cache configuration for production:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro config:cache\r"
  },
  {
    "type": "p",
    "text": "Benefits:"
  },
  {
    "type": "ul",
    "items": [
      "Eliminates `.env` file parsing on every request",
      "Reduces boot time by 30-50%",
      "Cached in `storage/cache/config.php`"
    ]
  },
  {
    "type": "p",
    "text": "Clear cache when updating config:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro config:clear\r"
  },
  {
    "type": "h3",
    "id": "2-route-caching",
    "text": "2. Route Caching"
  },
  {
    "type": "p",
    "text": "Framework automatically caches routes:"
  },
  {
    "type": "ul",
    "items": [
      "Routes compiled to PHP array",
      "Stored in `storage/cache/routes.php`",
      "Loaded instantly on subsequent requests"
    ]
  },
  {
    "type": "p",
    "text": "No manual action needed - caching is automatic."
  },
  {
    "type": "h3",
    "id": "3-database-query-optimization",
    "text": "3. Database Query Optimization"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ❌ Bad - N+1 queries\r\n$posts = Post::all();\r\nforeach ($posts as $post) {\r\n    echo $post->author->name; // Query per post!\r\n}\r\n\r\n// ✅ Good - 2 queries total\r\n$posts = Post::with('author')->get();\r\nforeach ($posts as $post) {\r\n    echo $post->author->name; // No additional queries\r\n}\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Schema::table('users', function (Blueprint $table) {\r\n    $table->index('email');           // Speed up WHERE email = ?\r\n    $table->index(['status', 'created_at']); // Composite index\r\n});\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ❌ Bad - loads all records\r\n$users = User::all();\r\n\r\n// ✅ Good - pagination\r\n$users = User::paginate(20, $page);\r\n\r\n// ✅ Good - limit\r\n$users = User::limit(100)->get();\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Cache query results for 60 seconds\r\n$stats = DB::table('orders')\r\n    ->selectRaw('SUM(total) as revenue')\r\n    ->cache(60)\r\n    ->first();\r"
  },
  {
    "type": "h3",
    "id": "4-response-compression",
    "text": "4. Response Compression"
  },
  {
    "type": "p",
    "text": "Auto Gzip compression enabled by default:"
  },
  {
    "type": "ul",
    "items": [
      "Reduces bandwidth by 60-80%",
      "Zero configuration required",
      "Client must send `Accept-Encoding: gzip` header"
    ]
  },
  {
    "type": "p",
    "text": "Verify compression:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "curl -H \"Accept-Encoding: gzip\" -I https://yourdomain.com/api/users\r\n# Should show: Content-Encoding: gzip\r"
  },
  {
    "type": "h3",
    "id": "5-queue-heavy-operations",
    "text": "5. Queue Heavy Operations"
  },
  {
    "type": "p",
    "text": "Offload slow tasks to background:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Instead of sending email synchronously\r\nMail::to($user)->subject('Welcome')->html($html)->send(); // Blocks request\r\n\r\n// Queue it\r\nMail::to($user)->subject('Welcome')->html($html)->queue(); // Returns immediately\r"
  },
  {
    "type": "p",
    "text": "Process queue:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# One-time processing\r\nphp siro queue:work\r\n\r\n# Daemon mode (production)\r\nphp siro queue:work --daemon\r\n\r\n# Crontab setup\r\n* * * * * cd /path/to/project && php siro queue:work\r"
  },
  {
    "type": "h3",
    "id": "6-use-redis-for-high-traffic-sites",
    "text": "6. Use Redis for High-Traffic Sites"
  },
  {
    "type": "p",
    "text": "Switch cache driver:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "CACHE_DRIVER=redis\r\nREDIS_HOST=127.0.0.1\r\nREDIS_PORT=6379\r"
  },
  {
    "type": "p",
    "text": "Switch session driver:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "SESSION_DRIVER=redis\r"
  },
  {
    "type": "p",
    "text": "Benefits:"
  },
  {
    "type": "ul",
    "items": [
      "Faster than file-based cache",
      "Better for concurrent requests",
      "Supports distributed systems"
    ]
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "🎯 Best Practices"
  },
  {
    "type": "h3",
    "id": "request-lifecycle-optimization",
    "text": "Request Lifecycle Optimization"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ❌ Too many middleware layers\r\nRoute::get('/users', [UserController::class, 'index'])\r\n    ->middleware([AuthMiddleware::class, LogMiddleware::class, \r\n                  CorsMiddleware::class, JsonMiddleware::class]);\r\n\r\n// ✅ Only essential middleware\r\nRoute::get('/users', [UserController::class, 'index'])\r\n    ->middleware([AuthMiddleware::class]); // Cors/Json applied globally\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ✅ Container resolves dependencies automatically\r\nclass UserController {\r\n    public function __construct(\r\n        private UserService $service,\r\n        private Logger $logger\r\n    ) {}\r\n}\r\n\r\n// ❌ Manual resolution (slower)\r\n$service = new UserService(new UserRepository());\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ❌ Bad - runs on every instantiation\r\nclass UserController {\r\n    public function __construct() {\r\n        $this->data = DB::table('config')->get(); // Slow!\r\n    }\r\n}\r\n\r\n// ✅ Good - lazy loading\r\nclass UserController {\r\n    private ?Collection $data = null;\r\n    \r\n    private function getConfig(): Collection {\r\n        if ($this->data === null) {\r\n            $this->data = DB::table('config')->get();\r\n        }\r\n        return $this->data;\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "memory-management",
    "text": "Memory Management"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function processLargeDataset() {\r\n    $data = DB::table('logs')->get(); // 100MB\r\n    \r\n    // Process data\r\n    $result = $this->analyze($data);\r\n    \r\n    // Free memory\r\n    unset($data);\r\n    \r\n    return $result;\r\n}\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ❌ Loads all into memory\r\nforeach (User::all() as $user) {\r\n    process($user);\r\n}\r\n\r\n// ✅ Streams one at a time\r\nforeach (User::cursor() as $user) {\r\n    process($user);\r\n}\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Check current memory\r\n$memory = memory_get_usage(true) / 1024 / 1024; // MB\r\nLogger::debug(\"Memory usage: {$memory}MB\");\r\n\r\n// Peak memory\r\n$peak = memory_get_peak_usage(true) / 1024 / 1024;\r\nLogger::debug(\"Peak memory: {$peak}MB\");\r"
  },
  {
    "type": "h2",
    "id": "monitoring-profiling",
    "text": "📈 Monitoring & Profiling"
  },
  {
    "type": "h3",
    "id": "trace-id-system",
    "text": "Trace ID System"
  },
  {
    "type": "p",
    "text": "Every request gets unique trace ID:"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "X-Siro-Trace-Id: siro_a1b2c3d4e5f6g7h8\r\nX-Response-Time: 8.45ms\r"
  },
  {
    "type": "p",
    "text": "View slow requests:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Show top 10 slowest requests (>100ms)\r\nphp siro slow\r\n\r\n# Custom threshold\r\nphp siro slow --min=200 --limit=20\r"
  },
  {
    "type": "p",
    "text": "Output:"
  },
  {
    "type": "code",
    "code": "Top 10 slow requests (> 100ms):\r\n\r\n+---+---------------------+--------+--------------------+--------+----------+-----+\r\n| # | Time                | Method | Path               | Status | Duration | SQL |\r\n+---+---------------------+--------+--------------------+--------+----------+-----+\r\n| 1 | 2026-04-30 02:00:44 | POST   | /api/auth/register | 201    | 103.6ms  | 2   |\r\n| 2 | 2026-04-30 01:55:12 | GET    | /api/users         | 200    | 245.8ms  | 5   |\r\n+---+---------------------+--------+--------------------+--------+----------+-----+\r"
  },
  {
    "type": "p",
    "text": "Investigate specific request:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro log:trace siro_a1b2c3d4e5f6g7h8\r\n\r\n# Shows:\r\n# - Request/response bodies\r\n# - SQL queries with timing\r\n# - Memory usage\r\n# - Execution timeline\r"
  },
  {
    "type": "h3",
    "id": "sql-query-logging",
    "text": "SQL Query Logging"
  },
  {
    "type": "p",
    "text": "Enable slow query detection:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "DB_SLOW_QUERY_THRESHOLD=100  # Log queries > 100ms\r"
  },
  {
    "type": "p",
    "text": "Logs to storage/logs/error.log:"
  },
  {
    "type": "code",
    "code": "Slow query (150.25ms): SELECT * FROM users WHERE email = :email\r\nBindings: {\"email\":\"test@example.com\"}\r"
  },
  {
    "type": "h3",
    "id": "application-metrics",
    "text": "Application Metrics"
  },
  {
    "type": "p",
    "text": "Track custom metrics:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Logger;\r\n\r\n$start = microtime(true);\r\n\r\n// Your code here\r\n$result = $this->processData();\r\n\r\n$duration = (microtime(true) - $start) * 1000;\r\n\r\nLogger::debug('Processing completed', [\r\n    'duration_ms' => round($duration, 2),\r\n    'records_processed' => count($result),\r\n]);\r"
  },
  {
    "type": "h2",
    "id": "production-deployment",
    "text": "🚀 Production Deployment"
  },
  {
    "type": "h3",
    "id": "pre-deployment-checklist",
    "text": "Pre-Deployment Checklist"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# 1. Optimize for production\r\nphp siro optimize\r\n\r\n# Runs:\r\n# - php siro config:cache\r\n# - composer dump-autoload --optimize\r\n\r\n# 2. Validate environment\r\nphp siro env:check\r\n\r\n# 3. Run benchmarks\r\nphp siro benchmark\r\n\r\n# 4. Clear development logs\r\nrm -rf storage/logs/traces/*.json\r"
  },
  {
    "type": "h3",
    "id": "server-configuration",
    "text": "Server Configuration"
  },
  {
    "type": "code",
    "lang": "nginx",
    "code": "server {\r\n    listen 80;\r\n    server_name api.example.com;\r\n    root /var/www/html/public;\r\n    index index.php;\r\n\r\n    # Enable gzip compression\r\n    gzip on;\r\n    gzip_types application/json text/xml;\r\n    gzip_min_length 1000;\r\n\r\n    # Security headers\r\n    add_header X-Frame-Options DENY;\r\n    add_header X-Content-Type-Options nosniff;\r\n\r\n    location / {\r\n        try_files $uri $uri/ /index.php?$query_string;\r\n    }\r\n\r\n    location ~ \\.php$ {\r\n        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;\r\n        fastcgi_index index.php;\r\n        include fastcgi_params;\r\n    }\r\n}\r"
  },
  {
    "type": "code",
    "lang": "ini",
    "code": "; /etc/php/8.2/fpm/pool.d/www.conf\r\n\r\npm = dynamic\r\npm.max_children = 50\r\npm.start_servers = 5\r\npm.min_spare_servers = 5\r\npm.max_spare_servers = 35\r\n\r\n; Adjust based on available RAM\r\n; Formula: max_children = Available RAM / Memory per process\r\n; Example: 4GB RAM / 80MB per process = 50 children\r"
  },
  {
    "type": "h3",
    "id": "load-testing",
    "text": "Load Testing"
  },
  {
    "type": "p",
    "text": "Use Apache Bench:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# 1000 requests, 100 concurrent\r\nab -n 1000 -c 100 https://api.example.com/api/users\r\n\r\n# Expected output:\r\n# Requests per second:    5000 [#/sec] (mean)\r\n# Time per request:       20.000 [ms] (mean)\r"
  },
  {
    "type": "p",
    "text": "Use wrk:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# More accurate load testing\r\nwrk -t12 -c400 -d30s https://api.example.com/api/users\r\n\r\n# Output:\r\n# Running 30s test @ https://api.example.com/api/users\r\n#   12 threads and 400 connections\r\n#   Thread Stats   Avg      Stdev     Max   +/- Stdev\r\n#     Latency    20.00ms   5.00ms  100.00ms   80.00%\r\n#     Req/Sec     416.67    50.00   600.00    75.00%\r\n#   150000 requests in 30.00s, 50.00MB read\r\n# Requests/sec:   5000.00\r\n# Transfer/sec:   1.67MB\r"
  },
  {
    "type": "h2",
    "id": "troubleshooting-performance-issues",
    "text": "🔧 Troubleshooting Performance Issues"
  },
  {
    "type": "h3",
    "id": "problem-slow-response-times",
    "text": "Problem: Slow Response Times"
  },
  {
    "type": "p",
    "text": "Diagnosis:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Check slow requests\r\nphp siro slow\r\n\r\n# View specific trace\r\nphp siro log:trace <trace-id>\r"
  },
  {
    "type": "p",
    "text": "Common Causes:"
  },
  {
    "type": "ol",
    "items": [
      "**N+1 queries** - Use eager loading",
      "**Missing indexes** - Add database indexes",
      "**Heavy middleware** - Reduce middleware chain",
      "**Large result sets** - Use pagination",
      "**Synchronous operations** - Move to queue"
    ]
  },
  {
    "type": "h3",
    "id": "problem-high-memory-usage",
    "text": "Problem: High Memory Usage"
  },
  {
    "type": "p",
    "text": "Diagnosis:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Add to controller\r\nLogger::debug('Memory', [\r\n    'current' => memory_get_usage(true) / 1024 / 1024,\r\n    'peak' => memory_get_peak_usage(true) / 1024 / 1024,\r\n]);\r"
  },
  {
    "type": "p",
    "text": "Solutions:"
  },
  {
    "type": "ol",
    "items": [
      "Free large variables with `unset()`",
      "Use generators instead of arrays",
      "Limit query results",
      "Cache frequently accessed data",
      "Increase PHP memory limit if needed:"
    ]
  },
  {
    "type": "code",
    "lang": "ini",
    "code": "   ; php.ini\r\n   memory_limit = 256M\r"
  },
  {
    "type": "h3",
    "id": "problem-database-bottleneck",
    "text": "Problem: Database Bottleneck"
  },
  {
    "type": "p",
    "text": "Diagnosis:"
  },
  {
    "type": "code",
    "lang": "sql",
    "code": "-- Check slow queries\r\nSHOW PROCESSLIST;\r\n\r\n-- Analyze query execution\r\nEXPLAIN SELECT * FROM users WHERE email = 'test@example.com';\r"
  },
  {
    "type": "p",
    "text": "Solutions:"
  },
  {
    "type": "ol",
    "items": [
      "Add missing indexes",
      "Optimize queries (avoid SELECT *)",
      "Use read replicas for heavy reads",
      "Implement query caching",
      "Consider connection pooling"
    ]
  },
  {
    "type": "h2",
    "id": "performance-comparison",
    "text": "📊 Performance Comparison"
  },
  {
    "type": "table",
    "headers": [
      "Framework",
      "Avg Ops/s",
      "Memory",
      "Dependencies",
      "Boot Time"
    ],
    "rows": [
      [
        "**SiroPHP v0.40.0**",
        "**398K**",
        "**2MB**",
        "**0**",
        "**<1ms**"
      ],
      [
        "Laravel",
        "100-200",
        "10-20MB",
        "50+",
        "50-100ms"
      ],
      [
        "Slim",
        "5K-10K",
        "3-5MB",
        "5+",
        "10-20ms"
      ],
      [
        "Lumen",
        "2K-5K",
        "4-8MB",
        "10+",
        "20-40ms"
      ],
      [
        "Express.js",
        "10K-20K",
        "30-50MB",
        "100+",
        "100-200ms"
      ]
    ]
  },
  {
    "type": "p",
    "text": "SiroPHP is 2000-4000x faster than Laravel! 🚀"
  },
  {
    "type": "h2",
    "id": "advanced-optimization",
    "text": "🎓 Advanced Optimization"
  },
  {
    "type": "h3",
    "id": "opcache-configuration",
    "text": "OPcache Configuration"
  },
  {
    "type": "code",
    "lang": "ini",
    "code": "; php.ini\r\nopcache.enable=1\r\nopcache.memory_consumption=256\r\nopcache.max_accelerated_files=20000\r\nopcache.validate_timestamps=0  ; Disable in production\r\nopcache.revalidate_freq=0\r\nopcache.interned_strings_buffer=16\r"
  },
  {
    "type": "p",
    "text": "Restart PHP-FPM after changes:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "sudo systemctl restart php8.2-fpm\r"
  },
  {
    "type": "h3",
    "id": "preloading-php-7-4",
    "text": "Preloading (PHP 7.4+)"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "; php.ini\r\nopcache.preload=/var/www/html/preload.php\r\nopcache.preload_user=www-data\r"
  },
  {
    "type": "p",
    "text": "Create preload.php:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n// Preload critical classes\r\nrequire_once __DIR__ . '/vendor/autoload.php';\r\n\r\n$classes = [\r\n    \\Siro\\Core\\App::class,\r\n    \\Siro\\Core\\Router::class,\r\n    \\Siro\\Core\\Model::class,\r\n    \\Siro\\Core\\Response::class,\r\n];\r\n\r\nforeach ($classes as $class) {\r\n    opcache_compile_file((new ReflectionClass($class))->getFileName());\r\n}\r"
  },
  {
    "type": "h3",
    "id": "http-2-support",
    "text": "HTTP/2 Support"
  },
  {
    "type": "p",
    "text": "Enable in Nginx:"
  },
  {
    "type": "code",
    "lang": "nginx",
    "code": "listen 443 ssl http2;\r"
  },
  {
    "type": "p",
    "text": "Benefits:"
  },
  {
    "type": "ul",
    "items": [
      "Multiplexed requests",
      "Header compression",
      "Server push",
      "Faster page loads"
    ]
  },
  {
    "type": "h2",
    "id": "additional-resources",
    "text": "📚 Additional Resources"
  },
  {
    "type": "ul",
    "items": [
      "[PHP Performance Tips](https://www.php.net/manual/en/performance.php)",
      "[MySQL Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)",
      "[Nginx Tuning](https://www.nginx.com/blog/tuning-nginx/)",
      "[OPcache Guide](https://stitcher.io/blog/php-opcache)"
    ]
  },
  {
    "type": "h2",
    "id": "quick-wins",
    "text": "💡 Quick Wins"
  },
  {
    "type": "p",
    "text": "Top 5 optimizations for immediate impact:"
  },
  {
    "type": "ol",
    "items": [
      "**Enable config caching** - `php siro config:cache` (30-50% faster boot)",
      "**Use eager loading** - Eliminate N+1 queries (10-100x faster)",
      "**Add database indexes** - Speed up WHERE clauses (5-50x faster)",
      "**Queue heavy operations** - Return immediately to user",
      "**Enable gzip compression** - Reduce bandwidth 60-80%"
    ]
  },
  {
    "type": "p",
    "text": "Expected improvement: 5-10x faster response times with minimal effort!"
  }
],
}
