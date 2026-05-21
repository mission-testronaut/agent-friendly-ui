# Contributing to Agent-Friendly UI

Thank you for your interest in contributing. This is an early-stage, community-driven style guide. Contributions of all sizes are welcome.

## Before You Start

- Check existing [issues](../../issues) and [pull requests](../../pulls) to avoid duplicate work.
- For significant changes (new sections, spec additions, structural refactors), open an issue first to discuss the approach.
- For typo fixes, broken links, or small clarifications, a pull request is fine without prior discussion.

## What We're Looking For

**High-value contributions:**
- Real-world examples of agent-hostile patterns and their agent-friendly equivalents
- Benchmark data from agent runs against real or representative UIs
- Refinements to the attribute spec based on practical implementation experience
- Framework-specific implementation guides (React, Vue, Svelte, etc.)
- Translations

**Less useful right now:**
- Theoretical arguments without grounding in practical experience
- Frameworks or tooling that add significant complexity to a simple problem
- Opinionated style choices that don't have a clear agent-legibility rationale

## Tone and Style

This guide aims to be:

- **Practical** — every recommendation should have a concrete rationale
- **Engineering-focused** — speak to developers building real products
- **Honest about uncertainty** — use "early evidence suggests" rather than "proves"; this is an emerging practice
- **Accessible to newcomers** — avoid jargon where plain language works

Avoid:
- Hype language ("revolutionary", "game-changing")
- Overclaiming causal relationships from limited data
- Recommendations that are hard to adopt incrementally

## Submitting a Pull Request

1. Fork the repository and create a branch from `main`.
2. Make your changes.
3. If you're adding a new pattern or anti-pattern, follow the structure of existing docs in `docs/patterns/` or `docs/anti-patterns/`.
4. If you're modifying the utility package, run `npm test` in `packages/agent-friendly-ui-utils/` and make sure tests pass.
5. Write a clear PR description explaining what you changed and why.
6. Submit the pull request against `main`.

## Document Structure

When adding a new pattern doc, use this structure:

```markdown
# Pattern Name

Brief description of the pattern (1-2 sentences).

## The Problem

What agent behavior or failure mode does this pattern address?

## Recommended Approach

Concrete guidance with code examples.

## Why This Helps Agents

Explanation of the mechanism — what the agent can infer that it couldn't before.

## Accessibility Overlap

How this pattern relates to accessibility best practices (most patterns have one).

## Caveats

Any cases where this pattern doesn't apply or has tradeoffs.
```

## Code of Conduct

All contributors are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
