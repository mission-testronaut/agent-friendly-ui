# Benchmark Metrics

Recommended metrics for measuring agent performance on UI tasks.

## Core Metrics

These metrics should be captured in every benchmark run.

### Success Rate

**Definition:** Percentage of runs where the agent completed the task correctly.

**How to capture:** Define a clear success condition before running the benchmark (e.g., "the target record exists in the database after the run"). Record pass/fail per run.

**Why it matters:** Success rate is the baseline. Efficiency metrics are meaningless if the agent cannot reliably complete the task.

**Reporting:** Report as fraction and percentage: `10/10 (100%)`, `8/10 (80%)`.

---

### Duration

**Definition:** Wall-clock time from task start to task completion (or failure), in milliseconds.

**How to capture:** Record timestamps at task start and end using your agent harness or test framework.

**Why it matters:** Task duration directly affects user experience in human-in-the-loop workflows and cost in fully automated pipelines.

**Reporting:** Report median across runs. Report individual run data if n is small (< 30).

---

### Token Usage

**Definition:** Total tokens consumed by the agent across the entire task run (input + output, or as reported by the model API).

**How to capture:** Sum token counts from all API calls made during the run.

**Why it matters:** Token usage is directly proportional to cost. It also correlates with the amount of inference the agent needed to do — more tokens often indicate more uncertainty.

**Reporting:** Report median input tokens, output tokens, and total tokens separately where available.

---

### Turn Count

**Definition:** Number of agent-model exchanges (turns) required to complete the task.

**How to capture:** Count the number of times the agent called the model API during a single run.

**Why it matters:** Turn count reflects how much back-and-forth the agent needed. High turn counts suggest the agent was uncertain, encountered unexpected states, or needed to re-plan.

**Reporting:** Report median turns across runs.

---

### Retry Count

**Definition:** Number of times the agent had to retry a specific action within the task.

**How to capture:** Instrument your agent harness to count re-attempts of the same action step. Define "retry" consistently (e.g., clicking the same button after a failed attempt counts as 1 retry).

**Why it matters:** Retries indicate the agent encountered friction — a failed interaction, an unexpected state, or an ambiguous result. Reducing retries reduces duration and token usage.

**Reporting:** Report median retries across runs.

---

## Extended Metrics

Capture these when you need more granular analysis.

### Failure Causes

**Definition:** Categorized reasons for task failure or retry.

**Categories to consider:**

| Category | Description |
|---|---|
| `element-not-found` | Agent could not locate a required element |
| `ambiguous-action` | Multiple candidate elements; agent chose wrong one |
| `state-inference-error` | Agent misread or missed a state change |
| `navigation-error` | Agent navigated to wrong page or lost context |
| `timeout` | Operation did not complete within expected time |
| `unexpected-state` | Page was in an unexpected state (e.g., modal appeared) |
| `server-error` | The application returned an error response |

**How to capture:** Review agent logs or transcripts after each run. Assign categories manually or use structured logging in your harness.

---

### Time to First Interaction

**Definition:** Time from task start to the first DOM interaction (first click, first keystroke).

**Why it matters:** This captures the agent's initial page orientation time — how long it takes to understand the page before acting.

---

### Action Precision

**Definition:** Ratio of correct actions to total actions taken.

**How to capture:** Define the optimal action sequence for the task. Count deviations.

**Why it matters:** An agent that takes many unnecessary or incorrect actions before finding the right one has low precision, even if it ultimately succeeds.

---

## Benchmark Reporting Template

```markdown
## Benchmark: [Task Name]

**Task:** [Description of the task]
**Agent:** [Model name and version]
**UI condition:** [Friendly / Regular / Hostile]
**Runs:** [n]
**Date:** [YYYY-MM]

| Metric | Value |
|---|---|
| Success rate | X / n (Y%) |
| Median duration | X ms |
| Median input tokens | X |
| Median output tokens | X |
| Median total tokens | X |
| Median turns | X |
| Median retries | X |

**Failure causes (if any):**
- [category]: [count] — [brief description]

**Notes:**
[Any observations about run conditions, outliers, or caveats]
```
