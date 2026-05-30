
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Pagination Reference",
    description: "Pagination is built into the QueryBuilder and Model. No extra package needed.",
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
    "text": "Pagination is built into the QueryBuilder and Model. No extra package needed."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Model\r\n$products = Product::paginate(20, $page);\r\n\r\n// QueryBuilder\r\n$products = Product::query()\r\n    ->where('price', '>', 100)\r\n    ->orderBy('created_at', 'DESC')\r\n    ->paginate(20, $page);\r"
  },
  {
    "type": "h2",
    "id": "response-format",
    "text": "Response Format"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"data\": [\r\n        { \"id\": 1, \"name\": \"Product 1\" },\r\n        { \"id\": 2, \"name\": \"Product 2\" }\r\n    ],\r\n    \"meta\": {\r\n        \"page\": 1,\r\n        \"per_page\": 20,\r\n        \"total\": 150,\r\n        \"last_page\": 8\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "controller-usage",
    "text": "Controller Usage"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class ProductController extends Controller\r\n{\r\n    public function index(Request $request): Response\r\n    {\r\n        $page = max(1, $request->queryInt('page', 1));\r\n        $perPage = min(100, max(1, $request->queryInt('per_page', 20)));\r\n\r\n        $result = Product::query()\r\n            ->where('status', 'active')\r\n            ->orderBy('created_at', 'DESC')\r\n            ->paginate($perPage, $page);\r\n\r\n        return $this->paginated(\r\n            ProductResource::collection($result['data']),\r\n            $result['meta'],\r\n            'Products retrieved',\r\n        );\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "with-resources",
    "text": "With Resources"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$result = $this->service->getAll($page, $perPage);\r\n\r\nreturn $this->paginated(\r\n    UserResource::collection($result['data']),\r\n    $result['meta'],\r\n    'Users retrieved',\r\n);\r"
  },
  {
    "type": "h2",
    "id": "meta-structure",
    "text": "Meta Structure"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$meta = $result['meta'];\r\n// [\r\n//   'page'      => 1,      // Current page\r\n//   'per_page'  => 20,     // Items per page\r\n//   'total'     => 150,    // Total items\r\n//   'last_page' => 8,      // Last page number\r\n// ]\r"
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
        "`Model::paginate(perPage, page)`",
        "Paginate model query"
      ],
      [
        "`QueryBuilder::paginate(perPage, page)`",
        "Paginate builder query"
      ],
      [
        "`Controller::paginated(data, meta, message)`",
        "Return paginated response"
      ],
      [
        "`Response::paginated(data, meta, message)`",
        "Static paginated response"
      ]
    ]
  }
],
}
