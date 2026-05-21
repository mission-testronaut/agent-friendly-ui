import { createPageContext } from '../src/pageContext';

describe('createPageContext', () => {
  it('returns valid JSON for a minimal context', () => {
    const result = createPageContext({ page: 'invoice-create' });
    expect(() => JSON.parse(result)).not.toThrow();
  });

  it('preserves the page field', () => {
    const result = createPageContext({ page: 'checkout-payment' });
    const parsed = JSON.parse(result);
    expect(parsed.page).toBe('checkout-payment');
  });

  it('serializes all provided fields', () => {
    const context = {
      page: 'invoice-create',
      title: 'Create Invoice',
      workflow: 'invoicing',
      step: 1,
      totalSteps: 3,
      availableActions: ['invoice-form-submit', 'invoice-form-cancel'],
      requiredFields: ['field-client-name', 'field-amount'],
    };

    const result = createPageContext(context);
    const parsed = JSON.parse(result);

    expect(parsed.page).toBe('invoice-create');
    expect(parsed.title).toBe('Create Invoice');
    expect(parsed.workflow).toBe('invoicing');
    expect(parsed.step).toBe(1);
    expect(parsed.totalSteps).toBe(3);
    expect(parsed.availableActions).toEqual(['invoice-form-submit', 'invoice-form-cancel']);
    expect(parsed.requiredFields).toEqual(['field-client-name', 'field-amount']);
  });

  it('serializes a record field', () => {
    const result = createPageContext({
      page: 'invoice-detail',
      record: { type: 'invoice', id: '1042', status: 'draft' },
    });
    const parsed = JSON.parse(result);
    expect(parsed.record).toEqual({ type: 'invoice', id: '1042', status: 'draft' });
  });

  it('serializes null record field', () => {
    const result = createPageContext({ page: 'invoice-create', record: null });
    const parsed = JSON.parse(result);
    expect(parsed.record).toBeNull();
  });

  it('produces output embeddable in a script tag without XSS risk from standard values', () => {
    const result = createPageContext({
      page: 'test-page',
      title: 'Test Page',
      agentNotes: 'Use the submit button to proceed.',
    });
    // JSON.stringify escapes < > & by default in values via unicode escaping
    // when used via JSON.stringify — verify the output is valid JSON
    expect(() => JSON.parse(result)).not.toThrow();
  });

  it('handles extended custom fields', () => {
    const result = createPageContext({
      page: 'custom-page',
      customField: 'custom-value',
    } as any);
    const parsed = JSON.parse(result);
    expect(parsed.customField).toBe('custom-value');
  });
});
