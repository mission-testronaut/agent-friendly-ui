# @agent-friendly-ui/utils

TypeScript utilities for generating agent-friendly HTML attributes.

Part of the [Agent-Friendly UI](../../README.md) project.

## Installation

```bash
npm install @agent-friendly-ui/utils
```

## Usage

### `agentAttrs(options)`

Returns an object of `data-agent-*` attributes suitable for spreading onto an HTML element or JSX component.

```tsx
import { agentAttrs } from '@agent-friendly-ui/utils';

<button
  {...agentAttrs({
    id: 'submit-invoice',
    action: 'submit',
    state: 'ready',
    role: 'primary-action',
  })}
  type="submit"
>
  Submit Invoice
</button>
```

Output attributes:

```html
<button
  data-agent-id="submit-invoice"
  data-agent-action="submit"
  data-agent-state="ready"
  data-agent-role="primary-action"
  type="submit"
>
  Submit Invoice
</button>
```

#### Options

| Option | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Stable unique identifier for the element |
| `action` | `string` | No | Action the element performs (e.g., `"submit"`, `"delete"`) |
| `state` | `string` | No | Current state (e.g., `"ready"`, `"loading"`, `"error"`) |
| `role` | `string` | No | Role in the workflow (e.g., `"primary-action"`, `"cancel"`) |
| `step` | `string` | No | Step number in a multi-step workflow |
| `status` | `string` | No | Additional status information |

Undefined options are omitted from the output — no empty attributes are added to the DOM.

---

### `detectAgentMode(input?)`

Detects whether agent mode is active from a URL query parameter (`?agentMode=true`).

```ts
import { detectAgentMode } from '@agent-friendly-ui/utils';

// From a full URL
detectAgentMode('https://example.com/page?agentMode=true'); // true

// From URLSearchParams
detectAgentMode(new URLSearchParams(window.location.search)); // true if ?agentMode=true

// No argument — reads window.location.search in browser environments
detectAgentMode(); // true if current URL has ?agentMode=true
```

Use this to conditionally enable agent-specific behaviors (e.g., disabling animations, expanding collapsed sections by default).

---

### `createPageContext(context)`

Safely serializes a page context object to JSON for embedding in a `<script type="application/json" id="agent-page-context">` block.

```tsx
import { createPageContext } from '@agent-friendly-ui/utils';

const contextJson = createPageContext({
  page: 'invoice-create',
  title: 'Create Invoice',
  workflow: 'invoicing',
  step: 1,
  totalSteps: 2,
  availableActions: ['invoice-form-submit', 'invoice-form-cancel'],
  requiredFields: ['field-client-name', 'field-amount', 'field-due-date'],
});

// In a React component:
<script
  type="application/json"
  id="agent-page-context"
  dangerouslySetInnerHTML={{ __html: contextJson }}
/>
```

See [spec/page-context.md](../../spec/page-context.md) for the full schema.

---

## Development

```bash
npm install
npm test
npm run typecheck
npm run build
```

## License

MIT
