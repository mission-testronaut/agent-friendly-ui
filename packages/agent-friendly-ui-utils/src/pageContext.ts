export interface PageContext {
  page: string;
  title?: string;
  workflow?: string;
  step?: number;
  totalSteps?: number;
  currentState?: string;
  availableActions?: string[];
  requiredFields?: string[];
  agentNotes?: string;
  record?: {
    type: string;
    id: string;
    status?: string;
  } | null;
  [key: string]: unknown;
}

/**
 * Safely serializes a page context object to JSON for embedding in a
 * <script type="application/json" id="agent-page-context"> block.
 *
 * Throws if the context cannot be serialized (e.g., contains circular
 * references), so the caller must handle errors or ensure the input is safe.
 *
 * @example
 * const json = createPageContext({ page: 'invoice-create', workflow: 'checkout' });
 * // Render as: <script type="application/json" id="agent-page-context">{json}</script>
 */
export function createPageContext(context: PageContext): string {
  return JSON.stringify(context);
}
