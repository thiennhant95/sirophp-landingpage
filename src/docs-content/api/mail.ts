
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Mail API Reference",
    description: "Siro's mail system supports sending via SMTP (with STARTTLS), sendmail, and log driver. Emails can be queued for async sending.",
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
    "text": "Siro's mail system supports sending via SMTP (with STARTTLS), sendmail, and log driver. Emails can be queued for async sending."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Mail;\r"
  },
  {
    "type": "h2",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "MAIL_DRIVER=log              # log, smtp, sendmail\r\nMAIL_HOST=smtp.mailtrap.io\r\nMAIL_PORT=2525\r\nMAIL_USERNAME=\r\nMAIL_PASSWORD=\r\nMAIL_FROM_ADDRESS=noreply@example.com\r\nMAIL_FROM_NAME=\"Siro API\"\r\nMAIL_SSL_VERIFY=true         # false for dev (MITM risk)\r"
  },
  {
    "type": "h2",
    "id": "sending-mail",
    "text": "Sending Mail"
  },
  {
    "type": "h3",
    "id": "simple-email",
    "text": "Simple Email"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Mail::to('user@example.com')\r\n    ->subject('Welcome to Siro')\r\n    ->html('<h1>Welcome!</h1><p>Thanks for joining.</p>')\r\n    ->send();\r"
  },
  {
    "type": "h3",
    "id": "using-mail-classes",
    "text": "Using Mail Classes"
  },
  {
    "type": "p",
    "text": "Generate:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:mail WelcomeMail\r"
  },
  {
    "type": "p",
    "text": "Define:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n\r\ndeclare(strict_types=1);\r\n\r\nnamespace App\\Mails;\r\n\r\nuse Siro\\Core\\Mail;\r\n\r\nfinal class WelcomeMail extends Mail\r\n{\r\n    public function __construct(\r\n        private readonly string $name,\r\n        private readonly string $email,\r\n    ) {}\r\n\r\n    public function build(): void\r\n    {\r\n        $this->to($this->email)\r\n            ->subject('Welcome, ' . $this->name)\r\n            ->html($this->renderTemplate())\r\n            ->attach('/path/to/guide.pdf');\r\n    }\r\n\r\n    private function renderTemplate(): string\r\n    {\r\n        return \"<h1>Welcome {$this->name}!</h1><p>Thanks for joining Siro.</p>\";\r\n    }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Send:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Mail::send(new WelcomeMail($user->name, $user->email));\r"
  },
  {
    "type": "h2",
    "id": "attachments",
    "text": "Attachments"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Mail::to('user@example.com')\r\n    ->subject('Invoice')\r\n    ->html('<p>Your invoice is attached.</p>')\r\n    ->attach('/path/to/invoice.pdf')\r\n    ->attach('/path/to/terms.pdf', ['name' => 'terms.pdf'])\r\n    ->send();\r"
  },
  {
    "type": "h2",
    "id": "async-queuing",
    "text": "Async Queuing"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Queue email (requires queue worker running)\r\nMail::to('user@example.com')\r\n    ->subject('Welcome')\r\n    ->html('<h1>Welcome</h1>')\r\n    ->queue();\r\n\r\n// Delay delivery\r\nMail::to('user@example.com')\r\n    ->subject('Follow-up')\r\n    ->html('<h1>How are you?</h1>')\r\n    ->later(3600); // 1 hour later\r"
  },
  {
    "type": "p",
    "text": "Process queue:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro queue:work\r"
  },
  {
    "type": "h2",
    "id": "mail-drivers",
    "text": "Mail Drivers"
  },
  {
    "type": "table",
    "headers": [
      "Driver",
      "Use Case",
      "Config"
    ],
    "rows": [
      [
        "`log`",
        "Development",
        "Writes to `storage/logs/mail.log`"
      ],
      [
        "`smtp`",
        "Production",
        "SMTP server with optional STARTTLS"
      ],
      [
        "`sendmail`",
        "Production",
        "Local sendmail binary"
      ]
    ]
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
        "`to(string $email)`",
        "Set recipient"
      ],
      [
        "`subject(string $subject)`",
        "Set subject"
      ],
      [
        "`html(string $content)`",
        "Set HTML body"
      ],
      [
        "`text(string $content)`",
        "Set plain text body"
      ],
      [
        "`attach(string $path, array $options)`",
        "Attach file"
      ],
      [
        "`from(string $address, string $name)`",
        "Override sender"
      ],
      [
        "`send()`",
        "Send synchronously"
      ],
      [
        "`queue()`",
        "Queue for async sending"
      ],
      [
        "`later(int $delay)`",
        "Queue with delay"
      ],
      [
        "`cc(string $email)`",
        "Add CC recipient"
      ],
      [
        "`bcc(string $email)`",
        "Add BCC recipient"
      ],
      [
        "`replyTo(string $email)`",
        "Set Reply-To header"
      ]
    ]
  }
],
}
