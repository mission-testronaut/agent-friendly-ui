# Core Principles of Agent-Friendly UI Design

This document defines the foundational principles behind agent-friendly UI design. These are not rules to be applied mechanically — they are reasoning tools. Use them to evaluate tradeoffs in your own interface decisions.

---

## 1. Make Identity Explicit

Every interactive element that an agent might need to act on should have a stable, unambiguous identity. Do not rely on position, visual appearance, or inferred context as the primary way an agent locates an element.

**In practice:** Use `data-agent-id` attributes on key interactive elements. Choose IDs that reflect what the element does in the workflow, not how it looks.

```html
<!-- Explicit identity -->
<button data-agent-id="confirm-delete-account" type="button">Delete Account</button>

<!-- Implicit — requires visual/positional inference -->
<button class="danger-btn" type="button">Delete Account</button>
```

---

## 2. Express State in the DOM

If an interface has state — loading, disabled, error, success, selected, expanded — that state should be represented in the DOM as machine-readable attributes, not only as visual styling.

**In practice:** Use `aria-*` attributes for state that maps to ARIA roles, and `data-agent-state` for application-specific states that have no ARIA equivalent.

```html
<!-- State in DOM -->
<button
  data-agent-id="submit-payment"
  data-agent-state="processing"
  aria-busy="true"
  disabled
>
  Processing...
</button>

<!-- State encoded only in CSS class name -->
<button class="btn btn--loading">Processing...</button>
```

---

## 3. Describe Actions, Not Appearances

Labels, tooltips, and accessible names should describe what an action does, not how it looks or where it is. Agents construct their understanding of a page from text and attributes, not layout.

**In practice:** Prefer explicit `aria-label` or visible text labels over icon-only buttons. When using icons, always include a text alternative.

```html
<!-- Describes the action -->
<button aria-label="Delete invoice #1042" data-agent-action="delete">
  <TrashIcon />
</button>

<!-- Describes only appearance -->
<button class="icon-btn"><TrashIcon /></button>
```

---

## 4. Keep the DOM Stable

Agent sessions often span multiple steps. If the DOM structure changes in ways that invalidate the agent's prior observations — elements moving, selectors changing, IDs regenerating — the agent must re-observe and re-plan, increasing duration and token usage.

**In practice:** Avoid generating IDs dynamically from render order or random values. Keep structural landmarks (nav, main, aside, section) consistent across page states. Use stable `data-agent-id` values that don't change between renders.

---

## 5. Surface Workflow Context

Agents benefit from knowing where they are in a workflow, not just what is on the current screen. Multi-step forms, wizards, and complex flows should communicate step position, progress, and available next actions in a structured way.

**In practice:** Use `data-agent-step` on step containers. Use page context metadata to communicate workflow title, current step, and available actions in a single structured location.

See [agent-context-metadata](patterns/agent-context-metadata.md) and [spec/page-context.md](../spec/page-context.md).

---

## 6. Confirm Outcomes Explicitly

When an agent takes an action, it needs to know whether that action succeeded, failed, or is still pending. Silent success and silent failure are equally problematic. Feedback should be DOM-visible and not depend solely on transient visual states like toast notifications.

**In practice:** After form submission, render a success or error state in the DOM with a clear indicator. Use `aria-live` regions for dynamic feedback. Include a `data-agent-state` value of `success`, `error`, or `pending` on the relevant container.

---

## 7. Overlap with Accessibility is Intentional

Most agent-friendly patterns are also accessibility best practices. This is not a coincidence — both assistive technologies and autonomous agents share a fundamental need: they must construct a model of the interface from structured data, not visual perception.

When in doubt, ask: *would a screen reader user know what this element is, what state it's in, and what will happen when they interact with it?* If not, fix that first. Agent legibility follows.

See [accessibility-overlap](patterns/accessibility-overlap.md) for a detailed mapping.

---

## 8. Prefer Explicit Over Inferred

When an agent must infer meaning — from position, visual style, animation, or text alone — it consumes more tokens, takes longer, and is more likely to make mistakes. Every piece of information an agent must infer is a potential failure point.

Design as if the agent has perfect DOM access but no visual rendering. If the interface is not navigable in that mode, it will be harder for agents.

---

## Summary

| Principle | Core Question |
|---|---|
| Explicit identity | Can the agent reliably locate this element across sessions? |
| DOM state | Can the agent read the current state without visual inference? |
| Action description | Does the label tell the agent what will happen? |
| DOM stability | Will the agent's selectors break between renders? |
| Workflow context | Does the agent know where it is in the flow? |
| Explicit outcomes | Can the agent confirm success or failure from the DOM? |
| Accessibility overlap | Would a screen reader user have the same information? |
| Explicit over inferred | Is any meaning hidden behind visual-only encoding? |
