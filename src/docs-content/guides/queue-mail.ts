
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Queue & Mail Guide",
    description: "The queue system processes background jobs asynchronously using a database-driven queue.",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "h2",
    "id": "queue-system",
    "text": "Queue System"
  },
  {
    "type": "p",
    "text": "The queue system processes background jobs asynchronously using a database-driven queue."
  },
  {
    "type": "h3",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "QUEUE_DRIVER=database\r\nQUEUE_DEFAULT_MAX_ATTEMPTS=3\r"
  },
  {
    "type": "p",
    "text": "Requires a jobs table (created by the default migration)."
  },
  {
    "type": "h3",
    "id": "pushing-jobs",
    "text": "Pushing Jobs"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Queue;\r\n\r\n// Push a job to the default queue\r\nQueue::push(SendWelcomeEmail::class, [\r\n    'email' => 'user@example.com',\r\n    'name' => 'John',\r\n]);\r\n\r\n// With delay (seconds)\r\nQueue::push(SendWelcomeEmail::class, ['email' => 'user@example.com'], 3600);\r\n\r\n// With priority (higher = processed first)\r\nQueue::push(UrgentJob::class, $data, 0, 10);\r\n\r\n// With custom max attempts\r\nQueue::push(FailableJob::class, $data, 0, 0, 5);\r"
  },
  {
    "type": "h3",
    "id": "writing-jobs",
    "text": "Writing Jobs"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "namespace App\\Jobs;\r\n\r\nfinal class SendWelcomeEmail\r\n{\r\n    public function handle(array $data = []): void\r\n    {\r\n        $email = $data['email'] ?? '';\r\n        $name = $data['name'] ?? 'User';\r\n\r\n        if ($email === '') {\r\n            return;\r\n        }\r\n\r\n        Mail::to($email)\r\n            ->subject('Welcome to our platform!')\r\n            ->html('<h1>Welcome, ' . htmlspecialchars($name) . '!</h1>')\r\n            ->send();\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "processing-jobs",
    "text": "Processing Jobs"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro queue:work              # Process one job\r\nphp siro queue:work --daemon     # Run continuously\r\nphp siro queue:status            # Show queue status\r\nphp siro queue:retry <id>        # Retry failed job\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In code\r\nQueue::work();              // Process next available job\r\n$count = Queue::workAll();  // Process all available jobs (returns count)\r"
  },
  {
    "type": "h3",
    "id": "queue-status",
    "text": "Queue Status"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$pending = Queue::pendingCount();   // Number of pending jobs\r\n$failed = Queue::failedCount();     // Number of failed jobs\r"
  },
  {
    "type": "h3",
    "id": "failed-jobs",
    "text": "Failed Jobs"
  },
  {
    "type": "p",
    "text": "When a job exceeds max attempts, it moves to the failed_jobs table:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro queue:retry <id>    # Retry specific failed job\r"
  },
  {
    "type": "h2",
    "id": "mail-system",
    "text": "Mail System"
  },
  {
    "type": "h3",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "MAIL_DRIVER=sendmail                 # or: smtp\r\nMAIL_FROM_ADDRESS=noreply@localhost\r\nMAIL_FROM_NAME=\"Siro API\"\r\n\r\n# SMTP settings (when MAIL_DRIVER=smtp)\r\nMAIL_HOST=smtp.example.com\r\nMAIL_PORT=587\r\nMAIL_USERNAME=user\r\nMAIL_PASSWORD=pass\r"
  },
  {
    "type": "p",
    "text": "Config file: config/mail.php loads from .env."
  },
  {
    "type": "h3",
    "id": "sending-mail",
    "text": "Sending Mail"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Mail;\r\n\r\n// Basic email\r\nMail::to('user@example.com')\r\n    ->subject('Welcome!')\r\n    ->html('<h1>Hello</h1><p>Welcome to our platform.</p>')\r\n    ->send();\r"
  },
  {
    "type": "h3",
    "id": "mail-templates",
    "text": "Mail Templates"
  },
  {
    "type": "p",
    "text": "Create reusable mail classes:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "namespace App\\Mails;\r\n\r\nfinal class WelcomeMail\r\n{\r\n    public function build(array $data = []): string\r\n    {\r\n        $name = $data['name'] ?? 'User';\r\n        $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');\r\n\r\n        return '<!DOCTYPE html>\r\n<html>\r\n<head><meta charset=\"utf-8\"></head>\r\n<body style=\"font-family: sans-serif;\">\r\n    <h1>Welcome, ' . $safeName . '!</h1>\r\n    <p>Thank you for joining us.</p>\r\n</body>\r\n</html>';\r\n    }\r\n}\r\n\r\n// Usage\r\nMail::to('user@example.com')\r\n    ->subject('Welcome!')\r\n    ->html((new WelcomeMail())->build(['name' => 'John']))\r\n    ->send();\r"
  },
  {
    "type": "h3",
    "id": "queueing-mail",
    "text": "Queueing Mail"
  },
  {
    "type": "p",
    "text": "Send emails asynchronously via the queue:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Queue the email (processed by queue worker)\r\nMail::to('queued@test.com')\r\n    ->subject('Queued Email')\r\n    ->html('<p>This email was queued.</p>')\r\n    ->queue();  // Pushes SendMailJob to the queue\r\n\r\n// Process queued mails\r\nphp siro queue:work\r"
  },
  {
    "type": "p",
    "text": "The SendMailJob reconstructs the mail from serialized data including to, subject, body, content_type, cc, bcc, reply_to, and attachments."
  },
  {
    "type": "h3",
    "id": "smtp-configuration",
    "text": "SMTP Configuration"
  },
  {
    "type": "p",
    "text": "For production, use SMTP with TLS:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "MAIL_DRIVER=smtp\r\nMAIL_HOST=smtp.sendgrid.net\r\nMAIL_PORT=587\r\nMAIL_USERNAME=apikey\r\nMAIL_PASSWORD=SG.xxxxx\r\nMAIL_FROM_ADDRESS=noreply@yourdomain.com\r\nMAIL_FROM_NAME=\"Your App\"\r"
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "ul",
    "items": [
      "Always queue emails in production to avoid blocking HTTP responses.",
      "Run `php siro queue:work --daemon` as a supervised background process.",
      "Monitor failed jobs and set up alerts for repeated failures.",
      "Use descriptive job class names that reflect the action (e.g. `SendWelcomeEmail`).",
      "Keep job handlers idempotent — they may be retried.",
      "Set realistic timeouts for jobs that make external HTTP calls."
    ]
  }
],
}
