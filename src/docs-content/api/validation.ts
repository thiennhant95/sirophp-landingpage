
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Validation API Reference",
    description: "Siro provides a fluent validation system with 15+ built-in rules, custom rule support, and FormRequest pattern.",
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
    "text": "Siro provides a fluent validation system with 15+ built-in rules, custom rule support, and FormRequest pattern."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$validated = $request->validate([\r\n    'email' => 'required|email|max:255|unique:users,email',\r\n    'password' => 'required|min:8|max:255|confirmed',\r\n]);\r"
  },
  {
    "type": "h2",
    "id": "available-rules",
    "text": "Available Rules"
  },
  {
    "type": "h3",
    "id": "string-rules",
    "text": "String Rules"
  },
  {
    "type": "table",
    "headers": [
      "Rule",
      "Description"
    ],
    "rows": [
      [
        "`min:N`",
        "Minimum length"
      ],
      [
        "`max:N`",
        "Maximum length"
      ],
      [
        "`min:N`",
        "Minimum value/length"
      ],
      [
        "`max:N`",
        "Maximum value/length"
      ],
      [
        "`between:N,M`",
        "Between N and M"
      ],
      [
        "`alpha`",
        "Alphabetic characters only"
      ],
      [
        "`alpha_num`",
        "Alpha-numeric only"
      ],
      [
        "`alpha_dash`",
        "Alpha-numeric, dashes, underscores"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "type-rules",
    "text": "Type Rules"
  },
  {
    "type": "table",
    "headers": [
      "Rule",
      "Description"
    ],
    "rows": [
      [
        "`required`",
        "Field is required"
      ],
      [
        "`string`",
        "Must be string"
      ],
      [
        "`numeric`",
        "Must be numeric"
      ],
      [
        "`integer`",
        "Must be integer"
      ],
      [
        "`bool`",
        "Must be boolean"
      ],
      [
        "`array`",
        "Must be array"
      ],
      [
        "`file`",
        "Must be uploaded file"
      ],
      [
        "`image`",
        "Must be image (jpeg, png, gif, webp)"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "data-rules",
    "text": "Data Rules"
  },
  {
    "type": "table",
    "headers": [
      "Rule",
      "Description"
    ],
    "rows": [
      [
        "`email`",
        "Valid email address"
      ],
      [
        "`url`",
        "Valid URL"
      ],
      [
        "`ip`",
        "Valid IP address"
      ],
      [
        "`date`",
        "Valid date"
      ],
      [
        "`datetime`",
        "Valid datetime"
      ],
      [
        "`json`",
        "Valid JSON string"
      ],
      [
        "`regex:/pattern/`",
        "Match regex pattern"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "database-rules",
    "text": "Database Rules"
  },
  {
    "type": "table",
    "headers": [
      "Rule",
      "Description"
    ],
    "rows": [
      [
        "`exists:table,column`",
        "Value exists in database"
      ],
      [
        "`unique:table,column`",
        "Value is unique in table"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "comparison-rules",
    "text": "Comparison Rules"
  },
  {
    "type": "table",
    "headers": [
      "Rule",
      "Description"
    ],
    "rows": [
      [
        "`confirmed`",
        "Field must have `_confirmation` match"
      ],
      [
        "`in:a,b,c`",
        "Must be one of the values"
      ],
      [
        "`not_in:a,b,c`",
        "Must not be one of the values"
      ],
      [
        "`same:field`",
        "Must match another field"
      ],
      [
        "`different:field`",
        "Must differ from another field"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "size-rules",
    "text": "Size Rules"
  },
  {
    "type": "table",
    "headers": [
      "Rule",
      "Description"
    ],
    "rows": [
      [
        "`size:N`",
        "Exact length/value"
      ],
      [
        "`min:N`",
        "Minimum length/value"
      ],
      [
        "`max:N`",
        "Maximum length/value"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "file-rules",
    "text": "File Rules"
  },
  {
    "type": "table",
    "headers": [
      "Rule",
      "Description"
    ],
    "rows": [
      [
        "`file`",
        "Must be uploaded file"
      ],
      [
        "`image`",
        "Must be image type"
      ],
      [
        "`mimes:png,jpg`",
        "Allowed MIME types"
      ],
      [
        "`min:N`",
        "Min file size in KB"
      ],
      [
        "`max:N`",
        "Max file size in KB"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "usage-examples",
    "text": "Usage Examples"
  },
  {
    "type": "h3",
    "id": "basic-validation",
    "text": "Basic Validation"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$validated = $request->validate([\r\n    'name' => 'required|string|min:3|max:120',\r\n    'email' => 'required|email|max:255|unique:users,email',\r\n    'password' => 'required|min:8|max:255|confirmed',\r\n]);\r"
  },
  {
    "type": "h3",
    "id": "nested-validation",
    "text": "Nested Validation"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$validated = $request->validate([\r\n    'user.name' => 'required|min:3',\r\n    'user.email' => 'required|email',\r\n    'items.*.product_id' => 'required|exists:products,id',\r\n    'items.*.quantity' => 'required|integer|min:1',\r\n]);\r"
  },
  {
    "type": "h3",
    "id": "custom-error-messages",
    "text": "Custom Error Messages"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$messages = [\r\n    'email.required' => 'We need your email address',\r\n    'email.email' => 'That does not look like an email',\r\n    'password.min' => 'Password must be at least 8 characters',\r\n];\r\n\r\n$validated = $request->validate($rules, $messages);\r"
  },
  {
    "type": "h2",
    "id": "formrequest-pattern",
    "text": "FormRequest Pattern"
  },
  {
    "type": "h3",
    "id": "create-formrequest",
    "text": "Create FormRequest"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro make:request StoreProductRequest\r"
  },
  {
    "type": "h3",
    "id": "define-rules",
    "text": "Define Rules"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n\r\ndeclare(strict_types=1);\r\n\r\nnamespace App\\Requests;\r\n\r\nuse Siro\\Core\\FormRequest;\r\n\r\nclass StoreProductRequest extends FormRequest\r\n{\r\n    public function rules(): array\r\n    {\r\n        return [\r\n            'name' => 'required|string|max:255',\r\n            'price' => 'required|numeric|min:0',\r\n            'category_id' => 'required|exists:categories,id',\r\n        ];\r\n    }\r\n\r\n    public function messages(): array\r\n    {\r\n        return [\r\n            'name.required' => 'Product name is required',\r\n            'price.min' => 'Price cannot be negative',\r\n        ];\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "use-in-controller",
    "text": "Use in Controller"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function store(StoreProductRequest $request): Response\r\n{\r\n    // Already validated\r\n    $data = $request->validated();\r\n\r\n    $product = $this->service->create($data);\r\n    return $this->created($data, 'Product created');\r\n}\r"
  },
  {
    "type": "h2",
    "id": "custom-rules",
    "text": "Custom Rules"
  },
  {
    "type": "h3",
    "id": "define-custom-rule",
    "text": "Define Custom Rule"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Validator;\r\n\r\nValidator::extend('phone', function (string $field, mixed $value, array $params): bool {\r\n    return preg_match('/^\\+?[\\d\\s\\-\\(\\)]{7,15}$/', (string) $value) === 1;\r\n}, 'The :field must be a valid phone number.');\r\n\r\n// Usage\r\n'phone' => 'required|phone'\r"
  },
  {
    "type": "h3",
    "id": "custom-rule-with-parameters",
    "text": "Custom Rule with Parameters"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Validator::extend('min_age', function (string $field, mixed $value, array $params): bool {\r\n    $minAge = (int) ($params[0] ?? 18);\r\n    $birthDate = new \\DateTime((string) $value);\r\n    $age = $birthDate->diff(new \\DateTime())->y;\r\n    return $age >= $minAge;\r\n}, 'You must be at least :param0 years old.');\r\n\r\n// Usage\r\n'birth_date' => 'required|date|min_age:18'\r"
  },
  {
    "type": "h2",
    "id": "error-response",
    "text": "Error Response"
  },
  {
    "type": "p",
    "text": "On validation failure, a 422 response is returned:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": false,\r\n    \"message\": \"Validation failed\",\r\n    \"data\": null,\r\n    \"errors\": {\r\n        \"email\": [\"Email has already been taken\"],\r\n        \"password\": [\"Password must be at least 8 characters\"]\r\n    }\r\n}\r"
  }
],
}
