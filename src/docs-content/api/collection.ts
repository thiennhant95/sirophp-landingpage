
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Collection API Reference",
    description: "Collections provide a fluent, chainable wrapper around arrays with 30+ helper methods. Think of them as \"arrays with superpowers.\"",
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
    "text": "Collections provide a fluent, chainable wrapper around arrays with 30+ helper methods. Think of them as \"arrays with superpowers.\""
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Collection;\r"
  },
  {
    "type": "h2",
    "id": "creating-collections",
    "text": "Creating Collections"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// From array\r\n$collection = new Collection([1, 2, 3, 4, 5]);\r\n\r\n// Static factory\r\n$collection = Collection::make([1, 2, 3]);\r\n\r\n// From query results\r\n$users = Collection::make($usersData);\r"
  },
  {
    "type": "h2",
    "id": "basic-operations",
    "text": "Basic Operations"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$col = Collection::make([1, 2, 3]);\r\n\r\n$col->count();        // 3\r\n$col->isEmpty();      // false\r\n$col->isNotEmpty();   // true\r\n$col->first();        // 1\r\n$col->last();         // 3\r"
  },
  {
    "type": "h2",
    "id": "transformations",
    "text": "Transformations"
  },
  {
    "type": "h3",
    "id": "map",
    "text": "map"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$col = Collection::make([1, 2, 3]);\r\n$doubled = $col->map(fn($n) => $n * 2);\r\n// [2, 4, 6]\r"
  },
  {
    "type": "h3",
    "id": "filter",
    "text": "filter"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$col = Collection::make([1, 2, 3, 4, 5]);\r\n$evens = $col->filter(fn($n) => $n % 2 === 0);\r\n// [2, 4]\r"
  },
  {
    "type": "h3",
    "id": "pluck",
    "text": "pluck"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$users = Collection::make([\r\n    ['id' => 1, 'name' => 'Alice'],\r\n    ['id' => 2, 'name' => 'Bob'],\r\n]);\r\n\r\n$names = $users->pluck('name');\r\n// ['Alice', 'Bob']\r\n\r\n$keyed = $users->pluck('name', 'id');\r\n// [1 => 'Alice', 2 => 'Bob']\r"
  },
  {
    "type": "h3",
    "id": "reduce",
    "text": "reduce"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$total = Collection::make([1, 2, 3])->reduce(fn($carry, $n) => $carry + $n, 0);\r\n// 6\r"
  },
  {
    "type": "h2",
    "id": "filtering",
    "text": "Filtering"
  },
  {
    "type": "h3",
    "id": "where",
    "text": "where"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$products = Collection::make([\r\n    ['name' => 'Laptop', 'price' => 999, 'stock' => 5],\r\n    ['name' => 'Mouse', 'price' => 25, 'stock' => 100],\r\n    ['name' => 'Keyboard', 'price' => 75, 'stock' => 0],\r\n]);\r\n\r\n$available = $products->where('stock', '>', 0);\r\n// [['name' => 'Laptop', ...], ['name' => 'Mouse', ...]]\r\n\r\n$cheap = $products->where('price', '<', 100);\r\n// [['name' => 'Mouse', ...], ['name' => 'Keyboard', ...]]\r"
  },
  {
    "type": "h3",
    "id": "wherein",
    "text": "whereIn"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$filtered = $products->whereIn('name', ['Laptop', 'Keyboard']);\r"
  },
  {
    "type": "h3",
    "id": "reject",
    "text": "reject"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$inStock = $products->reject(fn($p) => $p['stock'] === 0);\r"
  },
  {
    "type": "h2",
    "id": "sorting",
    "text": "Sorting"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$sorted = $collection->sort('price', 'asc');\r\n$sorted = $collection->sortByDesc('price');\r\n$reversed = $collection->reverse();\r"
  },
  {
    "type": "h2",
    "id": "aggregates",
    "text": "Aggregates"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$prices = Collection::make([10, 20, 30, 40]);\r\n\r\n$prices->sum();      // 100\r\n$prices->avg();      // 25\r\n$prices->min();      // 10\r\n$prices->max();      // 40\r"
  },
  {
    "type": "h2",
    "id": "array-operations",
    "text": "Array Operations"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$col = Collection::make([1, 2, 3]);\r\n\r\n$col->push(4);          // [1, 2, 3, 4]\r\n$col->pop();            // returns 4, collection becomes [1, 2, 3]\r\n$col->shift();          // returns 1, collection becomes [2, 3]\r\n$col->unshift(0);       // [0, 1, 2, 3]\r"
  },
  {
    "type": "h3",
    "id": "chunk",
    "text": "chunk"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$chunks = Collection::make([1, 2, 3, 4, 5])->chunk(2);\r\n// [[1, 2], [3, 4], [5]]\r"
  },
  {
    "type": "h3",
    "id": "slice",
    "text": "slice"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$slice = Collection::make([1, 2, 3, 4, 5])->slice(1, 3);\r\n// [2, 3, 4]\r"
  },
  {
    "type": "h3",
    "id": "unique",
    "text": "unique"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$unique = Collection::make([1, 1, 2, 2, 3])->unique();\r\n// [1, 2, 3]\r"
  },
  {
    "type": "h2",
    "id": "serialization",
    "text": "Serialization"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$col = Collection::make(['name' => 'Siro', 'version' => '0.35.0']);\r\n\r\n$col->toArray();         // ['name' => 'Siro', 'version' => '0.35.0']\r\n$col->toJson();          // '{\"name\":\"Siro\",\"version\":\"0.35.0\"}'\r\n$col->implode(', ');     // 'Siro, 0.35.0'\r"
  },
  {
    "type": "h2",
    "id": "chaining",
    "text": "Chaining"
  },
  {
    "type": "p",
    "text": "Every method returns a Collection (or value), so you can chain:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$result = Collection::make($products)\r\n    ->where('price', '>', 100)\r\n    ->where('stock', '>', 0)\r\n    ->sort('price')\r\n    ->pluck('name');\r"
  },
  {
    "type": "h2",
    "id": "tap-pipe",
    "text": "Tap & Pipe"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// tap — do something without breaking chain\r\n$result = Collection::make($data)\r\n    ->tap(fn($c) => Logger::debug('Processing', ['count' => $c->count()]))\r\n    ->map(fn($item) => $this->process($item));\r\n\r\n// pipe — pass collection to a function\r\n$result = Collection::make($data)->pipe(fn($c) => $this->customTransform($c));\r"
  },
  {
    "type": "h2",
    "id": "debug",
    "text": "Debug"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Dump and die\r\nCollection::make($data)->dd();\r\n\r\n// Dump and continue\r\nCollection::make($data)->dump();\r"
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
        "`make(array $items)`",
        "Create new collection"
      ],
      [
        "`all()`",
        "Get all items"
      ],
      [
        "`count()`",
        "Item count"
      ],
      [
        "`isEmpty()`",
        "Check if empty"
      ],
      [
        "`isNotEmpty()`",
        "Check if not empty"
      ],
      [
        "`first()`",
        "First item"
      ],
      [
        "`last()`",
        "Last item"
      ],
      [
        "`get(key, default)`",
        "Item by key"
      ],
      [
        "`set(key, value)`",
        "Set by key"
      ],
      [
        "`push(value)`",
        "Append"
      ],
      [
        "`pop()`",
        "Remove last"
      ],
      [
        "`shift()`",
        "Remove first"
      ],
      [
        "`unshift(value)`",
        "Prepend"
      ],
      [
        "`pluck(column, key)`",
        "Extract column"
      ],
      [
        "`map(callback)`",
        "Transform each"
      ],
      [
        "`filter(callback)`",
        "Filter items"
      ],
      [
        "`reject(callback)`",
        "Remove by condition"
      ],
      [
        "`reduce(callback, initial)`",
        "Reduce to single value"
      ],
      [
        "`each(callback)`",
        "Iterate"
      ],
      [
        "`where(key, op, value)`",
        "Filter by condition"
      ],
      [
        "`whereIn(key, values)`",
        "Filter by values"
      ],
      [
        "`sort(column, direction)`",
        "Sort"
      ],
      [
        "`sortByDesc(column)`",
        "Sort desc"
      ],
      [
        "`reverse()`",
        "Reverse order"
      ],
      [
        "`slice(offset, length)`",
        "Slice"
      ],
      [
        "`chunk(size)`",
        "Split into chunks"
      ],
      [
        "`unique(key)`",
        "Unique items"
      ],
      [
        "`collapse()`",
        "Flatten one level"
      ],
      [
        "`flatten(depth)`",
        "Flatten nested"
      ],
      [
        "`combine(values)`",
        "Keys + values"
      ],
      [
        "`keys()`",
        "All keys"
      ],
      [
        "`values()`",
        "All values"
      ],
      [
        "`merge(items)`",
        "Merge collections"
      ],
      [
        "`toJson()`",
        "JSON string"
      ],
      [
        "`toArray()`",
        "PHP array"
      ],
      [
        "`implode(glue)`",
        "Join to string"
      ],
      [
        "`sum(column)`",
        "Sum"
      ],
      [
        "`avg(column)`",
        "Average"
      ],
      [
        "`min(column)`",
        "Minimum"
      ],
      [
        "`max(column)`",
        "Maximum"
      ],
      [
        "`shuffle()`",
        "Randomize"
      ],
      [
        "`random(count)`",
        "Random items"
      ],
      [
        "`tap(callback)`",
        "Chain break for side effects"
      ],
      [
        "`pipe(callback)`",
        "Transform via callback"
      ],
      [
        "`dd()`",
        "Dump and die"
      ],
      [
        "`dump()`",
        "Dump and continue"
      ]
    ]
  }
],
}
