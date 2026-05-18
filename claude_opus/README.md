# Qlib Workshop

A single-page workshop website covering Microsoft's [Qlib](https://github.com/microsoft/qlib) — from quant fundamentals to live trading strategies.

## Run locally

```bash
cd claude_opus
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Sections

1. **Introduction** — Architecture overview, framework layers
2. **Quant Primer** — Core concepts: alpha, factors, labels, IC, cross-sectional thinking, backtest metrics, pitfalls
3. **Installation** — pip, source, Docker
4. **Data Layer** — `D.features()`, Alpha158, expression engine
5. **ML Pipeline** — `DatasetH`, processors, YAML config
6. **Models** — LightGBM, LSTM, Transformer, TRA, HIST, TabNet
7. **Backtesting** — `TopkDropoutStrategy`, transaction costs, IC/ICIR
8. **Full Workflow** — MLflow recorder, `qrun`
9. **Online Serving** — Rolling training, `OnlineManager`
10. **Tips & Gotchas** — Common pitfalls

## Stack

- Plain HTML/CSS/JS — no build step
- [highlight.js](https://highlightjs.org/) for syntax highlighting (CDN)
- Dark theme, responsive layout

Built with Claude Opus 4.7.
