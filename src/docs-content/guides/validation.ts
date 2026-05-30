
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Validation Guide",
    description: "| Rule | Description | Example |",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "h2",
    "id": "available-validation-rules",
    "text": "Available Validation Rules"
  },
  {
    "type": "table",
    "headers": [
      "Rule",
      "Description",
      "Example"
    ],
    "rows": [
      [
        "`required`",
        "Field must be present and non-empty",
        "`'name' => 'required'`"
      ],
      [
        "`email`",
        "Must be a valid email address",
        "`'email' => 'email'`"
      ],
      [
        "`min:N`",
        "Minimum string length",
        "`'password' => 'min:8'`"
      ],
      [
        "`max:N`",
        "Maximum string length",
        "`'name' => 'max:255'`"
      ],
      [
        "`integer`",
        "Must be an integer value",
        "`'age' => 'integer'`"
      ],
      [
        "`numeric`",
        "Must be numeric",
        "`'price' => 'numeric'`"
      ],
      [
        "`in:a,b,c`",
        "Must be one of the given values",
        "`'status' => 'in:active,inactive'`"
      ],
      [
        "`date`",
        "Must be a valid date",
        "`'published_at' => 'date'`"
      ],
      [
        "`url`",
        "Must be a valid URL",
        "`'website' => 'url'`"
      ],
      [
        "`required_if:field,value`",
        "Required when another field equals value",
        "`'email' => 'required_if:has_email,yes'`"
      ],
      [
        "`regex:/pattern/`",
        "Must match regex pattern",
        "`'phone' => 'regex:/^[0-9]{10}$/'`"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "multiple-rules",
    "text": "Multiple Rules"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$rules = [\r\n    'name' => 'required|min:2|max:120',\r\n    'email' => 'required|email|max:255',\r\n    'password' => 'required|min:8|max:255',\r\n    'age' => 'integer|min:1|max:150',\r\n    'status' => 'in:active,inactive,pending',\r\n];\r"
  },
  {
    "type": "h2",
    "id": "validator-usage",
    "text": "Validator Usage"
  },
  {
    "type": "h3",
    "id": "basic-validation",
    "text": "Basic Validation"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Validator;\r\n\r\n$data = ['email' => 'test@example.com', 'name' => 'John'];\r\n$rules = ['email' => 'required|email', 'name' => 'required|min:2'];\r\n\r\n$errors = Validator::make($data, $rules);\r\n\r\nif ($errors === []) {\r\n    // Validation passed\r\n} else {\r\n    // $errors = ['email' => ['Email is required'], 'name' => ['Name must be at least 2']]\r\n}\r"
  },
  {
    "type": "h3",
    "id": "in-controllers",
    "text": "In Controllers"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Response;\r\n\r\nfinal class UserController\r\n{\r\n    public function store(Request $request): Response\r\n    {\r\n        $request->validate([\r\n            'name' => 'required|min:3|max:120',\r\n            'email' => 'required|email|max:255',\r\n            'password' => 'required|min:8|max:255',\r\n        ]);\r\n\r\n        // Validation passed, access safe input\r\n        $name = $request->string('name');\r\n        $email = $request->string('email');\r\n\r\n        // ... create user\r\n    }\r\n}\r"
  },
  {
    "type": "p",
    "text": "On failure, a 422 response is auto-returned:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": false,\r\n    \"message\": \"Validation failed\",\r\n    \"errors\": {\r\n        \"email\": [\"Email is required\"],\r\n        \"password\": [\"Password must be at least 8 characters\"]\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "formrequest-class",
    "text": "FormRequest Class"
  },
  {
    "type": "p",
    "text": "For complex validation, create a dedicated FormRequest class:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Request;\r\n\r\nfinal class StoreProductRequest extends Request\r\n{\r\n    public function validate(): array\r\n    {\r\n        return parent::validate([\r\n            'name' => 'required|min:2|max:200',\r\n            'price' => 'required|numeric|min:0',\r\n            'stock' => 'integer|min:0',\r\n            'category' => 'required',\r\n            'status' => 'in:active,inactive',\r\n        ]);\r\n    }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Use in controller:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function store(StoreProductRequest $request): Response\r\n{\r\n    $data = $request->validate();\r\n    // ...\r\n}\r"
  },
  {
    "type": "h2",
    "id": "custom-validation-rules",
    "text": "Custom Validation Rules"
  },
  {
    "type": "p",
    "text": "Extend the validator with custom rules:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Validator;\r\n\r\nValidator::extend('even', function (mixed $value): mixed {\r\n    return ((int) $value) % 2 === 0\r\n        ? true\r\n        : ':field must be even';\r\n});\r\n\r\n// Usage\r\n$errors = Validator::make(['num' => '3'], ['num' => 'even']);\r\n// Returns: ['num' => ['num must be even']]\r"
  },
  {
    "type": "p",
    "text": "Use true for pass, or a string :field gets replaced with the field name."
  },
  {
    "type": "h2",
    "id": "error-responses",
    "text": "Error Responses"
  },
  {
    "type": "p",
    "text": "Validation errors return HTTP 422 with this format:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": false,\r\n    \"message\": \"Validation failed\",\r\n    \"errors\": {\r\n        \"field_name\": [\r\n            \"Field name is required\",\r\n            \"Field name must be at least 3 characters\"\r\n        ],\r\n        \"email\": [\r\n            \"Email is not a valid email address\"\r\n        ]\r\n    }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Access errors in tests:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$resp = $this->post('/api/products', []);\r\n$resp->assertValidationError();\r\n$json = $resp->json();\r\n$errors = $json['errors'] ?? [];\r\n$this->assertArrayHasKey('name', $errors);\r"
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "ul",
    "items": [
      "Always validate on the server side — never trust client input.",
      "Use specific rules rather than generic ones (`email` instead of just `required`).",
      "Sanitize input with `$request->string()`, `$request->integer()`, `$request->boolean()`.",
      "Define custom rules with clear error messages using `:field` placeholder.",
      "Keep validation rules in FormRequest classes for reusable, single-responsibility controllers."
    ]
  }
],
}
