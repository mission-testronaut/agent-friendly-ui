# Anti-Pattern: Ambiguous Actions

Interactive elements that do not clearly communicate what they do or what will happen when activated.

## Description

Agents must determine the correct action to take at each step of a workflow. When action labels are vague, identical, or missing, the agent cannot distinguish between options without taking the action and observing the result — a trial-and-error approach that increases turn count, token usage, and failure risk.

## Examples

**Vague labels:**

```html
<!-- What does "Go" do? -->
<button onclick="handleClick()">Go</button>

<!-- Which "Edit" is for which record? -->
<button>Edit</button>
<button>Edit</button>
<button>Edit</button>
```

**Icon-only with no text alternative:**

```html
<!-- No way to know this submits the form -->
<button type="submit">
  <svg><!-- arrow icon --></svg>
</button>
```

**Generic confirmation dialogs:**

```html
<!-- "Yes" to what? -->
<dialog>
  <p>Are you sure?</p>
  <button>Yes</button>
  <button>No</button>
</dialog>
```

**Multiple identical CTAs:**

```html
<!-- Repeated on every product card — agent cannot distinguish -->
<button class="cta">Add to Cart</button>
<button class="cta">Add to Cart</button>
<button class="cta">Add to Cart</button>
```

## Why This Is a Problem

An agent trying to take the correct action must either:
- Guess based on proximity or position (fragile)
- Spend additional turns exploring context (expensive)
- Take the wrong action and recover from the error (unreliable)

All three outcomes are worse than a clearly labeled action.

## Recommended Fix

**Descriptive labels:**

```html
<button data-agent-id="invoice-1042-edit" data-agent-action="edit">
  Edit Invoice #1042
</button>
```

**Icon buttons with accessible names:**

```html
<button
  aria-label="Submit invoice"
  data-agent-id="invoice-form-submit"
  data-agent-action="submit"
  type="submit"
>
  <svg aria-hidden="true"><!-- arrow icon --></svg>
</button>
```

**Specific confirmation dialogs:**

```html
<dialog aria-labelledby="confirm-title" data-agent-id="confirm-delete-dialog">
  <h2 id="confirm-title">Delete Invoice #1042?</h2>
  <p>This action cannot be undone.</p>
  <button data-agent-id="confirm-delete-confirm" data-agent-action="confirm-delete">
    Delete Invoice
  </button>
  <button data-agent-id="confirm-delete-cancel" data-agent-action="cancel">
    Cancel
  </button>
</dialog>
```

**Disambiguated repeated actions:**

```html
<button
  data-agent-id="product-SKU-001-add-to-cart"
  data-agent-action="add-to-cart"
  aria-label="Add Widget A to cart"
>
  Add to Cart
</button>
```

## Related Patterns

- [Stable Selectors](../patterns/stable-selectors.md)
- [Semantic Structure](../patterns/semantic-structure.md)
