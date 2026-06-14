
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Schedule API Reference",
    description: "Schedule tasks to run at defined intervals, like cron jobs inside PHP.",
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
    "text": "Schedule tasks to run at defined intervals, like cron jobs inside PHP."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Schedule;\r"
  },
  {
    "type": "h2",
    "id": "define-tasks",
    "text": "Define Tasks"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In routes/schedule.php\r\n\r\nSchedule::command('log:cleanup')\r\n    ->daily();\r\n\r\nSchedule::command('queue:work --queue=emails')\r\n    ->everyMinute()\r\n    ->withoutOverlapping();\r\n\r\nSchedule::call(function () {\r\n    DB::table('sessions')->where('expires_at', '<', date('Y-m-d H:i:s'))->delete();\r\n})->hourly();\r"
  },
  {
    "type": "h2",
    "id": "frequency-methods",
    "text": "Frequency Methods"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Most common\r\nSchedule::command(...)->everyMinute();\r\nSchedule::command(...)->everyFiveMinutes();\r\nSchedule::command(...)->everyFifteenMinutes();\r\nSchedule::command(...)->everyThirtyMinutes();\r\nSchedule::command(...)->hourly();\r\nSchedule::command(...)->daily();\r\nSchedule::command(...)->dailyAt('03:00');\r\nSchedule::command(...)->weekly();\r\nSchedule::command(...)->monthly();\r\n\r\n// Custom cron\r\nSchedule::command(...)->cron('*/15 * * * *');\r"
  },
  {
    "type": "h2",
    "id": "constraints",
    "text": "Constraints"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Schedule::command('db:backup')\r\n    ->daily()\r\n    ->at('02:00')\r\n    ->withoutOverlapping()    // Don't run if previous still running\r\n    ->environments('production');  // Only in production\r"
  },
  {
    "type": "h2",
    "id": "run-scheduler",
    "text": "Run Scheduler"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Add this to your server's crontab (runs every minute)\r\n* * * * * cd /path/to/app && php siro schedule:run\r"
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
        "`command(string $command)`",
        "Schedule a CLI command"
      ],
      [
        "`call(callable $callback)`",
        "Schedule a PHP callback"
      ],
      [
        "`cron(string $expression)`",
        "Set custom cron expression"
      ],
      [
        "`everyMinute()`",
        "Every minute"
      ],
      [
        "`everyFiveMinutes()`",
        "Every 5 minutes"
      ],
      [
        "`everyFifteenMinutes()`",
        "Every 15 minutes"
      ],
      [
        "`everyThirtyMinutes()`",
        "Every 30 minutes"
      ],
      [
        "`hourly()`",
        "Every hour"
      ],
      [
        "`hourlyAt(int $minute)`",
        "At minute of every hour"
      ],
      [
        "`daily()`",
        "Every day at midnight"
      ],
      [
        "`dailyAt(string $time)`",
        "Every day at time (HH:MM)"
      ],
      [
        "`weekly()`",
        "Every week (Monday 00:00)"
      ],
      [
        "`monthly()`",
        "Every month (1st 00:00)"
      ],
      [
        "`at(string $time)`",
        "Set run time"
      ],
      [
        "`withoutOverlapping()`",
        "Prevent overlapping runs"
      ],
      [
        "`environments(array $envs)`",
        "Restrict to environments"
      ],
      [
        "`run(string $basePath)`",
        "Execute due tasks"
      ]
    ]
  }
],
}
