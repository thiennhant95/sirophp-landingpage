
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Helpers Reference",
    description: "Siro provides debug helpers available globally. No `use` statement needed.",
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
    "text": "Siro provides debug helpers available globally. No use statement needed."
  },
  {
    "type": "h2",
    "id": "sd-siro-dump",
    "text": "`sd()` (Siro Dump)"
  },
  {
    "type": "p",
    "text": "Dump variable(s) and stop execution. dd() also available as alias."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "sd($variable);\r\nsd($request, $user, $query);  // Multiple values\r\nsd($data);\r\n\r\n// Or use the Laravel-compatible alias:\r\ndd($variable);\r"
  },
  {
    "type": "p",
    "text": "Output:"
  },
  {
    "type": "code",
    "code": "array:3 [\r\n  \"name\" => \"John\"\r\n  \"email\" => \"john@test.com\"\r\n  \"role\" => \"admin\"\r\n]\r"
  },
  {
    "type": "h2",
    "id": "dump",
    "text": "`dump()`"
  },
  {
    "type": "p",
    "text": "Dump variable and continue execution (does not stop)."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "dump($query->toSql());   // See the SQL being built\r\ndump($user);             // Inspect user data\r"
  },
  {
    "type": "p",
    "text": "Useful inside loops or middleware for debugging without breaking the flow."
  },
  {
    "type": "h2",
    "id": "when-to-use",
    "text": "When to Use"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In Controller — debug request data\r\npublic function store(Request $request): Response\r\n{\r\n    dump($request->all());  // See what's coming in (continues)\r\n    sd($request->user());   // See user, then stop\r\n}\r\n\r\n// In QueryBuilder — debug SQL\r\n$query = Product::query()->where('price', '>', 100);\r\ndump($query);               // See the query object\r\n$results = $query->get();\r\n\r\n// In tests\r\npublic function test_example(): void\r\n{\r\n    $response = $this->get('/api/users');\r\n    sd($response->json());  // See full response\r\n}\r"
  },
  {
    "type": "note",
    "variant": "info",
    "text": "**Pro tip**: In production, `sd()` and `dump()` are disabled when `APP_DEBUG=false`. Your app won't crash if you accidentally leave them in code."
  }
],
}
