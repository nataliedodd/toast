# Token Lab

## Goal

Understand how AI token usage works and learn how to provide useful
context efficiently without sacrificing quality.

## Questions I want to explore

- What is a token?
- How are tokens counted?
- What contributes to input vs output tokens?
- How much does context size affect usage?
- How much context does Toast send to an AI?
- Can Toast retrieve only the context needed for a task?
- What is the token cost of different context structures?
- When does summarising context improve efficiency?
- How does token usage translate into API cost?

## Experiments

Record practical experiments as Toast develops.

### Experiment 001 — Full file vs targeted retrieval

Compare:

1. Sending the complete `measurements.md`
2. Retrieving only the relevant fridge measurements

Measure:
- Input tokens
- Output tokens
- Total tokens
- Percentage reduction
- Whether answer quality changed

## Principle

Optimise for useful context, not simply the fewest tokens.