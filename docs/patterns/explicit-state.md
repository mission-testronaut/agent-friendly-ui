# Pattern: Explicit State

Represent the current state of interactive elements and containers in the DOM as machine-readable attributes — not only as visual styling.

## The Problem

UI state is often communicated visually: a button turns grey when disabled, a row highlights when selected, a spinner appears when loading, a border turns red on validation error. These signals are immediately clear to a sighted user. An agent reading the DOM sees only class names or inline styles, which it must interpret through pattern-matching.

That pattern-matching is error-prone and fragile. A class named `btn--loading` could mean anything; a CSS color change tells the agent nothing reliable.

## Recommended Approach

### Use ARIA attributes for standard states

For states with a defined ARIA equivalent, use the ARIA attribute:

| State | ARIA attribute |
|---|---|
| Disabled | `aria-disabled="true"` or native `disabled` |
| Loading / busy | `aria-busy="true"` |
| Expanded (dropdown, accordion) | `aria-expanded="true/false"` |
| Selected (option, tab) | `aria-selected="true/false"` |
| Checked | `aria-checked="true/false/mixed"` |
| Invalid (form field) | `aria-invalid="true"` |
| Required | `aria-required="true"` |
| Current page | `aria-current="page"` |

### Use `data-agent-state` for application-specific states

For states that have no ARIA equivalent, use `data-agent-state`:

```html
<!-- Payment processing -->
<button
  data-agent-id="submit-payment"
  data-agent-state="processing"
  aria-busy="true"
  disabled
>
  Processing...
</button>

<!-- Form field with server-side validation error -->
<input
  data-agent-id="field-email"
  data-agent-state="error"
  aria-invalid="true"
  aria-describedby="email-error"
  type="email"
/>
<span id="email-error" role="alert">This email is already registered.</span>

<!-- Step completed in a multi-step flow -->
<div
  data-agent-id="step-billing"
  data-agent-step="2"
  data-agent-state="completed"
  aria-label="Step 2: Billing — completed"
>
  ...
</div>
```

### States to always make explicit

| Situation | Required attributes |
|---|---|
| Element is not interactable | `disabled` and/or `aria-disabled="true"` |
| Async operation in progress | `aria-busy="true"`, `data-agent-state="loading"` |
| Form submission succeeded | `data-agent-state="success"` on container, `role="status"` or `role="alert"` on message |
| Form submission failed | `data-agent-state="error"`, `aria-invalid="true"` on affected fields |
| Modal or dialog is open | `aria-modal="true"`, `role="dialog"` |
| Panel or section is hidden | `aria-hidden="true"` or `hidden` attribute |

## React Example

```tsx
import { agentAttrs } from '@agent-friendly-ui/utils';

function SubmitButton({ isSubmitting, isDisabled }) {
  return (
    <button
      {...agentAttrs({
        id: 'submit-payment',
        action: 'submit',
        state: isSubmitting ? 'processing' : isDisabled ? 'disabled' : 'ready',
      })}
      aria-busy={isSubmitting}
      disabled={isSubmitting || isDisabled}
      type="submit"
    >
      {isSubmitting ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
```

## Why This Helps Agents

An agent encountering `data-agent-state="processing"` knows immediately that clicking this button right now is not the right action. It can wait, retry, or re-plan accordingly — without needing to visually infer the state from a spinner animation or a class name.

Explicit state reduces the number of unnecessary actions agents take against unavailable elements, which reduces retries, errors, and token cost.

## Accessibility Overlap

ARIA state attributes were designed precisely to make visual state machine-readable for assistive technologies. Every ARIA state attribute used for agent legibility is also an accessibility improvement.

## Caveats

`data-agent-state` values should be consistent across your application. If `"loading"` is used in one place and `"pending"` in another for the same concept, agents must learn both mappings. Establish a small vocabulary and document it in your project's CLAUDE.md or design system documentation.

See [spec/agent-attributes.md](../../spec/agent-attributes.md) for recommended state vocabulary.
