
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Str API Reference",
    description: "String manipulation utilities — slug generation, case conversion, truncation, pluralization. All methods are UTF-8 safe.",
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
    "text": "String manipulation utilities — slug generation, case conversion, truncation, pluralization. All methods are UTF-8 safe."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Str;\r"
  },
  {
    "type": "h2",
    "id": "case-conversion",
    "text": "Case Conversion"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Str::camel('hello_world');    // 'helloWorld'\r\nStr::studly('hello_world');   // 'HelloWorld'\r\nStr::snake('helloWorld');     // 'hello_world'\r\nStr::kebab('helloWorld');     // 'hello-world'\r\nStr::title('hello world');    // 'Hello World'\r\nStr::upper('hello');          // 'HELLO'\r\nStr::lower('HELLO');          // 'hello'\r\nStr::ucfirst('hello');        // 'Hello'\r"
  },
  {
    "type": "h2",
    "id": "slug",
    "text": "Slug"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Str::slug('Hello World');             // 'hello-world'\r\nStr::slug('Siro API v2!');            // 'siro-api-v2'\r\nStr::slug('Cửa hàng sách', '-');      // 'cua-hang-sach'\r"
  },
  {
    "type": "h2",
    "id": "truncation",
    "text": "Truncation"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Str::limit('A very long string here...', 10);    // 'A very lon...'\r\nStr::words('Hello world from Siro', 2);           // 'Hello world...'\r"
  },
  {
    "type": "h2",
    "id": "inspection",
    "text": "Inspection"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Str::contains('hello@test.com', '@');     // true\r\nStr::startsWith('siro-api', 'siro');      // true\r\nStr::endsWith('photo.jpg', '.jpg');       // true\r\nStr::length('Hello');                     // 5\r\nStr::isJson('{\"key\":\"value\"}');           // true\r"
  },
  {
    "type": "h2",
    "id": "extraction",
    "text": "Extraction"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Str::after('user@domain.com', '@');       // 'domain.com'\r\nStr::before('user@domain.com', '@');      // 'user'\r\nStr::substr('Hello World', 0, 5);         // 'Hello'\r"
  },
  {
    "type": "h2",
    "id": "generation",
    "text": "Generation"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Str::random(16);    // 'a1b2c3d4e5f6g7h8'\r\nStr::random(32);    // 32 random alphanumeric chars\r"
  },
  {
    "type": "h2",
    "id": "modification",
    "text": "Modification"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Str::padBoth('Siro', 10, '-');      // '---Siro---'\r\nStr::replace('Hello {name}', '{name}', 'World');  // Hello World\r"
  },
  {
    "type": "h2",
    "id": "pluralization",
    "text": "Pluralization"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Str::plural('user');        // 'users'\r\nStr::plural('category');    // 'categories'\r\nStr::plural('child');       // 'children'\r\nStr::singular('users');     // 'user'\r\nStr::singular('categories'); // 'category'\r"
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
        "`slug(string $value, string $separator)`",
        "URL-friendly slug"
      ],
      [
        "`camel(string $value)`",
        "camelCase"
      ],
      [
        "`studly(string $value)`",
        "StudlyCase"
      ],
      [
        "`snake(string $value)`",
        "snake_case"
      ],
      [
        "`kebab(string $value)`",
        "kebab-case"
      ],
      [
        "`title(string $value)`",
        "Title Case"
      ],
      [
        "`upper(string $value)`",
        "UPPERCASE"
      ],
      [
        "`lower(string $value)`",
        "lowercase"
      ],
      [
        "`ucfirst(string $value)`",
        "Ucfirst"
      ],
      [
        "`limit(string $value, int $limit, string $end)`",
        "Truncate by chars"
      ],
      [
        "`words(string $value, int $words, string $end)`",
        "Truncate by words"
      ],
      [
        "`contains(string $haystack, string $needle)`",
        "Check substring"
      ],
      [
        "`startsWith(string $haystack, string $needle)`",
        "Check prefix"
      ],
      [
        "`endsWith(string $haystack, string $needle)`",
        "Check suffix"
      ],
      [
        "`after(string $value, string $search)`",
        "Everything after"
      ],
      [
        "`before(string $value, string $search)`",
        "Everything before"
      ],
      [
        "`substr(string $value, int $start, ?int $length)`",
        "Substring"
      ],
      [
        "`random(int $length)`",
        "Random string"
      ],
      [
        "`padBoth(string $value, int $length, string $pad)`",
        "Pad both sides"
      ],
      [
        "`replace(string $value, string $search, string $replace)`",
        "String replace"
      ],
      [
        "`length(string $value)`",
        "String length"
      ],
      [
        "`isJson(string $value)`",
        "Check if JSON"
      ],
      [
        "`plural(string $value)`",
        "Pluralize"
      ],
      [
        "`singular(string $value)`",
        "Singularize"
      ]
    ]
  }
],
}
