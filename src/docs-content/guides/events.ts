
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Event System Guide",
    description: "The event system provides a publish-subscribe pattern for decoupled communication.",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "h2",
    "id": "basics",
    "text": "Basics"
  },
  {
    "type": "p",
    "text": "The event system provides a publish-subscribe pattern for decoupled communication."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Event;\r\n\r\n// Register a listener\r\nEvent::on('user.registered', function (array $payload) {\r\n    // Handle the event\r\n    $userId = $payload['id'];\r\n    Logger::debug(\"User registered: $userId\");\r\n});\r\n\r\n// Emit an event\r\nEvent::emit('user.registered', ['id' => 1, 'email' => 'user@example.com']);\r"
  },
  {
    "type": "h2",
    "id": "api-reference",
    "text": "API Reference"
  },
  {
    "type": "h3",
    "id": "event-on",
    "text": "Event::on()"
  },
  {
    "type": "p",
    "text": "Register a permanent listener:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Event::on('order.placed', function ($order) {\r\n    // Process order\r\n});\r"
  },
  {
    "type": "h3",
    "id": "event-once",
    "text": "Event::once()"
  },
  {
    "type": "p",
    "text": "Register a listener that fires only once:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Event::once('app.booted', function () {\r\n    // Run initialization logic\r\n});\r\n\r\n// Second emit won't trigger\r\nEvent::emit('app.booted');  // triggers\r\nEvent::emit('app.booted');  // no-op\r"
  },
  {
    "type": "h3",
    "id": "event-emit",
    "text": "Event::emit()"
  },
  {
    "type": "p",
    "text": "Emit an event with optional payload:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Event::emit('event.name', $payload);\r"
  },
  {
    "type": "p",
    "text": "Returns true if all listeners completed, false if propagation was cancelled."
  },
  {
    "type": "h3",
    "id": "event-off",
    "text": "Event::off()"
  },
  {
    "type": "p",
    "text": "Remove all listeners for an event:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Event::off('user.registered');\r"
  },
  {
    "type": "h3",
    "id": "event-flush",
    "text": "Event::flush()"
  },
  {
    "type": "p",
    "text": "Remove all listeners for all events:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Event::flush();\r"
  },
  {
    "type": "h3",
    "id": "event-haslisteners",
    "text": "Event::hasListeners()"
  },
  {
    "type": "p",
    "text": "Check if an event has registered listeners:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "if (Event::hasListeners('user.registered')) {\r\n    // Has listeners\r\n}\r"
  },
  {
    "type": "h3",
    "id": "event-currentevent",
    "text": "Event::currentEvent()"
  },
  {
    "type": "p",
    "text": "Get the name of the currently firing event (useful in wildcard listeners):"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Event::on('users.*', function ($payload) {\r\n    $event = Event::currentEvent();  // 'users.created', 'users.updated', etc.\r\n    Logger::debug(\"$event fired\");\r\n});\r"
  },
  {
    "type": "h2",
    "id": "event-cancellation",
    "text": "Event Cancellation"
  },
  {
    "type": "p",
    "text": "A listener can cancel further propagation by returning false:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Event::on('user.deleting', function ($user) {\r\n    if ($user['is_protected']) {\r\n        return false;  // Cancels the delete, other listeners won't fire\r\n    }\r\n});\r"
  },
  {
    "type": "p",
    "text": "When cancelled, Event::emit() returns false."
  },
  {
    "type": "h2",
    "id": "wildcard-listeners",
    "text": "Wildcard Listeners"
  },
  {
    "type": "p",
    "text": "Listen for multiple events using * wildcard:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Event::on('users.*', function ($payload) {\r\n    // Catches: users.created, users.updated, users.deleted, etc.\r\n});\r"
  },
  {
    "type": "h2",
    "id": "model-lifecycle-events",
    "text": "Model Lifecycle Events"
  },
  {
    "type": "p",
    "text": "Models automatically fire events during CRUD operations:"
  },
  {
    "type": "table",
    "headers": [
      "Event Name",
      "When",
      "Can Cancel"
    ],
    "rows": [
      [
        "`{table}.creating`",
        "Before insert",
        "Yes (return `false`)"
      ],
      [
        "`{table}.created`",
        "After insert",
        "No"
      ],
      [
        "`{table}.saving`",
        "Before save",
        "Yes (return `false`)"
      ],
      [
        "`{table}.saved`",
        "After save",
        "No"
      ],
      [
        "`{table}.deleting`",
        "Before delete",
        "Yes (return `false`)"
      ],
      [
        "`{table}.deleted`",
        "After delete",
        "No"
      ]
    ]
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// The `creating`/`saving`/`deleting` events receive the Model instance\r\nEvent::on('users.creating', function ($model) {\r\n    $model->token_version = 1;\r\n});\r\n\r\n// The `created`/`saved`/`deleted` events receive no arguments\r\nEvent::on('users.created', function () {\r\n    Logger::debug('User was created');\r\n});\r\n\r\n// Block deletion of protected users\r\nEvent::on('users.deleting', function ($model) {\r\n    if ($model->role === 'superadmin') {\r\n        return false;  // Prevent deletion\r\n    }\r\n});\r"
  },
  {
    "type": "h2",
    "id": "custom-events",
    "text": "Custom Events"
  },
  {
    "type": "p",
    "text": "Create dedicated event classes for better organization:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:event UserCreated\r"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Usage\r\nEvent::emit('user.created', ['id' => 1, 'email' => 'user@example.com']);\r\n\r\n// Register listener\r\nEvent::on('user.created', function ($payload) {\r\n    // Handle event\r\n});\r"
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "ul",
    "items": [
      "Use events to decouple side effects (logging, notifications, analytics) from core logic.",
      "Keep event names namespaced: `{context}.{action}` (e.g. `order.placed`, `payment.failed`).",
      "Use wildcard listeners sparingly — prefer specific event names.",
      "Return `false` from lifecycle `*ing` events to conditionally prevent the operation.",
      "Always flush events between tests: `Event::flush()`."
    ]
  }
],
}
