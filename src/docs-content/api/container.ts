
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Container API Reference",
    description: "The Container is Siro's Dependency Injection container with autowiring, singleton resolution, contextual bindings, and circular dependency detection.",
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
    "text": "The Container is Siro's Dependency Injection container with autowiring, singleton resolution, contextual bindings, and circular dependency detection."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Container;\r\n\r\n$container = Container::getInstance();\r"
  },
  {
    "type": "h2",
    "id": "basic-usage",
    "text": "Basic Usage"
  },
  {
    "type": "h3",
    "id": "resolve-from-container",
    "text": "Resolve from Container"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$service = $container->make(UserService::class);\r\n\r\n// With parameters\r\n$controller = $container->make(ProductController::class);\r"
  },
  {
    "type": "h3",
    "id": "singleton-access",
    "text": "Singleton Access"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$container = Container::getInstance();\r"
  },
  {
    "type": "p",
    "text": "All resolutions are singletons by default within a single request lifecycle."
  },
  {
    "type": "h2",
    "id": "binding",
    "text": "Binding"
  },
  {
    "type": "h3",
    "id": "bind-interface-to-implementation",
    "text": "Bind Interface to Implementation"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$container->bind(UserRepositoryInterface::class, UserRepository::class);\r\n\r\n// Resolve returns UserRepository instance\r\n$repo = $container->make(UserRepositoryInterface::class);\r"
  },
  {
    "type": "h3",
    "id": "bind-singleton",
    "text": "Bind Singleton"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$container->singleton(CacheService::class, function ($c) {\r\n    return new CacheService(config('cache.ttl'));\r\n});\r"
  },
  {
    "type": "h3",
    "id": "bind-instance",
    "text": "Bind Instance"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$container->instance('db', Database::connection());\r"
  },
  {
    "type": "h2",
    "id": "contextual-binding",
    "text": "Contextual Binding"
  },
  {
    "type": "p",
    "text": "Bind different implementations based on which class consumes them:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$container->when(OrderController::class)\r\n    ->needs(OrderProcessorInterface::class)\r\n    ->give(ExpressOrderProcessor::class);\r\n\r\n$container->when(BackofficeController::class)\r\n    ->needs(OrderProcessorInterface::class)\r\n    ->give(BatchOrderProcessor::class);\r"
  },
  {
    "type": "h2",
    "id": "autowiring",
    "text": "Autowiring"
  },
  {
    "type": "p",
    "text": "The container automatically resolves constructor parameters:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class ProductController\r\n{\r\n    // Automatically resolved from container\r\n    public function __construct(\r\n        private readonly ProductService $service,\r\n        private readonly Logger $logger,\r\n    ) {}\r\n}\r"
  },
  {
    "type": "h3",
    "id": "primitive-values",
    "text": "Primitive Values"
  },
  {
    "type": "p",
    "text": "For scalar parameters, use contextual binding:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$container->when(ProductController::class)\r\n    ->needs('$perPage')\r\n    ->give(20);\r"
  },
  {
    "type": "h2",
    "id": "tags",
    "text": "Tags"
  },
  {
    "type": "p",
    "text": "Tag related services for batch retrieval:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$container->tag([\r\n    ReportGenerator::class,\r\n    PdfExporter::class,\r\n    CsvExporter::class,\r\n], 'exports');\r\n\r\n// Retrieve all tagged services\r\n$exporters = $container->tagged('exports');\r"
  },
  {
    "type": "h2",
    "id": "rebound-callbacks",
    "text": "Rebound Callbacks"
  },
  {
    "type": "p",
    "text": "Execute code when a binding is resolved or rebound:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$container->rebinding('cache', function ($c, $instance) {\r\n    // Called when 'cache' binding is overwritten\r\n    $c->make(Logger::class)->info('Cache driver changed');\r\n});\r"
  },
  {
    "type": "h2",
    "id": "circular-dependency-detection",
    "text": "Circular Dependency Detection"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class A { public function __construct(B $b) {} }\r\nclass B { public function __construct(A $a) {} }\r\n\r\n$container->make(A::class);\r\n// Throws RuntimeException: Circular dependency detected: A → B → A\r"
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
        "`getInstance()`",
        "Get singleton container instance"
      ],
      [
        "`make(string $class)`",
        "Resolve a class from container"
      ],
      [
        "`instance(string $abstract, mixed $instance)`",
        "Set concrete instance"
      ],
      [
        "`when(string $class)`",
        "Start contextual binding"
      ],
      [
        "`needs(string $parameter)`",
        "Specify parameter for contextual binding"
      ],
      [
        "`give(mixed $implementation)`",
        "Specify implementation for contextual binding"
      ],
      [
        "`tag(array $classes, string $tag)`",
        "Tag services"
      ],
      [
        "`tagged(string $tag)`",
        "Get all tagged services"
      ],
      [
        "`rebinding(string $abstract, Closure $callback)`",
        "Register rebound callback"
      ],
      [
        "`has(string $abstract)`",
        "Check if binding exists"
      ],
      [
        "`forgetInstance(string $abstract)`",
        "Remove resolved instance"
      ],
      [
        "`clearResolved()`",
        "Clear all resolved instances"
      ]
    ]
  }
],
}
