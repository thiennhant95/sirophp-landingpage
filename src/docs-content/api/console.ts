
import type { Doc } from '../types'

export const doc: Doc = {
  meta: {
    title: "Console & Custom Commands Reference",
    description: "The Console class runs Siro's CLI. You can register custom commands and run them via `php siro <command>`.",
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
    "text": "The Console class runs Siro's CLI. You can register custom commands and run them via php siro <command>."
  },
  {
    "type": "code",
    "lang": "php",
    "code": "use Siro\\Core\\Console;\r"
  },
  {
    "type": "h2",
    "id": "register-custom-command",
    "text": "Register Custom Command"
  },
  {
    "type": "h3",
    "id": "1-create-a-command-class",
    "text": "1. Create a command class"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "<?php\r\n\r\ndeclare(strict_types=1);\r\n\r\nnamespace App\\Commands;\r\n\r\nuse Siro\\Core\\Commands\\CommandInterface;\r\nuse Siro\\Core\\Commands\\CommandSupport;\r\n\r\nfinal class GenerateReportCommand implements CommandInterface\r\n{\r\n    use CommandSupport;\r\n\r\n    public function run(array $args): int\r\n    {\r\n        $this->write('Generating report...');\r\n\r\n        // Your logic here\r\n        $format = $args[0] ?? 'csv';\r\n\r\n        $this->write(\"  ✓ Report generated in {$format} format\");\r\n        return 0;  // 0 = success, 1 = error\r\n    }\r\n}\r"
  },
  {
    "type": "h3",
    "id": "2-register-in-routes-api-php",
    "text": "2. Register in `routes/api.php`"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Console::registerCommand(\r\n    'report:generate',         // command name\r\n    GenerateReportCommand::class,  // handler class\r\n    'Generate sales report',       // description\r\n);\r"
  },
  {
    "type": "h3",
    "id": "3-run-it",
    "text": "3. Run it"
  },
  {
    "type": "code",
    "lang": "bash",
    "code": "php siro report:generate\r\nphp siro report:generate pdf\r\nphp siro report:generate --help\r"
  },
  {
    "type": "h2",
    "id": "command-support-methods",
    "text": "Command Support Methods"
  },
  {
    "type": "p",
    "text": "The CommandSupport trait provides helpers for CLI interaction:"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "class MyCommand implements CommandInterface\r\n{\r\n    use CommandSupport;\r\n\r\n    public function run(array $args): int\r\n    {\r\n        $this->write('Processing...');           // Write line\r\n        $this->write('  ✓ Done', 'green');       // With color\r\n        $this->error('Something went wrong');    // Red text\r\n\r\n        $name = $this->ask('Enter your name');   // Prompt input\r\n        $confirm = $this->confirm('Continue?');  // Yes/no prompt\r\n\r\n        return 0;\r\n    }\r\n}\r"
  },
  {
    "type": "h2",
    "id": "bulk-registration",
    "text": "Bulk Registration"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "Console::registerCommands([\r\n    'report:generate' => [\r\n        'class' => GenerateReportCommand::class,\r\n        'description' => 'Generate sales report',\r\n    ],\r\n    'data:import' => [\r\n        'class' => ImportDataCommand::class,\r\n        'description' => 'Import data from CSV',\r\n    ],\r\n]);\r"
  },
  {
    "type": "h2",
    "id": "built-in-version",
    "text": "Built-in Version"
  },
  {
    "type": "code",
    "lang": "php",
    "code": "$version = Console::getVersion();  // \"0.28.1\"\r"
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
        "`Console::registerCommand(name, class, description)`",
        "Register a CLI command"
      ],
      [
        "`Console::registerCommands(array $commands)`",
        "Register multiple commands"
      ],
      [
        "`Console::getVersion()`",
        "Get framework version"
      ],
      [
        "`$cmd->run(array $args)`",
        "Execute the command"
      ],
      [
        "`$cmd->write(string $text, string $color)`",
        "Write to stdout"
      ],
      [
        "`$cmd->error(string $text)`",
        "Write to stderr (red)"
      ],
      [
        "`$cmd->ask(string $question)`",
        "Prompt for input"
      ],
      [
        "`$cmd->confirm(string $question)`",
        "Yes/no prompt"
      ]
    ]
  }
],
}
