# Example: Basic Agent-Friendly Form

A complete example of a form built with agent-friendly patterns applied.

## The Form: Invoice Creation

This example shows an invoice creation form with all agent-friendly attributes in place.

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Create Invoice</title>

  <!-- Page context metadata for agents -->
  <script type="application/json" id="agent-page-context">
  {
    "page": "invoice-create",
    "title": "Create Invoice",
    "workflow": "invoice-management",
    "availableActions": ["invoice-form-submit", "invoice-form-cancel"],
    "requiredFields": ["field-client-name", "field-amount", "field-due-date"]
  }
  </script>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="/dashboard" data-agent-id="nav-dashboard">Dashboard</a>
      <a href="/invoices" data-agent-id="nav-invoices" aria-current="page">Invoices</a>
    </nav>
  </header>

  <main>
    <h1>Create Invoice</h1>

    <form
      data-agent-id="invoice-create-form"
      data-agent-state="idle"
      aria-label="Create invoice form"
      novalidate
    >
      <fieldset>
        <legend>Invoice Details</legend>

        <div>
          <label for="client-name">Client Name <span aria-hidden="true">*</span></label>
          <input
            id="client-name"
            data-agent-id="field-client-name"
            type="text"
            name="clientName"
            autocomplete="organization"
            aria-required="true"
            required
          />
        </div>

        <div>
          <label for="amount">Amount (USD) <span aria-hidden="true">*</span></label>
          <input
            id="amount"
            data-agent-id="field-amount"
            type="number"
            name="amount"
            min="0.01"
            step="0.01"
            aria-required="true"
            required
          />
        </div>

        <div>
          <label for="due-date">Due Date <span aria-hidden="true">*</span></label>
          <input
            id="due-date"
            data-agent-id="field-due-date"
            type="date"
            name="dueDate"
            aria-required="true"
            required
          />
        </div>

        <div>
          <label for="notes">Notes (optional)</label>
          <textarea
            id="notes"
            data-agent-id="field-notes"
            name="notes"
            rows="4"
          ></textarea>
        </div>
      </fieldset>

      <!-- Result container: initially empty, populated after submission -->
      <div
        data-agent-id="invoice-form-result"
        data-agent-state="idle"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      ></div>

      <div>
        <button
          data-agent-id="invoice-form-submit"
          data-agent-action="submit"
          data-agent-role="primary-action"
          data-agent-state="ready"
          type="submit"
        >
          Create Invoice
        </button>

        <a
          href="/invoices"
          data-agent-id="invoice-form-cancel"
          data-agent-action="cancel"
          data-agent-role="cancel"
        >
          Cancel
        </a>
      </div>
    </form>
  </main>
</body>
</html>
```

### State transitions

The form should update its `data-agent-state` values as the submission progresses:

**Submitting:**

```html
<form data-agent-id="invoice-create-form" data-agent-state="submitting">
  ...
  <button
    data-agent-id="invoice-form-submit"
    data-agent-state="loading"
    aria-busy="true"
    disabled
  >
    Creating...
  </button>
</form>
```

**Success:**

```html
<form data-agent-id="invoice-create-form" data-agent-state="success">
  ...
  <div
    data-agent-id="invoice-form-result"
    data-agent-state="success"
    role="status"
  >
    Invoice #1043 created successfully.
    <a href="/invoices/1043" data-agent-id="view-new-invoice">View Invoice</a>
  </div>
</form>
```

**Validation error:**

```html
<form data-agent-id="invoice-create-form" data-agent-state="error">
  ...
  <div>
    <label for="amount">Amount (USD)</label>
    <input
      id="amount"
      data-agent-id="field-amount"
      data-agent-state="error"
      aria-invalid="true"
      aria-describedby="amount-error"
      type="number"
      ...
    />
    <span
      id="amount-error"
      data-agent-id="field-amount-error"
      role="alert"
    >
      Amount must be greater than 0.
    </span>
  </div>
</form>
```

## React Version

```tsx
import { agentAttrs, createPageContext } from '@agent-friendly-ui/utils';
import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function InvoiceCreateForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [amountError, setAmountError] = useState<string | null>(null);

  const contextJson = createPageContext({
    page: 'invoice-create',
    title: 'Create Invoice',
    workflow: 'invoice-management',
    availableActions: ['invoice-form-submit', 'invoice-form-cancel'],
    requiredFields: ['field-client-name', 'field-amount', 'field-due-date'],
  });

  return (
    <>
      <script
        type="application/json"
        id="agent-page-context"
        dangerouslySetInnerHTML={{ __html: contextJson }}
      />
      <form
        {...agentAttrs({ id: 'invoice-create-form', state: formState })}
        aria-label="Create invoice form"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Invoice Details</legend>

          <div>
            <label htmlFor="amount">Amount (USD)</label>
            <input
              id="amount"
              {...agentAttrs({
                id: 'field-amount',
                state: amountError ? 'error' : 'idle',
              })}
              type="number"
              aria-required="true"
              aria-invalid={!!amountError}
              aria-describedby={amountError ? 'amount-error' : undefined}
            />
            {amountError && (
              <span
                id="amount-error"
                {...agentAttrs({ id: 'field-amount-error' })}
                role="alert"
              >
                {amountError}
              </span>
            )}
          </div>
        </fieldset>

        <button
          {...agentAttrs({
            id: 'invoice-form-submit',
            action: 'submit',
            role: 'primary-action',
            state: formState === 'submitting' ? 'loading' : 'ready',
          })}
          aria-busy={formState === 'submitting'}
          disabled={formState === 'submitting'}
          type="submit"
        >
          {formState === 'submitting' ? 'Creating...' : 'Create Invoice'}
        </button>
      </form>
    </>
  );
}
```

## What This Example Demonstrates

- Page context metadata gives agents an immediate orientation to the page
- Every field has a stable `data-agent-id` for reliable selection
- Required fields are marked with `aria-required`
- The submit button has `data-agent-action`, `data-agent-role`, and `data-agent-state`
- State transitions update both `data-agent-state` and ARIA attributes simultaneously
- Errors are associated with their fields via `aria-describedby`
- The result container is always present in the DOM, populated after submission
- `aria-live` on the result container allows agents and screen readers to observe the update
