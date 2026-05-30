
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "SoftDeletes Reference",
    description: "Soft deletes mark records as \"deleted\" without removing them from the database. Deleted records have a `deleted_at` timestamp set instead of being dropped.",
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
    "text": "Soft deletes mark records as \"deleted\" without removing them from the database. Deleted records have a deleted_at timestamp set instead of being dropped."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\DB\\SoftDeletes;\r"
  },
  {
    "type": "h2",
    "id": "setup",
    "text": "Setup"
  },
  {
    "type": "h3",
    "id": "migration",
    "text": "Migration"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In your migration\r\n$t->timestamp('deleted_at')->nullable();\r"
  },
  {
    "type": "h3",
    "id": "model",
    "text": "Model"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\DB\\SoftDeletes;\r\n\r\nclass Product extends Model\r\n{\r\n    use SoftDeletes;\r\n\r\n    protected string $table = 'products';\r\n}\r"
  },
  {
    "type": "h2",
    "id": "usage",
    "text": "Usage"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Soft delete — sets deleted_at, record stays in DB\r\n$product = Product::find(1);\r\n$product->delete();\r\n// Product still exists, but deleted_at is set\r\n\r\n// Check if trashed\r\n$product->trashed();  // true\r\n\r\n// Include trashed in results\r\n$products = Product::withTrashed()->get();\r\n\r\n// Only trashed\r\n$products = Product::onlyTrashed()->get();\r\n\r\n// Restore\r\n$product->restore();  // Sets deleted_at = null\r\n\r\n// Force delete (permanent)\r\n$product->forceDelete();  // Removes from DB entirely\r"
  },
  {
    "type": "h2",
    "id": "query-scopes",
    "text": "Query Scopes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Normal query — excludes soft-deleted\r\n$products = Product::where('price', '>', 100)->get();\r\n\r\n// Include deleted\r\n$products = Product::withTrashed()\r\n    ->where('category', 'electronics')\r\n    ->get();\r\n\r\n// Only deleted\r\n$products = Product::onlyTrashed()->get();\r\n\r\n// Count including deleted\r\n$total = Product::withTrashed()->count();\r"
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
        "`delete()`",
        "Soft delete (set `deleted_at`)"
      ],
      [
        "`forceDelete()`",
        "Permanently delete from DB"
      ],
      [
        "`restore()`",
        "Restore soft-deleted record"
      ],
      [
        "`trashed()`",
        "Check if record is soft-deleted"
      ],
      [
        "`withTrashed()`",
        "Include soft-deleted in query"
      ],
      [
        "`onlyTrashed()`",
        "Only soft-deleted in query"
      ]
    ]
  }
],
}
