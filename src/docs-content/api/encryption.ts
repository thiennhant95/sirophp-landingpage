
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Encryption API Reference",
    description: "Siro provides AES-256 encryption with HKDF key separation and Encrypt-then-MAC authentication.",
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
    "text": "Siro provides AES-256 encryption with HKDF key separation and Encrypt-then-MAC authentication."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Encrypter;\r"
  },
  {
    "type": "h2",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "APP_KEY=your-32-character-app-key-here\r"
  },
  {
    "type": "p",
    "text": "Generate a key:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro key:generate\r"
  },
  {
    "type": "h2",
    "id": "basic-usage",
    "text": "Basic Usage"
  },
  {
    "type": "h3",
    "id": "encrypt",
    "text": "Encrypt"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$encrypted = Encrypter::encrypt('sensitive-data');\r\n// Returns base64-encoded string with IV + ciphertext + MAC\r"
  },
  {
    "type": "h3",
    "id": "decrypt",
    "text": "Decrypt"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$decrypted = Encrypter::decrypt($encrypted);\r\n// Returns original plaintext string\r"
  },
  {
    "type": "h2",
    "id": "how-it-works",
    "text": "How It Works"
  },
  {
    "type": "h3",
    "id": "encryption-flow",
    "text": "Encryption Flow"
  },
  {
    "type": "ol",
    "items": [
      "Generate random 16-byte IV (Initialization Vector)",
      "Derive encryption key using HKDF-SHA256",
      "Encrypt plaintext with AES-256-CBC",
      "Compute HMAC-SHA256 over IV + ciphertext",
      "Return base64(IV + ciphertext + MAC)"
    ]
  },
  {
    "type": "h3",
    "id": "decryption-flow",
    "text": "Decryption Flow"
  },
  {
    "type": "ol",
    "items": [
      "Decode base64 input",
      "Extract IV, ciphertext, MAC",
      "Verify MAC using `hash_equals` (timing-safe)",
      "Decrypt with AES-256-CBC",
      "Return plaintext"
    ]
  },
  {
    "type": "h2",
    "id": "key-separation",
    "text": "Key Separation"
  },
  {
    "type": "p",
    "text": "The master key (APP_KEY) is never used directly for encryption. Instead, HKDF derives separate keys:"
  },
  {
    "type": "table",
    "headers": [
      "Purpose",
      "Derived Key"
    ],
    "rows": [
      [
        "Encryption",
        "`HKDF(APP_KEY, \"encryption\")`"
      ],
      [
        "Authentication",
        "`HKDF(APP_KEY, \"authentication\")`"
      ]
    ]
  },
  {
    "type": "p",
    "text": "This ensures that a vulnerability in one operation cannot compromise the other key."
  },
  {
    "type": "h2",
    "id": "security-properties",
    "text": "Security Properties"
  },
  {
    "type": "table",
    "headers": [
      "Property",
      "Implementation"
    ],
    "rows": [
      [
        "Confidentiality",
        "AES-256-CBC"
      ],
      [
        "Integrity",
        "HMAC-SHA256 (Encrypt-then-MAC)"
      ],
      [
        "Key Separation",
        "HKDF-SHA256"
      ],
      [
        "Timing Safety",
        "`hash_equals()` for MAC verification"
      ],
      [
        "IV Randomness",
        "`random_bytes()` (CSPRNG)"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "ol",
    "items": [
      "**Always use `APP_KEY` >= 32 characters** — shorter keys are rejected",
      "**Keep `APP_KEY` secret** — never commit to version control",
      "**Rotate keys periodically** — re-encrypt data with new key",
      "**Use environment-specific keys** — different keys for dev/staging/production",
      "**Never encrypt authentication tokens** — use JWT instead"
    ]
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
        "`encrypt(string $data, ?string $key)`",
        "Encrypt data with optional custom key"
      ],
      [
        "`decrypt(string $payload, ?string $key)`",
        "Decrypt payload with optional custom key"
      ],
      [
        "`generateIv()`",
        "Generate random 16-byte IV"
      ],
      [
        "`hkdf(string $key, string $salt)`",
        "Derive sub-key using HKDF-SHA256"
      ]
    ]
  }
],
}
