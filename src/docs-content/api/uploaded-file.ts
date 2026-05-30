
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "UploadedFile API Reference",
    description: "Handles file uploads with validation, path traversal protection, and storage.",
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
    "text": "Handles file uploads with validation, path traversal protection, and storage."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$file = $request->file('avatar');\r"
  },
  {
    "type": "h2",
    "id": "basic-upload",
    "text": "Basic Upload"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In controller\r\n$file = $request->file('avatar');\r\n\r\n// Check if file is valid\r\nif ($file === null || !$file->isValid()) {\r\n    return Response::error('No file uploaded', 422);\r\n}\r\n\r\n// Store with auto-generated filename\r\n$path = $file->store('avatars');\r\n// \"avatars/abc123.jpg\"\r\n\r\n// Store with custom name\r\n$path = $file->storeAs('avatars', 'profile.jpg');\r\n// \"avatars/profile.jpg\"\r"
  },
  {
    "type": "h2",
    "id": "file-info",
    "text": "File Info"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$file->getClientOriginalName();      // \"photo.jpg\"\r\n$file->getClientOriginalExtension(); // \"jpg\"\r\n$file->getMimeType();                // \"image/jpeg\"\r\n$file->getSize();                    // 102400 (bytes)\r\n$file->getError();                   // UPLOAD_ERR_OK (0)\r\n$file->getPathname();                // \"/tmp/phpABC123\"\r\n$file->extension();                  // \"jpg\"\r\n$file->name();                       // \"photo\"\r\n$file->hash();                       // \"sha256hash...\"\r\n$file->isImage();                    // true\r\n$file->isPdf();                      // false\r"
  },
  {
    "type": "h2",
    "id": "type-checks",
    "text": "Type Checks"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Check before processing\r\nif ($file->isImage()) {\r\n    $path = $file->store('images');\r\n}\r\n\r\nif ($file->isPdf()) {\r\n    $path = $file->store('documents');\r\n}\r\n\r\n// Get MIME type (uses finfo, not client-supplied)\r\n$mime = $file->getMimeType();  // Server-detected, cannot be spoofed\r"
  },
  {
    "type": "h2",
    "id": "security",
    "text": "Security"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Extension whitelist (built-in)\r\n$file->store('avatars');  // Only allows safe extensions\r\n\r\n// Path traversal protection (built-in)\r\n$file->store('../../etc');  // Safely rejected\r"
  },
  {
    "type": "h2",
    "id": "validation-rules",
    "text": "Validation Rules"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In controller validation\r\n$validated = $request->validate([\r\n    'avatar' => 'required|file|image|max:2048',  // Max 2MB\r\n    'document' => 'file|mimes:pdf,doc|max:10240', // Max 10MB\r\n]);\r"
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
        "`isValid()`",
        "Check if upload was successful"
      ],
      [
        "`getClientOriginalName()`",
        "Original filename from client"
      ],
      [
        "`getClientOriginalExtension()`",
        "Original extension"
      ],
      [
        "`getMimeType()`",
        "Server-detected MIME type (finfo)"
      ],
      [
        "`getSize()`",
        "File size in bytes"
      ],
      [
        "`getError()`",
        "PHP upload error code"
      ],
      [
        "`getPathname()`",
        "Temp file path"
      ],
      [
        "`store(directory, name)`",
        "Store file with auto-name"
      ],
      [
        "`storeAs(directory, name)`",
        "Store file with custom name"
      ],
      [
        "`isImage()`",
        "Check if image type"
      ],
      [
        "`isPdf()`",
        "Check if PDF"
      ],
      [
        "`hash()`",
        "SHA-256 hash of file contents"
      ],
      [
        "`extension()`",
        "File extension"
      ],
      [
        "`name()`",
        "Filename without extension"
      ]
    ]
  }
],
}
