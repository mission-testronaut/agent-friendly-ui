# Anti-Pattern: Hidden State

Application state that exists in memory or visual presentation but is not reflected in the DOM.

## Description

Many UIs maintain state — which tab is active, whether a user has unsaved changes, whether a record is locked, whether a feature flag is enabled — without exposing that state in any machine-readable way. The state exists only as CSS styling, JavaScript variables, or server-side context that never reaches the DOM.

Agents navigating these interfaces must infer state from indirect signals, or discover it by attempting an action and observing the response.

## Examples

**Active tab — state only in CSS:**

```html
<!-- Agent cannot tell which tab is active without parsing CSS -->
<div class="tab active">Overview</div>
<div class="tab">History</div>
<div class="tab">Settings</div>
```

**Unsaved changes — state only in memory:**

```html
<!-- User has unsaved edits, but nothing in the DOM reflects this -->
<form data-agent-id="user-profile-form">
  <input type="text" name="name" value="Alice" />
  <button type="submit">Save</button>
</form>
```

**Selected items — state only visual:**

```html
<!-- "Selected" rows have a blue background; no DOM attribute indicates selection -->
<tr class="row row--selected">...</tr>
<tr class="row">...</tr>
```

**Conditional availability — invisible to the DOM:**

```html
<!-- Button appears enabled but will fail because the user lacks a required role -->
<button type="button">Approve Request</button>
```

## Why This Is a Problem

An agent that cannot observe state must explore or guess:

- It may attempt to submit a form that requires selecting a record first
- It may navigate to a new page without noticing unsaved changes
- It may click an action that fails silently because a prerequisite is unmet
- It may re-do work because it cannot tell which items are already selected

Each of these outcomes requires additional recovery steps.

## Recommended Fix

**Active tab:**

```html
<div role="tablist">
  <div role="tab" aria-selected="true" data-agent-id="tab-overview" tabindex="0">Overview</div>
  <div role="tab" aria-selected="false" data-agent-id="tab-history" tabindex="-1">History</div>
  <div role="tab" aria-selected="false" data-agent-id="tab-settings" tabindex="-1">Settings</div>
</div>
```

**Unsaved changes:**

```html
<form
  data-agent-id="user-profile-form"
  data-agent-state="dirty"
  aria-label="User profile — unsaved changes"
>
  <input type="text" name="name" value="Alice" />
  <button type="submit" data-agent-id="user-profile-save">Save Changes</button>
  <button type="button" data-agent-id="user-profile-discard">Discard</button>
</form>
```

**Selected rows:**

```html
<tr aria-selected="true" data-agent-state="selected" data-agent-id="invoice-row-1042">...</tr>
<tr aria-selected="false" data-agent-id="invoice-row-1043">...</tr>
```

**Conditional availability:**

```html
<button
  type="button"
  data-agent-id="approve-request"
  data-agent-action="approve"
  data-agent-state="disabled"
  aria-disabled="true"
  aria-describedby="approve-permission-note"
>
  Approve Request
</button>
<span id="approve-permission-note" class="sr-only">
  Requires approver role. Contact your admin.
</span>
```

## Related Patterns

- [Explicit State](../patterns/explicit-state.md)
- [Recoverable Workflows](../patterns/recoverable-workflows.md)
