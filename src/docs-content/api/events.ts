
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Events API Reference",
    description: "Siro's event system provides pub/sub communication with wildcard pattern matching and one-time listeners.",
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
    "text": "Siro's event system provides pub/sub communication with wildcard pattern matching and one-time listeners."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Event;\r"
  },
  {
    "type": "h2",
    "id": "defining-events",
    "text": "Defining Events"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n\r\ndeclare(strict_types=1);\r\n\r\nnamespace App\\Events;\r\n\r\nfinal class UserCreatedEvent\r\n{\r\n    public function __construct(\r\n        public readonly int $userId,\r\n        public readonly string $email,\r\n    ) {}\r\n}\r"
  },
  {
    "type": "h2",
    "id": "dispatching-events",
    "text": "Dispatching Events"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Dispatch with payload\r\nEvent::dispatch(new UserCreatedEvent($user->id, $user->email));\r\n\r\n// Dispatch with string name + payload\r\nEvent::dispatch('user.created', ['user_id' => $user->id, 'email' => $user->email]);\r\n\r\n// Dispatch with wildcard\r\nEvent::dispatch('user.*', $data);\r"
  },
  {
    "type": "h2",
    "id": "listening-to-events",
    "text": "Listening to Events"
  },
  {
    "type": "h3",
    "id": "in-routes-api-php",
    "text": "In `routes/api.php`"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use App\\Events\\UserCreatedEvent;\r\nuse App\\Listeners\\SendWelcomeEmailListener;\r\n\r\n// Class-based listener\r\nEvent::listen(UserCreatedEvent::class, SendWelcomeEmailListener::class);\r\n\r\n// Closure listener\r\nEvent::listen(UserCreatedEvent::class, function (UserCreatedEvent $event): void {\r\n    Mail::to($event->email)->send(new WelcomeMail($event->userId));\r\n});\r\n\r\n// Wildcard listener\r\nEvent::listen('user.*', function (string $event, array $data): void {\r\n    Logger::info(\"User event: {$event}\", $data);\r\n});\r"
  },
  {
    "type": "h2",
    "id": "listener-classes",
    "text": "Listener Classes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n\r\ndeclare(strict_types=1);\r\n\r\nnamespace App\\Listeners;\r\n\r\nuse App\\Events\\UserCreatedEvent;\r\n\r\nfinal class SendWelcomeEmailListener\r\n{\r\n    public function handle(UserCreatedEvent $event): void\r\n    {\r\n        // Send welcome email\r\n        Mail::to($event->email)->send(new WelcomeMail($event->userId));\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "generate-listener",
    "text": "Generate Listener"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:listener SendWelcomeEmail\r"
  },
  {
    "type": "h2",
    "id": "one-time-listeners",
    "text": "One-Time Listeners"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Listener runs once, then removed\r\nEvent::listenOnce('user.created', function ($event): void {\r\n    Logger::info('First user created');\r\n});\r"
  },
  {
    "type": "h2",
    "id": "stopping-propagation",
    "text": "Stopping Propagation"
  },
  {
    "type": "p",
    "text": "Return false from a listener to stop event propagation:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Event::listen('user.created', function ($event): void {\r\n    if ($this->shouldBlock()) {\r\n        return false; // Stops further listeners\r\n    }\r\n});\r"
  },
  {
    "type": "h2",
    "id": "model-events",
    "text": "Model Events"
  },
  {
    "type": "p",
    "text": "Models automatically dispatch lifecycle events:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Available model events\r\nEvent::listen('model.creating', function ($model): void {});\r\nEvent::listen('model.created', function ($model): void {});\r\nEvent::listen('model.saving', function ($model): void {});\r\nEvent::listen('model.saved', function ($model): void {});\r\nEvent::listen('model.updating', function ($model): void {});\r\nEvent::listen('model.updated', function ($model): void {});\r\nEvent::listen('model.deleting', function ($model): void {});\r\nEvent::listen('model.deleted', function ($model): void {});\r"
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
        "`listenOnce(string $event, callable $listener)`",
        "Register one-time listener"
      ],
      [
        "`removeListener(string $event, callable $listener)`",
        "Remove listener"
      ],
      [
        "`getListeners(string $event)`",
        "Get all listeners for event"
      ],
      [
        "`hasListeners(string $event)`",
        "Check if event has listeners"
      ],
      [
        "`flush()`",
        "Remove all listeners"
      ]
    ]
  }
],
}
