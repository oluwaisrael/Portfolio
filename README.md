# Derin Portfolio

A mobile-first portfolio for Adeoti Israel (Derin), focused on backend systems, data work, and applied AI.

## Local development

```bash
npm install
npm run dev
```

The local Vite server runs at `http://127.0.0.1:5176/` when started with the project command used in this workspace.

## Quality checks

```bash
npm run build
npm run lint
```

## Stack

- React, TypeScript, and Vite
- React Three Fiber and Three.js for the optional hero system blueprint
- Lucide for interface icons

The hero falls back to a static blueprint on browsers where WebGL is unavailable.

## System blueprint

The hero visual is intentionally tied to the portfolio rather than being a generic 3D effect:

- `PRICE / INGEST` represents data collection and Price Universe.
- `API LAYER` represents backend services and product infrastructure.
- `UNIRAG / RAG` represents semantic and lexical retrieval work.
- `WORKERS` represents asynchronous processing.
- `LAEL / UI` represents product interfaces and native software experiments.

The active scene uses subtle pointer response and moving signals. It pauses in hidden tabs, respects reduced-motion preferences, and is isolated behind an error boundary.
