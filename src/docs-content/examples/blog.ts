
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Blog API Example",
    description: "A complete blog API built with SiroPHP demonstrating CRUD operations, authentication, pagination, sorting, and filtering.",
    category: "root",
    order: 0,
    icon: "📄",
  },
  content: [
  {
    "type": "p",
    "text": "A complete blog API built with SiroPHP demonstrating CRUD operations, authentication, pagination, sorting, and filtering."
  },
  {
    "type": "h2",
    "id": "models",
    "text": "Models"
  },
  {
    "type": "h3",
    "id": "post",
    "text": "Post"
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
        "title",
        "string",
        "required, min:3, max:255"
      ],
      [
        "body",
        "string",
        "required, min:10"
      ],
      [
        "locale",
        "string",
        "required, in:en,vi"
      ],
      [
        "status",
        "string",
        "in:draft,published"
      ],
      [
        "user_id",
        "integer",
        "foreign key to users"
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
    "id": "comment",
    "text": "Comment"
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
        "post_id",
        "integer",
        "required, foreign key"
      ],
      [
        "user_id",
        "integer",
        "required, foreign key"
      ],
      [
        "body",
        "string",
        "required, min:1"
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
    "id": "tag",
    "text": "Tag"
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
        "required, min:1, max:100"
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
    "type": "h2",
    "id": "api-endpoints",
    "text": "API Endpoints"
  },
  {
    "type": "h3",
    "id": "authentication",
    "text": "Authentication"
  },
  {
    "type": "p",
    "text": "All blog endpoints except public reads require authentication via Bearer JWT token."
  },
  {
    "type": "code",
    "code": "POST   /api/auth/register      Register new user\r\nPOST   /api/auth/login         Log in\r\nPOST   /api/auth/refresh       Refresh access token\r\nPOST   /api/auth/logout        Log out (protected)\r\nGET    /api/auth/me            Get current user (protected)\r"
  },
  {
    "type": "h3",
    "id": "posts",
    "text": "Posts"
  },
  {
    "type": "code",
    "code": "GET    /api/posts              List posts (public, paginated)\r\nGET    /api/posts/{id}         Get post detail (public)\r\nPOST   /api/posts              Create post (protected)\r\nPUT    /api/posts/{id}         Update post (protected, owner/admin)\r\nDELETE /api/posts/{id}         Delete post (protected, owner/admin)\r"
  },
  {
    "type": "h3",
    "id": "tags",
    "text": "Tags"
  },
  {
    "type": "code",
    "code": "GET    /api/tags               List tags (public, paginated)\r\nGET    /api/tags/{id}          Get tag detail (public)\r\nPOST   /api/tags               Create tag (protected)\r\nPUT    /api/tags/{id}          Update tag (protected)\r\nDELETE /api/tags/{id}          Delete tag (protected)\r"
  },
  {
    "type": "h3",
    "id": "categories",
    "text": "Categories"
  },
  {
    "type": "code",
    "code": "GET    /api/categories         List categories (public, paginated)\r\nGET    /api/categories/{id}    Get category detail (public)\r\nPOST   /api/categories         Create category (protected)\r\nPUT    /api/categories/{id}    Update category (protected)\r\nDELETE /api/categories/{id}    Delete category (protected)\r"
  },
  {
    "type": "h2",
    "id": "authentication",
    "text": "Authentication"
  },
  {
    "type": "h3",
    "id": "register",
    "text": "Register"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "POST /api/auth/register\r\nContent-Type: application/json\r\n\r\n{\r\n    \"name\": \"John Doe\",\r\n    \"email\": \"john@example.com\",\r\n    \"password\": \"securepass123\"\r\n}\r"
  },
  {
    "type": "p",
    "text": "Response 201:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Register successful\",\r\n    \"data\": {\r\n        \"token\": \"eyJhbGciOiJSUzI1NiIs...\",\r\n        \"refresh_token\": \"eyJhbGciOiJSUzI1NiIs...\",\r\n        \"token_type\": \"Bearer\",\r\n        \"expires_in\": 3600,\r\n        \"user\": {\r\n            \"id\": 1,\r\n            \"name\": \"John Doe\",\r\n            \"email\": \"john@example.com\"\r\n        }\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "login",
    "text": "Login"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "POST /api/auth/login\r\nContent-Type: application/json\r\n\r\n{\r\n    \"email\": \"john@example.com\",\r\n    \"password\": \"securepass123\"\r\n}\r"
  },
  {
    "type": "p",
    "text": "Response 200:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Login successful\",\r\n    \"data\": {\r\n        \"token\": \"eyJhbGciOiJSUzI1NiIs...\",\r\n        \"refresh_token\": \"eyJhbGciOiJSUzI1NiIs...\",\r\n        \"token_type\": \"Bearer\",\r\n        \"expires_in\": 3600,\r\n        \"user\": {\r\n            \"id\": 1,\r\n            \"name\": \"John Doe\",\r\n            \"email\": \"john@example.com\"\r\n        }\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "use-token",
    "text": "Use Token"
  },
  {
    "type": "p",
    "text": "All protected endpoints require the Authorization header:"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "Authorization: Bearer eyJhbGciOiJSUzI1NiIs...\r"
  },
  {
    "type": "h3",
    "id": "refresh-token",
    "text": "Refresh Token"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "POST /api/auth/refresh\r\nContent-Type: application/json\r\n\r\n{\r\n    \"refresh_token\": \"eyJhbGciOiJSUzI1NiIs...\"\r\n}\r"
  },
  {
    "type": "p",
    "text": "Response 200:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Token refreshed\",\r\n    \"data\": {\r\n        \"token\": \"eyJhbGciOiJSUzI1NiIs...\",\r\n        \"refresh_token\": \"eyJhbGciOiJSUzI1NiIs...\",\r\n        \"token_type\": \"Bearer\",\r\n        \"expires_in\": 3600\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "pagination-sorting-filtering",
    "text": "Pagination, Sorting & Filtering"
  },
  {
    "type": "h3",
    "id": "pagination",
    "text": "Pagination"
  },
  {
    "type": "p",
    "text": "All list endpoints support pagination via query parameters:"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "GET /api/posts?page=2&per_page=10\r"
  },
  {
    "type": "table",
    "headers": [
      "Parameter",
      "Type",
      "Default",
      "Description"
    ],
    "rows": [
      [
        "page",
        "integer",
        "1",
        "Page number"
      ],
      [
        "per_page",
        "integer",
        "20",
        "Items per page (max 100)"
      ]
    ]
  },
  {
    "type": "p",
    "text": "Response includes pagination metadata:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Posts list\",\r\n    \"data\": [...],\r\n    \"meta\": {\r\n        \"current_page\": 2,\r\n        \"per_page\": 10,\r\n        \"total\": 47,\r\n        \"last_page\": 5,\r\n        \"has_more\": true\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "sorting",
    "text": "Sorting"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "GET /api/posts?sort=created_at&order=desc\r"
  },
  {
    "type": "table",
    "headers": [
      "Parameter",
      "Type",
      "Default",
      "Description"
    ],
    "rows": [
      [
        "sort",
        "string",
        "created_at",
        "Field to sort by"
      ],
      [
        "order",
        "string",
        "desc",
        "Sort direction (asc, desc)"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "filtering",
    "text": "Filtering"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "GET /api/posts?locale=en&status=published\r\nGET /api/posts?locale=vi\r"
  },
  {
    "type": "h2",
    "id": "post-crud-examples",
    "text": "Post CRUD Examples"
  },
  {
    "type": "h3",
    "id": "list-posts",
    "text": "List Posts"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "GET /api/posts?page=1&per_page=10\r"
  },
  {
    "type": "p",
    "text": "Response 200:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Posts list\",\r\n    \"data\": [\r\n        {\r\n            \"id\": 1,\r\n            \"title\": \"Hello World\",\r\n            \"body\": \"This is the first post...\",\r\n            \"locale\": \"en\",\r\n            \"status\": \"published\",\r\n            \"image\": \"/storage/uploads/posts/image.jpg\",\r\n            \"created_at\": \"2026-05-15T10:00:00Z\",\r\n            \"updated_at\": \"2026-05-15T10:00:00Z\"\r\n        }\r\n    ],\r\n    \"meta\": {\r\n        \"current_page\": 1,\r\n        \"per_page\": 10,\r\n        \"total\": 1,\r\n        \"last_page\": 1,\r\n        \"has_more\": false\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "get-post",
    "text": "Get Post"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "GET /api/posts/1\r"
  },
  {
    "type": "p",
    "text": "Response 200:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Post detail\",\r\n    \"data\": {\r\n        \"id\": 1,\r\n        \"title\": \"Hello World\",\r\n        \"body\": \"This is the first post...\",\r\n        \"locale\": \"en\",\r\n        \"status\": \"published\",\r\n        \"image\": \"/storage/uploads/posts/image.jpg\",\r\n        \"created_at\": \"2026-05-15T10:00:00Z\",\r\n        \"updated_at\": \"2026-05-15T10:00:00Z\"\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "create-post",
    "text": "Create Post"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "POST /api/posts\r\nAuthorization: Bearer eyJhbGciOiJSUzI1NiIs...\r\nContent-Type: application/json\r\n\r\n{\r\n    \"title\": \"My New Post\",\r\n    \"body\": \"This is the content of my new post. It must be at least 10 characters long.\",\r\n    \"locale\": \"en\",\r\n    \"status\": \"draft\"\r\n}\r"
  },
  {
    "type": "p",
    "text": "Response 201:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Post created\",\r\n    \"data\": {\r\n        \"id\": 2,\r\n        \"title\": \"My New Post\",\r\n        \"body\": \"This is the content of my new post. It must be at least 10 characters long.\",\r\n        \"locale\": \"en\",\r\n        \"status\": \"draft\",\r\n        \"image\": null,\r\n        \"created_at\": \"2026-05-15T12:00:00Z\",\r\n        \"updated_at\": \"2026-05-15T12:00:00Z\"\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "create-post-with-image",
    "text": "Create Post with Image"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "POST /api/posts\r\nAuthorization: Bearer eyJhbGciOiJSUzI1NiIs...\r\nContent-Type: multipart/form-data\r\n\r\ntitle: \"Post with Image\"\r\nbody: \"Content with an uploaded image...\"\r\nlocale: \"en\"\r\nstatus: \"published\"\r\nimage: @/path/to/image.jpg\r"
  },
  {
    "type": "h3",
    "id": "update-post",
    "text": "Update Post"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "PUT /api/posts/2\r\nAuthorization: Bearer eyJhbGciOiJSUzI1NiIs...\r\nContent-Type: application/json\r\n\r\n{\r\n    \"title\": \"Updated Title\",\r\n    \"status\": \"published\"\r\n}\r"
  },
  {
    "type": "p",
    "text": "Response 200:"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": true,\r\n    \"message\": \"Post updated\",\r\n    \"data\": {\r\n        \"id\": 2,\r\n        \"title\": \"Updated Title\",\r\n        \"body\": \"This is the content of my new post...\",\r\n        \"locale\": \"en\",\r\n        \"status\": \"published\",\r\n        \"created_at\": \"2026-05-15T12:00:00Z\",\r\n        \"updated_at\": \"2026-05-15T13:00:00Z\"\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "delete-post",
    "text": "Delete Post"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "DELETE /api/posts/2\r\nAuthorization: Bearer eyJhbGciOiJSUzI1NiIs...\r"
  },
  {
    "type": "p",
    "text": "Response 204 (No Content)"
  },
  {
    "type": "h2",
    "id": "error-responses",
    "text": "Error Responses"
  },
  {
    "type": "h3",
    "id": "validation-error-422",
    "text": "Validation Error (422)"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": false,\r\n    \"message\": \"Validation failed\",\r\n    \"errors\": {\r\n        \"title\": [\"The title field is required.\"],\r\n        \"body\": [\"The body must be at least 10 characters.\"]\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "not-found-404",
    "text": "Not Found (404)"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": false,\r\n    \"message\": \"Post not found\"\r\n}\r"
  },
  {
    "type": "h3",
    "id": "unauthorized-401",
    "text": "Unauthorized (401)"
  },
  {
    "type": "code",
    "lang": "json",
    "code": "{\r\n    \"success\": false,\r\n    \"message\": \"Invalid credentials\"\r\n}\r"
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
    "id": "pagination-examples",
    "text": "Pagination Examples"
  },
  {
    "type": "h3",
    "id": "page-through-results",
    "text": "Page Through Results"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "# First page\r\nGET /api/posts?page=1&per_page=5\r\n\r\n# Second page\r\nGET /api/posts?page=2&per_page=5\r\n\r\n# Last page\r\nGET /api/posts?page=10&per_page=5\r"
  },
  {
    "type": "h3",
    "id": "filter-by-locale-and-status",
    "text": "Filter by Locale and Status"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "GET /api/posts?locale=en&status=published&page=1&per_page=20\r"
  },
  {
    "type": "h3",
    "id": "sort-by-different-fields",
    "text": "Sort by Different Fields"
  },
  {
    "type": "code",
    "lang": "http",
    "code": "# Newest first (default)\r\nGET /api/posts?sort=created_at&order=desc\r\n\r\n# Oldest first\r\nGET /api/posts?sort=created_at&order=asc\r\n\r\n# Alphabetical by title\r\nGET /api/posts?sort=title&order=asc\r"
  },
  {
    "type": "h2",
    "id": "complete-workflow-example",
    "text": "Complete Workflow Example"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# 1. Register\r\ncurl -X POST http://localhost:8080/api/auth/register \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"secret123\"}' | jq .\r\n\r\n# Save token\r\nTOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\"email\":\"john@example.com\",\"password\":\"secret123\"}' | jq -r '.data.token')\r\n\r\n# 2. Create a post\r\ncurl -X POST http://localhost:8080/api/posts \\\r\n  -H \"Authorization: Bearer $TOKEN\" \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\"title\":\"My First Post\",\"body\":\"This is the body content. It must be at least 10 characters.\",\"locale\":\"en\",\"status\":\"published\"}' | jq .\r\n\r\n# 3. List all posts\r\ncurl -s http://localhost:8080/api/posts | jq .\r\n\r\n# 4. Get single post\r\ncurl -s http://localhost:8080/api/posts/1 | jq .\r\n\r\n# 5. Update post\r\ncurl -X PUT http://localhost:8080/api/posts/1 \\\r\n  -H \"Authorization: Bearer $TOKEN\" \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\"title\":\"Updated Title\"}' | jq .\r\n\r\n# 6. Delete post\r\ncurl -X DELETE http://localhost:8080/api/posts/1 \\\r\n  -H \"Authorization: Bearer $TOKEN\"\r\n\r\n# 7. List tags\r\ncurl -s http://localhost:8080/api/tags | jq .\r\n\r\n# 8. Create tag\r\ncurl -X POST http://localhost:8080/api/tags \\\r\n  -H \"Authorization: Bearer $TOKEN\" \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\"name\":\"php\"}' | jq .\r\n\r\n# 9. List categories\r\ncurl -s http://localhost:8080/api/categories | jq .\r\n\r\n# 10. Create category\r\ncurl -X POST http://localhost:8080/api/categories \\\r\n  -H \"Authorization: Bearer $TOKEN\" \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d '{\"name\":\"Technology\"}' | jq .\r\n\r\n# 11. Paginated list\r\ncurl -s \"http://localhost:8080/api/posts?page=1&per_page=5&sort=created_at&order=desc\" | jq .\r\n\r\n# 12. Health check\r\ncurl -s http://localhost:8080/health | jq .\r"
  },
  {
    "type": "h2",
    "id": "relations",
    "text": "Relations"
  },
  {
    "type": "ul",
    "items": [
      "A **Post** belongs to a **User** (author)",
      "A **Post** has many **Comments**",
      "A **Post** belongs to many **Tags** (pivot table)",
      "A **Post** belongs to a **Category**",
      "A **Comment** belongs to a **Post** and a **User**"
    ]
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
        "POST /api/auth/login",
        "60 requests/minute"
      ],
      [
        "POST /api/auth/register",
        "30 requests/minute"
      ],
      [
        "POST /api/auth/forgot-password",
        "10 requests/minute"
      ],
      [
        "Protected CRUD endpoints",
        "60 requests/minute"
      ],
      [
        "Public GET endpoints",
        "120 requests/minute"
      ]
    ]
  }
],
}
