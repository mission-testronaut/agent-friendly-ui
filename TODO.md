# TODO

Next steps for the agent-friendly-ui project, roughly in priority order.

---

## Repository

- [ ] Add GitHub Actions CI workflow — run `npm test` on pull requests
- [ ] Add a publish-on-tag workflow for `@agent-friendly-ui/utils` to npm
- [ ] Add issue and pull request templates (`.github/ISSUE_TEMPLATE/`, `.github/pull_request_template.md`)
- [ ] Set up branch protection on `main` (require PR, require CI pass)

---

## Utility Package

- [ ] Add `npm run build` output and verify `dist/` is correct before first publish
- [ ] Add coverage reporting (`jest --coverage`) and a coverage threshold
- [ ] Consider adding an ESLint plugin that warns when key interactive elements lack `data-agent-id`
- [ ] Evaluate whether `createPageContext` should escape `<`, `>`, and `&` for safer inline script embedding

---

## Documentation

- [ ] Add framework-specific guides: React, Vue, Svelte (`docs/patterns/react.md`, etc.)
- [ ] Add a migration guide — how to retrofit agent attributes onto an existing UI incrementally
- [ ] Expand `docs/benchmarking/sample-results.md` with more task types and UI configurations
- [ ] Add a `docs/patterns/agent-mode.md` pattern — how to use `detectAgentMode` to conditionally adjust UI behavior for agents (e.g., expand collapsed sections, disable animations)
- [ ] Add a FAQ addressing common questions (e.g., "how is this different from ARIA?", "does this affect SEO?")

---

## Spec

- [ ] Ratify `spec/agent-attributes.md` v0.1 — collect feedback, bump to v1.0 when stable
- [ ] Define formal JSON Schema for the agent manifest and page context (for validation tooling)
- [ ] Decide on the `/.well-known/agent-manifest.json` convention — submit to IANA or document as informal standard

---

## Examples

- [ ] Add a live hostile-vs-friendly demo app (simple HTML/JS, no framework needed)
- [ ] Add a React-specific example repo or CodeSandbox link
- [ ] Add examples for common component patterns: data tables, multi-select, date pickers, modals

---

## Community

- [ ] Write an introductory blog post or README-linked explainer for the "why" behind this project
- [ ] Submit the project to relevant newsletters, communities, or awesome lists once v0.1 is stable
- [ ] Invite early collaborators to review the spec before v1.0
