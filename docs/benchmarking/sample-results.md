# Sample Benchmark Results

Preliminary data from early testing of agent performance across UI configurations.

> **Important:** This data is preliminary. Sample sizes are small (n=10 per condition). Results should be treated as directional, not definitive. Broader replication is needed before drawing strong conclusions.

---

## Benchmark: Invoice Submission Task

**Task:** Navigate to the invoice creation page, fill in required fields, and submit the form. Verify the invoice appears in the invoice list.

**Agent:** Claude (Sonnet-class model)
**Date:** Early 2026
**Runs per condition:** 10

### Results

| Metric | Friendly | Regular | Hostile |
|---|---|---|---|
| Successful runs | 10 / 10 | 10 / 10 | 10 / 10 |
| Median duration | 99,994 ms | 114,796 ms | 467,442 ms |
| Median tokens | 21,230 | 23,014 | 27,522 |
| Median turns | 6.0 | 7.5 | 7.5 |
| Median retries | 2.0 | 2.0 | 2.0 |

### UI Condition Descriptions

**Friendly:** Form fields annotated with `data-agent-id`, `data-agent-action`, and `data-agent-state`. Page context metadata block present. Submit button has explicit agent attributes. Success state rendered in DOM after submission.

**Regular:** Standard production-quality form with semantic HTML and reasonable labels. No agent-specific attributes. Accessible but not explicitly agent-optimized.

**Hostile:** Form fields with dynamic IDs, icon-only submit button, success state communicated via auto-dismissing toast only, loading state encoded only in CSS class.

### Observations

- All three conditions achieved 100% task completion, which is consistent with the expectation that capable agents can eventually succeed on most reasonable UIs.
- The hostile condition took approximately **4.7× longer** than the friendly condition (467 seconds vs. 100 seconds median).
- The hostile condition consumed approximately **30% more tokens** than the friendly condition.
- Turn count was slightly higher in the regular and hostile conditions (7.5 vs. 6.0 median turns).
- Retry count was consistent across conditions (2.0 median), suggesting retries occurred in all conditions but were resolved more quickly in the friendly condition.

### Interpretation

Early evidence suggests that interface structure can materially affect agent execution time and token usage, even when the agent ultimately succeeds in all conditions. The hostile UI appears to increase duration primarily through extended recovery loops and re-observation cycles, not through outright failure.

The difference between friendly and regular conditions is meaningful but smaller than the difference between regular and hostile, suggesting that the largest gains come from eliminating active impediments rather than adding agent-specific attributes.

**Limitations:**
- n=10 is a small sample; run-to-run variance is present
- Results are from a single task type; generalization to other workflows requires further testing
- The specific model and version used affects baseline performance; results may differ with other models
- The hostile condition was constructed deliberately and may not be representative of typical production UIs

---

## Contributing Benchmark Data

If you have run benchmarks on real or representative UIs and are willing to share the results, please open a pull request adding a new section to this file following the template in [metrics.md](metrics.md).

Results from diverse tasks, UI types, and agent configurations are particularly valuable.
