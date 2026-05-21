# Agent-Friendly UI

**Building interfaces that autonomous agents can understand and operate**

> Agent-Friendly UI is a Testronaut initiative.

---

## Status: Early Draft / Experimental

This repository is in active early development. Patterns, specs, and recommendations are provisional. Feedback and contributions are very much welcomed!

---

## The Problem

Autonomous browser agents (including AI-powered test runners, QA agents, RPA tools, and LLM-driven assistants) interact with the web the same way humans do: by reading the DOM, identifying interactive elements, and taking actions. But most UIs are built solely for human perception, not LLM interpretation.

The result: agents spend disproportionate time recovering from ambiguity. They encounter buttons without clear labels, forms that change structure based on invisible state, modals that appear without accessible cues, and workflows that silently fail without feedback. What takes a human two seconds of visual scanning often requires an agent multiple retries, extra tokens, and extended execution time.

This is largely a solvable problem with modest frontend discipline.

## Why does this Matter?

Agent-friendly UI design sits at the intersection of three established practices:

- **Accessibility** — semantic HTML, ARIA roles, and visible state already solve many agent legibility problems
- **Testability** — stable selectors, predictable DOM structure, and explicit state make automated testing reliable
- **Frontend architecture** — clear component contracts, consistent naming, and structured data benefit humans and machines alike

Early benchmark data suggest that interface structure materially affects agent execution time and token consumption. A UI designed with agent legibility in mind can reduce agent task duration and cost compared to the same task on a poorly structured interface. Agents are emerging as a new group of users that front-end developers and designers need to consider when creating apps and websites.

---

## Quick Example

**Agent-hostile HTML**

```html
<!-- No clear identity, ambiguous action, state encoded only visually -->
<div class="btn btn-green" onclick="doThing()">Go</div>
```

**Agent-friendly HTML**

```html
<button
  data-agent-id="submit-invoice"
  data-agent-action="submit"
  data-agent-state="ready"
  data-agent-role="primary-action"
  type="submit"
>
  Submit Invoice
</button>
```

The second version requires no visual inference. The agent knows what the element is, what it does, what state it is in, and its role within the workflow — without guessing.

---

## Preliminary Benchmark Summary

The following results are from early-stage testing of the same task flow across three UI configurations. **This is preliminary data and should not be treated as definitive.** Sample size is small (n=20 per condition). Results suggest interface structure can materially affect agent execution time and token usage; broader validation is ongoing.

| Metric | Friendly Mode | Regular Mode | Hostile Mode |
|---|---|---|---|
| Successful runs | 10 / 10 | 10 / 10 | 10 / 10 |
| Median duration | 99,994 ms | 114,796 ms | 467,442 ms |
| Median tokens | 21,230 | 23,014 | 27,522 |
| Median turns | 6.0 | 7.5 | 7.5 |
| Median retries | 2.0 | 2.0 | 2.0 |

**Interpretation:** The hostile UI took ~4.7× longer and consumed ~30% more tokens than the friendly UI for the same task (which in some cases might be desirable too). All three conditions achieved 100% task completion, but at significantly different costs. Early evidence suggests that interface structure meaningfully affects agent efficiency, even when the agent ultimately succeeds.

---

## Repository Map

```
/
├── README.md               ← This file
├── CONTRIBUTING.md         ← How to contribute
├── CODE_OF_CONDUCT.md      ← Community standards
├── LICENSE                 ← MIT
│
├── docs/
│   ├── principles.md       ← Core design principles
│   ├── patterns/           ← Recommended patterns
│   │   ├── semantic-structure.md
│   │   ├── stable-selectors.md
│   │   ├── explicit-state.md
│   │   ├── recoverable-workflows.md
│   │   ├── agent-context-metadata.md
│   │   └── accessibility-overlap.md
│   ├── anti-patterns/      ← What to avoid
│   │   ├── ambiguous-actions.md
│   │   ├── hidden-state.md
│   │   ├── unstable-dom.md
│   │   ├── hover-only-controls.md
│   │   └── visual-only-status.md
│   ├── benchmarking/       ← How to measure agent performance
│   │   ├── overview.md
│   │   ├── metrics.md
│   │   └── sample-results.md
│   └── examples/           ← Concrete before/after examples
│       ├── basic-agent-friendly-form.md
│       └── hostile-ui-demo.md
│
├── spec/                   ← Formal attribute and manifest specs
│   ├── agent-attributes.md
│   ├── agent-manifest.md
│   └── page-context.md
│
├── templates/              ← Copy-paste starting points
│   ├── agent-manifest.example.json
│   └── page-context.example.json
│
└── packages/
    └── agent-friendly-ui-utils/   ← TypeScript utility package
        ├── README.md
        ├── package.json
        └── src/
            ├── index.ts
            ├── agentAttrs.ts
            ├── detectAgentMode.ts
            └── pageContext.ts
```

---

## How to Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Short version:
- Open an issue before large changes
- Keep examples practical and grounded
- Avoid overclaiming — use "early evidence suggests" rather than "proves"
- Treat accessibility and testability as first-class concerns alongside agent legibility

---

## Running the Utility Package

```bash
cd packages/agent-friendly-ui-utils
npm install
npm test
```

---

## Related Work

This guide is informed by and consistent with:

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

Agent-friendly UI is not a replacement for accessibility — it is an extension of the same underlying reasoning applied to autonomous agents as users.

---

MIT License · Agent-Friendly UI is a Testronaut initiative.
