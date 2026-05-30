
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "URL API Reference",
    description: "Generate and validate signed URLs — useful for password reset links, email verification, or any expiring one-time URLs.",
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
    "text": "Generate and validate signed URLs — useful for password reset links, email verification, or any expiring one-time URLs."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\URL;\r"
  },
  {
    "type": "h2",
    "id": "signed-urls",
    "text": "Signed URLs"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Generate signed URL (valid for 1 hour)\r\n$link = URL::signed('/api/auth/reset-password', [\r\n    'email' => 'user@test.com',\r\n], 3600);\r\n// https://example.com/api/auth/reset-password?payload=...&signature=...\r\n\r\n// Validate incoming request\r\n$request = [\r\n    'payload' => $_GET['payload'],\r\n    'signature' => $_GET['signature'],\r\n];\r\n\r\n$data = URL::validate($request['payload'], $request['signature']);\r\nif ($data === null) {\r\n    // Invalid or expired URL\r\n}\r\n// $data = ['route' => '/api/auth/reset-password', 'params' => ['email' => 'user@test.com']]\r"
  },
  {
    "type": "h2",
    "id": "validate-from-request",
    "text": "Validate from Request"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In controller\r\n$data = URL::validateRequest();\r\n\r\nif ($data === null) {\r\n    return Response::error('Invalid or expired link', 400);\r\n}\r\n\r\n$email = $data['params']['email'] ?? '';\r\n// Process password reset\r"
  },
  {
    "type": "h2",
    "id": "use-case-password-reset",
    "text": "Use Case: Password Reset"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Generate link\r\n$token = bin2hex(random_bytes(32));\r\nUser::where('email', $email)->update(['reset_token' => hash('sha256', $token)]);\r\n\r\n$link = URL::signed('/api/auth/reset-password', [\r\n    'email' => $email,\r\n    'token' => $token,\r\n], 3600);\r\n\r\n// Email the link to user\r\nMail::to($email)->subject('Reset Your Password')->html($link);\r\n\r\n// Controller validates\r\npublic function resetPassword(Request $request): Response\r\n{\r\n    $data = URL::validateRequest();\r\n    if ($data === null) {\r\n        return Response::error('Invalid or expired reset link', 400);\r\n    }\r\n    // Process reset...\r\n}\r"
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
        "`signed(string $route, array $params, ?int $expires)`",
        "Generate signed URL"
      ],
      [
        "`validate(string $payload, string $signature, bool $throw)`",
        "Validate signature and expiry"
      ],
      [
        "`validateRequest(bool $throw)`",
        "Validate from current request"
      ]
    ]
  }
],
}
