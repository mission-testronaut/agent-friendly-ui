const AGENT_MODE_PARAM = 'agentMode';
const AGENT_MODE_VALUE = 'true';

/**
 * Detects whether agent mode is active based on a URL query parameter.
 *
 * Accepts a URL string, URLSearchParams, or the current window.location.search
 * (in browser environments). Returns true if ?agentMode=true is present.
 *
 * @example
 * detectAgentMode('https://example.com/page?agentMode=true') // true
 * detectAgentMode('https://example.com/page') // false
 * detectAgentMode(new URLSearchParams('agentMode=true')) // true
 */
export function detectAgentMode(input?: string | URLSearchParams): boolean {
  let params: URLSearchParams;

  if (input === undefined) {
    if (typeof window !== 'undefined' && window.location) {
      params = new URLSearchParams(window.location.search);
    } else {
      return false;
    }
  } else if (typeof input === 'string') {
    try {
      const url = new URL(input);
      params = url.searchParams;
    } catch {
      // Treat as raw query string if URL parsing fails
      params = new URLSearchParams(input);
    }
  } else {
    params = input;
  }

  return params.get(AGENT_MODE_PARAM) === AGENT_MODE_VALUE;
}
