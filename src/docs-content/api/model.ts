
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Model API Reference",
    description: "The Model layer provides an ORM-like interface for database operations with relationships, scopes, and soft deletes.",
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
    "text": "The Model layer provides an ORM-like interface for database operations with relationships, scopes, and soft deletes."
  },
  {
    "type": "h2",
    "id": "basic-usage",
    "text": "Basic Usage"
  },
  {
    "type": "h3",
    "id": "define-a-model",
    "text": "Define a Model"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\nnamespace App\\Models;\r\n\r\nuse Siro\\Core\\Model;\r\n\r\nfinal class User extends Model\r\n{\r\n    protected string $table = 'users';\r\n    \r\n    protected array $fillable = ['name', 'email', 'password'];\r\n    \r\n    protected array $hidden = ['password'];\r\n    \r\n    protected array $casts = [\r\n        'id' => 'int',\r\n        'status' => 'int',\r\n        'email_verified_at' => 'datetime',\r\n    ];\r\n}\r"
  },
  {
    "type": "h3",
    "id": "crud-operations",
    "text": "CRUD Operations"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Create\r\n$user = User::create([\r\n    'name' => 'John Doe',\r\n    'email' => 'john@example.com',\r\n    'password' => Hash::make('secret'),\r\n]);\r\n\r\n// Find by ID\r\n$user = User::find(1);\r\n\r\n// Find or fail\r\n$user = User::findOrFail(1); // Throws exception if not found\r\n\r\n// Update\r\n$user->update(['name' => 'Jane Doe']);\r\n\r\n// Delete\r\n$user->delete();\r\n\r\n// All records\r\n$users = User::all();\r\n\r\n// Count\r\n$count = User::count();\r"
  },
  {
    "type": "h2",
    "id": "query-builder-integration",
    "text": "Query Builder Integration"
  },
  {
    "type": "p",
    "text": "Models inherit all QueryBuilder methods:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Where clauses\r\n$users = User::where('status', 'active')->get();\r\n$users = User::where('age', '>=', 18)->where('status', 'active')->get();\r\n\r\n// Ordering\r\n$users = User::orderBy('created_at', 'desc')->get();\r\n\r\n// Limiting\r\n$users = User::limit(10)->get();\r\n\r\n// Select specific columns\r\n$users = User::select(['id', 'name', 'email'])->get();\r\n\r\n// Pagination\r\n$result = User::paginate(20, $page);\r\n// Returns: ['data' => [...], 'meta' => ['page' => 1, 'per_page' => 20, ...]]\r\n\r\n// First record\r\n$user = User::where('email', 'john@example.com')->first();\r\n\r\n// Pluck single column\r\n$emails = User::pluck('email');\r\n\r\n// Chunk large datasets\r\nUser::chunk(100, function ($users) {\r\n    foreach ($users as $user) {\r\n        // Process each user\r\n    }\r\n});\r"
  },
  {
    "type": "h2",
    "id": "relationships",
    "text": "Relationships"
  },
  {
    "type": "h3",
    "id": "hasone-one-to-one",
    "text": "HasOne (One-to-One)"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// User model\r\npublic function profile(): HasOne\r\n{\r\n    return $this->hasOne(Profile::class, 'user_id', 'id');\r\n}\r\n\r\n// Usage\r\n$user = User::find(1);\r\n$profile = $user->profile; // Profile instance or null\r"
  },
  {
    "type": "h3",
    "id": "hasmany-one-to-many",
    "text": "HasMany (One-to-Many)"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// User model\r\npublic function posts(): HasMany\r\n{\r\n    return $this->hasMany(Post::class, 'user_id', 'id');\r\n}\r\n\r\n// Usage\r\n$user = User::find(1);\r\n$posts = $user->posts; // Collection of posts\r\n\r\n// Query relationship\r\n$publishedPosts = $user->posts()->where('status', 'published')->get();\r"
  },
  {
    "type": "h3",
    "id": "belongsto-many-to-one",
    "text": "BelongsTo (Many-to-One)"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Post model\r\npublic function author(): BelongsTo\r\n{\r\n    return $this->belongsTo(User::class, 'user_id', 'id');\r\n}\r\n\r\n// Usage\r\n$post = Post::find(1);\r\n$author = $post->author; // User instance\r"
  },
  {
    "type": "h3",
    "id": "belongstomany-many-to-many",
    "text": "BelongsToMany (Many-to-Many)"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Post model\r\npublic function tags(): BelongsToMany\r\n{\r\n    return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id');\r\n}\r\n\r\n// Usage\r\n$post = Post::find(1);\r\n$tags = $post->tags; // Collection of tags\r\n\r\n// Attach relationship\r\n$post->tags()->attach($tagId);\r\n$post->tags()->attach([$tagId1, $tagId2]);\r\n\r\n// Detach relationship\r\n$post->tags()->detach($tagId);\r\n$post->tags()->detach([$tagId1, $tagId2]);\r\n\r\n// Sync (replace all)\r\n$post->tags()->sync([$tagId1, $tagId2]);\r\n\r\n// Toggle\r\n$post->tags()->toggle($tagId);\r\n\r\n// Check if has relationship\r\nif ($post->tags()->has($tagId)) {\r\n    // Post has this tag\r\n}\r"
  },
  {
    "type": "p",
    "text": "Retrieve extra pivot columns using withPivot():"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Define relationship with pivot columns\r\npublic function orders(): BelongsToMany\r\n{\r\n    return $this->belongsToMany(Product::class, 'order_product')\r\n        ->withPivot(['quantity', 'price']);\r\n}\r\n\r\n// Pivot columns are included in query results\r\n$order->products; // Each product has quantity and price from pivot\r\n\r\n// Attach with pivot data\r\n$user->roles()->attach($roleId, ['assigned_by' => $userId]);\r\n\r\n// Sync with pivot data (associative array)\r\n$user->roles()->sync([\r\n    $roleId1 => ['assigned_by' => $userId],\r\n    $roleId2 => ['assigned_by' => $userId],\r\n]);\r"
  },
  {
    "type": "h3",
    "id": "morphmany-polymorphic-one-to-many",
    "text": "MorphMany (Polymorphic One-to-Many)"
  },
  {
    "type": "p",
    "text": "One model can belong to multiple other models on a single association."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Comment belongs to Post OR Product OR Article\r\n// Table: comments (id, body, commentable_type, commentable_id)\r\n\r\nclass Comment extends Model\r\n{\r\n    // Inverse polymorphic: which model owns this comment?\r\n    public function commentable(): MorphTo\r\n    {\r\n        return $this->morphTo('commentable');\r\n    }\r\n}\r\n\r\nclass Post extends Model\r\n{\r\n    // A post has many comments\r\n    public function comments(): MorphMany\r\n    {\r\n        return $this->morphMany(Comment::class, 'commentable');\r\n    }\r\n}\r\n\r\nclass Product extends Model\r\n{\r\n    // A product also has many comments\r\n    public function comments(): MorphMany\r\n    {\r\n        return $this->morphMany(Comment::class, 'commentable');\r\n    }\r\n}\r\n\r\n// Usage: get comments on any model\r\n$post->comments;     // All comments on this post\r\n$product->comments;  // All comments on this product\r\n\r\n// Usage: get the parent of a comment\r\n$comment->commentable; // Returns Post or Product or Article\r\n\r\n// Create via polymorphic relationship\r\n$post->comments()->create(['body' => 'Great post!']);\r\n$product->comments()->create(['body' => 'Nice product!']);\r"
  },
  {
    "type": "h3",
    "id": "morphto-inverse-polymorphic",
    "text": "MorphTo (Inverse Polymorphic)"
  },
  {
    "type": "p",
    "text": "Defined automatically by morphTo() inside the child model:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$comment = Comment::find(1);\r\n$owner = $comment->commentable; // Post, Product, or Article\r"
  },
  {
    "type": "p",
    "text": "Eager loading works for both directions:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Eager load morphMany\r\n$post = Post::with('comments')->find(1);\r\n\r\n// Eager load morphTo (inverse)\r\n$comment = Comment::with('commentable')->find(1);\r"
  },
  {
    "type": "h2",
    "id": "eager-loading",
    "text": "Eager Loading"
  },
  {
    "type": "p",
    "text": "Prevent N+1 query problems:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ❌ Bad - N+1 queries\r\n$posts = Post::all();\r\nforeach ($posts as $post) {\r\n    echo $post->author->name; // Query per post!\r\n}\r\n\r\n// ✅ Good - 2 queries total\r\n$posts = Post::with('author')->get();\r\nforeach ($posts as $post) {\r\n    echo $post->author->name; // No additional queries\r\n}\r\n\r\n// Multiple relationships\r\n$posts = Post::with('author', 'comments', 'tags')->get();\r\n\r\n// Nested relationships\r\n$posts = Post::with('author.profile', 'comments.user')->get();\r\n\r\n// Conditional eager loading\r\n$posts = Post::with(['comments' => function ($query) {\r\n    $query->where('status', 'approved')->orderBy('created_at', 'desc');\r\n}])->get();\r"
  },
  {
    "type": "h2",
    "id": "soft-deletes",
    "text": "Soft Deletes"
  },
  {
    "type": "p",
    "text": "Enable soft deletes to keep deleted records in database:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\nnamespace App\\Models;\r\n\r\nuse Siro\\Core\\Model;\r\nuse Siro\\Core\\DB\\SoftDeletes;\r\n\r\nfinal class Post extends Model\r\n{\r\n    use SoftDeletes;\r\n    \r\n    protected string $table = 'posts';\r\n}\r"
  },
  {
    "type": "p",
    "text": "Usage:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Soft delete (sets deleted_at timestamp)\r\n$post->delete();\r\n\r\n// Query automatically excludes soft-deleted records\r\nPost::all(); // Only non-deleted posts\r\n\r\n// Include soft-deleted in query\r\nPost::withTrashed()->get();\r\n\r\n// Get only soft-deleted records\r\nPost::onlyTrashed()->get();\r\n\r\n// Restore a soft-deleted record\r\nPost::withTrashed()->find(1)->restore();\r\n\r\n// Permanently delete from database\r\n$post->forceDelete();\r\n\r\n// Check if record is soft-deleted\r\nif ($post->trashed()) {\r\n    echo \"This post was deleted\";\r\n}\r"
  },
  {
    "type": "p",
    "text": "Migration for soft deletes:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Schema::table('posts', function (Blueprint $table) {\r\n    $table->softDeletes(); // Adds deleted_at column\r\n});\r"
  },
  {
    "type": "h2",
    "id": "attribute-casting",
    "text": "Attribute Casting"
  },
  {
    "type": "p",
    "text": "Automatically cast attributes to native types:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "protected array $casts = [\r\n    'id' => 'int',\r\n    'price' => 'float',\r\n    'is_active' => 'bool',\r\n    'metadata' => 'array',\r\n    'published_at' => 'datetime',\r\n    'options' => 'json',\r\n];\r\n\r\n// Usage\r\n$user = User::find(1);\r\n$user->is_active; // true (boolean, not string \"1\")\r\n$user->metadata; // ['key' => 'value'] (array, not JSON string)\r\n$user->published_at; // DateTime instance\r"
  },
  {
    "type": "p",
    "text": "Available cast types:"
  },
  {
    "type": "ul",
    "items": [
      "`int`, `integer`",
      "`real`, `float`, `double`",
      "`string`",
      "`bool`, `boolean`",
      "`array`",
      "`json`",
      "`object`",
      "`datetime`, `date`",
      "`timestamp`"
    ]
  },
  {
    "type": "h2",
    "id": "accessors-mutators-v0-28",
    "text": "Accessors & Mutators (v0.34+)"
  },
  {
    "type": "p",
    "text": "Transform attributes automatically when getting or setting values."
  },
  {
    "type": "h3",
    "id": "accessors",
    "text": "Accessors"
  },
  {
    "type": "p",
    "text": "Accessors are called when you retrieve an attribute. Define a method with the pattern get{AttributeName}Attribute:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class User extends Model\r\n{\r\n    // Accessor - automatically called when accessing $user->name\r\n    public function getNameAttribute(mixed $value): string\r\n    {\r\n        return ucfirst(strtolower((string) $value));\r\n    }\r\n    \r\n    // Virtual accessor (no database column)\r\n    public function getFullNameAttribute(): string\r\n    {\r\n        return \"{$this->first_name} {$this->last_name}\";\r\n    }\r\n}\r\n\r\n$user = User::find(1);\r\necho $user->name;      // Auto-formatted: \"John Doe\"\r\necho $user->full_name; // Virtual: \"John Doe\"\r"
  },
  {
    "type": "h3",
    "id": "mutators",
    "text": "Mutators"
  },
  {
    "type": "p",
    "text": "Mutators are called when you set an attribute. Define a method with the pattern set{AttributeName}Attribute:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class User extends Model\r\n{\r\n    // Mutator - automatically called when setting $user->email\r\n    public function setEmailAttribute(string $value): void\r\n    {\r\n        // IMPORTANT: Set directly to avoid infinite recursion\r\n        $reflection = new \\ReflectionClass($this);\r\n        $property = $reflection->getProperty('attributes');\r\n        $property->setAccessible(true);\r\n        $attrs = $property->getValue($this);\r\n        $attrs['email'] = strtolower($value);\r\n        $property->setValue($this, $attrs);\r\n    }\r\n    \r\n    // Hash password automatically\r\n    public function setPasswordAttribute(string $value): void\r\n    {\r\n        $reflection = new \\ReflectionClass($this);\r\n        $property = $reflection->getProperty('attributes');\r\n        $property->setAccessible(true);\r\n        $attrs = $property->getValue($this);\r\n        $attrs['password'] = password_hash($value, PASSWORD_BCRYPT);\r\n        $property->setValue($this, $attrs);\r\n    }\r\n}\r\n\r\n$user = new User();\r\n$user->email = 'TEST@EXAMPLE.COM';  // Stored as 'test@example.com'\r\n$user->password = 'secret123';       // Stored as hashed value\r"
  },
  {
    "type": "p",
    "text": "⚠️ Important: Mutators must NOT call $this->setAttribute() inside the mutator method, as this causes infinite recursion. Use reflection or a helper trait to set attributes directly."
  },
  {
    "type": "h3",
    "id": "helper-trait-for-cleaner-mutators",
    "text": "Helper Trait for Cleaner Mutators"
  },
  {
    "type": "p",
    "text": "Create a reusable trait to simplify mutator syntax:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// app/Traits/MutatorHelper.php\r\ntrait MutatorHelper\r\n{\r\n    protected function setRawAttribute(string $key, mixed $value): void\r\n    {\r\n        $reflection = new \\ReflectionClass($this);\r\n        $property = $reflection->getProperty('attributes');\r\n        $property->setAccessible(true);\r\n        $attrs = $property->getValue($this);\r\n        $attrs[$key] = $value;\r\n        $property->setValue($this, $attrs);\r\n    }\r\n}\r\n\r\n// Usage in Model\r\nclass User extends Model\r\n{\r\n    use MutatorHelper;\r\n    \r\n    public function setEmailAttribute(string $value): void\r\n    {\r\n        $this->setRawAttribute('email', strtolower($value));\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "virtual-attributes-with-appends-v0-28",
    "text": "Virtual Attributes with Appends (v0.34+)"
  },
  {
    "type": "p",
    "text": "Add computed/virtual attributes to JSON and array serialization using the $appends property:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class User extends Model\r\n{\r\n    protected array $appends = ['full_name', 'initials', 'age'];\r\n    \r\n    // These accessors will be included in toArray() and json_encode()\r\n    public function getFullNameAttribute(): string\r\n    {\r\n        return ($this->first_name ?? '') . ' ' . ($this->last_name ?? '');\r\n    }\r\n    \r\n    public function getInitialsAttribute(): string\r\n    {\r\n        $first = $this->first_name ?? '';\r\n        $last = $this->last_name ?? '';\r\n        return strtoupper(substr($first, 0, 1) . substr($last, 0, 1));\r\n    }\r\n    \r\n    public function getAgeAttribute(): int\r\n    {\r\n        return date_diff(date_create($this->birth_date), date_create('now'))->y;\r\n    }\r\n}\r\n\r\n$user = User::find(1);\r\n$data = $user->toArray();\r\n// Includes: id, first_name, last_name, birth_date, full_name, initials, age\r\n\r\n$json = json_encode($user);\r\n// {\"id\":1,\"first_name\":\"John\",\"last_name\":\"Doe\",\"full_name\":\"John Doe\",\"initials\":\"JD\",\"age\":30}\r"
  },
  {
    "type": "p",
    "text": "Note: Appended attributes respect the $hidden property. If an appended attribute is in $hidden, it will not be included."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class User extends Model\r\n{\r\n    protected array $hidden = ['secret_data'];\r\n    protected array $appends = ['secret_data']; // Will NOT appear in output\r\n}\r"
  },
  {
    "type": "h2",
    "id": "datetime-auto-formatting-v0-28",
    "text": "DateTime Auto-Formatting (v0.34+)"
  },
  {
    "type": "p",
    "text": "DateTime casts now automatically format to strings for JSON-safe serialization. This eliminates common JSON encoding errors with DateTime objects."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class Post extends Model\r\n{\r\n    protected array $casts = [\r\n        'created_at' => 'datetime',\r\n        'updated_at' => 'datetime',\r\n        'published_at' => 'date',\r\n    ];\r\n}\r\n\r\n$post = Post::find(1);\r\n\r\n// Before v0.28: Returns DateTime object (causes JSON errors)\r\n// After v0.28: Returns formatted string\r\necho $post->created_at;   // \"2024-01-15 10:30:00\"\r\necho $post->published_at; // \"2024-01-15 00:00:00\"\r\n\r\n// JSON serialization works perfectly - no more errors!\r\n$json = json_encode($post);\r\n// {\"id\":1,\"created_at\":\"2024-01-15 10:30:00\",\"published_at\":\"2024-01-15 00:00:00\"}\r\n\r\n// In API responses\r\nreturn Response::success($post); // DateTime fields are strings, not objects\r"
  },
  {
    "type": "p",
    "text": "Supported date cast types:"
  },
  {
    "type": "ul",
    "items": [
      "`'datetime'` - Full datetime with time: `Y-m-d H:i:s`",
      "`'date'` - Date only: `Y-m-d H:i:s`"
    ]
  },
  {
    "type": "h2",
    "id": "scopes",
    "text": "Scopes"
  },
  {
    "type": "p",
    "text": "Reusable query constraints:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Scope method (prefix with \"scope\")\r\npublic function scopeActive($query)\r\n{\r\n    return $query->where('status', 'active');\r\n}\r\n\r\npublic function scopePopular($query)\r\n{\r\n    return $query->where('views', '>', 1000);\r\n}\r\n\r\n// Usage\r\n$users = User::active()->get();\r\n$posts = Post::popular()->orderBy('created_at', 'desc')->get();\r\n\r\n// Dynamic scopes\r\npublic function scopeOfType($query, string $type)\r\n{\r\n    return $query->where('type', $type);\r\n}\r\n\r\n// Usage\r\n$posts = Post::ofType('article')->get();\r"
  },
  {
    "type": "h2",
    "id": "mass-assignment-protection",
    "text": "Mass Assignment Protection"
  },
  {
    "type": "p",
    "text": "Models require explicit $fillable declaration:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "final class User extends Model\r\n{\r\n    // Only these fields can be mass-assigned\r\n    protected array $fillable = ['name', 'email'];\r\n    \r\n    // These are protected automatically:\r\n    // - password\r\n    // - role\r\n    // - is_admin\r\n}\r\n\r\n// ❌ Will trigger warning and block unauthorized fields\r\nUser::create($request->all());\r\n\r\n// ✅ Explicitly allow only safe fields\r\nUser::create($request->only(['name', 'email']));\r"
  },
  {
    "type": "p",
    "text": "Runtime Warning: If $fillable is empty, framework triggers E_USER_WARNING:"
  },
  {
    "type": "code",
    "code": "Mass assignment protection: $fillable is empty on User model.\r\nNo fields will be mass-assigned. Define $fillable array.\r"
  },
  {
    "type": "h2",
    "id": "hidden-attributes",
    "text": "Hidden Attributes"
  },
  {
    "type": "p",
    "text": "Hide sensitive attributes from JSON responses:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "protected array $hidden = ['password', 'remember_token'];\r\n\r\n// Usage\r\nreturn Response::json($user);\r\n// Output: {\"id\":1,\"name\":\"John\",\"email\":\"john@example.com\"}\r\n// Password is NOT included\r"
  },
  {
    "type": "p",
    "text": "Temporarily show hidden attributes:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "return Response::json($user->makeVisible(['password']));\r"
  },
  {
    "type": "h2",
    "id": "timestamps",
    "text": "Timestamps"
  },
  {
    "type": "p",
    "text": "Models automatically manage created_at and updated_at:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Disable timestamps\r\npublic bool $timestamps = false;\r\n\r\n// Custom timestamp columns\r\nconst CREATED_AT = 'creation_date';\r\nconst UPDATED_AT = 'last_update';\r"
  },
  {
    "type": "h2",
    "id": "events",
    "text": "Events"
  },
  {
    "type": "p",
    "text": "Models fire lifecycle events automatically:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Listen to events\r\nEvent::on('users.creating', function ($user): bool {\r\n    // Validate before create\r\n    if (User::where('email', $user->email)->exists()) {\r\n        return false; // Cancel creation\r\n    }\r\n    return true;\r\n});\r\n\r\nEvent::on('users.created', function ($user) {\r\n    // Send welcome email\r\n    Mail::to($user->email)\r\n        ->subject('Welcome!')\r\n        ->html('<h1>Welcome!</h1>')\r\n        ->queue();\r\n});\r"
  },
  {
    "type": "p",
    "text": "Model lifecycle events:"
  },
  {
    "type": "code",
    "code": "saving → creating → INSERT → created → saved\r\nsaving → updating → UPDATE → updated → saved\r\ndeleting → DELETE → deleted\r"
  },
  {
    "type": "h2",
    "id": "best-practices",
    "text": "Best Practices"
  },
  {
    "type": "h3",
    "id": "1-always-use-eager-loading",
    "text": "1. Always Use Eager Loading"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ❌ Bad\r\n$posts = Post::all();\r\nforeach ($posts as $post) {\r\n    echo $post->author->name;\r\n}\r\n\r\n// ✅ Good\r\n$posts = Post::with('author')->get();\r\nforeach ($posts as $post) {\r\n    echo $post->author->name;\r\n}\r"
  },
  {
    "type": "h3",
    "id": "2-use-fillable-protection",
    "text": "2. Use Fillable Protection"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// ❌ Dangerous\r\nprotected array $fillable = []; // Allows all fields\r\n\r\n// ✅ Safe\r\nprotected array $fillable = ['name', 'email'];\r"
  },
  {
    "type": "h3",
    "id": "3-hide-sensitive-data",
    "text": "3. Hide Sensitive Data"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "protected array $hidden = ['password', 'token', 'secret'];\r"
  },
  {
    "type": "h3",
    "id": "4-cast-attributes-properly",
    "text": "4. Cast Attributes Properly"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "protected array $casts = [\r\n    'is_active' => 'bool',\r\n    'metadata' => 'array',\r\n    'published_at' => 'datetime',\r\n];\r"
  },
  {
    "type": "h3",
    "id": "5-use-scopes-for-reusable-queries",
    "text": "5. Use Scopes for Reusable Queries"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Define scope\r\npublic function scopePublished($query)\r\n{\r\n    return $query->where('status', 'published');\r\n}\r\n\r\n// Use scope\r\n$posts = Post::published()->orderBy('created_at', 'desc')->get();\r"
  },
  {
    "type": "h3",
    "id": "6-add-database-indexes",
    "text": "6. Add Database Indexes"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Schema::table('users', function (Blueprint $table) {\r\n    $table->index('email'); // Speed up WHERE email = ?\r\n    $table->index(['status', 'created_at']); // Composite index\r\n});\r"
  },
  {
    "type": "h2",
    "id": "examples",
    "text": "Examples"
  },
  {
    "type": "h3",
    "id": "blog-post-model",
    "text": "Blog Post Model"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\nnamespace App\\Models;\r\n\r\nuse Siro\\Core\\Model;\r\nuse Siro\\Core\\DB\\SoftDeletes;\r\n\r\nfinal class Post extends Model\r\n{\r\n    use SoftDeletes;\r\n    \r\n    protected string $table = 'posts';\r\n    \r\n    protected array $fillable = [\r\n        'title',\r\n        'slug',\r\n        'content',\r\n        'status',\r\n        'user_id',\r\n    ];\r\n    \r\n    protected array $casts = [\r\n        'id' => 'int',\r\n        'user_id' => 'int',\r\n        'published_at' => 'datetime',\r\n    ];\r\n    \r\n    protected array $hidden = [];\r\n    \r\n    // Relationships\r\n    public function author(): BelongsTo\r\n    {\r\n        return $this->belongsTo(User::class, 'user_id', 'id');\r\n    }\r\n    \r\n    public function comments(): HasMany\r\n    {\r\n        return $this->hasMany(Comment::class, 'post_id', 'id');\r\n    }\r\n    \r\n    public function tags(): BelongsToMany\r\n    {\r\n        return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id');\r\n    }\r\n    \r\n    // Scopes\r\n    public function scopePublished($query)\r\n    {\r\n        return $query->where('status', 'published');\r\n    }\r\n    \r\n    public function scopePopular($query)\r\n    {\r\n        return $query->where('views', '>', 1000);\r\n    }\r\n    \r\n    // Accessors\r\n    public function getExcerptAttribute(): string\r\n    {\r\n        return substr($this->content, 0, 200) . '...';\r\n    }\r\n}\r"
  },
  {
    "type": "p",
    "text": "Usage:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Get published posts with author and tags\r\n$posts = Post::published()\r\n    ->with('author', 'tags')\r\n    ->orderBy('published_at', 'desc')\r\n    ->paginate(20);\r\n\r\n// Create new post\r\n$post = Post::create([\r\n    'title' => 'My First Post',\r\n    'slug' => 'my-first-post',\r\n    'content' => 'Content here...',\r\n    'status' => 'draft',\r\n    'user_id' => $request->user()['id'],\r\n]);\r\n\r\n// Publish post\r\n$post->update(['status' => 'published', 'published_at' => date('Y-m-d H:i:s')]);\r\n\r\n// Add tags\r\n$post->tags()->attach([1, 2, 3]);\r"
  },
  {
    "type": "h2",
    "id": "troubleshooting",
    "text": "Troubleshooting"
  },
  {
    "type": "h3",
    "id": "problem-mass-assignment-protection-warning",
    "text": "Problem: \"Mass assignment protection\" warning"
  },
  {
    "type": "p",
    "text": "Solution: Define $fillable array in your model:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "protected array $fillable = ['field1', 'field2'];\r"
  },
  {
    "type": "h3",
    "id": "problem-relationship-returns-null",
    "text": "Problem: Relationship returns null"
  },
  {
    "type": "p",
    "text": "Check:"
  },
  {
    "type": "ol",
    "items": [
      "Foreign key column exists in database",
      "Related record exists",
      "Relationship method name is correct",
      "Use eager loading: `Model::with('relation')->get()`"
    ]
  },
  {
    "type": "h3",
    "id": "problem-n-1-queries",
    "text": "Problem: N+1 queries"
  },
  {
    "type": "p",
    "text": "Solution: Use eager loading:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "// Instead of\r\n$posts = Post::all();\r\n\r\n// Use\r\n$posts = Post::with('author', 'comments')->get();\r"
  },
  {
    "type": "h2",
    "id": "see-also",
    "text": "See Also"
  },
  {
    "type": "ul",
    "items": [
      "[Database Guide](../guides/DATABASE.md) - Query builder reference",
      "[SoftDeletes API](SoftDeletes.md) - Soft delete support",
      "[Pagination API](Pagination.md) - Pagination methods"
    ]
  }
],
}
