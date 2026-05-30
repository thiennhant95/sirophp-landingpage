
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Observers API Reference",
    description: "Observers hook into model lifecycle events — `creating`, `created`, `updating`, `updated`, `saving`, `saved`, `deleting`, `deleted`, `forceDeleting`, `forceDele",
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
    "text": "Observers hook into model lifecycle events — creating, created, updating, updated, saving, saved, deleting, deleted, forceDeleting, forceDeleted."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Observers\\ModelObserver;\r"
  },
  {
    "type": "h2",
    "id": "define-observer",
    "text": "Define Observer"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n\r\ndeclare(strict_types=1);\r\n\r\nnamespace App\\Observers;\r\n\r\nuse Siro\\Core\\Observers\\ModelObserver;\r\nuse Siro\\Core\\Model;\r\n\r\nclass ProductObserver extends ModelObserver\r\n{\r\n    public function creating(Model $model): void\r\n    {\r\n        // Auto-set slug before creation\r\n        $model->setAttribute('slug', str_slug($model->getAttribute('name')));\r\n    }\r\n\r\n    public function created(Model $model): void\r\n    {\r\n        // Log after creation\r\n        Logger::info('Product created', ['id' => $model->id, 'name' => $model->name]);\r\n    }\r\n\r\n    public function updating(Model $model): void\r\n    {\r\n        // Prevent price drops below cost\r\n        if ($model->getAttribute('price') < 10) {\r\n            throw new \\RuntimeException('Price too low');\r\n        }\r\n    }\r\n\r\n    public function deleted(Model $model): void\r\n    {\r\n        // Cleanup related data\r\n        Storage::delete('products/' . $model->id . '.jpg');\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "register-observer",
    "text": "Register Observer"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In routes/api.php or AppServiceProvider\r\nuse App\\Models\\Product;\r\nuse App\\Observers\\ProductObserver;\r\n\r\nProduct::observe(ProductObserver::class);\r"
  },
  {
    "type": "h2",
    "id": "available-hooks-10",
    "text": "Available Hooks (10)"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class MyObserver extends ModelObserver\r\n{\r\n    // Called in order:\r\n    public function saving(Model $model): void   {}    // Before any save\r\n    public function creating(Model $model): void {}    // Before insert\r\n    public function created(Model $model): void  {}    // After insert\r\n    public function saved(Model $model): void    {}    // After any save\r\n    public function updating(Model $model): void {}    // Before update\r\n    public function updated(Model $model): void  {}    // After update\r\n    public function deleting(Model $model): void {}    // Before delete\r\n    public function deleted(Model $model): void  {}    // After delete\r\n    public function forceDeleting(Model $model): void {} // Before force delete\r\n    public function forceDeleted(Model $model): void {}  // After force delete\r\n}\r"
  },
  {
    "type": "h2",
    "id": "use-cases",
    "text": "Use Cases"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Before save — auto-fill fields\r\npublic function saving(Model $model): void\r\n{\r\n    if ($model->getAttribute('slug') === null) {\r\n        $model->setAttribute('slug', str_slug($model->getAttribute('title')));\r\n    }\r\n}\r\n\r\n// Before delete — check constraints\r\npublic function deleting(Model $model): void\r\n{\r\n    if ($model->orders()->count() > 0) {\r\n        throw new \\RuntimeException('Cannot delete product with orders');\r\n    }\r\n}\r\n\r\n// After create — trigger side effects\r\npublic function created(Model $model): void\r\n{\r\n    Event::dispatch('product.created', ['id' => $model->id]);\r\n    Queue::push(new ProcessProductImages($model->id));\r\n}\r"
  }
],
}
