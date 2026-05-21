# Anti-Pattern: Unstable DOM

DOM structures, element identifiers, or selector paths that change between renders, page visits, or application states.

## Description

Agents often need to interact with the same element multiple times within a session, or return to a page and locate the same element they found previously. If the DOM structure is unstable — IDs regenerated on each render, positions shifting, class names tied to framework internals — the agent's model of the page is invalidated unpredictably.

This is one of the most common causes of flaky automated tests, and it creates the same problem for agents.

## Examples

**Randomly generated IDs:**

```html
<!-- Regenerated on every render — useless as a selector -->
<button id="btn-a3f9c2">Submit</button>
<button id="btn-7d1e44">Cancel</button>
```

**Index-based identifiers in lists:**

```html
<!-- If items are reordered or filtered, indices shift -->
<li data-index="0">Invoice #1042</li>
<li data-index="1">Invoice #1041</li>
```

**Framework-generated class names:**

```html
<!-- CSS Modules / styled-components hash changes on rebuild -->
<button class="Button__root___3Kc7A">Submit</button>
```

**Structural instability based on state:**

```html
<!--
  When the sidebar is collapsed, all main content shifts from column 2 to column 1.
  Position-based selectors break.
-->
<div class="grid-col-2"><!-- Main content --></div>
```

**Deeply nested paths that break on restructure:**

```html
<!-- Relying on nth-child selectors -->
<!-- .page > .container > .row > .col:nth-child(2) > .card > button -->
```

## Why This Is a Problem

An agent that located a button during step 1 of a workflow may store that selector to re-use in step 3. If the selector is no longer valid when the agent tries to use it, the agent must:

1. Re-discover the element
2. Re-plan the interaction
3. Risk taking the wrong action if a similar element is in a new position

This adds latency, token cost, and failure risk, particularly in multi-step flows.

## Recommended Fix

**Stable, semantic identifiers:**

```html
<button
  data-agent-id="invoice-form-submit"
  data-agent-action="submit"
  type="submit"
>
  Submit Invoice
</button>
```

**Record-based list identifiers:**

```html
<!-- Use the record's own ID, not its position in the rendered list -->
<li data-agent-id="invoice-row-1042" data-record-id="1042">
  Invoice #1042
  <button data-agent-id="invoice-1042-edit">Edit</button>
</li>
```

**Structural consistency:**

Keep landmark regions (`<header>`, `<main>`, `<aside>`) structurally stable regardless of visual state. Use CSS to show/hide or resize rather than restructuring the DOM hierarchy.

```html
<!-- Sidebar state changes visibility, not DOM structure -->
<aside data-agent-id="sidebar" aria-expanded="false" hidden>
  ...
</aside>
<main data-agent-id="main-content">
  ...
</main>
```

## Related Patterns

- [Stable Selectors](../patterns/stable-selectors.md)
- [Semantic Structure](../patterns/semantic-structure.md)
