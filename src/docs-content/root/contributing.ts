
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "How to Add a New Module (6 Steps)",
    description: "This guide walks through adding a new resource (e.g. `Brands`) to the API.",
    category: "root",
    order: 0,
    icon: "📄",
  },
  content: [
  {
    "type": "p",
    "text": "This guide walks through adding a new resource (e.g. Brands) to the API."
  },
  {
    "type": "h2",
    "id": "step-1-database-migration",
    "text": "Step 1: Database Migration"
  },
  {
    "type": "p",
    "text": "Create a migration file in database/migrations/:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\n// database/migrations/2026_05_30_000001_create_brands_table.php\n\nuse Siro\\Core\\Database;\nuse Siro\\Core\\Schema;\n\nreturn new class\n{\n    public function up(): void\n    {\n        Schema::create('brands', function ($table) {\n            $table->increments('id');\n            $table->string('name', 100);\n            $table->text('description')->nullable();\n            $table->boolean('is_active')->default(true);\n            $table->timestamps();\n        });\n    }\n\n    public function down(): void\n    {\n        Schema::dropIfExists('brands');\n    }\n};"
  },
  {
    "type": "p",
    "text": "Run the migration:"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro migrate"
  },
  {
    "type": "h2",
    "id": "step-2-model",
    "text": "Step 2: Model"
  },
  {
    "type": "p",
    "text": "Create app/Models/Brand.php:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\n\ndeclare(strict_types=1);\n\nnamespace App\\Models;\n\nuse Siro\\Core\\Model;\n\n/**\n * @property int $id\n * @property string $name\n * @property string|null $description\n * @property bool $is_active\n * @property string $created_at\n * @property string|null $updated_at\n */\nfinal class Brand extends Model\n{\n    protected string $table = 'brands';\n\n    protected array $casts = [\n        'id' => 'int',\n        'is_active' => 'bool',\n        'created_at' => 'datetime',\n        'updated_at' => 'datetime',\n    ];\n\n    protected array $fillable = [\n        'name',\n        'description',\n        'is_active',\n    ];\n}"
  },
  {
    "type": "h2",
    "id": "step-3-service-repository",
    "text": "Step 3: Service + Repository"
  },
  {
    "type": "p",
    "text": "Create app/Repositories/BrandRepository.php:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\n\ndeclare(strict_types=1);\n\nnamespace App\\Repositories;\n\nuse App\\Models\\Brand;\nuse Siro\\Core\\Model;\n\nfinal class BrandRepository extends BaseRepository\n{\n    protected function createModel(): Model\n    {\n        return new Brand();\n    }\n}"
  },
  {
    "type": "p",
    "text": "Create app/Services/BrandService.php:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\n\ndeclare(strict_types=1);\n\nnamespace App\\Services;\n\nuse App\\Repositories\\BrandRepository;\n\nfinal class BrandService implements BaseService\n{\n    public function __construct(private readonly BrandRepository $repo)\n    {\n    }\n\n    /** Get paginated list of brands. */\n    public function getAll(array $filters = [], int $page = 1, int $perPage = 20): array\n    {\n        return $this->repo->findAll($filters, $page, $perPage);\n    }\n\n    /** Find a brand by ID. Returns null if not found. */\n    public function getById(int $id): mixed\n    {\n        return $this->repo->findById($id);\n    }\n\n    /** Create a new brand. */\n    public function create(array $data): mixed\n    {\n        return $this->repo->store($data);\n    }\n\n    /** Update a brand. Returns null if not found. */\n    public function update(int $id, array $data): mixed\n    {\n        return $this->repo->update($id, $data);\n    }\n\n    /** Delete a brand. Returns true if deleted. */\n    public function delete(int $id): bool\n    {\n        return $this->repo->destroy($id);\n    }\n}"
  },
  {
    "type": "h2",
    "id": "step-4-controller",
    "text": "Step 4: Controller"
  },
  {
    "type": "p",
    "text": "Create app/Controllers/BrandController.php:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\n\ndeclare(strict_types=1);\n\nnamespace App\\Controllers;\n\nuse App\\Resources\\BrandResource;\nuse App\\Role;\nuse App\\Services\\BrandService;\nuse Siro\\Core\\Controller;\nuse Siro\\Core\\Request;\nuse Siro\\Core\\Response;\n\nfinal class BrandController extends Controller\n{\n    public function __construct(private readonly BrandService $service)\n    {\n    }\n\n    /**\n     * List all brands with pagination.\n     *\n     * GET /api/brands?page=1&per_page=20\n     */\n    public function index(Request $request): Response\n    {\n        $result = $this->service->getAll(\n            page: max(1, $request->queryInt('page', 1)),\n            perPage: min(100, max(1, $request->queryInt('per_page', 20)))\n        );\n        return $this->paginated(\n            BrandResource::collection($result['data']),\n            $result['meta'],\n            'Brands list'\n        );\n    }\n\n    /**\n     * Get a single brand by ID.\n     *\n     * GET /api/brands/{id}\n     */\n    public function show(Request $request): Response\n    {\n        $id = (int) $request->param('id');\n        if ($id <= 0) return $this->error('Invalid id', 422);\n        $item = $this->service->getById($id);\n        if ($item === null) return $this->error('Brand not found', 404);\n        return $this->success(BrandResource::make($item), 'Brand detail');\n    }\n\n    /**\n     * Create a new brand.\n     *\n     * POST /api/brands\n     * Body: { name: string, description?: string, is_active?: bool }\n     */\n    public function store(Request $request): Response\n    {\n        $validated = $this->validate(['name' => 'required|min:1|max:100']);\n        $item = $this->service->create($validated);\n        return $this->created(BrandResource::make($item), 'Brand created');\n    }\n\n    /**\n     * Update a brand.\n     *\n     * PUT /api/brands/{id}\n     * Body: { name?: string, description?: string, is_active?: bool }\n     */\n    public function update(Request $request): Response\n    {\n        $id = (int) $request->param('id');\n        if ($id <= 0) return $this->error('Invalid id', 422);\n        $validated = $this->validate(['name' => 'min:1|max:100']);\n        $item = $this->service->update($id, $validated);\n        if ($item === null) return $this->error('Brand not found', 404);\n        return $this->success(BrandResource::make($item), 'Brand updated');\n    }\n\n    /**\n     * Delete a brand.\n     *\n     * DELETE /api/brands/{id}\n     */\n    public function delete(Request $request): Response\n    {\n        $id = (int) $request->param('id');\n        if ($id <= 0) return $this->error('Invalid id', 422);\n        return $this->service->delete($id)\n            ? $this->noContent()\n            : $this->error('Brand not found', 404);\n    }\n}"
  },
  {
    "type": "h2",
    "id": "step-5-resource",
    "text": "Step 5: Resource"
  },
  {
    "type": "p",
    "text": "Create app/Resources/BrandResource.php:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\n\ndeclare(strict_types=1);\n\nnamespace App\\Resources;\n\nuse Siro\\Core\\Resource;\n\nfinal class BrandResource extends Resource\n{\n    /** @return array<string, mixed> */\n    public function toArray(): array\n    {\n        return [\n            'id' => $this->data['id'] ?? null,\n            'name' => $this->data['name'] ?? null,\n            'description' => $this->data['description'] ?? null,\n            'is_active' => (bool) ($this->data['is_active'] ?? true),\n            'created_at' => $this->data['created_at'] ?? null,\n            'updated_at' => $this->data['updated_at'] ?? null,\n        ];\n    }\n}"
  },
  {
    "type": "h2",
    "id": "step-6-route",
    "text": "Step 6: Route"
  },
  {
    "type": "p",
    "text": "Add to routes/api.php inside the /api group:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$router->resource('brands', \\App\\Controllers\\BrandController::class, ['auth', 'throttle:60,1']);"
  },
  {
    "type": "h2",
    "id": "summary",
    "text": "Summary"
  },
  {
    "type": "table",
    "headers": [
      "Step",
      "File",
      "Purpose"
    ],
    "rows": [
      [
        "1",
        "`database/migrations/..._create_brands_table.php`",
        "Database schema"
      ],
      [
        "2",
        "`app/Models/Brand.php`",
        "Eloquent-style model"
      ],
      [
        "3",
        "`app/Repositories/BrandRepository.php` + `app/Services/BrandService.php`",
        "Data access + business logic"
      ],
      [
        "4",
        "`app/Controllers/BrandController.php`",
        "HTTP request handling"
      ],
      [
        "5",
        "`app/Resources/BrandResource.php`",
        "JSON response formatting"
      ],
      [
        "6",
        "`routes/api.php`",
        "URL routing"
      ]
    ]
  }
],
}
