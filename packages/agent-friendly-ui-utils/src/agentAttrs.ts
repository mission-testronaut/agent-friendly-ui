export interface AgentAttrOptions {
  id: string;
  action?: string;
  state?: string;
  role?: string;
  step?: string;
  status?: string;
}

export interface AgentAttrs {
  'data-agent-id': string;
  'data-agent-action'?: string;
  'data-agent-state'?: string;
  'data-agent-role'?: string;
  'data-agent-step'?: string;
  'data-agent-status'?: string;
}

/**
 * Returns an object of data-agent-* attributes suitable for spreading onto
 * an HTML element or JSX component. Undefined options are omitted from the
 * result so the DOM is not polluted with empty attributes.
 *
 * @example
 * <button {...agentAttrs({ id: 'submit-invoice', action: 'submit', state: 'ready' })}>
 *   Submit Invoice
 * </button>
 */
export function agentAttrs(options: AgentAttrOptions): AgentAttrs {
  const attrs: AgentAttrs = {
    'data-agent-id': options.id,
  };

  if (options.action !== undefined) {
    attrs['data-agent-action'] = options.action;
  }
  if (options.state !== undefined) {
    attrs['data-agent-state'] = options.state;
  }
  if (options.role !== undefined) {
    attrs['data-agent-role'] = options.role;
  }
  if (options.step !== undefined) {
    attrs['data-agent-step'] = options.step;
  }
  if (options.status !== undefined) {
    attrs['data-agent-status'] = options.status;
  }

  return attrs;
}
