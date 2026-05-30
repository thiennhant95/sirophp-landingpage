
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Testing Guide",
    description: "Tests live under `tests/` organized by type:",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "h2",
    "id": "test-structure",
    "text": "Test Structure"
  },
  {
    "type": "p",
    "text": "Tests live under tests/ organized by type:"
  },
  {
    "type": "code",
    "code": "tests/\r\n  unit/          # Isolated component tests (no DB)\r\n  integration/   # DB-dependent tests\r\n  feature/       # Full HTTP request/response tests\r\n  edge_case/     # Boundary & fuzz tests\r\n  cli/           # Console command tests\r\n  TestCase.php   # Base test class\r"
  },
  {
    "type": "h2",
    "id": "test-helpers",
    "text": "Test Helpers"
  },
  {
    "type": "h3",
    "id": "http-methods",
    "text": "HTTP Methods"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// GET request\r\n$response = $this->get('/api/users');\r\n\r\n// POST with body\r\n$response = $this->post('/api/products', ['name' => 'Laptop', 'price' => 1500]);\r\n\r\n// PUT with body\r\n$response = $this->put('/api/products/1', ['name' => 'Updated']);\r\n\r\n// DELETE\r\n$response = $this->delete('/api/products/1');\r\n\r\n// Custom headers\r\n$response = $this->get('/api/users', ['X-Custom' => 'value']);\r"
  },
  {
    "type": "h3",
    "id": "authentication",
    "text": "Authentication"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Get Bearer token headers for authenticated requests\r\n$auth = $this->authenticate();\r\n$response = $this->get('/api/products', $auth);\r\n\r\n// Reuse across tests\r\nprotected function setUp(): void\r\n{\r\n    parent::setUp();\r\n    $app = $this->createApp();\r\n    $this->authHeaders = $this->authenticate($app);\r\n}\r"
  },
  {
    "type": "h2",
    "id": "fluent-assertions",
    "text": "Fluent Assertions"
  },
  {
    "type": "p",
    "text": "get(), post(), put(), delete() return a TestResponse instance:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Status assertions\r\n$this->get('/health')->assertOk();                           // 200\r\n$this->post('/api/products')->assertCreated();               // 201\r\n$this->get('/api/empty')->assertNoContent();                 // 204\r\n$this->get('/api/protected')->assertUnauthorized();           // 401\r\n$this->get('/api/admin')->assertForbidden();                 // 403\r\n$this->get('/api/missing')->assertNotFound();                // 404\r\n$this->post('/api/invalid')->assertValidationError();        // 422\r\n$this->get('/api/broken')->assertServerError();              // 500\r\n$this->get('/api/data')->assertStatus(200);                  // Custom status\r\n\r\n// JSON assertions\r\n$this->get('/health')\r\n    ->assertJson(['success' => true, 'message' => 'OK']);\r\n\r\n// Deep path assertion\r\n$this->get('/api/products?page=1')\r\n    ->assertJsonPath('meta.page', 1);\r\n\r\n// Header assertion\r\n$this->get('/api/data')\r\n    ->assertHeader('Content-Type', 'application/json');\r\n\r\n// Get decoded JSON body\r\n$json = $this->get('/api/products')->json();\r\n$data = $json['data'] ?? [];\r"
  },
  {
    "type": "h2",
    "id": "database-assertions",
    "text": "Database Assertions"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Assert row exists\r\n$this->assertDatabaseHas('users', ['email' => 'test@example.com']);\r\n\r\n// Assert row is missing\r\n$this->assertDatabaseMissing('users', ['email' => 'nonexistent@test.com']);\r\n\r\n// Works with SQLite, MySQL, PostgreSQL automatically\r"
  },
  {
    "type": "h2",
    "id": "writing-tests",
    "text": "Writing Tests"
  },
  {
    "type": "h3",
    "id": "crud-tests",
    "text": "CRUD Tests"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function testCreateProduct(): void\r\n{\r\n    $resp = $this->post('/api/products', [\r\n        'name' => 'Laptop',\r\n        'sku' => 'LAP-001',\r\n        'price' => '1500.00',\r\n        'stock' => '100',\r\n        'category' => 'Electronics',\r\n    ], $this->authHeaders);\r\n    $resp->assertCreated();\r\n    $this->assertDatabaseHas('products', ['name' => 'Laptop']);\r\n}\r\n\r\npublic function testListProducts(): void\r\n{\r\n    $resp = $this->get('/api/products', $this->authHeaders);\r\n    $resp->assertOk();\r\n    $body = $resp->json();\r\n    $this->assertArrayHasKey('data', $body);\r\n    $this->assertArrayHasKey('meta', $body);\r\n}\r\n\r\npublic function testShowProduct(): void\r\n{\r\n    $resp = $this->get('/api/products/1', $this->authHeaders);\r\n    $this->assertContains($resp->status(), [200, 404]);\r\n}\r\n\r\npublic function testUpdateProduct(): void\r\n{\r\n    $resp = $this->put('/api/products/1', [\r\n        'name' => 'Updated Laptop',\r\n    ], $this->authHeaders);\r\n    $this->assertContains($resp->status(), [200, 404]);\r\n}\r\n\r\npublic function testDeleteProduct(): void\r\n{\r\n    $resp = $this->delete('/api/products/999999', $this->authHeaders);\r\n    $this->assertContains($resp->status(), [200, 404]);\r\n}\r"
  },
  {
    "type": "h3",
    "id": "auth-tests",
    "text": "Auth Tests"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function testRegisterSuccess(): void\r\n{\r\n    $resp = $this->post('/api/auth/register', [\r\n        'name' => 'New User',\r\n        'email' => 'new@example.com',\r\n        'password' => 'secret123',\r\n    ]);\r\n    $this->assertContains($resp->status(), [200, 201]);\r\n}\r\n\r\npublic function testLoginValidation(): void\r\n{\r\n    $resp = $this->post('/api/auth/login', []);\r\n    $resp->assertValidationError();\r\n}\r\n\r\npublic function testProtectedEndpointWithoutAuth(): void\r\n{\r\n    $resp = $this->get('/api/products');\r\n    $resp->assertUnauthorized();\r\n}\r"
  },
  {
    "type": "h3",
    "id": "validation-tests",
    "text": "Validation Tests"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function testValidationFailsOnMissingFields(): void\r\n{\r\n    $resp = $this->post('/api/products', [], $this->authHeaders);\r\n    $resp->assertStatus(422);\r\n}\r\n\r\npublic function testExtraFieldsAreIgnored(): void\r\n{\r\n    $resp = $this->post('/api/products', [\r\n        'name' => 'Test',\r\n        'nonexistent_field' => 'ignored',\r\n    ], $this->authHeaders);\r\n    $this->assertContains($resp->status(), [200, 201]);\r\n}\r"
  },
  {
    "type": "h3",
    "id": "edge-case-tests",
    "text": "Edge Case Tests"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "public function testSpecialCharactersInInput(): void\r\n{\r\n    $auth = $this->authenticate();\r\n    $resp = $this->post('/api/products', [\r\n        'name' => '<script>alert(\"xss\")</script>',\r\n        'price' => 10,\r\n    ], $auth);\r\n    $this->assertContains($resp->status(), [200, 201]);\r\n}\r\n\r\npublic function testNegativePageNumber(): void\r\n{\r\n    $auth = $this->authenticate();\r\n    $resp = $this->get('/api/products?page=-1', $auth);\r\n    $resp->assertOk();\r\n}\r\n\r\npublic function testEmptyRequestBody(): void\r\n{\r\n    $resp = $this->post('/api/auth/login', []);\r\n    $resp->assertValidationError();\r\n}\r\n\r\npublic function testUnicodeEmail(): void\r\n{\r\n    $resp = $this->post('/api/auth/register', [\r\n        'name' => 'Unicode',\r\n        'email' => 'user@münchen.de',\r\n        'password' => 'secret123',\r\n    ]);\r\n    $this->assertContains($resp->status(), [200, 201, 422]);\r\n}\r\n\r\npublic function testZeroPerPage(): void\r\n{\r\n    $auth = $this->authenticate();\r\n    $resp = $this->get('/api/products?per_page=0', $auth);\r\n    $resp->assertOk();\r\n}\r"
  },
  {
    "type": "h2",
    "id": "code-generation",
    "text": "Code Generation"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Generate test file\r\nphp siro make:test ProductApi\r\n\r\n# Generate full CRUD with tests\r\nphp siro make:crud products\r"
  },
  {
    "type": "h2",
    "id": "running-tests",
    "text": "Running Tests"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Run all tests\r\nphp siro test\r\n\r\n# Run via PHPUnit directly\r\nphp vendor/bin/phpunit\r\n\r\n# Run specific suite\r\nphp vendor/bin/phpunit --testsuite Unit\r\nphp vendor/bin/phpunit --testsuite Integration\r\nphp vendor/bin/phpunit --testsuite Feature\r\nphp vendor/bin/phpunit --testsuite EdgeCase\r\n\r\n# Filter by test name\r\nphp vendor/bin/phpunit --filter testCreateProduct\r\n\r\n# Run single file\r\nphp vendor/bin/phpunit tests/feature/ProductTest.php\r"
  },
  {
    "type": "h2",
    "id": "generate-tests-from-real-traces",
    "text": "Generate Tests from Real Traces"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Generate a PHPUnit test from a captured trace\r\n# The test reproduces the exact request and asserts the response\r\nphp siro make:test --from-trace=<trace_id>\r\n\r\n# Ignore dynamic fields (id, token, timestamps) for stable assertions\r\nphp siro make:test --from-trace=<trace_id> --ignore=id,created_at,token\r\n\r\n# Generated: tests/Feature/FromTrace_<id>Test.php\r\n# Contains: method, path, body, auth headers, status assertion, JSON structure check\r"
  },
  {
    "type": "p",
    "text": "The generated test:"
  },
  {
    "type": "ul",
    "items": [
      "Replays the exact HTTP request from the trace",
      "Auto-fetches auth token via `authenticate()` if the trace had auth",
      "Asserts the same HTTP status code",
      "Verifies JSON structure with `assertArrayHasKey`",
      "Supports `--ignore` for dynamic fields (id, created_at, token, etc.)"
    ]
  },
  {
    "type": "p",
    "text": "This turns production incidents into automated regression tests."
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Generate a PHPUnit test from a captured trace\r\nphp siro replay <trace_id> --test\r\n\r\n# Generated: tests/Feature/fromtrace_<id>Test.php\r\n# Contains the exact request data from production\r"
  },
  {
    "type": "h2",
    "id": "generate-test-stubs",
    "text": "Generate Test Stubs"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Generate a feature test (HTTP endpoint tests)\r\nphp siro make:test OrderTest\r\n\r\n# Generate a unit test (isolated component test)\r\nphp siro make:test PaymentService --unit\r"
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "ul",
    "items": [
      "Use `$this->authenticate()` to obtain auth headers for protected endpoints.",
      "Prefer `assertContains()` for status codes when multiple outcomes are valid.",
      "Assert JSON structure with `assertArrayHasKey()` and `assertJsonPath()`.",
      "Use `assertDatabaseHas()`/`assertDatabaseMissing()` to verify DB state.",
      "Write edge case tests for empty input, special characters, boundary values.",
      "Each test method should test exactly one behavior.",
      "Use descriptive test method names: `testCreateProductFailsWithoutName`.",
      "Tests auto-wrap in a transaction and roll back after each test."
    ]
  }
],
}
