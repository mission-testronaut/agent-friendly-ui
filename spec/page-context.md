# Spec: Page Context Metadata

The page context block is an inline JSON metadata object embedded in each page that provides agents with a structured summary of the current page state.

**Status:** Draft v0.1 — subject to change

---

## Overview

Each page embeds a `<script type="application/json" id="agent-page-context">` block containing a JSON object. This block gives agents an immediate, authoritative answer to: *what page is this, what workflow is active, and what should I do?*

Unlike the agent manifest (which describes the entire application), the page context describes the current page state dynamically — it changes as the user navigates and as page state evolves.

---

## Placement

The context block should be placed inside `<head>` or at the top of `<main>`:

```html
<script type="application/json" id="agent-page-context">
{ ... }
</script>
```

The `id="agent-page-context"` is required for reliable discovery. Do not use another ID.

---

## Schema

```jsonc
{
  // Required
  "page": "string",         // Stable page identifier (kebab-case)

  // Recommended
  "title": "string",        // Human-readable page title
  "workflow": "string",     // Active workflow ID (if any)
  "step": 1,                // Current step number (integer)
  "totalSteps": 4,          // Total steps in the workflow (integer)

  // Optional
  "availableActions": [     // data-agent-id values of primary actions on this page
    "string"
  ],
  "requiredFields": [       // data-agent-id values of required fields (if a form page)
    "string"
  ],
  "currentState": "string", // Page-level state: "idle" | "loading" | "error" | "success"
  "agentNotes": "string",   // Free-text notes for agents about unusual behavior

  // Optional: structured data about the primary record on this page
  "record": {
    "type": "string",       // Record type (e.g., "invoice", "user")
    "id": "string",         // Record ID
    "status": "string"      // Record status, if relevant
  }
}
```

---

## Field Reference

### `page` (required)

A stable identifier for this page. Must match the `id` used in the agent manifest if one exists. Should be stable across deployments and refactors.

```json
"page": "invoice-create"
"page": "checkout-payment"
"page": "user-profile-settings"
```

---

### `title`

Human-readable title for the page. Can be dynamic (e.g., include the record name).

```json
"title": "Create Invoice"
"title": "Invoice #1042 — Edit"
"title": "Payment — Step 3 of 4"
```

---

### `workflow` and `step` / `totalSteps`

Identifies where the current page sits within a multi-step workflow.

```json
"workflow": "checkout",
"step": 3,
"totalSteps": 4
```

---

### `availableActions`

An array of `data-agent-id` values corresponding to the primary interactive actions available on this page. Agents can use this to quickly locate the relevant elements without a full DOM scan.

```json
"availableActions": ["checkout-submit-order", "checkout-go-back", "apply-promo-code"]
```

---

### `requiredFields`

An array of `data-agent-id` values for fields that must be filled before the page's primary action can succeed.

```json
"requiredFields": ["field-card-number", "field-card-expiry", "field-card-cvv"]
```

---

### `currentState`

Page-level state. Recommended values: `idle`, `loading`, `error`, `success`.

```json
"currentState": "error"
```

---

### `agentNotes`

Free-text notes for agents. Use for unusual behavior, workarounds, or contextual guidance that cannot be expressed in structured fields.

```json
"agentNotes": "Card fields are hosted in a third-party iframe. Use data-agent-id 'payment-iframe' to locate the iframe boundary before interacting with card fields."
```

---

### `record`

Structured data about the primary record on the page.

```json
"record": {
  "type": "invoice",
  "id": "1042",
  "status": "draft"
}
```

---

## Full Example

```json
{
  "page": "checkout-payment",
  "title": "Payment — Step 3 of 4",
  "workflow": "checkout",
  "step": 3,
  "totalSteps": 4,
  "currentState": "idle",
  "availableActions": ["submit-payment", "checkout-go-back", "apply-promo-code"],
  "requiredFields": ["field-card-number", "field-card-expiry", "field-card-cvv"],
  "agentNotes": "Card fields are hosted in a third-party iframe.",
  "record": {
    "type": "order",
    "id": "ORD-5521",
    "status": "pending-payment"
  }
}
```

---

## Generating the Context

Use the `createPageContext` utility:

```ts
import { createPageContext } from '@agent-friendly-ui/utils';

const json = createPageContext({
  page: 'checkout-payment',
  title: 'Payment — Step 3 of 4',
  workflow: 'checkout',
  step: 3,
  totalSteps: 4,
  availableActions: ['submit-payment', 'checkout-go-back'],
  requiredFields: ['field-card-number', 'field-card-expiry', 'field-card-cvv'],
});
```

See [packages/agent-friendly-ui-utils](../packages/agent-friendly-ui-utils/README.md).

---

## Keeping It in Sync

The page context block must reflect the actual current state of the page. In server-rendered applications, generate it from server state. In client-rendered applications, generate it from component state and re-render it when state changes.

A stale page context that lists actions that are no longer available, or omits actions that have appeared, degrades agent performance. When in doubt, omit fields rather than risk inaccuracy.
