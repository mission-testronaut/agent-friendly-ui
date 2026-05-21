# Pattern: Accessibility Overlap

Agent-friendly UI design and web accessibility are not separate concerns. The majority of improvements that make an interface more navigable for autonomous agents also make it more usable for people with disabilities.

This document maps the overlap so teams can prioritize work that benefits both.

## Why the Overlap Exists

Both assistive technologies (screen readers, switch controls) and autonomous agents share a fundamental constraint: they cannot rely on visual rendering to understand an interface. Both must construct a model of the page from structured data: the DOM, ARIA attributes, semantic elements, and text content.

This means a large portion of accessibility best practices are directly applicable to agent legibility — and vice versa.

## Mapping: Accessibility Practice → Agent Benefit

| Accessibility practice | Agent benefit |
|---|---|
| Semantic HTML (`<button>`, `<nav>`, `<main>`, `<form>`) | Agents can reliably identify element types and page regions without CSS inference |
| Descriptive `aria-label` on icon-only buttons | Agents know what an action does without visual context |
| `aria-expanded`, `aria-selected`, `aria-checked` | Agents can read element state without parsing CSS class names |
| `aria-disabled` / native `disabled` | Agents know not to attempt interaction with unavailable elements |
| `aria-busy` on loading states | Agents know to wait before interacting |
| `aria-invalid` + `aria-describedby` on form errors | Agents can identify which field failed and read the error message |
| `aria-live` regions for dynamic content | Agents can observe async updates without polling |
| `aria-current="page"` or `aria-current="step"` | Agents know their current location in a workflow |
| `role="alert"` on error messages | Agents can identify critical feedback without visual scanning |
| `role="dialog"` + `aria-modal` on modals | Agents know a modal is active and can locate it reliably |
| Visible focus management | Agents interacting via keyboard/focus can follow the logical flow |
| Skip links | Agents can navigate to main content without traversing navigation |
| Form labels (`<label for>`) | Agents can associate labels with inputs and fill them accurately |

## Where Agent-Friendly UI Extends Accessibility

Agent-friendly UI adds a layer that accessibility standards do not fully address:

| Agent-friendly addition | Purpose |
|---|---|
| `data-agent-id` | Stable selector that persists across refactors and render cycles |
| `data-agent-action` | Describes what an element does in the workflow (beyond its role) |
| `data-agent-state` | Application-specific states with no ARIA equivalent |
| `data-agent-step` | Numeric step position for workflow navigation |
| `data-agent-role` | Semantic role within the workflow (e.g., "primary-action", "cancel") |
| Page context metadata block | Structured summary of page, workflow, and available actions |
| Agent manifest | Application-level map of pages, flows, and entry points |

These additions are intentionally layered on top of, not instead of, accessibility foundations.

## Recommended Approach

When auditing an interface for agent legibility, run an accessibility audit first. Fix the accessibility gaps. Then layer agent-specific attributes on top.

A practical order of operations:

1. Fix missing `alt` text, button labels, and form labels (accessibility baseline)
2. Add semantic HTML structure where `<div>` soup exists
3. Add ARIA state attributes for dynamic behavior
4. Add `data-agent-id` to key interactive elements
5. Add `data-agent-state` for application-specific states
6. Add page context metadata for complex workflows

If you fix step 1–3, you will have solved a large portion of the agent legibility problem as a side effect.

## Tools

Running an accessibility audit also gives you a partial agent legibility audit:

- [axe DevTools](https://www.deque.com/axe/) — automated accessibility testing
- [WAVE](https://wave.webaim.org/) — visual accessibility evaluation
- Chrome Accessibility Tree (DevTools → Elements → Accessibility panel)
- Screen reader testing (NVDA, VoiceOver) — validates semantic structure from a non-visual perspective

## Caveats

Not all accessibility improvements help agents equally, and not all agent improvements help accessibility. For example:

- Color contrast improvements help sighted users with low vision but do not affect agent legibility
- `data-agent-id` improves agent selector stability but has no accessibility effect
- Focus order improvements help both keyboard users and agents following a linear workflow

When prioritizing, identify improvements in the overlap zone — they deliver compounded value.
