
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "E-Commerce API Example",
    description: "A complete e-commerce API built with SiroPHP demonstrating cart management, checkout flow, payment processing, and webhooks.",
    category: "root",
    order: 0,
    icon: "📄",
  },
  content: [
  {
    "type": "p",
    "text": "A complete e-commerce API built with SiroPHP demonstrating cart management, checkout flow, payment processing, and webhooks."
  },
  {
    "type": "h2",
    "id": "models",
    "text": "Models"
  },
  {
    "type": "h3",
    "id": "product",
    "text": "Product"
  },
  {
    "type": "table",
    "headers": [
      "Field",
      "Type",
      "Rules"
    ],
    "rows": [
      [
        "id",
        "integer",
        "auto-increment"
      ],
      [
        "name",
        "string",
        "required, min:1, max:255"
      ],
      [
        "description",
        "string",
        "max:65535"
      ],
      [
        "price",
        "float",
        "numeric, min:0"
      ],
      [
        "stock",
        "integer",
        "min:0"
      ],
      [
        "category",
        "string",
        "max:100"
      ],
      [
        "status",
        "string",
        "max:20"
      ],
      [
        "created_at",
        "datetime",
        "auto"
      ],
      [
        "updated_at",
        "datetime",
        "auto"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "category",
    "text": "Category"
  },
  {
    "type": "table",
    "headers": [
      "Field",
      "Type",
      "Rules"
    ],
    "rows": [
      [
        "id",
        "integer",
        "auto-increment"
      ],
      [
        "name",
        "string",
        "required, min:2, max:100"
      ],
      [
        "created_at",
        "datetime",
        "auto"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "order",
    "text": "Order"
  },
  {
    "type": "table",
    "headers": [
      "Field",
      "Type",
      "Rules"
    ],
    "rows": [
      [
        "id",
        "integer",
        "auto-increment"
      ],
      [
        "user_id",
        "integer",
        "foreign key"
      ],
      [
        "customer_name",
        "string",
        "required, min:2, max:200"
      ],
      [
        "customer_email",
        "string",
        "required, email"
      ],
      [
        "total",
        "float",
        "required, numeric, min:0"
      ],
      [
        "status",
        "string",
        "in:pending,completed,cancelled"
      ],
      [
        "items",
        "json",
        "array of order items"
      ],
      [
        "created_at",
        "datetime",
        "auto"
      ],
      [
        "updated_at",
        "datetime",
        "auto"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "orderitem",
    "text": "OrderItem"
  },
  {
    "type": "table",
    "headers": [
      "Field",
      "Type",
      "Description"
    ],
    "rows": [
      [
        "product_id",
        "integer",
        "Reference to product"
      ],
      [
        "product_name",
        "string",
        "Snapshot of product name"
      ],
      [
        "quantity",
        "integer",
        "Quantity ordered"
      ],
      [
        "unit_price",
        "float",
        "Price at time of order"
      ],
      [
        "subtotal",
        "float",
        "quantity * unit_price"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "payment",
    "text": "Payment"
  },
  {
    "type": "table",
    "headers": [
      "Field",
      "Type",
      "Description"
    ],
    "rows": [
      [
        "id",
        "integer",
        "auto-increment"
      ],
      [
        "order_id",
        "integer",
        "Reference to order"
      ],
      [
        "amount",
        "float",
        "Payment amount"
      ],
      [
        "status",
        "string",
        "pending,completed,failed"
      ],
      [
        "method",
        "string",
        "card,bank_transfer,vnpay"
      ],
      [
        "transaction_id",
        "string",
        "External payment reference"
      ],
      [
        "created_at",
        "datetime",
        "auto"
      ],
      [
        "updated_at",
        "datetime",
        "auto"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "api-endpoints",
    "text": "API Endpoints"
  },
  {
    "type": "h3",
    "id": "products",
    "text": "Products"
  },
  {
    "type": "code",
    "code": "GET    /api/products              List products (paginated, filterable)\r\nGET    /api/products/{id}         Get product detail\r\nPOST   /api/products              Create product (protected)\r\nPUT    /api/products/{id}         Update product (protected)\r\nDELETE /api/products/{id}         Delete product (protected)\r"
  },
  {
    "type": "h3",
    "id": "categories",
    "text": "Categories"
  },
  {
    "type": "code",
    "code": "GET    /api/categories            List categories (paginated)\r\nGET    /api/categories/{id}       Get category detail\r\nPOST   /api/categories            Create category (protected)\r\nPUT    /api/categories/{id}       Update category (protected)\r\nDELETE /api/categories/{id}       Delete category (protected)\r"
  },
  {
    "type": "h3",
    "id": "orders",
    "text": "Orders"
  },
  {
    "type": "code",
    "code": "GET    /api/orders                List user's orders (protected)\r\nGET    /api/orders/{id}           Get order detail (protected, owner/admin)\r\nPOST   /api/orders                Create order / Checkout (protected)\r\nPUT    /api/orders/{id}           Update order (protected, owner/admin)\r\nDELETE /api/orders/{id}           Cancel order (protected, owner/admin)\r"
  },
  {
    "type": "h2",
    "id": "cart-management",
    "text": "Cart Management"
  },
  {
    "type": "p",
    "text": "The cart is managed client-side. When the user is ready to checkout, the cart contents are sent to the order creation endpoint."
  },
  {
    "type": "h3",
    "id": "cart-data-structure",
    "text": "Cart Data Structure"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"items\": [\r\n        {\r\n            \"product_id\": 1,\r\n            \"quantity\": 2\r\n        },\r\n        {\r\n            \"product_id\": 3,\r\n            \"quantity\": 1\r\n        }\r\n    ]\r\n}\r"
  },
  {
    "type": "h3",
    "id": "checkout-create-order",
    "text": "Checkout (Create Order)"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "POST /api/orders\r\nAuthorization: Bearer eyJhbGciOiJSUzI1NiIs...\r\nContent-Type: application/json\r\n\r\n{\r\n    \"customer_name\": \"John Doe\",\r\n    \"customer_email\": \"john@example.com\",\r\n    \"total\": 49.99,\r\n    \"status\": \"pending\",\r\n    \"items\": [\r\n        {\r\n            \"product_id\": 1,\r\n            \"name\": \"Widget Pro\",\r\n            \"quantity\": 2,\r\n            \"unit_price\": 19.99,\r\n            \"subtotal\": 39.98\r\n        },\r\n        {\r\n            \"product_id\": 3,\r\n            \"name\": \"Gadget X\",\r\n            \"quantity\": 1,\r\n            \"unit_price\": 10.01,\r\n            \"subtotal\": 10.01\r\n        }\r\n    ]\r\n}\r"
  },
  {
    "type": "p",
    "text": "Response 201:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Order created\",\r\n    \"data\": {\r\n        \"id\": 42,\r\n        \"customer_name\": \"John Doe\",\r\n        \"customer_email\": \"john@example.com\",\r\n        \"total\": 49.99,\r\n        \"status\": \"pending\",\r\n        \"items\": [\r\n            {\r\n                \"product_id\": 1,\r\n                \"name\": \"Widget Pro\",\r\n                \"quantity\": 2,\r\n                \"unit_price\": 19.99,\r\n                \"subtotal\": 39.98\r\n            },\r\n            {\r\n                \"product_id\": 3,\r\n                \"name\": \"Gadget X\",\r\n                \"quantity\": 1,\r\n                \"unit_price\": 10.01,\r\n                \"subtotal\": 10.01\r\n            }\r\n        ],\r\n        \"created_at\": \"2026-05-15T10:00:00Z\",\r\n        \"updated_at\": \"2026-05-15T10:00:00Z\"\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "payment-processing-pattern",
    "text": "Payment Processing Pattern"
  },
  {
    "type": "p",
    "text": "SiroPHP payments follow an asynchronous pattern with order status tracking."
  },
  {
    "type": "h3",
    "id": "payment-flow",
    "text": "Payment Flow"
  },
  {
    "type": "code",
    "code": "1. POST /api/orders → Create order (status: pending)\r\n2. Client processes payment externally (e.g., VNPay, Stripe)\r\n3. Payment gateway calls back your webhook URL\r\n4. Webhook updates payment and order status\r\n5. Client polls GET /api/orders/{id} for status updates\r"
  },
  {
    "type": "h3",
    "id": "payment-data-structure",
    "text": "Payment Data Structure"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"id\": 1,\r\n    \"order_id\": 42,\r\n    \"amount\": 49.99,\r\n    \"status\": \"completed\",\r\n    \"method\": \"card\",\r\n    \"transaction_id\": \"txn_abc123\",\r\n    \"created_at\": \"2026-05-15T10:05:00Z\",\r\n    \"updated_at\": \"2026-05-15T10:05:30Z\"\r\n}\r"
  },
  {
    "type": "h2",
    "id": "webhook-handling-example",
    "text": "Webhook Handling Example"
  },
  {
    "type": "p",
    "text": "SiroPHP can handle payment webhooks using the built-in routing system. Below is an example of a payment webhook handler."
  },
  {
    "type": "h3",
    "id": "webhook-endpoint",
    "text": "Webhook Endpoint"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// routes/api.php\r\n$router->post('/webhook/payment', function (Request $request): Response {\r\n    $payload = $request->all();\r\n\r\n    // Verify webhook signature\r\n    $signature = $request->header('X-Webhook-Signature');\r\n    $secret = getenv('PAYMENT_WEBHOOK_SECRET');\r\n    $expected = hash_hmac('sha256', json_encode($payload), $secret);\r\n\r\n    if (!hash_equals($expected, $signature)) {\r\n        return Response::error('Invalid signature', 401);\r\n    }\r\n\r\n    // Extract payment data\r\n    $orderId = (int) ($payload['order_id'] ?? 0);\r\n    $transactionId = $payload['transaction_id'] ?? '';\r\n    $status = $payload['status'] ?? '';\r\n\r\n    // Update order status based on payment\r\n    if ($status === 'completed') {\r\n        Database::table('orders')\r\n            ->where('id', '=', $orderId)\r\n            ->update(['status' => 'completed']);\r\n    } elseif ($status === 'failed') {\r\n        Database::table('orders')\r\n            ->where('id', '=', $orderId)\r\n            ->update(['status' => 'cancelled']);\r\n    }\r\n\r\n    // Record payment\r\n    Database::table('payments')->insert([\r\n        'order_id' => $orderId,\r\n        'amount' => $payload['amount'] ?? 0,\r\n        'status' => $status,\r\n        'method' => $payload['method'] ?? '',\r\n        'transaction_id' => $transactionId,\r\n        'created_at' => date('c'),\r\n        'updated_at' => date('c'),\r\n    ]);\r\n\r\n    return Response::success(null, 'Webhook processed');\r\n})->middleware([JsonMiddleware::class]);\r"
  },
  {
    "type": "h3",
    "id": "webhook-payload-example-from-payment-gateway",
    "text": "Webhook Payload Example (from payment gateway)"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "POST /webhook/payment\r\nContent-Type: application/json\r\nX-Webhook-Signature: a1b2c3d4e5f6...\r\n\r\n{\r\n    \"event\": \"payment.completed\",\r\n    \"order_id\": 42,\r\n    \"transaction_id\": \"txn_abc123\",\r\n    \"amount\": 49.99,\r\n    \"currency\": \"USD\",\r\n    \"status\": \"completed\",\r\n    \"method\": \"card\",\r\n    \"timestamp\": \"2026-05-15T10:05:30Z\"\r\n}\r"
  },
  {
    "type": "h2",
    "id": "filtering-products",
    "text": "Filtering Products"
  },
  {
    "type": "p",
    "text": "Products support filtering by various fields:"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "# By category\r\nGET /api/products?category=electronics\r\n\r\n# By status\r\nGET /api/products?status=active\r\n\r\n# By price range\r\nGET /api/products?price_min=10&price_max=100\r\n\r\n# Search by name\r\nGET /api/products?search=widget\r\n\r\n# Combined filters\r\nGET /api/products?category=electronics&status=active&price_min=10&price_max=200&page=1&per_page=20\r"
  },
  {
    "type": "h2",
    "id": "complete-checkout-workflow",
    "text": "Complete Checkout Workflow"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# 1. Authenticate\r\nTOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\"email\":\"john@example.com\",\"password\":\"secret123\"}' | jq -r '.data.token')\r\n\r\n# 2. Browse products\r\ncurl -s \"http://localhost:8080/api/products?category=electronics&status=active\" | jq .\r\n\r\n# 3. Get product details\r\ncurl -s http://localhost:8080/api/products/1 | jq .\r\n\r\n# 4. Create order (checkout)\r\nORDER=$(curl -s -X POST http://localhost:8080/api/orders \\\r\n  -H \"Authorization: Bearer $TOKEN\" \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\r\n    \"customer_name\": \"John Doe\",\r\n    \"customer_email\": \"john@example.com\",\r\n    \"total\": 49.99,\r\n    \"status\": \"pending\",\r\n    \"items\": [\r\n      {\"product_id\": 1, \"name\": \"Widget Pro\", \"quantity\": 2, \"unit_price\": 19.99, \"subtotal\": 39.98},\r\n      {\"product_id\": 3, \"name\": \"Gadget X\", \"quantity\": 1, \"unit_price\": 10.01, \"subtotal\": 10.01}\r\n    ]\r\n  }')\r\necho $ORDER | jq .\r\nORDER_ID=$(echo $ORDER | jq '.data.id')\r\n\r\n# 5. Poll order status (simulating payment processing)\r\nsleep 2\r\ncurl -s http://localhost:8080/api/orders/$ORDER_ID \\\r\n  -H \"Authorization: Bearer $TOKEN\" | jq .\r\n\r\n# 6. List all orders for the user\r\ncurl -s http://localhost:8080/api/orders \\\r\n  -H \"Authorization: Bearer $TOKEN\" | jq .\r\n\r\n# 7. Admin can see all orders\r\ncurl -s http://localhost:8080/api/orders?page=1&per_page=50 \\\r\n  -H \"Authorization: Bearer $ADMIN_TOKEN\" | jq .\r\n\r\n# 8. Cancel an order\r\ncurl -X DELETE http://localhost:8080/api/orders/$ORDER_ID \\\r\n  -H \"Authorization: Bearer $TOKEN\"\r\n\r\n# 9. Manage products (admin)\r\ncurl -s -X POST http://localhost:8080/api/products \\\r\n  -H \"Authorization: Bearer $TOKEN\" \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\r\n    \"name\": \"New Product\",\r\n    \"description\": \"A brand new product\",\r\n    \"price\": 29.99,\r\n    \"stock\": 100,\r\n    \"category\": \"electronics\",\r\n    \"status\": \"active\"\r\n  }' | jq .\r\n\r\n# 10. Update stock\r\ncurl -s -X PUT http://localhost:8080/api/products/1 \\\r\n  -H \"Authorization: Bearer $TOKEN\" \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\"stock\": 150}' | jq .\r\n\r\n# 11. Simulate webhook call\r\ncurl -X POST http://localhost:8080/webhook/payment \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -H \"X-Webhook-Signature: $(echo -n '{\"event\":\"payment.completed\",\"order_id\":42,\"transaction_id\":\"txn_abc123\",\"amount\":49.99,\"currency\":\"USD\",\"status\":\"completed\",\"method\":\"card\",\"timestamp\":\"2026-05-15T10:05:30Z\"}' | openssl dgst -sha256 -hmac \"your-webhook-secret\" | awk '{print $2}')\" \\\r\n  -d '{\r\n    \"event\": \"payment.completed\",\r\n    \"order_id\": 42,\r\n    \"transaction_id\": \"txn_abc123\",\r\n    \"amount\": 49.99,\r\n    \"currency\": \"USD\",\r\n    \"status\": \"completed\",\r\n    \"method\": \"card\",\r\n    \"timestamp\": \"2026-05-15T10:05:30Z\"\r\n  }' | jq .\r"
  },
  {
    "type": "h2",
    "id": "order-status-transitions",
    "text": "Order Status Transitions"
  },
  {
    "type": "code",
    "code": "pending → completed (payment received)\r\npending → cancelled (user cancelled or payment failed)\r\ncompleted → (terminal state)\r\ncancelled → (terminal state)\r"
  },
  {
    "type": "h2",
    "id": "error-handling",
    "text": "Error Handling"
  },
  {
    "type": "h3",
    "id": "validation-error-422",
    "text": "Validation Error (422)"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": false,\r\n    \"message\": \"Validation failed\",\r\n    \"errors\": {\r\n        \"customer_name\": [\"The customer name field is required.\"],\r\n        \"total\": [\"The total must be a number.\"]\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "not-found-404",
    "text": "Not Found (404)"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": false,\r\n    \"message\": \"Product not found\"\r\n}\r"
  },
  {
    "type": "h3",
    "id": "forbidden-403",
    "text": "Forbidden (403)"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": false,\r\n    \"message\": \"Forbidden\"\r\n}\r"
  },
  {
    "type": "h2",
    "id": "rate-limiting",
    "text": "Rate Limiting"
  },
  {
    "type": "table",
    "headers": [
      "Endpoint",
      "Limit"
    ],
    "rows": [
      [
        "Product CRUD",
        "60 requests/minute"
      ],
      [
        "Order CRUD",
        "60 requests/minute"
      ],
      [
        "Public GET",
        "120 requests/minute"
      ],
      [
        "Auth endpoints",
        "30-60 requests/minute"
      ],
      [
        "Webhook",
        "No limit"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "relations",
    "text": "Relations"
  },
  {
    "type": "ul",
    "items": [
      "A **Product** belongs to a **Category**",
      "An **Order** has many **OrderItems**",
      "An **Order** belongs to a **User**",
      "An **Order** has one **Payment**"
    ]
  }
],
}
