import { detectAgentMode } from '../src/detectAgentMode';

describe('detectAgentMode', () => {
  it('returns true for a full URL with ?agentMode=true', () => {
    expect(detectAgentMode('https://example.com/page?agentMode=true')).toBe(true);
  });

  it('returns true for URLSearchParams with agentMode=true', () => {
    const params = new URLSearchParams('agentMode=true');
    expect(detectAgentMode(params)).toBe(true);
  });

  it('returns false for a URL without agentMode param', () => {
    expect(detectAgentMode('https://example.com/page')).toBe(false);
  });

  it('returns false for a URL with agentMode=false', () => {
    expect(detectAgentMode('https://example.com/page?agentMode=false')).toBe(false);
  });

  it('returns false for a URL with agentMode=1 (not exact match)', () => {
    expect(detectAgentMode('https://example.com/page?agentMode=1')).toBe(false);
  });

  it('returns false for URLSearchParams without agentMode', () => {
    const params = new URLSearchParams('foo=bar');
    expect(detectAgentMode(params)).toBe(false);
  });

  it('returns false when called with no arguments and no window', () => {
    // In Node.js test environment, window is undefined
    expect(detectAgentMode()).toBe(false);
  });

  it('returns true when agentMode=true is among multiple params', () => {
    expect(detectAgentMode('https://example.com/?foo=bar&agentMode=true&baz=1')).toBe(true);
  });

  it('handles a raw query string input gracefully', () => {
    // Input that is not a valid URL is treated as a query string
    const params = new URLSearchParams('agentMode=true&debug=1');
    expect(detectAgentMode(params)).toBe(true);
  });
});
