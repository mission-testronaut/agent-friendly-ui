# Pattern: Recoverable Workflows

Design multi-step workflows so that agents can detect failures, understand what went wrong, and recover without starting over.

## The Problem

Autonomous agents do not always succeed on the first attempt. Network errors, validation failures, unexpected page states, and timing issues all cause agents to encounter situations they didn't anticipate. If the UI provides no structured information about what went wrong and what the agent should do next, recovery requires trial-and-error — expensive in time and tokens.

## Recommended Approach

### Make errors machine-readable

Error messages should be tied to the elements they describe, not just rendered as floating text:

```html
<!-- Error associated with the field -->
<div>
  <label for="card-number">Card Number</label>
  <input
    id="card-number"
    data-agent-id="field-card-number"
    data-agent-state="error"
    aria-invalid="true"
    aria-describedby="card-number-error"
    type="text"
  />
  <span id="card-number-error" role="alert" data-agent-id="field-card-number-error">
    Card number must be 16 digits.
  </span>
</div>
```

### Surface the recovery action

When something goes wrong, tell the agent what to do next. Avoid leaving the agent in an ambiguous state.

```html
<!-- Error state with recovery action available -->
<div
  data-agent-id="payment-result"
  data-agent-state="error"
  role="alert"
>
  <p>Payment failed: insufficient funds.</p>
  <button
    data-agent-id="retry-payment"
    data-agent-action="retry"
    type="button"
  >
    Try a different payment method
  </button>
</div>
```

### Mark workflow steps with status

In multi-step flows, mark each step's completion state so an agent can resume from a known point:

```html
<ol data-agent-id="checkout-steps" role="list">
  <li data-agent-step="1" data-agent-state="completed" aria-label="Step 1: Cart — completed">
    Cart
  </li>
  <li data-agent-step="2" data-agent-state="completed" aria-label="Step 2: Shipping — completed">
    Shipping
  </li>
  <li data-agent-step="3" data-agent-state="active" aria-current="step" aria-label="Step 3: Payment — current step">
    Payment
  </li>
  <li data-agent-step="4" data-agent-state="pending" aria-label="Step 4: Confirm — not yet reached">
    Confirm
  </li>
</ol>
```

### Provide a consistent success confirmation

After a workflow completes, render an unambiguous confirmation state in the DOM:

```html
<!-- Success state is DOM-visible, not just a transient toast -->
<div
  data-agent-id="order-confirmation"
  data-agent-state="success"
  role="status"
  aria-live="polite"
>
  <h2>Order Confirmed</h2>
  <p>Order #ORD-10482 has been placed.</p>
</div>
```

### Avoid silent failures

If an operation fails, always render a visible, structured error state. Never:
- Silently return the user to a previous state without explanation
- Show only a toast notification that auto-dismisses (agents may miss it)
- Leave a loading state running indefinitely without a timeout or error fallback

## Why This Helps Agents

When an agent encounters an error and the UI provides structured recovery information, the agent can:

1. Identify which specific step or field failed
2. Read the error message without visual parsing
3. Locate the recovery action directly
4. Re-attempt the correct action without guessing

This reduces the need for the agent to re-observe the entire page, reducing both latency and token cost per recovery cycle.

## Accessibility Overlap

`role="alert"` and `aria-live` regions were designed for exactly this use case: communicating dynamic state changes to users who cannot observe the visual update in real time. Every recoverable workflow improvement helps screen reader users receive timely error feedback.

## Caveats

Not every failure mode can be anticipated at design time. Focus on the most common failure paths first: validation errors, server errors, timeouts, and permission failures. Even partial coverage of recoverable states meaningfully reduces agent difficulty.
