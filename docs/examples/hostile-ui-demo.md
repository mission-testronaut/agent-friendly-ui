# Example: Hostile UI Demo

A catalog of UI patterns that make agent operation difficult, with annotations explaining why each one is problematic.

This document serves as a reference for what to avoid. Each pattern below corresponds to an anti-pattern in [docs/anti-patterns/](../anti-patterns/).

---

## The Same Form, Done Wrong

Compare this to [basic-agent-friendly-form.md](basic-agent-friendly-form.md).

```html
<!DOCTYPE html>
<html>
<head>
  <title>New Invoice</title>
  <!-- No agent context metadata -->
</head>
<body>
  <!-- No semantic landmarks -->
  <div class="wrapper">
    <div class="top-nav">
      <!-- Icon-only nav with no text labels -->
      <div class="nav-item active">
        <svg><!-- home icon --></svg>
      </div>
      <div class="nav-item">
        <svg><!-- invoice icon --></svg>
      </div>
    </div>

    <div class="content">
      <div class="page-header">New Invoice</div>

      <!-- Form with no agent attributes, random IDs -->
      <form id="f-3a9c" class="invoice-form">

        <!-- Label not associated with input -->
        <div class="field">
          <div class="label">Client Name *</div>
          <input
            id="inp-7x2k"
            class="text-input"
            type="text"
          />
        </div>

        <!-- Amount field with no validation feedback surface -->
        <div class="field">
          <div class="label">Amount *</div>
          <input
            id="inp-9m4p"
            class="text-input money-input"
            type="text"
          />
        </div>

        <!-- Date field styled as custom picker, not native input -->
        <div class="field">
          <div class="label">Due Date *</div>
          <div class="custom-date-picker" onclick="openDatePicker()">
            <span class="date-display">Select date...</span>
            <svg><!-- calendar icon --></svg>
          </div>
          <!-- Date picker renders as a floating div outside this form -->
        </div>

        <!-- Submit area: visually styled div, not a button -->
        <div class="actions">
          <!-- "Go" — tells the agent nothing about what will happen -->
          <div
            class="btn btn-primary"
            onclick="submitForm()"
            style="cursor: pointer;"
          >
            Go
          </div>
          <!-- Cancel with no navigation target in the DOM -->
          <div class="link" onclick="goBack()">Cancel</div>
        </div>
      </form>

      <!-- Success communicated only via toast; auto-dismisses in 3 seconds -->
      <!-- Agent may never see this -->
      <div id="toast-container"></div>

    </div>
  </div>

  <script>
    function submitForm() {
      // On success: shows toast, redirects after 1s
      showToast('Saved!');
      setTimeout(() => { window.location = '/invoices'; }, 1000);
    }

    function openDatePicker() {
      // Renders floating div dynamically with random ID
      const picker = document.createElement('div');
      picker.id = 'dp-' + Math.random().toString(36).slice(2);
      picker.className = 'floating-datepicker';
      // ... calendar UI
      document.body.appendChild(picker);
    }
  </script>
</body>
</html>
```

---

## Annotation: What Makes This Hostile

### 1. No page context
The agent must infer what page it's on, what workflow is active, and what actions are available entirely from DOM inspection.

### 2. No semantic structure
`<div class="top-nav">` is invisible to landmark navigation. `<div class="content">` provides no structural meaning. The agent cannot orient itself.

### 3. Dynamically generated form ID (`id="f-3a9c"`)
Regenerated on every render. Any selector that targets this ID will break immediately on the next page load.

### 4. Label not associated with input
`<div class="label">Client Name</div>` is not connected to the input via `for`/`id`. The agent cannot reliably determine which label belongs to which input except by proximity — which breaks if the layout changes.

### 5. Random input IDs (`id="inp-7x2k"`)
Meaningless identifiers that regenerate on every render. The agent cannot build a stable interaction model.

### 6. Custom date picker outside the form
The calendar opens as a dynamically created `<div>` appended to `<body>` with a randomly generated ID. The agent has no reliable way to locate it.

### 7. `<div>` acting as a button
`<div class="btn-primary" onclick="submitForm()">Go` — not a `<button>`, not keyboard-accessible, not semantically a button, labeled "Go" (what does that mean?).

### 8. Success state in an auto-dismissing toast
The agent submits the form. Success is communicated by a toast that appears for 3 seconds and then disappears. The agent has a narrow window to observe it — and may not observe it at all if it's waiting for another condition. After 3 seconds, the DOM contains no evidence of what happened.

### 9. Cancel link has no `href`
`<div class="link" onclick="goBack()">Cancel</div>` — not an `<a>` element, no destination in the DOM, relies entirely on JavaScript navigation. The agent cannot determine where "Cancel" leads.

---

## Summary

| Pattern | Agent impact |
|---|---|
| No context metadata | Agent must spend tokens orienting |
| No semantic structure | Landmark navigation impossible |
| Dynamic IDs | Selectors invalidated on every render |
| Unassociated labels | Field purpose inferred by proximity only |
| Custom non-semantic controls | Interaction model unreliable |
| Out-of-form dynamic elements | Picker cannot be reliably located |
| Auto-dismissing toast only | Success/failure unobservable after 3s |

Each of these problems is individually solvable. The hostile UI above combines all of them — which is why the benchmark showed ~4.7× longer execution time for the same task.
