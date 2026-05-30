
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Storage API Reference",
    description: "Siro's storage system provides a unified API for local filesystem and S3-compatible cloud storage with path traversal protection.",
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
    "text": "Siro's storage system provides a unified API for local filesystem and S3-compatible cloud storage with path traversal protection."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Storage;\r"
  },
  {
    "type": "h2",
    "id": "configuration",
    "text": "Configuration"
  },
  {
    "type": "code",
    "lang": "env",
    "code": "STORAGE_DRIVER=local          # local, s3\r\nSTORAGE_PATH=storage/app\r\n\r\n# S3 (optional)\r\nAWS_KEY=your-key\r\nAWS_SECRET=your-secret\r\nAWS_BUCKET=my-bucket\r\nAWS_REGION=us-east-1\r\nAWS_ENDPOINT=                 # custom endpoint (MinIO, DigitalOcean)\r"
  },
  {
    "type": "h2",
    "id": "basic-usage",
    "text": "Basic Usage"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Write file\r\nStorage::put('avatars/1.jpg', $contents);\r\n\r\n// Read file\r\n$contents = Storage::get('avatars/1.jpg');\r\n\r\n// Check existence\r\nif (Storage::exists('avatars/1.jpg')) { ... }\r\n\r\n// Delete\r\nStorage::delete('avatars/1.jpg');\r"
  },
  {
    "type": "h2",
    "id": "file-uploads",
    "text": "File Uploads"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// In controller\r\n$file = $request->file('avatar');\r\nif ($file !== null && $file->isValid()) {\r\n    // Store with auto-generated filename\r\n    $path = $file->store('avatars');\r\n    // Returns: \"avatars/abc123.jpg\"\r\n\r\n    // Store with custom filename\r\n    $path = $file->storeAs('avatars', 'profile.jpg');\r\n}\r"
  },
  {
    "type": "h2",
    "id": "urls",
    "text": "URLs"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Public URL for local files\r\n$url = Storage::url('avatars/1.jpg');\r\n// Returns: \"/storage/avatars/1.jpg\"\r\n\r\n// Public URL for S3\r\n$url = Storage::url('avatars/1.jpg');\r\n// Returns: \"https://bucket.s3.amazonaws.com/avatars/1.jpg\"\r\n\r\n// Temporary signed URL (S3 only)\r\n$url = Storage::temporaryUrl('avatars/1.jpg', 3600);\r"
  },
  {
    "type": "h2",
    "id": "directories",
    "text": "Directories"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// List files\r\n$files = Storage::files('avatars');\r\n\r\n// List with subdirectories\r\n$allFiles = Storage::allFiles('avatars');\r\n\r\n// List directories\r\n$directories = Storage::directories('avatars');\r\n\r\n// Create directory\r\nStorage::makeDirectory('avatars/thumbs');\r\n\r\n// Delete directory\r\nStorage::deleteDirectory('avatars/thumbs');\r"
  },
  {
    "type": "h2",
    "id": "s3-specific",
    "text": "S3-Specific"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Set ACL\r\nStorage::put('public/file.txt', $contents, ['visibility' => 'public']);\r\n\r\n// Copy between buckets\r\nStorage::copy('bucket1/file.txt', 'bucket2/file.txt');\r\n\r\n// Move\r\nStorage::move('old/path.txt', 'new/path.txt');\r\n\r\n// Get metadata\r\n$size = Storage::size('file.txt');\r\n$mime = Storage::mimeType('file.txt');\r\n$lastModified = Storage::lastModified('file.txt');\r"
  },
  {
    "type": "h2",
    "id": "path-traversal-protection",
    "text": "Path Traversal Protection"
  },
  {
    "type": "p",
    "text": "All file operations are protected against path traversal attacks:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// These are safely rejected\r\nStorage::get('../../../etc/passwd');\r\nStorage::put('../../config/database.php', $data);\r\n\r\n// Only within configured storage directory\r\nStorage::put('avatars/photo.jpg', $contents); // ✅ OK\r"
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
        "`put(string $path, mixed $contents, array $options)`",
        "Write file"
      ],
      [
        "`get(string $path)`",
        "Read file"
      ],
      [
        "`exists(string $path)`",
        "Check if file exists"
      ],
      [
        "`delete(string $path)`",
        "Delete file"
      ],
      [
        "`copy(string $from, string $to)`",
        "Copy file"
      ],
      [
        "`move(string $from, string $to)`",
        "Move file"
      ],
      [
        "`url(string $path)`",
        "Get public URL"
      ],
      [
        "`temporaryUrl(string $path, int $ttl)`",
        "Get signed URL (S3)"
      ],
      [
        "`size(string $path)`",
        "Get file size"
      ],
      [
        "`mimeType(string $path)`",
        "Get MIME type"
      ],
      [
        "`lastModified(string $path)`",
        "Get last modified timestamp"
      ],
      [
        "`files(string $directory)`",
        "List files in directory"
      ],
      [
        "`allFiles(string $directory)`",
        "List all files recursively"
      ],
      [
        "`directories(string $directory)`",
        "List subdirectories"
      ],
      [
        "`makeDirectory(string $path)`",
        "Create directory"
      ],
      [
        "`deleteDirectory(string $path)`",
        "Delete directory"
      ]
    ]
  }
],
}
