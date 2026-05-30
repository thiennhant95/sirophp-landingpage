
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Hash API Reference",
    description: "Secure password hashing using bcrypt with configurable cost factor.",
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
    "text": "Secure password hashing using bcrypt with configurable cost factor."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Hash;\r"
  },
  {
    "type": "h2",
    "id": "basic-usage",
    "text": "Basic Usage"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Hash a password (default cost: 12)\r\n$hash = Hash::make('user-password');\r\n\r\n// Verify a password against hash\r\nif (Hash::check('user-password', $hash)) {\r\n    // Password is correct\r\n}\r\n\r\n// Check if hash needs rehashing (cost increased)\r\nif (Hash::needsRehash($hash)) {\r\n    $newHash = Hash::make('user-password', ['cost' => 14]);\r\n}\r\n\r\n// Get hash info\r\n$info = Hash::info($hash);\r\n// ['algo' => 'bcrypt', 'algoName' => 'bcrypt', 'options' => ['cost' => 12]]\r"
  },
  {
    "type": "h2",
    "id": "cost-factor",
    "text": "Cost Factor"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Default cost (recommended balance of security and speed)\r\n$hash = Hash::make($password);\r\n// Uses cost = 12 (~250ms on modern hardware)\r\n\r\n// Higher cost (more secure, slower)\r\n$hash = Hash::make($password, ['cost' => 14]);\r\n// Uses cost = 14 (~1s on modern hardware)\r\n\r\n// Lower cost (faster, less secure — dev only)\r\n$hash = Hash::make($password, ['cost' => 8]);\r"
  },
  {
    "type": "p",
    "text": "Adjust cost based on your hardware. Aim for ~250-500ms per hash."
  },
  {
    "type": "h2",
    "id": "in-practice",
    "text": "In Practice"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// UserService.php\r\nprivate static function hashPassword(string $password): string\r\n{\r\n    return Hash::make($password, ['cost' => 12]);\r\n}\r\n\r\n// Login\r\npublic function login(string $email, string $password): ?array\r\n{\r\n    $user = $this->repo->findByEmail($email);\r\n    if ($user === null || !Hash::check($password, $user['password'])) {\r\n        return null;\r\n    }\r\n    return $user;\r\n}\r"
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
        "`make(string $value, array $options)`",
        "Hash value with bcrypt (cost defaults to 12)"
      ],
      [
        "`check(string $value, string $hash)`",
        "Verify value against hash"
      ],
      [
        "`needsRehash(string $hash, array $options)`",
        "Check if hash uses current cost"
      ],
      [
        "`info(string $hash)`",
        "Get algorithm and cost info"
      ]
    ]
  }
],
}
