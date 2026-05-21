# Spec: Agent Attributes

This document defines the standard `data-agent-*` HTML attributes used in agent-friendly UI design.

**Status:** Draft v0.1 — subject to change

---

## Overview

Agent attributes are standard HTML `data-*` attributes that provide machine-readable context to autonomous agents, test automation tools, and accessibility systems. They are designed to:

- Be ignored by browsers (they are data attributes, not functional attributes)
- Complement, not replace, native HTML semantics and ARIA attributes
- Be lightweight to apply — no runtime dependency required
- Survive minification, bundler transformations, and framework abstraction layers

---

## Attributes

### `data-agent-id`

A stable, unique identifier for the element within the page.

**Type:** `string`

**Format:** Kebab-case. Should describe the element's function in the workflow, not its visual appearance or DOM position.

**Uniqueness:** Must be unique per page. In SPAs, unique per rendered view.

**Examples:**
```html
data-agent-id="submit-invoice"
data-agent-id="invoice-1042-edit"
data-agent-id="checkout-step-3"
data-agent-id="nav-main-menu"
```

**Do not use:**
```html
data-agent-id="btn-1"           <!-- Positional, unstable -->
data-agent-id="a3f9c2"         <!-- Random, meaningless -->
data-agent-id="submitButton"   <!-- camelCase, inconsistent -->
```

---

### `data-agent-action`

Describes what action this element performs when activated.

**Type:** `string`

**Format:** Kebab-case verb or verb-noun phrase.

**When to use:** On interactive elements (buttons, links, form submissions) where the action is not fully expressed by the element's accessible label.

**Recommended vocabulary:**

| Value | Meaning |
|---|---|
| `submit` | Submit a form or confirm an operation |
| `cancel` | Abort the current operation |
| `confirm` | Confirm a destructive or irreversible action |
| `edit` | Open an edit mode or form |
| `delete` | Delete a record |
| `save` | Save changes without submitting a form |
| `navigate` | Navigate to another page or step |
| `open` | Open a dialog, panel, or expanded section |
| `close` | Close a dialog, panel, or expanded section |
| `retry` | Retry a failed operation |
| `upload` | Trigger a file upload |
| `download` | Trigger a file download |
| `add` | Add a new item to a list or collection |
| `remove` | Remove an item from a list or collection |
| `apply` | Apply a filter, selection, or code |
| `search` | Trigger a search operation |

**Examples:**
```html
data-agent-action="submit"
data-agent-action="confirm-delete"
data-agent-action="navigate-next"
```

---

### `data-agent-state`

Describes the current state of the element or container.

**Type:** `string`

**When to use:** When the element's state is meaningful to an agent and is not fully expressed by native ARIA attributes.

**Recommended vocabulary:**

| Value | Meaning |
|---|---|
| `idle` | Default state; no active operation |
| `ready` | Element is ready for interaction |
| `loading` | An async operation is in progress |
| `processing` | The element's action is being processed |
| `submitting` | A form is being submitted |
| `success` | An operation completed successfully |
| `error` | An operation failed or validation failed |
| `warning` | A non-blocking issue is present |
| `disabled` | The element is not currently interactable |
| `active` | The element is currently active (selected, focused, expanded) |
| `inactive` | The element is present but inactive |
| `completed` | A workflow step has been completed |
| `pending` | A workflow step has not yet been reached |
| `dirty` | A form has unsaved changes |
| `locked` | The record or element is locked by another user |

**Examples:**
```html
data-agent-state="loading"
data-agent-state="error"
data-agent-state="completed"
```

**Relationship to ARIA:** `data-agent-state` should complement ARIA, not replace it. When an ARIA attribute exists for the state (e.g., `aria-busy`, `aria-invalid`, `aria-disabled`), use both:

```html
<button
  data-agent-state="loading"
  aria-busy="true"
  disabled
>
  Processing...
</button>
```

---

### `data-agent-role`

Describes the element's role within the current workflow or page, distinct from its HTML/ARIA role.

**Type:** `string`

**When to use:** On elements whose significance to the current workflow is not captured by their HTML semantics. Primarily useful on action elements.

**Recommended vocabulary:**

| Value | Meaning |
|---|---|
| `primary-action` | The main action to advance the workflow |
| `secondary-action` | A secondary or alternative action |
| `cancel` | The action to abort and exit the workflow |
| `destructive` | An action that cannot be undone |
| `navigation` | An action that navigates between steps or pages |
| `confirmation` | An action that confirms a prior operation |

**Examples:**
```html
data-agent-role="primary-action"
data-agent-role="destructive"
data-agent-role="cancel"
```

---

### `data-agent-step`

Identifies the step number of the current element within a multi-step workflow.

**Type:** `string` (numeric string recommended; e.g., `"1"`, `"2"`)

**When to use:** On step containers in wizards, checkout flows, onboarding sequences, and other multi-step workflows.

**Examples:**
```html
<div data-agent-id="checkout-step-payment" data-agent-step="3" data-agent-state="active">
  Payment
</div>
```

---

## Combining Attributes

Attributes are designed to be used together. A well-annotated primary action button uses all five:

```html
<button
  data-agent-id="checkout-submit-order"
  data-agent-action="submit"
  data-agent-state="ready"
  data-agent-role="primary-action"
  type="submit"
>
  Place Order
</button>
```

---

## Attribute Placement

- Apply `data-agent-id` to any element an agent might need to locate or interact with
- Apply `data-agent-action` to interactive elements (buttons, links, custom controls)
- Apply `data-agent-state` to both interactive elements and their containers when the container's state is meaningful
- Apply `data-agent-role` to action elements where workflow role adds clarity
- Apply `data-agent-step` to step containers in multi-step flows

Do not apply agent attributes to purely decorative elements.

---

## Versioning

This spec is at draft v0.1. Breaking changes to attribute names or semantics will be versioned with a spec version bump. Applications may use a `data-agent-spec-version` attribute on `<html>` or `<body>` to declare which version they target:

```html
<html data-agent-spec-version="0.1">
```
