
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Testing API Reference",
    description: "Siro provides a PHPUnit base test class with HTTP helpers, in-memory SQLite, and authentication shortcuts.",
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
    "text": "Siro provides a PHPUnit base test class with HTTP helpers, in-memory SQLite, and authentication shortcuts."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use App\\Tests\\TestCase;\r\n\r\nclass ProductTest extends TestCase\r\n{\r\n    public function test_list_products(): void\r\n    {\r\n        $response = $this->get('/api/products');\r\n        $this->assertSame(200, $response->statusCode());\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "test-structure",
    "text": "Test Structure"
  },
  {
    "type": "code",
    "code": "tests/\r\n├── TestCase.php           # Base test class\r\n├── unit/                  # Isolated tests (no DB)\r\n├── integration/           # DB-dependent tests\r\n├── feature/               # HTTP endpoint tests\r\n├── edge_case/             # Boundary tests\r\n└── cli/                   # CLI command tests\r"
  },
  {
    "type": "h2",
    "id": "http-test-helpers",
    "text": "HTTP Test Helpers"
  },
  {
    "type": "h3",
    "id": "basic-requests",
    "text": "Basic Requests"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// GET\r\n$response = $this->get('/api/users');\r\n\r\n// POST with JSON body\r\n$response = $this->post('/api/products', [\r\n    'name' => 'Laptop',\r\n    'price' => 999,\r\n]);\r\n\r\n// PUT\r\n$response = $this->put('/api/products/1', [\r\n    'name' => 'Updated Laptop',\r\n]);\r\n\r\n// DELETE\r\n$response = $this->delete('/api/products/1');\r"
  },
  {
    "type": "h3",
    "id": "authenticated-requests",
    "text": "Authenticated Requests"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Login and get auth headers\r\n$headers = $this->authenticate();\r\n\r\n// Use in requests\r\n$response = $this->get('/api/orders', $headers);\r\n$response = $this->post('/api/orders', $body, $headers);\r"
  },
  {
    "type": "h2",
    "id": "assertions",
    "text": "Assertions"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$response = $this->get('/api/users');\r\n\r\n// Status code\r\n$this->assertSame(200, $response->statusCode());\r\n\r\n// JSON body\r\n$json = $response->json();\r\n$this->assertTrue($json['success']);\r\n$this->assertArrayHasKey('data', $json);\r\n\r\n// Specific data\r\n$data = $json['data'] ?? [];\r\n$this->assertNotEmpty($data);\r\n$this->assertSame('John', $data[0]['name']);\r"
  },
  {
    "type": "h2",
    "id": "test-case-methods",
    "text": "Test Case Methods"
  },
  {
    "type": "table",
    "headers": [
      "Method",
      "Description"
    ],
    "rows": [
      [
        "`get(string $path, array $headers)`",
        "GET request"
      ],
      [
        "`post(string $path, array $body, array $headers)`",
        "POST request"
      ],
      [
        "`put(string $path, array $body, array $headers)`",
        "PUT request"
      ],
      [
        "`delete(string $path, array $headers)`",
        "DELETE request"
      ],
      [
        "`dispatch(App $app, string $method, string $path, array $body, array $headers)`",
        "Raw HTTP dispatch"
      ],
      [
        "`responseJson(Response $response)`",
        "Decode response to array"
      ],
      [
        "`authenticate(?App $app)`",
        "Login and return auth headers"
      ],
      [
        "`createApp()`",
        "Bootstrap app instance"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "database-testing",
    "text": "Database Testing"
  },
  {
    "type": "p",
    "text": "Tests use SQLite in-memory with transaction rollback between tests:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class ProductTest extends TestCase\r\n{\r\n    public function test_create_product(): void\r\n    {\r\n        // Database is automatically set up\r\n        // Each test runs in a transaction\r\n        // Transaction is rolled back after test\r\n\r\n        $response = $this->post('/api/products', [\r\n            'name' => 'Test Product',\r\n            'price' => 99.99,\r\n        ]);\r\n\r\n        $this->assertSame(201, $response->statusCode());\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "custom-test-response",
    "text": "Custom Test Response"
  },
  {
    "type": "p",
    "text": "The TestResponse class provides helpers:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$response = $this->get('/api/users');\r\n\r\n$response->statusCode();     // int\r\n$response->json();           // array\r\n$response->body();           // string\r\n$response->header('X-Trace-ID');  // string|null\r\n$response->assertStatus(200);\r\n$response->assertJson(['success' => true]);\r\n$response->assertSee('data');\r"
  },
  {
    "type": "h2",
    "id": "running-tests",
    "text": "Running Tests"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# All tests\r\nphp vendor/bin/phpunit\r\n\r\n# By suite\r\nphp vendor/bin/phpunit --testsuite=Unit\r\nphp vendor/bin/phpunit --testsuite=Feature\r\nphp vendor/bin/phpunit --testsuite=Integration\r\nphp vendor/bin/phpunit --testsuite=EdgeCase\r\n\r\n# Siro CLI\r\nphp siro test\r\nphp siro test --coverage\r\nphp siro test --filter=Product\r"
  },
  {
    "type": "h2",
    "id": "factory-support",
    "text": "Factory Support"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Define factory\r\nProduct::factory()->create([\r\n    'name' => 'Test Product',\r\n    'price' => 49.99,\r\n]);\r\n\r\n// Create multiple\r\nProduct::factory()->count(10)->create();\r\n\r\n// With relations\r\n$product = Product::factory()\r\n    ->has(Category::factory())\r\n    ->create();\r"
  }
],
}
