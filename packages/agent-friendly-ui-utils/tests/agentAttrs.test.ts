import { agentAttrs } from '../src/agentAttrs';

describe('agentAttrs', () => {
  it('returns data-agent-id for a required id', () => {
    const result = agentAttrs({ id: 'submit-invoice' });
    expect(result['data-agent-id']).toBe('submit-invoice');
  });

  it('includes all provided optional attributes', () => {
    const result = agentAttrs({
      id: 'submit-invoice',
      action: 'submit',
      state: 'ready',
      role: 'primary-action',
      step: '3',
      status: 'active',
    });

    expect(result['data-agent-id']).toBe('submit-invoice');
    expect(result['data-agent-action']).toBe('submit');
    expect(result['data-agent-state']).toBe('ready');
    expect(result['data-agent-role']).toBe('primary-action');
    expect(result['data-agent-step']).toBe('3');
    expect(result['data-agent-status']).toBe('active');
  });

  it('omits optional attributes when they are undefined', () => {
    const result = agentAttrs({ id: 'submit-invoice' });

    expect(result).not.toHaveProperty('data-agent-action');
    expect(result).not.toHaveProperty('data-agent-state');
    expect(result).not.toHaveProperty('data-agent-role');
    expect(result).not.toHaveProperty('data-agent-step');
    expect(result).not.toHaveProperty('data-agent-status');
  });

  it('omits individual optional attributes when only some are provided', () => {
    const result = agentAttrs({ id: 'my-button', action: 'delete' });

    expect(result['data-agent-id']).toBe('my-button');
    expect(result['data-agent-action']).toBe('delete');
    expect(result).not.toHaveProperty('data-agent-state');
    expect(result).not.toHaveProperty('data-agent-role');
  });

  it('returns an object suitable for spreading onto JSX attributes', () => {
    const attrs = agentAttrs({ id: 'cancel-button', action: 'cancel', role: 'cancel' });
    const element = { ...attrs, type: 'button' };

    expect(element['data-agent-id']).toBe('cancel-button');
    expect(element['data-agent-action']).toBe('cancel');
    expect(element['data-agent-role']).toBe('cancel');
    expect(element.type).toBe('button');
  });
});
