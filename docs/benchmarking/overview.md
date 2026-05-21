# Benchmarking Overview

Measuring the effect of UI design on agent performance.

## Purpose

Agent-friendly UI design is useful only if it measurably improves agent outcomes. This benchmarking framework provides a structured approach to measuring that effect, so teams can make data-driven decisions about where to invest in UI improvements.

## What We're Measuring

The core question is: **does the structure of a UI interface affect how efficiently an autonomous agent can complete a task on it?**

Early evidence suggests the answer is yes. The benchmark framework captures the dimensions along which this effect manifests: execution time, token consumption, turn count, and reliability.

## Benchmark Structure

A valid benchmark requires at minimum:

1. **A defined task** — a specific workflow the agent must complete (e.g., "fill out and submit the invoice creation form")
2. **A target UI** — the interface under test
3. **An agent configuration** — model, system prompt, tools available
4. **Multiple runs** — to account for run-to-run variation (minimum n=10 recommended)
5. **Consistent measurement** — same metrics captured in the same way across runs

## UI Condition Types

When comparing UI configurations, use these categories to describe what you're testing:

| Condition | Description |
|---|---|
| **Friendly** | UI with full agent-friendly attributes: `data-agent-id`, `data-agent-state`, `data-agent-action`, page context metadata |
| **Regular** | Standard production UI without agent-specific attributes but with reasonable accessibility and semantic structure |
| **Hostile** | UI with patterns known to impede agents: no semantic structure, dynamic IDs, hover-only controls, visual-only status |

Not every benchmark needs all three conditions. A before/after comparison of a single UI change (e.g., adding `data-agent-id` to key elements) is also valuable.

## Methodology Notes

- Run each condition with the same agent, task, and environment
- Use the same agent model across conditions — different models may have different baseline capabilities
- Randomize or interleave run order to reduce session-order effects
- Capture raw run data; derive medians and other statistics from it
- Document failures separately from retries — a task that completes after 5 retries is a different result from one that fails completely

## Reporting Results

When sharing benchmark results publicly:

- Report sample size (n)
- Report median, not mean, for duration and token metrics (more robust to outliers)
- Note the task and UI type clearly
- Avoid causal language unless you have controlled for confounds
- Use "early evidence suggests" rather than "proves" until results are replicated

See [metrics.md](metrics.md) for the full list of recommended metrics and how to capture them.

See [sample-results.md](sample-results.md) for example data from early testing.
