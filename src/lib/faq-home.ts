export interface HomeFaq {
  q: string;
  a: string;
}

/** Homepage Q&A — single source for the visible section AND the
 *  FAQPage JSON-LD, so crawlers/AI always see answers that exist. */
export const homeFaqs: HomeFaq[] = [
  {
    q: 'What is SiroPHP?',
    a: 'SiroPHP is a deterministic PHP API workflow built for rapid development and production debugging. It features minimal runtime dependencies, CRUD scaffolding, full request tracing, and one-command production bug replay.',
  },
  {
    q: 'How is SiroPHP different from Laravel?',
    a: 'SiroPHP focuses on API development with a smaller runtime surface and an integrated debugging workflow. It provides conventions for routing, validation, resources, tracing, replay, and testing without requiring a large application stack.',
  },
  {
    q: 'How do I install SiroPHP?',
    a: 'Use the standalone installer on Windows, macOS, or Linux, or create a project with "composer create-project sirosoft/api my-app" when PHP and Composer are already installed.',
  },
  {
    q: 'How do I build APIs fast with SiroPHP?',
    a: 'Use "php siro make:crud products" to generate a module with model, migration, repository, service, resource, controller, routes, and feature tests. Then run "php siro migrate" and "php siro serve".',
  },
  {
    q: 'How does production debugging work?',
    a: 'Every response includes an X-Siro-Trace-Id header. Traces capture request context including SQL queries, outbound HTTP calls, and queued jobs. Replay analyzes the trace for side-effect risks before execution — risky replays require explicit confirmation.',
  },
  {
    q: 'Is SiroPHP production ready?',
    a: 'SiroPHP is actively tested and ships with JWT auth, rate limiting, CSRF protection, brute-force protection, environment validation, log sanitization, and production health checks. Review the current release checks and security documentation before deploying.',
  },
];
