
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "File Upload Guide",
    description: "Use `$request->file()` to access uploaded files:",
    category: "guide",
    order: 0,
    icon: "📚",
  },
  content: [
  {
    "type": "h2",
    "id": "receiving-files",
    "text": "Receiving Files"
  },
  {
    "type": "p",
    "text": "Use $request->file() to access uploaded files:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Request;\r\nuse Siro\\Core\\Response;\r\n\r\n// In a controller or route handler\r\npublic function upload(Request $request): Response\r\n{\r\n    $file = $request->file('avatar');\r\n\r\n    if ($file === null || !$file->isValid()) {\r\n        return Response::error('No file uploaded', 422);\r\n    }\r\n\r\n    $path = $file->store('avatars');\r\n\r\n    return Response::success([\r\n        'path' => $path,\r\n        'original_name' => $file->getClientOriginalName(),\r\n        'size' => $file->getSize(),\r\n        'mime' => $file->getMimeType(),\r\n    ], 'File uploaded');\r\n}\r"
  },
  {
    "type": "h3",
    "id": "uploadedfile-methods",
    "text": "UploadedFile Methods"
  },
  {
    "type": "table",
    "headers": [
      "Method",
      "Description"
    ],
    "rows": [
      [
        "`$file->isValid()`",
        "Check if upload was successful"
      ],
      [
        "`$file->store('path')`",
        "Store file, returns stored path"
      ],
      [
        "`$file->getClientOriginalName()`",
        "Original filename from client"
      ],
      [
        "`$file->getSize()`",
        "File size in bytes"
      ],
      [
        "`$file->getMimeType()`",
        "MIME type (e.g. `image/jpeg`)"
      ]
    ]
  },
  {
    "type": "h3",
    "id": "route-example",
    "text": "Route Example"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$router->post('/upload/avatar', function (Request $req): Response {\r\n    $file = $req->file('avatar');\r\n    if ($file === null || !$file->isValid()) {\r\n        return Response::error('No file uploaded', 422);\r\n    }\r\n    $path = $file->store('avatars');\r\n    return Response::success([\r\n        'path' => $path,\r\n        'original_name' => $file->getClientOriginalName(),\r\n        'size' => $file->getSize(),\r\n        'mime' => $file->getMimeType(),\r\n    ], 'Avatar uploaded');\r\n})->middleware([JsonMiddleware::class]);\r"
  },
  {
    "type": "h2",
    "id": "validation-rules-for-files",
    "text": "Validation Rules for Files"
  },
  {
    "type": "p",
    "text": "Validate file uploads using $request->validate():"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$request->validate([\r\n    'avatar' => 'required',            // File must be present\r\n    'document' => 'mimes:pdf,doc',     // Restrict MIME types\r\n]);\r"
  },
  {
    "type": "table",
    "headers": [
      "Rule",
      "Description"
    ],
    "rows": [
      [
        "`required`",
        "File must be uploaded"
      ],
      [
        "`mimes:pdf,jpg,png`",
        "Only allow specific MIME types"
      ]
    ]
  },
  {
    "type": "h2",
    "id": "storage-drivers",
    "text": "Storage Drivers"
  },
  {
    "type": "h3",
    "id": "local-storage-default",
    "text": "Local Storage (default)"
  },
  {
    "type": "p",
    "text": "Files are stored under storage/app/:"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "STORAGE_DRIVER=local\r\nSTORAGE_PATH=storage/app\r"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "# Create public storage symlink\r\nphp siro storage:link\r"
  },
  {
    "type": "h3",
    "id": "s3-storage",
    "text": "S3 Storage"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "STORAGE_DRIVER=s3\r\nSTORAGE_S3_KEY=your-key\r\nSTORAGE_S3_SECRET=your-secret\r\nSTORAGE_S3_REGION=us-east-1\r\nSTORAGE_S3_BUCKET=my-bucket\r\nSTORAGE_S3_ENDPOINT=   # Optional (for MinIO, DigitalOcean Spaces)\r"
  },
  {
    "type": "h2",
    "id": "file-download",
    "text": "File Download"
  },
  {
    "type": "p",
    "text": "Send files to clients:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Response;\r\n\r\n// Download (forces download dialog)\r\nreturn Response::download($path, 'filename.pdf');\r\n\r\n// Display inline\r\nreturn Response::file($path, 'application/pdf');\r"
  },
  {
    "type": "h2",
    "id": "using-the-uploader-helper",
    "text": "Using the Uploader Helper"
  },
  {
    "type": "p",
    "text": "For one-liner file upload, use the App\\Support\\Uploader class:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use App\\Support\\Uploader;\r\n\r\n// In a route closure:\r\n$router->post('/upload', fn(Request $r) => Uploader::response($r, 'file', 'uploads'));\r\n\r\n// In a controller:\r\n$result = Uploader::handle($request, 'avatar', 'avatars');\r\nif ($result['error']) return $result['response'];\r\n$url = $result['url']; // Full public URL\r"
  },
  {
    "type": "p",
    "text": "The Uploader automatically validates file extension, MIME type, and size."
  },
  {
    "type": "h2",
    "id": "security",
    "text": "Security"
  },
  {
    "type": "h3",
    "id": "mime-type-validation",
    "text": "MIME Type Validation"
  },
  {
    "type": "p",
    "text": "Always validate MIME types to prevent malicious uploads:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$request->validate([\r\n    'photo' => 'mimes:jpg,png,gif,webp',\r\n]);\r"
  },
  {
    "type": "h3",
    "id": "file-size",
    "text": "File Size"
  },
  {
    "type": "p",
    "text": "Check size server-side (upload limits also enforced by php.ini):"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In PHP config\r\nupload_max_filesize = 10M\r\npost_max_size = 12M\r\n\r\n// Server-side check\r\n$file = $request->file('document');\r\nif ($file->getSize() > 10 * 1024 * 1024) {\r\n    return Response::error('File too large', 422);\r\n}\r"
  },
  {
    "type": "h3",
    "id": "path-traversal-prevention",
    "text": "Path Traversal Prevention"
  },
  {
    "type": "p",
    "text": "The store() method sanitizes filenames and prevents directory traversal. Always use the returned path rather than constructing paths from user input:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Safe\r\n$path = $file->store('uploads');\r\n\r\n// UNSAFE — never do this\r\n$path = 'uploads/' . $request->string('filename');\r"
  },
  {
    "type": "h3",
    "id": "additional-measures",
    "text": "Additional Measures"
  },
  {
    "type": "ul",
    "items": [
      "Store uploaded files outside the web root when possible.",
      "Serve files through a controller rather than directly exposing the storage directory.",
      "Scan uploads for malware in production environments.",
      "Use random filenames to prevent enumeration attacks."
    ]
  }
],
}
