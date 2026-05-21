# Pattern: Stable Selectors

Give interactive elements stable, meaningful identifiers that persist across renders, deployments, and UI refactors.

## The Problem

When agents interact with a page over multiple steps or sessions, they rely on consistent ways to locate elements. If IDs are randomly generated, class names are utility-based, or element positions shift based on unrelated state changes, agents must re-discover elements on each visit. This adds latency, token cost, and failure risk.

The same problem affects automated testing. Selector instability is one of the leading causes of flaky tests.

## Recommended Approach

Use `data-agent-id` as the primary stable selector for elements agents need to interact with.

```html
<!-- Stable: describes the action in the workflow -->
<button data-agent-id="checkout-submit-order" type="submit">
  Place Order
</button>

<!-- Unstable: generated index, changes if list order changes -->
<button id="btn-3" type="submit">Place Order</button>

<!-- Fragile: class names tied to styling framework -->
<button class="MuiButton-root MuiButton-contained MuiButton-containedPrimary">
  Place Order
</button>
```

### Naming Convention

`data-agent-id` values should be:

- **Kebab-case:** `submit-invoice`, `cancel-subscription`
- **Action-scoped where possible:** prefix with the workflow or page context to avoid collisions in SPAs (`invoice-form-submit`, `account-settings-save`)
- **Stable across refactors:** based on business function, not implementation detail
- **Unique per page:** no two interactive elements on a page should share the same `data-agent-id`

### In React

```tsx
<button
  data-agent-id="invoice-form-submit"
  data-agent-action="submit"
  type="submit"
>
  Submit Invoice
</button>
```

Using the utility package:

```tsx
import { agentAttrs } from '@agent-friendly-ui/utils';

<button
  {...agentAttrs({ id: 'invoice-form-submit', action: 'submit' })}
  type="submit"
>
  Submit Invoice
</button>
```

### In Lists and Repeated Elements

When elements repeat (table rows, list items), include a record identifier in the `data-agent-id`:

```html
<!-- Each row action is uniquely identifiable -->
<tr data-agent-id="invoice-row-1042">
  <td>Invoice #1042</td>
  <td>
    <button data-agent-id="invoice-1042-edit" data-agent-action="edit">Edit</button>
    <button data-agent-id="invoice-1042-delete" data-agent-action="delete">Delete</button>
  </td>
</tr>
```

Avoid generating the identifier from render index (`invoice-row-0`, `invoice-row-1`) — if the list is sorted or filtered, these values change. Use the underlying record ID instead.

## Why This Helps Agents

A stable selector means an agent can reliably navigate a workflow without needing to re-discover elements between steps. It reduces the planning burden on the agent and makes multi-step tasks more reliable.

It also decouples the agent's interaction model from the implementation details of the UI framework, making the interface more resilient to refactors.

## Accessibility Overlap

While `data-agent-id` is not a native accessibility feature, the underlying practice of giving elements meaningful, stable identifiers is consistent with accessibility best practices. Screen readers rely on element labels and roles; `data-agent-id` extends that philosophy to selector stability.

## Caveats

`data-agent-id` is intended for elements agents need to interact with — not every element on the page. Apply it to key interactive elements: primary actions, form fields, navigation triggers, modal triggers, and step containers.

Adding `data-agent-id` to every element creates noise. Be selective.
