# Anti-Pattern: Visual-Only Status

Communicating status, feedback, or outcome through visual means alone — color, icons, animations, or positional changes — without a corresponding machine-readable representation in the DOM.

## Description

Status indicators are one of the most common places where agent legibility breaks down. A green checkmark, a red border, a spinning indicator, or a banner that fades in are all immediately understandable to a sighted user. An agent reading the DOM encounters: a colored `<div>`, a class name like `status--success`, or an SVG with no text alternative.

The agent either has to guess — which it may do incorrectly — or spend additional tokens and turns attempting to infer status from context.

## Examples

**Color-only status badges:**

```html
<!-- "Active" vs "Inactive" communicated only by green/grey dot -->
<span class="status-dot status-dot--green"></span>
```

**Icon-only feedback:**

```html
<!-- A green checkmark SVG — no text, no ARIA -->
<svg class="icon-success"><!-- checkmark path --></svg>
```

**Toast notifications as the sole confirmation:**

```html
<!-- Toast auto-dismisses after 3 seconds; agent may not observe it -->
<div class="toast toast--success" style="animation: fadeOut 3s forwards;">
  Invoice saved successfully.
</div>
```

**Loading state only in CSS:**

```html
<!-- Spinner is a CSS animation; no DOM attribute communicates loading -->
<button class="btn btn--loading" type="submit">
  <span class="spinner"></span>
</button>
```

**Form submission result rendered outside the form:**

```html
<!-- Success rendered as a colored banner far from the submitted form;
     agent may not associate it with the action it just took -->
<div class="global-banner banner--success">Changes saved.</div>
```

## Why This Is a Problem

Agents must act on the outcome of their actions to proceed correctly. If an agent submits a form and cannot determine whether it succeeded or failed, it must either:

- Assume success and proceed (risk: proceeds on a failure)
- Assume failure and retry (risk: duplicate submissions)
- Spend additional turns probing the DOM for evidence (expensive)

Visual-only status makes every action outcome uncertain from the agent's perspective.

## Recommended Fix

**Machine-readable status badges:**

```html
<span
  data-agent-id="subscription-status"
  data-agent-state="active"
  aria-label="Status: Active"
>
  <span class="status-dot status-dot--green" aria-hidden="true"></span>
  Active
</span>
```

**Icon with text alternative:**

```html
<span role="status" data-agent-state="success">
  <svg aria-hidden="true" class="icon-success"><!-- checkmark --></svg>
  <span>Invoice saved successfully.</span>
</span>
```

**Persistent success/error state after form submission:**

```html
<!-- Rendered after submission; does not auto-dismiss; lives near the form -->
<div
  data-agent-id="invoice-form-result"
  data-agent-state="success"
  role="status"
  aria-live="polite"
>
  Invoice #1042 saved successfully.
</div>
```

**Loading state in DOM:**

```html
<button
  data-agent-id="submit-invoice"
  data-agent-action="submit"
  data-agent-state="loading"
  aria-busy="true"
  disabled
  type="submit"
>
  <span class="spinner" aria-hidden="true"></span>
  <span>Saving...</span>
</button>
```

## Related Patterns

- [Explicit State](../patterns/explicit-state.md)
- [Recoverable Workflows](../patterns/recoverable-workflows.md)
- [Accessibility Overlap](../patterns/accessibility-overlap.md)
