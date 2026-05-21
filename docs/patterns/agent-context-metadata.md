# Pattern: Agent Context Metadata

Embed a structured metadata block in the page that gives agents a concise, machine-readable summary of the current context — what page this is, what workflow is active, and what actions are available.

## The Problem

An agent arriving at a page must spend tokens and turns constructing an understanding of what the page is for, where it sits in a workflow, and what actions are available. This information is often scattered across the DOM, encoded in headings, breadcrumbs, or visual layout. Assembling it takes time and inference.

A small, structured metadata block can communicate this at near-zero cost.

## Recommended Approach

Embed a `<script type="application/json">` block with a well-known `id` inside the page `<head>` or at the top of `<main>`:

```html
<script type="application/json" id="agent-page-context">
{
  "page": "checkout-payment",
  "title": "Payment — Step 3 of 4",
  "workflow": "checkout",
  "step": 3,
  "totalSteps": 4,
  "availableActions": ["submit-payment", "go-back", "apply-promo-code"],
  "requiredFields": ["card-number", "card-expiry", "card-cvv"],
  "agentNotes": "Card fields are hosted by a third-party iframe. Use agent-id 'payment-iframe-container' to locate the iframe boundary."
}
</script>
```

### Reading the context

An agent (or developer tooling) can extract this as:

```js
const context = JSON.parse(
  document.getElementById('agent-page-context').textContent
);
```

### Using the utility package

```ts
import { createPageContext } from '@agent-friendly-ui/utils';

const context = createPageContext({
  page: 'checkout-payment',
  title: 'Payment — Step 3 of 4',
  workflow: 'checkout',
  step: 3,
  totalSteps: 4,
  availableActions: ['submit-payment', 'go-back', 'apply-promo-code'],
  requiredFields: ['card-number', 'card-expiry', 'card-cvv'],
});

// Render as: <script type="application/json" id="agent-page-context">{context}</script>
```

### In a React app

```tsx
import { createPageContext } from '@agent-friendly-ui/utils';

function CheckoutPaymentPage() {
  const contextJson = createPageContext({
    page: 'checkout-payment',
    workflow: 'checkout',
    step: 3,
    totalSteps: 4,
    availableActions: ['submit-payment', 'go-back'],
  });

  return (
    <>
      <script
        type="application/json"
        id="agent-page-context"
        dangerouslySetInnerHTML={{ __html: contextJson }}
      />
      {/* page content */}
    </>
  );
}
```

## Recommended Fields

| Field | Type | Description |
|---|---|---|
| `page` | string | Stable page identifier, kebab-case |
| `title` | string | Human-readable page title |
| `workflow` | string | Active workflow identifier, if any |
| `step` | number | Current step number within the workflow |
| `totalSteps` | number | Total steps in the workflow |
| `availableActions` | string[] | List of `data-agent-id` values for primary actions available on this page |
| `requiredFields` | string[] | List of `data-agent-id` values for fields required to proceed |
| `agentNotes` | string | Free-text notes for agents about unusual behavior on this page |

All fields are optional. Include what is useful; omit what is not.

## Why This Helps Agents

Instead of spending multiple turns and tokens to understand the page, an agent can read the context block first and immediately understand:

- What page it's on
- Where it is in a workflow
- What it should do next
- What fields are required

This is particularly valuable for agents that need to resume a workflow after an interruption or that are operating in an unfamiliar application.

## Accessibility Overlap

This pattern has no direct accessibility equivalent, but it follows the same principle as structured document metadata (`<meta>` tags, Open Graph, JSON-LD): providing machine-readable information alongside human-readable content.

## Caveats

The `agent-page-context` block must be kept in sync with the actual page state. A stale or inaccurate context block is worse than no block, because it gives agents false confidence about what is available. In dynamic applications, generate this block server-side or from component state, not from static configuration.

See [spec/page-context.md](../../spec/page-context.md) for the full context schema.
