export const INSTALLER = {
  version: "0.35.0",
  publishedAt: "2026-05-29",
  pharFilename: "siro.phar",
  commands: {
    powershell: {
      label: "Windows (PowerShell)",
      cmd: 'iwr https://sirophp.com/downloads/install.ps1 | iex',
      hint: "Paste into PowerShell as Administrator",
    },
    bash: {
      label: "macOS / Linux",
      cmd: 'curl -sS https://sirophp.com/downloads/install.sh | bash',
      hint: "Paste into Terminal",
    },
    composer: {
      label: "Composer",
      cmd: 'composer create-project sirosoft/api my-app',
      hint: "Requires PHP + Composer installed",
    },
  },
  paths: {
    installPs1: "/downloads/install.ps1",
    installSh: "/downloads/install.sh",
    phar: "/downloads/siro.phar",
  },
} as const;
