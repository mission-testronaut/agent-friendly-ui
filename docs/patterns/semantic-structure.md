# Pattern: Semantic Structure

Use HTML semantics to communicate the purpose and hierarchy of your interface, reducing the amount of inference an agent must do to understand the page.

## The Problem

Agents navigating a `<div>`-heavy layout must work hard to determine what role each element plays. Without semantic landmarks, every element looks like undifferentiated content. The agent must rely on visual heuristics, text patterns, or trial-and-error to find what it needs.

## Recommended Approach

Use the right HTML element for the job:

| Purpose | Preferred element |
|---|---|
| Primary navigation | `<nav>` |
| Main page content | `<main>` |
| Page header | `<header>` |
| Page footer | `<footer>` |
| Secondary content | `<aside>` |
| Grouped form section | `<fieldset>` + `<legend>` |
| Dialog/modal | `<dialog>` or `role="dialog"` |
| Page sections | `<section>` with `aria-labelledby` |
| Clickable action | `<button>` |
| Navigation link | `<a href>` |

**Before:**

```html
<div class="page-wrapper">
  <div class="top-bar">...</div>
  <div class="content-area">
    <div class="left-panel">...</div>
    <div class="main-content">
      <div class="form-container">
        <div class="section-header">Billing Details</div>
        <div class="form-row">...</div>
        <div class="submit-area">
          <div class="primary-btn" onclick="submit()">Continue</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**After:**

```html
<body>
  <header>...</header>
  <main>
    <aside>...</aside>
    <section aria-labelledby="billing-heading">
      <h2 id="billing-heading">Billing Details</h2>
      <form>
        <fieldset>
          <legend>Payment Information</legend>
          <!-- fields -->
        </fieldset>
        <button type="submit" data-agent-id="billing-continue" data-agent-action="continue">
          Continue
        </button>
      </form>
    </section>
  </main>
</body>
```

## Why This Helps Agents

Semantic elements give agents a reliable map of the page without any CSS or visual context:

- `<main>` tells the agent where the primary task content lives
- `<nav>` distinguishes navigation from content
- `<button>` versus `<div onclick>` tells the agent it can reliably trigger the element using standard interaction methods
- `<form>` signals a data-entry workflow with a submission pattern

These are not guesses — they are explicit signals in the HTML specification.

## Accessibility Overlap

Semantic HTML is the foundation of screen reader accessibility. Every improvement to semantic structure benefits keyboard users, screen reader users, and agents simultaneously.

WAI-ARIA landmark roles (`role="main"`, `role="navigation"`, etc.) are the ARIA equivalent for cases where native elements are not available.

## Caveats

Component libraries sometimes render non-semantic elements by default (e.g., a `<div role="button">` instead of `<button>`). In those cases, ensure the correct ARIA role is applied and that the element is keyboard-focusable. Prefer native elements when the library gives you the option.

Semantic structure alone is not sufficient for agent legibility — it is a necessary foundation, not a complete solution.
