
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Security Guide",
    description: "SiroPHP is designed with security-first principles. This document outlines all security features, best practices, and known attack vectors that the framework pr",
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
    "text": "SiroPHP is designed with security-first principles. This document outlines all security features, best practices, and known attack vectors that the framework protects against."
  },
  {
    "type": "h2",
    "id": "authentication-authorization",
    "text": "🔐 Authentication & Authorization"
  },
  {
    "type": "h3",
    "id": "jwt-token-security",
    "text": "JWT Token Security"
  },
  {
    "type": "p",
    "text": "Token Structure:"
  },
  {
    "type": "ul",
    "items": [
      "Access tokens: 1-hour TTL (short-lived)",
      "Refresh tokens: 7-day TTL (long-lived)",
      "Token versioning for instant revocation",
      "JTI (JWT ID) uniqueness enforcement"
    ]
  },
  {
    "type": "p",
    "text": "Best Practices:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "# Use strong JWT secret (minimum 32 characters)\r\nJWT_SECRET=your-super-secret-key-minimum-32-chars-long\r\n\r\n# For production, use RS256 asymmetric signing\r\nJWT_ALGORITHM=RS256\r\nJWT_PUBLIC_KEY=/path/to/public.pem\r\nJWT_PRIVATE_KEY=/path/to/private.pem\r"
  },
  {
    "type": "p",
    "text": "Security Features:"
  },
  {
    "type": "ul",
    "items": [
      "✅ Automatic token rotation on refresh",
      "✅ Token blacklisting via version tracking",
      "✅ RS256 support for enhanced security",
      "✅ Secure storage of refresh tokens in database"
    ]
  },
  {
    "type": "h3",
    "id": "rbac-role-based-access-control",
    "text": "RBAC (Role-Based Access Control)"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Protect routes by role\r\nRoute::get('/admin/dashboard', [AdminController::class, 'index'])\r\n    ->middleware(['auth:admin']);\r\n\r\nRoute::post('/users', [UserController::class, 'store'])\r\n    ->middleware(['auth:user,admin']);\r"
  },
  {
    "type": "p",
    "text": "Middleware Checks:"
  },
  {
    "type": "ol",
    "items": [
      "Valid JWT token present",
      "Token not expired",
      "User role matches required role",
      "Token version matches current version"
    ]
  },
  {
    "type": "h2",
    "id": "input-validation-sanitization",
    "text": "🛡️ Input Validation & Sanitization"
  },
  {
    "type": "h3",
    "id": "sql-injection-protection",
    "text": "SQL Injection Protection"
  },
  {
    "type": "p",
    "text": "All queries use PDO prepared statements:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ✅ Safe - uses parameterized queries\r\nDB::table('users')\r\n    ->where('email', $request->input('email'))\r\n    ->first();\r\n\r\n// ❌ Never do this - vulnerable to SQL injection\r\nDB::raw(\"SELECT * FROM users WHERE email = '\" . $input . \"'\");\r"
  },
  {
    "type": "p",
    "text": "Protected Components:"
  },
  {
    "type": "ul",
    "items": [
      "QueryBuilder (all methods)",
      "Model CRUD operations",
      "Schema Builder migrations",
      "Raw query execution (with bindings)"
    ]
  },
  {
    "type": "h3",
    "id": "xss-prevention",
    "text": "XSS Prevention"
  },
  {
    "type": "p",
    "text": "Automatic output encoding:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Response::json() automatically escapes HTML entities\r\nreturn Response::json([\r\n    'message' => $userInput // Automatically escaped\r\n]);\r"
  },
  {
    "type": "p",
    "text": "For HTML responses, use htmlspecialchars:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');\r"
  },
  {
    "type": "h3",
    "id": "mass-assignment-protection",
    "text": "Mass Assignment Protection"
  },
  {
    "type": "p",
    "text": "Models require explicit $fillable declaration:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class User extends Model {\r\n    // Only these fields can be mass-assigned\r\n    protected array $fillable = ['name', 'email'];\r\n    \r\n    // These are protected automatically:\r\n    // - password\r\n    // - role\r\n    // - is_admin\r\n}\r\n\r\n// ❌ Will trigger warning and block unauthorized fields\r\nUser::create($request->all());\r\n\r\n// ✅ Explicitly allow only safe fields\r\nUser::create($request->only(['name', 'email']));\r"
  },
  {
    "type": "p",
    "text": "Runtime Warning: If $fillable is empty, framework triggers E_USER_WARNING:"
  },
  {
    "type": "code",
    "code": "Mass assignment protection: $fillable is empty on User model. \r\nNo fields will be mass-assigned. Define $fillable array.\r"
  },
  {
    "type": "h2",
    "id": "csrf-protection",
    "text": "🔒 CSRF Protection"
  },
  {
    "type": "h3",
    "id": "enable-csrf-middleware",
    "text": "Enable CSRF Middleware"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Add to sensitive routes\r\nRoute::post('/api/data', [Controller::class, 'store'])\r\n    ->middleware([CsrfMiddleware::class]);\r"
  },
  {
    "type": "h3",
    "id": "generate-csrf-token",
    "text": "Generate CSRF Token"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In HTML forms\r\necho CsrfMiddleware::field();\r\n// Output: <input type=\"hidden\" name=\"_token\" value=\"abc123...\">\r\n\r\n// In JavaScript meta tag\r\necho CsrfMiddleware::metaTag();\r\n// Output: <meta name=\"csrf-token\" content=\"abc123...\">\r"
  },
  {
    "type": "h3",
    "id": "verify-token-in-requests",
    "text": "Verify Token in Requests"
  },
  {
    "type": "code",
    "lang": "javascript",
    "code": "// Include token in AJAX requests\r\nfetch('/api/data', {\r\n    method: 'POST',\r\n    headers: {\r\n        'X-CSRF-TOKEN': document.querySelector('meta[name=\"csrf-token\"]').content\r\n    },\r\n    body: JSON.stringify(data)\r\n});\r"
  },
  {
    "type": "h2",
    "id": "rate-limiting",
    "text": "⏱️ Rate Limiting"
  },
  {
    "type": "h3",
    "id": "protect-sensitive-endpoints",
    "text": "Protect Sensitive Endpoints"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Login endpoint - 5 attempts per minute\r\nRoute::post('/auth/login', [AuthController::class, 'login'])\r\n    ->throttle(5, 1);\r\n\r\n// Registration - 3 attempts per hour\r\nRoute::post('/auth/register', [AuthController::class, 'register'])\r\n    ->throttle(3, 60);\r\n\r\n// API endpoints - 60 requests per minute\r\nRoute::get('/api/users', [UserController::class, 'index'])\r\n    ->throttle(60, 1);\r"
  },
  {
    "type": "h3",
    "id": "rate-limit-headers",
    "text": "Rate Limit Headers"
  },
  {
    "type": "p",
    "text": "Every throttled response includes:"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "X-RateLimit-Limit: 60\r\nX-RateLimit-Remaining: 45\r\nX-RateLimit-Reset: 1635724800\r\nRetry-After: 120  # When limit exceeded\r"
  },
  {
    "type": "h3",
    "id": "monitor-rate-limits",
    "text": "Monitor Rate Limits"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# View active rate limits\r\nphp siro rate:status\r\n\r\n# Output:\r\n# +---------------------+-------+------+---------+\r\n# | Key                 | Count | TTL  | Status  |\r\n# +---------------------+-------+------+---------+\r\n# | 30ff2cff9fb616d9... | 45    | 30s  | OK      |\r\n# | 4840fcb0d11385...   | 61    | 15s  | BLOCKED |\r\n# +---------------------+-------+------+---------+\r"
  },
  {
    "type": "h2",
    "id": "credential-handling",
    "text": "🔑 Credential Handling"
  },
  {
    "type": "h3",
    "id": "password-hashing",
    "text": "Password Hashing"
  },
  {
    "type": "p",
    "text": "Use bcrypt automatically:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Hash password\r\n$hashedPassword = Hash::make('secret123');\r\n\r\n// Verify password\r\nif (Hash::check('secret123', $hashedPassword)) {\r\n    // Password matches\r\n}\r"
  },
  {
    "type": "p",
    "text": "Algorithm: Bcrypt with cost factor 12 (configurable)"
  },
  {
    "type": "h3",
    "id": "credential-sanitization-in-logs",
    "text": "Credential Sanitization in Logs"
  },
  {
    "type": "p",
    "text": "Sensitive data automatically redacted:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Request body logged as:\r\n{\"email\":\"test@test.com\",\"password\":\"[REDACTED]\"}\r\n\r\n// Not:\r\n{\"email\":\"test@test.com\",\"password\":\"secret123\"}\r"
  },
  {
    "type": "p",
    "text": "Redacted Fields:"
  },
  {
    "type": "ul",
    "items": [
      "`password`",
      "`password_confirmation`",
      "`token`",
      "`access_token`",
      "`refresh_token`",
      "`secret`",
      "`api_key`"
    ]
  },
  {
    "type": "h3",
    "id": "environment-variable-protection",
    "text": "Environment Variable Protection"
  },
  {
    "type": "p",
    "text": "Never commit .env file:"
  },
  {
    "type": "code",
    "lang": "gitignore",
    "code": "# .gitignore\r\n.env\r\n.env.*\r\n!.env.example\r"
  },
  {
    "type": "p",
    "text": "Auto-generate secure secrets:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Generate APP_KEY\r\nphp siro key:generate\r\n\r\n# Generates: APP_KEY=base64:random-32-byte-key\r"
  },
  {
    "type": "h2",
    "id": "cors-configuration",
    "text": "🌐 CORS Configuration"
  },
  {
    "type": "h3",
    "id": "configure-allowed-origins",
    "text": "Configure Allowed Origins"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// config/cors.php\r\nreturn [\r\n    'allowed_origins' => ['https://example.com'],\r\n    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE'],\r\n    'allowed_headers' => ['Content-Type', 'Authorization'],\r\n    'exposed_headers' => ['X-Request-Id', 'X-RateLimit-Limit'],\r\n    'max_age' => 3600,\r\n    'supports_credentials' => true,\r\n];\r"
  },
  {
    "type": "h3",
    "id": "test-cors-configuration",
    "text": "Test CORS Configuration"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Automated CORS validation\r\nphp siro api:test GET /api/users --cors\r\n\r\n# Output:\r\n# [1/3] OPTIONS preflight request... ✓\r\n# [2/3] Request with Origin header... ✓\r\n# [3/3] Request without Origin... ✓\r\n# CORS configuration is valid!\r"
  },
  {
    "type": "h2",
    "id": "file-upload-security",
    "text": "📁 File Upload Security"
  },
  {
    "type": "h3",
    "id": "validate-uploaded-files",
    "text": "Validate Uploaded Files"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$file = $request->file('avatar');\r\n\r\n// Check file type\r\nif (!$file->isValid()) {\r\n    throw new \\Exception('Invalid file upload');\r\n}\r\n\r\n// Restrict file types\r\n$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];\r\nif (!in_array($file->getMimeType(), $allowedTypes)) {\r\n    throw new \\Exception('File type not allowed');\r\n}\r\n\r\n// Limit file size (5MB max)\r\nif ($file->getSize() > 5 * 1024 * 1024) {\r\n    throw new \\Exception('File too large');\r\n}\r\n\r\n// Store securely\r\n$path = $file->store('avatars', 'public');\r"
  },
  {
    "type": "h3",
    "id": "prevent-path-traversal",
    "text": "Prevent Path Traversal"
  },
  {
    "type": "p",
    "text": "Framework sanitizes filenames automatically:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Malicious filename: \"../../../etc/passwd\"\r\n// Sanitized to: \"etc_passwd\" or rejected\r"
  },
  {
    "type": "h3",
    "id": "serve-files-safely",
    "text": "Serve Files Safely"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Create symbolic link\r\nphp siro storage:link\r\n\r\n// Access files via public URL\r\n// http://yoursite.com/storage/avatars/photo.jpg\r"
  },
  {
    "type": "h2",
    "id": "security-headers",
    "text": "🔍 Security Headers"
  },
  {
    "type": "h3",
    "id": "automatic-security-headers",
    "text": "Automatic Security Headers"
  },
  {
    "type": "p",
    "text": "Every response includes:"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "X-Content-Type-Options: nosniff\r\nX-Frame-Options: DENY\r\nX-XSS-Protection: 1; mode=block\r\nStrict-Transport-Security: max-age=31536000; includeSubDomains\r\nContent-Security-Policy: default-src 'self'\r\nReferrer-Policy: strict-origin-when-cross-origin\r\nPermissions-Policy: geolocation=(), microphone=(), camera=()\r"
  },
  {
    "type": "h3",
    "id": "customize-headers",
    "text": "Customize Headers"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Response;\r\n\r\nreturn Response::json($data)\r\n    ->header('X-Custom-Header', 'value')\r\n    ->withHeaders([\r\n        'X-Another-Header' => 'another-value',\r\n    ]);\r"
  },
  {
    "type": "h2",
    "id": "database-security",
    "text": "🗄️ Database Security"
  },
  {
    "type": "h3",
    "id": "multi-database-connection-security",
    "text": "Multi-Database Connection Security"
  },
  {
    "type": "p",
    "text": "Separate credentials for read/write:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "# Write connection (restricted access)\r\nDB_CONNECTION=mysql\r\nDB_HOST=127.0.0.1\r\nDB_DATABASE=myapp_production\r\nDB_USERNAME=app_writer\r\nDB_PASSWORD=strong-password-here\r\n\r\n# Read replica (read-only user)\r\nDB_READ_HOST=replica.example.com\r\nDB_READ_USERNAME=app_reader\r\nDB_READ_PASSWORD=another-strong-password\r"
  },
  {
    "type": "h3",
    "id": "slow-query-detection",
    "text": "Slow Query Detection"
  },
  {
    "type": "p",
    "text": "Detect potential SQL injection attempts:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "DB_SLOW_QUERY_THRESHOLD=100  # Log queries > 100ms\r"
  },
  {
    "type": "p",
    "text": "Logged to storage/logs/error.log:"
  },
  {
    "type": "code",
    "code": "Slow query (150.25ms): SELECT * FROM users WHERE email = :email\r\nBindings: {\"email\":\"test@example.com\"}\r"
  },
  {
    "type": "h2",
    "id": "error-handling",
    "text": "🚨 Error Handling"
  },
  {
    "type": "h3",
    "id": "production-error-configuration",
    "text": "Production Error Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "APP_DEBUG=false  # Never enable in production\r"
  },
  {
    "type": "p",
    "text": "When APP_DEBUG=false:"
  },
  {
    "type": "ul",
    "items": [
      "Generic error messages shown to users",
      "Detailed errors logged internally",
      "Stack traces hidden from response",
      "Database credentials never exposed"
    ]
  },
  {
    "type": "h3",
    "id": "custom-error-pages",
    "text": "Custom Error Pages"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Handle specific HTTP errors\r\nif ($e instanceof NotFoundHttpException) {\r\n    return Response::json([\r\n        'error' => 'Resource not found'\r\n    ], 404);\r\n}\r\n\r\nif ($e instanceof ValidationException) {\r\n    return Response::json([\r\n        'errors' => $e->errors()\r\n    ], 422);\r\n}\r"
  },
  {
    "type": "h2",
    "id": "encryption",
    "text": "🔐 Encryption"
  },
  {
    "type": "h3",
    "id": "aes-256-encryption",
    "text": "AES-256 Encryption"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Encrypter;\r\n\r\n// Encrypt sensitive data\r\n$encrypted = Encrypter::encrypt($creditCardNumber);\r\n\r\n// Decrypt when needed\r\n$decrypted = Encrypter::decrypt($encrypted);\r"
  },
  {
    "type": "p",
    "text": "Features:"
  },
  {
    "type": "ul",
    "items": [
      "AES-256-CBC encryption",
      "HMAC integrity verification",
      "Tamper-proof payload",
      "Auto key resolution from `APP_KEY`"
    ]
  },
  {
    "type": "h3",
    "id": "when-to-encrypt",
    "text": "When to Encrypt"
  },
  {
    "type": "p",
    "text": "Always encrypt:"
  },
  {
    "type": "ul",
    "items": [
      "Credit card numbers",
      "Social security numbers",
      "Personal identification data",
      "API keys stored in database",
      "Sensitive user preferences"
    ]
  },
  {
    "type": "p",
    "text": "Don't encrypt:"
  },
  {
    "type": "ul",
    "items": [
      "Passwords (use Hash::make instead)",
      "Public data",
      "Data needed for search/filtering"
    ]
  },
  {
    "type": "h2",
    "id": "security-checklist",
    "text": "🛠️ Security Checklist"
  },
  {
    "type": "h3",
    "id": "pre-deployment-checklist",
    "text": "Pre-Deployment Checklist"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# 1. Validate environment\r\nphp siro env:check\r\n\r\n# Checks:\r\n# ✅ .env file exists\r\n# ✅ Required variables set\r\n# ✅ JWT_SECRET strength (min 32 chars)\r\n# ✅ APP_DEBUG is false\r\n# ✅ PHP extensions loaded\r\n# ✅ Storage directories writable\r\n\r\n# 2. Run security tests\r\nphp vendor/bin/phpunit --testsuite=Security\r\n\r\n# 3. Check rate limiting\r\nphp siro rate:status\r\n\r\n# 4. Verify HTTPS\r\ncurl -I https://yourdomain.com/api/health\r\n# Should return: Strict-Transport-Security header\r\n\r\n# 5. Test CORS\r\nphp siro api:test GET /api/users --cors\r"
  },
  {
    "type": "h3",
    "id": "production-hardening",
    "text": "Production Hardening"
  },
  {
    "type": "ol",
    "items": [
      "**Disable debug mode:**"
    ]
  },
  {
    "type": "code",
    "lang": "env",
    "code": "   APP_DEBUG=false\r"
  },
  {
    "type": "ol",
    "items": [
      "**Use strong secrets:**"
    ]
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "   php siro key:generate\r"
  },
  {
    "type": "ol",
    "items": [
      "**Enable maintenance mode during updates:**"
    ]
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "   php siro down --allow=YOUR_IP\r\n   # Deploy code\r\n   php siro up\r"
  },
  {
    "type": "ol",
    "items": [
      "**Set proper file permissions:**"
    ]
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "   chmod 755 storage/\r\n   chmod 644 storage/logs/*.log\r"
  },
  {
    "type": "ol",
    "items": [
      "**Configure firewall:**"
    ]
  },
  {
    "type": "p",
    "text": "- Allow only ports 80, 443 - Restrict database access to app server IP - Block direct access to .env file"
  },
  {
    "type": "h2",
    "id": "incident-response",
    "text": "🚨 Incident Response"
  },
  {
    "type": "h3",
    "id": "if-breach-suspected",
    "text": "If Breach Suspected"
  },
  {
    "type": "ol",
    "items": [
      "**Rotate all tokens:**"
    ]
  },
  {
    "type": "code",
    "lang": "sql",
    "code": "   UPDATE users SET token_version = token_version + 1;\r"
  },
  {
    "type": "ol",
    "items": [
      "**Change JWT secret:**"
    ]
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "   php siro key:generate\r"
  },
  {
    "type": "ol",
    "items": [
      "**Review trace logs:**"
    ]
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "   php siro log:trace --status=500\r\n   php siro log:export --days=7 --format=json --output=incident.json\r"
  },
  {
    "type": "ol",
    "items": [
      "**Check failed jobs:**"
    ]
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "   php siro queue:status\r"
  },
  {
    "type": "ol",
    "items": [
      "**Audit user actions:**"
    ]
  },
  {
    "type": "code",
    "lang": "sql",
    "code": "   SELECT * FROM audit_logs \r\n   WHERE created_at > NOW() - INTERVAL 24 HOUR;\r"
  },
  {
    "type": "h2",
    "id": "additional-resources",
    "text": "📚 Additional Resources"
  },
  {
    "type": "ul",
    "items": [
      "[OWASP Top 10](https://owasp.org/www-project-top-ten/)",
      "[PHP Security Best Practices](https://www.php.net/manual/en/security.php)",
      "[JWT Best Practices](https://tools.ietf.org/html/rfc8725)",
      "[CORS Specification](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)"
    ]
  },
  {
    "type": "h2",
    "id": "reporting-security-issues",
    "text": "📞 Reporting Security Issues"
  },
  {
    "type": "p",
    "text": "If you discover a security vulnerability, please report it responsibly:"
  },
  {
    "type": "p",
    "text": "Email: security@sirosoft.com PGP Key: Available on request Response Time: Within 48 hours"
  },
  {
    "type": "p",
    "text": "Do NOT:"
  },
  {
    "type": "ul",
    "items": [
      "Open public GitHub issues",
      "Post on social media",
      "Exploit the vulnerability"
    ]
  },
  {
    "type": "p",
    "text": "DO:"
  },
  {
    "type": "ul",
    "items": [
      "Send detailed report via email",
      "Include steps to reproduce",
      "Provide suggested fix if possible"
    ]
  },
  {
    "type": "p",
    "text": "We appreciate responsible disclosure and will credit researchers who help keep SiroPHP secure."
  }
],
}
