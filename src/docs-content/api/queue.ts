
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Queue API Reference",
    description: "Siro's queue system provides DB-based job processing with exponential backoff, timeouts, priority, and failed job retry.",
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
    "text": "Siro's queue system provides DB-based job processing with exponential backoff, timeouts, priority, and failed job retry."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Queue;\r"
  },
  {
    "type": "h2",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "# .env\r\nQUEUE_DRIVER=database\r\nQUEUE_RETRY_AFTER=60      # seconds before retry\r\nQUEUE_MAX_ATTEMPTS=3\r"
  },
  {
    "type": "p",
    "text": "Create the jobs table:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:queue-table\r\nphp siro migrate\r"
  },
  {
    "type": "h2",
    "id": "defining-jobs",
    "text": "Defining Jobs"
  },
  {
    "type": "h3",
    "id": "generate",
    "text": "Generate"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:job SendWelcomeEmail\r"
  },
  {
    "type": "h3",
    "id": "job-class",
    "text": "Job Class"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n\r\ndeclare(strict_types=1);\r\n\r\nnamespace App\\Jobs;\r\n\r\nuse Siro\\Core\\Job;\r\nuse App\\Models\\User;\r\n\r\nfinal class SendWelcomeEmail extends Job\r\n{\r\n    public function __construct(\r\n        private readonly int $userId,\r\n    ) {}\r\n\r\n    public function handle(): void\r\n    {\r\n        $user = User::find($this->userId);\r\n        if ($user === null) return;\r\n\r\n        Mail::to($user->email)->send(new WelcomeMail($user));\r\n    }\r\n\r\n    public function failed(\\Throwable $e): void\r\n    {\r\n        Logger::error('Welcome email failed', [\r\n            'user_id' => $this->userId,\r\n            'error' => $e->getMessage(),\r\n        ]);\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "dispatching-jobs",
    "text": "Dispatching Jobs"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Simple dispatch\r\nQueue::push(new SendWelcomeEmail($user->id));\r\n\r\n// Delayed dispatch (seconds)\r\nQueue::later(3600, new SendWelcomeEmail($user->id));\r\n\r\n// With priority (higher = sooner)\r\nQueue::push(new SendWelcomeEmail($user->id), priority: 10);\r"
  },
  {
    "type": "h2",
    "id": "processing-jobs",
    "text": "Processing Jobs"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Process next available job\r\nphp siro queue:work\r\n\r\n# Process continuously\r\nphp siro queue:work --daemon\r\n\r\n# Process specific queue\r\nphp siro queue:work --queue=emails\r"
  },
  {
    "type": "h2",
    "id": "job-properties",
    "text": "Job Properties"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class SendWelcomeEmail extends Job\r\n{\r\n    // Max retry attempts (default: 3)\r\n    public int $maxAttempts = 5;\r\n\r\n    // Timeout in seconds (default: 60)\r\n    public int $timeout = 30;\r\n\r\n    // Priority (higher = processed first)\r\n    public int $priority = 0;\r\n\r\n    // Queue name\r\n    public string $queue = 'default';\r\n}\r"
  },
  {
    "type": "h2",
    "id": "failed-jobs",
    "text": "Failed Jobs"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# List failed jobs\r\nphp siro queue:status\r\n\r\n# Retry all failed jobs\r\nphp siro queue:retry --all\r\n\r\n# Retry specific job\r\nphp siro queue:retry --id=42\r\n\r\n# Clear failed jobs\r\nphp siro queue:flush\r"
  },
  {
    "type": "h2",
    "id": "job-lifecycle",
    "text": "Job Lifecycle"
  },
  {
    "type": "code",
    "code": "dispatch → push to DB → queue:work picks up → handle()\r\n                                          ↓\r\n                                     on success → delete from DB\r\n                                          ↓\r\n                                     on failure → retry? → yes → wait + retry\r\n                                                          → no  → mark as failed\r"
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
        "`push(Job $job, int $delay, int $priority)`",
        "Push job to queue"
      ],
      [
        "`later(int $delay, Job $job)`",
        "Push job with delay"
      ],
      [
        "`work()`",
        "Process next job"
      ],
      [
        "`workAll()`",
        "Process all available jobs"
      ],
      [
        "`retryAll()`",
        "Retry all failed jobs"
      ],
      [
        "`failed()`",
        "Get all failed jobs"
      ],
      [
        "`flush()`",
        "Clear all failed jobs"
      ],
      [
        "`status()`",
        "Queue status and stats"
      ]
    ]
  }
],
}
