
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "SiroPHP Deployment Guide",
    description: "Deploy your API to production with confidence",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "p",
    "text": "Deploy your API to production with confidence"
  },
  {
    "type": "h2",
    "id": "quick-deploy-one-command",
    "text": "🚀 Quick Deploy (One Command)"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro deploy\r"
  },
  {
    "type": "p",
    "text": "This command:"
  },
  {
    "type": "ol",
    "items": [
      "Runs tests",
      "Optimizes for production",
      "Deploys via Git/rsync/custom strategy",
      "Restarts services"
    ]
  },
  {
    "type": "h2",
    "id": "pre-deployment-checklist",
    "text": "📋 Pre-Deployment Checklist"
  },
  {
    "type": "h3",
    "id": "1-environment-validation",
    "text": "1. Environment Validation"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro env:check\r"
  },
  {
    "type": "p",
    "text": "Checks:"
  },
  {
    "type": "ul",
    "items": [
      "✅ `.env` file exists",
      "✅ Required variables set",
      "✅ JWT_SECRET strength (min 32 chars)",
      "✅ APP_DEBUG is false in production",
      "✅ PHP extensions loaded",
      "✅ Storage directories writable"
    ]
  },
  {
    "type": "h3",
    "id": "2-run-tests",
    "text": "2. Run Tests"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro test\r"
  },
  {
    "type": "p",
    "text": "All tests must pass before deployment!"
  },
  {
    "type": "h3",
    "id": "3-optimize-for-production",
    "text": "3. Optimize for Production"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro optimize\r"
  },
  {
    "type": "p",
    "text": "Runs:"
  },
  {
    "type": "ul",
    "items": [
      "`php siro config:cache` - Cache configuration",
      "`composer dump-autoload --optimize` - Optimize autoloader"
    ]
  },
  {
    "type": "h3",
    "id": "4-generate-documentation",
    "text": "4. Generate Documentation"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:openapi --with-swagger\r"
  },
  {
    "type": "h2",
    "id": "deployment-strategies",
    "text": "🌐 Deployment Strategies"
  },
  {
    "type": "h3",
    "id": "strategy-1-git-deployment-recommended",
    "text": "Strategy 1: Git Deployment (Recommended)"
  },
  {
    "type": "p",
    "text": "Setup on server:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# SSH into server\r\nssh user@your-server.com\r\n\r\n# Create deployment directory\r\nmkdir -p /var/www/myapp\r\ncd /var/www/myapp\r\n\r\n# Initialize git repo\r\ngit init --bare\r"
  },
  {
    "type": "p",
    "text": "Configure in project:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "// deploy.json\r\n{\r\n    \"strategy\": \"git\",\r\n    \"remote\": \"user@your-server.com:/var/www/myapp\",\r\n    \"branch\": \"main\",\r\n    \"commands\": [\r\n        \"composer install --no-dev --optimize-autoloader\",\r\n        \"php siro migrate --force\",\r\n        \"php siro config:cache\",\r\n        \"sudo systemctl restart php8.2-fpm\"\r\n    ]\r\n}\r"
  },
  {
    "type": "p",
    "text": "Deploy:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro deploy\r"
  },
  {
    "type": "h3",
    "id": "strategy-2-rsync-deployment",
    "text": "Strategy 2: Rsync Deployment"
  },
  {
    "type": "p",
    "text": "Configure:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "// deploy.json\r\n{\r\n    \"strategy\": \"rsync\",\r\n    \"host\": \"your-server.com\",\r\n    \"user\": \"deploy\",\r\n    \"path\": \"/var/www/myapp\",\r\n    \"exclude\": [\r\n        \".git\",\r\n        \"node_modules\",\r\n        \"storage/logs/*.log\",\r\n        \"vendor\"\r\n    ],\r\n    \"commands\": [\r\n        \"composer install --no-dev\",\r\n        \"php siro migrate --force\",\r\n        \"php siro optimize\"\r\n    ]\r\n}\r"
  },
  {
    "type": "p",
    "text": "Deploy:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro deploy\r"
  },
  {
    "type": "h3",
    "id": "strategy-3-custom-script",
    "text": "Strategy 3: Custom Script"
  },
  {
    "type": "p",
    "text": "Configure:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "// deploy.json\r\n{\r\n    \"strategy\": \"custom\",\r\n    \"script\": \"deploy.sh\"\r\n}\r"
  },
  {
    "type": "p",
    "text": "Create script:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "#!/bin/bash\r\n# deploy.sh\r\n\r\necho \"Starting deployment...\"\r\n\r\n# Pull latest code\r\ngit pull origin main\r\n\r\n# Install dependencies\r\ncomposer install --no-dev --optimize-autoloader\r\n\r\n# Run migrations\r\nphp siro migrate --force\r\n\r\n# Optimize\r\nphp siro config:cache\r\n\r\n# Restart services\r\nsudo systemctl restart php8.2-fpm\r\nsudo systemctl restart nginx\r\n\r\necho \"Deployment complete!\"\r"
  },
  {
    "type": "p",
    "text": "Deploy:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "chmod +x deploy.sh\r\nphp siro deploy\r"
  },
  {
    "type": "h2",
    "id": "server-configuration",
    "text": "🔧 Server Configuration"
  },
  {
    "type": "h3",
    "id": "ubuntu-vps-setup",
    "text": "Ubuntu VPS Setup"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Update system\r\nsudo apt update && sudo apt upgrade -y\r\n\r\n# Install PHP 8.2\r\nsudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-pgsql \\\r\n    php8.2-sqlite3 php8.2-mbstring php8.2-xml php8.2-curl \\\r\n    php8.2-zip php8.2-gd php8.2-intl\r\n\r\n# Install Nginx\r\nsudo apt install -y nginx\r\n\r\n# Install MySQL (optional)\r\nsudo apt install -y mysql-server\r\n\r\n# Install Composer\r\ncurl -sS https://getcomposer.org/installer | php\r\nsudo mv composer.phar /usr/local/bin/composer\r"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "sudo nano /etc/php/8.2/fpm/pool.d/www.conf\r"
  },
  {
    "type": "p",
    "text": "Settings:"
  },
  {
    "type": "code",
    "lang": "ini",
    "code": "pm = dynamic\r\npm.max_children = 50\r\npm.start_servers = 5\r\npm.min_spare_servers = 5\r\npm.max_spare_servers = 35\r\n\r\n; Increase memory limit if needed\r\nphp_admin_value[memory_limit] = 256M\r"
  },
  {
    "type": "p",
    "text": "Restart:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "sudo systemctl restart php8.2-fpm\r"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "sudo nano /etc/nginx/sites-available/myapp\r"
  },
  {
    "type": "p",
    "text": "Configuration:"
  },
  {
    "type": "code",
    "lang": "nginx",
    "code": "server {\r\n    listen 80;\r\n    server_name api.example.com;\r\n    root /var/www/myapp/public;\r\n    index index.php;\r\n\r\n    # Security headers\r\n    add_header X-Frame-Options DENY;\r\n    add_header X-Content-Type-Options nosniff;\r\n    add_header X-XSS-Protection \"1; mode=block\";\r\n    add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\";\r\n\r\n    # Gzip compression\r\n    gzip on;\r\n    gzip_types application/json text/xml application/xml;\r\n    gzip_min_length 1000;\r\n\r\n    location / {\r\n        try_files $uri $uri/ /index.php?$query_string;\r\n    }\r\n\r\n    location ~ \\.php$ {\r\n        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;\r\n        fastcgi_index index.php;\r\n        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;\r\n        include fastcgi_params;\r\n        \r\n        # Timeout settings\r\n        fastcgi_read_timeout 300;\r\n        fastcgi_send_timeout 300;\r\n    }\r\n\r\n    # Deny access to .env file\r\n    location ~ /\\.env {\r\n        deny all;\r\n    }\r\n\r\n    # Deny access to hidden files\r\n    location ~ /\\. {\r\n        deny all;\r\n    }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Enable site:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/\r\nsudo nginx -t\r\nsudo systemctl restart nginx\r"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Install Certbot\r\nsudo apt install -y certbot python3-certbot-nginx\r\n\r\n# Get SSL certificate\r\nsudo certbot --nginx -d api.example.com\r\n\r\n# Auto-renewal (already configured by certbot)\r\nsudo systemctl enable certbot.timer\r"
  },
  {
    "type": "h2",
    "id": "database-setup",
    "text": "🗄️ Database Setup"
  },
  {
    "type": "h3",
    "id": "mysql",
    "text": "MySQL"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Login to MySQL\r\nmysql -u root -p\r\n\r\n# Create database and user\r\nCREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\r\nCREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'strong_password';\r\nGRANT ALL PRIVILEGES ON myapp.* TO 'myapp_user'@'localhost';\r\nFLUSH PRIVILEGES;\r\nEXIT;\r"
  },
  {
    "type": "p",
    "text": ".env configuration:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "DB_CONNECTION=mysql\r\nDB_HOST=127.0.0.1\r\nDB_PORT=3306\r\nDB_DATABASE=myapp\r\nDB_USERNAME=myapp_user\r\nDB_PASSWORD=strong_password\r"
  },
  {
    "type": "h3",
    "id": "postgresql",
    "text": "PostgreSQL"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Login to PostgreSQL\r\nsudo -u postgres psql\r\n\r\n-- Create database and user\r\nCREATE DATABASE myapp;\r\nCREATE USER myapp_user WITH PASSWORD 'strong_password';\r\nGRANT ALL PRIVILEGES ON DATABASE myapp TO myapp_user;\r\n\\q\r"
  },
  {
    "type": "p",
    "text": ".env configuration:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "DB_CONNECTION=pgsql\r\nDB_HOST=127.0.0.1\r\nDB_PORT=5432\r\nDB_DATABASE=myapp\r\nDB_USERNAME=myapp_user\r\nDB_PASSWORD=strong_password\r"
  },
  {
    "type": "h3",
    "id": "sqlite-simple-deployments",
    "text": "SQLite (Simple deployments)"
  },
  {
    "type": "p",
    "text": ".env configuration:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "DB_CONNECTION=sqlite\r\nDB_DATABASE=/var/www/myapp/storage/database.sqlite\r"
  },
  {
    "type": "p",
    "text": "Create database file:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "touch storage/database.sqlite\r\nchmod 664 storage/database.sqlite\r\nchown www-data:www-data storage/database.sqlite\r"
  },
  {
    "type": "h2",
    "id": "security-hardening",
    "text": "🔐 Security Hardening"
  },
  {
    "type": "h3",
    "id": "1-file-permissions",
    "text": "1. File Permissions"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "cd /var/www/myapp\r\n\r\n# Set ownership\r\nsudo chown -R www-data:www-data .\r\n\r\n# Set permissions\r\nsudo find . -type f -exec chmod 644 {} \\;\r\nsudo find . -type d -exec chmod 755 {} \\;\r\n\r\n# Storage and cache directories\r\nsudo chmod -R 775 storage bootstrap/cache\r"
  },
  {
    "type": "h3",
    "id": "2-disable-dangerous-php-functions",
    "text": "2. Disable Dangerous PHP Functions"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "sudo nano /etc/php/8.2/fpm/php.ini\r"
  },
  {
    "type": "p",
    "text": "Add:"
  },
  {
    "type": "code",
    "lang": "ini",
    "code": "disable_functions = exec,passthru,shell_exec,system,proc_open,popen,curl_exec,curl_multi_exec,parse_ini_file,show_source\r"
  },
  {
    "type": "h3",
    "id": "3-configure-firewall",
    "text": "3. Configure Firewall"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Enable UFW\r\nsudo ufw enable\r\n\r\n# Allow SSH, HTTP, HTTPS\r\nsudo ufw allow 22/tcp\r\nsudo ufw allow 80/tcp\r\nsudo ufw allow 443/tcp\r\n\r\n# Block direct database access from outside\r\nsudo ufw deny 3306/tcp  # MySQL\r\nsudo ufw deny 5432/tcp  # PostgreSQL\r"
  },
  {
    "type": "h3",
    "id": "4-setup-log-rotation",
    "text": "4. Setup Log Rotation"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "sudo nano /etc/logrotate.d/myapp\r"
  },
  {
    "type": "p",
    "text": "Configuration:"
  },
  {
    "type": "code",
    "code": "/var/www/myapp/storage/logs/*.log {\r\n    daily\r\n    rotate 30\r\n    compress\r\n    delaycompress\r\n    missingok\r\n    notifempty\r\n    create 0644 www-data www-data\r\n}\r"
  },
  {
    "type": "h2",
    "id": "monitoring-maintenance",
    "text": "📊 Monitoring & Maintenance"
  },
  {
    "type": "h3",
    "id": "1-setup-cron-jobs",
    "text": "1. Setup Cron Jobs"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "crontab -e\r"
  },
  {
    "type": "p",
    "text": "Add:"
  },
  {
    "type": "code",
    "lang": "cron",
    "code": "# Run scheduler every minute\r\n* * * * * cd /var/www/myapp && php siro schedule:run >> /dev/null 2>&1\r\n\r\n# Process queue every minute\r\n* * * * * cd /var/www/myapp && php siro queue:work >> /dev/null 2>&1\r\n\r\n# Rotate logs weekly\r\n0 0 * * 0 find /var/www/myapp/storage/logs -name \"*.log\" -mtime +30 -delete\r"
  },
  {
    "type": "h3",
    "id": "2-monitor-performance",
    "text": "2. Monitor Performance"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Check slow requests\r\nphp siro slow\r\n\r\n# View trace logs\r\nphp siro log:trace --status=500\r\n\r\n# Check rate limits\r\nphp siro rate:status\r"
  },
  {
    "type": "h3",
    "id": "3-backup-database",
    "text": "3. Backup Database"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "#!/bin/bash\r\n# backup.sh\r\n\r\nDATE=$(date +%Y%m%d_%H%M%S)\r\nBACKUP_DIR=\"/backups/myapp\"\r\nmkdir -p $BACKUP_DIR\r\n\r\n# MySQL backup\r\nmysqldump -u myapp_user -p'strong_password' myapp > $BACKUP_DIR/db_$DATE.sql\r\n\r\n# Compress\r\ngzip $BACKUP_DIR/db_$DATE.sql\r\n\r\n# Delete old backups (keep 30 days)\r\nfind $BACKUP_DIR -name \"db_*.sql.gz\" -mtime +30 -delete\r\n\r\necho \"Backup completed: db_$DATE.sql.gz\"\r"
  },
  {
    "type": "p",
    "text": "Schedule:"
  },
  {
    "type": "code",
    "lang": "cron",
    "code": "0 2 * * * /var/www/myapp/backup.sh >> /var/log/backup.log 2>&1\r"
  },
  {
    "type": "h3",
    "id": "4-health-check-endpoint",
    "text": "4. Health Check Endpoint"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// routes/api.php\r\nRoute::get('/health', function () {\r\n    $checks = [\r\n        'database' => false,\r\n        'cache' => false,\r\n    ];\r\n    \r\n    // Check database\r\n    try {\r\n        DB::connection()->getPdo();\r\n        $checks['database'] = true;\r\n    } catch (\\Exception $e) {\r\n        // Database connection failed\r\n    }\r\n    \r\n    // Check cache\r\n    try {\r\n        Cache::put('health_check', true, 10);\r\n        $checks['cache'] = Cache::get('health_check');\r\n    } catch (\\Exception $e) {\r\n        // Cache failed\r\n    }\r\n    \r\n    $status = collect($checks)->every(fn($v) => $v) ? 200 : 503;\r\n    \r\n    return Response::json([\r\n        'status' => $status === 200 ? 'healthy' : 'unhealthy',\r\n        'checks' => $checks,\r\n        'timestamp' => now()->toIso8601String(),\r\n    ], $status);\r\n});\r"
  },
  {
    "type": "p",
    "text": "Monitor with uptime checker:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "curl https://api.example.com/api/health\r"
  },
  {
    "type": "h2",
    "id": "zero-downtime-deployment",
    "text": "🔄 Zero-Downtime Deployment"
  },
  {
    "type": "h3",
    "id": "using-maintenance-mode",
    "text": "Using Maintenance Mode"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# 1. Enable maintenance mode (allows your IP)\r\nphp siro down --allow=YOUR_IP_ADDRESS\r\n\r\n# 2. Deploy code\r\ngit pull origin main\r\ncomposer install --no-dev\r\nphp siro migrate --force\r\nphp siro optimize\r\n\r\n# 3. Test health endpoint\r\ncurl http://localhost/api/health\r\n\r\n# 4. Disable maintenance mode\r\nphp siro up\r"
  },
  {
    "type": "h3",
    "id": "blue-green-deployment-advanced",
    "text": "Blue-Green Deployment (Advanced)"
  },
  {
    "type": "p",
    "text": "Setup two directories:"
  },
  {
    "type": "code",
    "code": "/var/www/myapp-blue   (active)\r\n/var/www/myapp-green  (staging)\r"
  },
  {
    "type": "p",
    "text": "Nginx configuration:"
  },
  {
    "type": "code",
    "lang": "nginx",
    "code": "# Point to blue\r\nroot /var/www/myapp-blue/public;\r\n\r\n# Switch to green when ready\r\n# root /var/www/myapp-green/public;\r"
  },
  {
    "type": "p",
    "text": "Deploy process:"
  },
  {
    "type": "ol",
    "items": [
      "Deploy to inactive environment (green)",
      "Run tests on green",
      "Switch Nginx to point to green",
      "Old blue becomes staging for next deployment"
    ]
  },
  {
    "type": "h2",
    "id": "docker-deployment",
    "text": "🐳 Docker Deployment"
  },
  {
    "type": "h3",
    "id": "using-docker-compose",
    "text": "Using Docker Compose"
  },
  {
    "type": "code",
    "lang": "yaml",
    "code": "# docker-compose.prod.yml\r\nversion: '3.8'\r\n\r\nservices:\r\n  app:\r\n    build: .\r\n    volumes:\r\n      - ./storage:/var/www/html/storage\r\n    environment:\r\n      - APP_ENV=production\r\n      - APP_DEBUG=false\r\n    depends_on:\r\n      - db\r\n      - redis\r\n\r\n  db:\r\n    image: mysql:8.0\r\n    environment:\r\n      MYSQL_DATABASE: myapp\r\n      MYSQL_USER: myapp_user\r\n      MYSQL_PASSWORD: strong_password\r\n      MYSQL_ROOT_PASSWORD: root_password\r\n    volumes:\r\n      - mysql_data:/var/lib/mysql\r\n\r\n  redis:\r\n    image: redis:7-alpine\r\n\r\n  nginx:\r\n    image: nginx:alpine\r\n    ports:\r\n      - \"80:80\"\r\n      - \"443:443\"\r\n    volumes:\r\n      - ./docker/nginx.conf:/etc/nginx/conf.d/default.conf\r\n      - ./public:/var/www/html/public\r\n\r\nvolumes:\r\n  mysql_data:\r"
  },
  {
    "type": "p",
    "text": "Deploy:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "docker-compose -f docker-compose.prod.yml up -d\r\ndocker-compose -f docker-compose.prod.yml exec app php siro migrate --force\r\ndocker-compose -f docker-compose.prod.yml exec app php siro optimize\r"
  },
  {
    "type": "h2",
    "id": "troubleshooting",
    "text": "❓ Troubleshooting"
  },
  {
    "type": "h3",
    "id": "problem-502-bad-gateway",
    "text": "Problem: 502 Bad Gateway"
  },
  {
    "type": "p",
    "text": "Check:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# PHP-FPM status\r\nsudo systemctl status php8.2-fpm\r\n\r\n# Nginx error log\r\nsudo tail -f /var/log/nginx/error.log\r\n\r\n# PHP-FPM error log\r\nsudo tail -f /var/log/php8.2-fpm.log\r"
  },
  {
    "type": "h3",
    "id": "problem-permission-denied",
    "text": "Problem: Permission Denied"
  },
  {
    "type": "p",
    "text": "Fix:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "sudo chown -R www-data:www-data /var/www/myapp\r\nsudo chmod -R 775 storage bootstrap/cache\r"
  },
  {
    "type": "h3",
    "id": "problem-database-connection-failed",
    "text": "Problem: Database Connection Failed"
  },
  {
    "type": "p",
    "text": "Check:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Test connection\r\nphp -r \"require 'vendor/autoload.php'; var_dump(DB::connection()->getPdo());\"\r\n\r\n# Check credentials\r\ncat .env | grep DB_\r\n\r\n# Check MySQL status\r\nsudo systemctl status mysql\r"
  },
  {
    "type": "h3",
    "id": "problem-high-memory-usage",
    "text": "Problem: High Memory Usage"
  },
  {
    "type": "p",
    "text": "Optimize:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Check memory usage\r\nphp siro benchmark\r\n\r\n# Reduce PHP-FPM children\r\nsudo nano /etc/php/8.2/fpm/pool.d/www.conf\r\n# pm.max_children = 20 (reduce from 50)\r\n\r\nsudo systemctl restart php8.2-fpm\r"
  },
  {
    "type": "h2",
    "id": "additional-resources",
    "text": "📚 Additional Resources"
  },
  {
    "type": "ul",
    "items": [
      "**[Performance Guide](../PERFORMANCE.md)** - Optimization tips",
      "**[Security Guide](../SECURITY.md)** - Security best practices",
      "**[Nginx Documentation](https://nginx.org/en/docs/)**",
      "**[PHP-FPM Tuning](https://www.php.net/manual/en/install.fpm.configuration.php)**"
    ]
  },
  {
    "type": "p",
    "text": "Happy deploying! 🚀"
  }
],
}
