# Anti-Pattern: Hover-Only Controls

Interactive elements that are only revealed, accessible, or usable when the user hovers over a parent element with a mouse.

## Description

Hover-triggered UI is a common pattern: action buttons that appear on table row hover, tooltip content that provides critical information on mouseover, dropdown menus that open only on hover. These patterns are problematic for keyboard users, touch device users — and equally problematic for agents, which typically interact with the DOM programmatically rather than by simulating mouse movement.

## Examples

**Row actions that only appear on hover:**

```html
<style>
  .row-actions { visibility: hidden; }
  tr:hover .row-actions { visibility: visible; }
</style>

<tr>
  <td>Invoice #1042</td>
  <td class="row-actions">
    <!-- Agent cannot find these buttons unless it can hover -->
    <button>Edit</button>
    <button>Delete</button>
  </td>
</tr>
```

**Tooltip as the only label:**

```html
<!-- The icon has no label; meaning is only in the hover tooltip -->
<button aria-label="">
  <svg><!-- info icon --></svg>
</button>
<div class="tooltip" role="tooltip">
  This field is required for compliance reporting.
</div>
```

**Hover-only dropdown menu:**

```css
.dropdown-menu { display: none; }
.nav-item:hover .dropdown-menu { display: block; }
```

```html
<!-- No click/focus trigger — menu is only reachable via hover -->
<li class="nav-item">
  Products
  <ul class="dropdown-menu">
    <li><a href="/products/widgets">Widgets</a></li>
  </ul>
</li>
```

## Why This Is a Problem

Agents typically interact with pages via programmatic DOM access or keyboard simulation — they do not move a mouse cursor over elements to trigger CSS `:hover` states. Controls hidden behind hover:

- May not exist in the DOM at all (dynamically inserted on hover)
- May be present but not interactable (`visibility: hidden`, `pointer-events: none`)
- May require the agent to trigger a hover event before they become clickable

Even if an agent can simulate a hover event, the dependency on hover state is fragile and adds unnecessary complexity to the agent's interaction model.

This is also a significant accessibility problem: hover-only interactions exclude keyboard users and touch device users entirely.

## Recommended Fix

**Always-present actions with conditional visibility:**

```html
<!-- Actions are always in the DOM; CSS can style them as subtle until hover/focus -->
<tr data-agent-id="invoice-row-1042">
  <td>Invoice #1042</td>
  <td>
    <button
      data-agent-id="invoice-1042-edit"
      data-agent-action="edit"
      class="row-action"
      aria-label="Edit Invoice #1042"
    >
      Edit
    </button>
    <button
      data-agent-id="invoice-1042-delete"
      data-agent-action="delete"
      class="row-action"
      aria-label="Delete Invoice #1042"
    >
      Delete
    </button>
  </td>
</tr>
```

**Tooltip content surfaced in accessible name:**

```html
<button
  aria-label="Required for compliance reporting"
  data-agent-id="compliance-info"
  type="button"
>
  <svg aria-hidden="true"><!-- info icon --></svg>
</button>
```

**Click/focus-triggered menus:**

```html
<li class="nav-item">
  <button
    aria-expanded="false"
    aria-haspopup="true"
    aria-controls="products-menu"
    data-agent-id="nav-products"
  >
    Products
  </button>
  <ul id="products-menu" role="menu" hidden>
    <li role="menuitem"><a href="/products/widgets">Widgets</a></li>
  </ul>
</li>
```

## Related Patterns

- [Explicit State](../patterns/explicit-state.md)
- [Accessibility Overlap](../patterns/accessibility-overlap.md)
