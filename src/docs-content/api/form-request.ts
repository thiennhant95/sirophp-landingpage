
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "FormRequest API Reference",
    description: "FormRequests encapsulate validation logic in a single class — keeping controllers clean and rules reusable.",
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
    "text": "FormRequests encapsulate validation logic in a single class — keeping controllers clean and rules reusable."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\FormRequest;\r"
  },
  {
    "type": "h2",
    "id": "generate",
    "text": "Generate"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:request StoreProductRequest\r"
  },
  {
    "type": "h2",
    "id": "define",
    "text": "Define"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n\r\ndeclare(strict_types=1);\r\n\r\nnamespace App\\Requests;\r\n\r\nuse Siro\\Core\\FormRequest;\r\n\r\nclass StoreProductRequest extends FormRequest\r\n{\r\n    public function rules(): array\r\n    {\r\n        return [\r\n            'name' => 'required|string|max:255',\r\n            'price' => 'required|numeric|min:0',\r\n            'category_id' => 'required|exists:categories,id',\r\n            'description' => 'string|max:10000',\r\n        ];\r\n    }\r\n\r\n    public function messages(): array\r\n    {\r\n        return [\r\n            'name.required' => 'Product name is required',\r\n            'price.min' => 'Price cannot be negative',\r\n        ];\r\n    }\r\n\r\n    public function authorize(): bool\r\n    {\r\n        // Check if user can create products\r\n        $user = $this->get('_user');\r\n        return $user !== null && $user['role'] === 'admin';\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "use-in-controller",
    "text": "Use in Controller"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function store(StoreProductRequest $request): Response\r\n{\r\n    // Validation already passed\r\n    // authorize() already checked\r\n\r\n    $data = $request->validated();  // Only validated fields\r\n    // ['name' => 'Laptop', 'price' => 999, 'category_id' => 1]\r\n\r\n    $product = $this->service->create($data);\r\n    return $this->created($product, 'Product created');\r\n}\r"
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
        "`rules()`",
        "Define validation rules"
      ],
      [
        "`messages()`",
        "Custom error messages"
      ],
      [
        "`authorize()`",
        "Authorization check (return bool)"
      ],
      [
        "`validated()`",
        "Get validated data only"
      ],
      [
        "`errors()`",
        "Get validation errors"
      ],
      [
        "`fails()`",
        "Check if validation failed"
      ],
      [
        "`validate()`",
        "Run validation manually"
      ],
      [
        "`get(string $key, mixed $default)`",
        "Get a validated field"
      ],
      [
        "`all()`",
        "Get all validated data"
      ]
    ]
  }
],
}
