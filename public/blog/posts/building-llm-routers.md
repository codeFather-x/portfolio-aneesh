---
title: Building a Production LLM Router in Go
date: 2025-03-15
tags: [AI, Go, Infrastructure]
excerpt: How I built a routing layer that intelligently dispatches inference requests across multiple model providers based on cost, latency, and capability requirements.
---

# Building a Production LLM Router in Go

When you're running LLM-powered features at scale, a single model provider is a liability. Outages happen. Rate limits bite. Costs spiral. This post walks through how I built **NeuralRouter** — a high-throughput request router that dispatches inference traffic intelligently across providers.

## The core problem

At 2M+ daily requests, a naive setup fails in predictable ways:

- Provider outages cascade into user-facing downtime
- Cost-unaware routing burns budget on expensive models for cheap tasks
- No latency differentiation between real-time and batch workloads

## Architecture overview

The router sits between your application and your LLM providers. Every request carries a **capability profile** — a lightweight metadata object describing what the request needs.

```go
type CapabilityProfile struct {
    MaxLatencyMs   int      `json:"max_latency_ms"`
    MaxCostUSD     float64  `json:"max_cost_usd"`
    RequiredModels []string `json:"required_models,omitempty"`
    Priority       string   `json:"priority"` // "realtime" | "batch"
}
```

The router scores each available provider against the profile and picks the best match using a weighted decision function.

## Routing strategy

The decision function weighs three signals:

1. **Current p99 latency** — sampled every 30s via a lightweight health probe
2. **Estimated cost per token** — fetched from a pricing cache that refreshes hourly
3. **Error rate over the past 5 minutes** — tracked in a rolling window in Redis

```go
func score(provider Provider, profile CapabilityProfile) float64 {
    latencyScore := 1.0 - clamp(provider.P99Ms / float64(profile.MaxLatencyMs), 0, 1)
    costScore    := 1.0 - clamp(provider.CostPer1K / profile.MaxCostUSD, 0, 1)
    healthScore  := 1.0 - provider.ErrorRate5m
    return 0.4*latencyScore + 0.3*costScore + 0.3*healthScore
}
```

## Results

After 60 days in production:

| Metric | Before | After |
|--------|--------|-------|
| p99 latency | 820ms | 190ms |
| Monthly cost | $14,200 | $9,100 |
| Availability | 99.2% | 99.97% |

The cost reduction came almost entirely from routing batch workloads to cheaper models during off-peak hours.

## What's next

I'm working on a streaming-aware variant that can split a single streaming response across providers mid-flight. More on that soon.
