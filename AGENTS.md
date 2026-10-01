# AGENTS.md

## Project

**movienet** — a movie-related web app built with Vite + React 19 + TypeScript. Currently in early scaffold stage (default Vite template). MUI 9, Emotion, Axios, and React Router 7 are pre-installed as dependencies but not yet wired up.

## Commands

```bash
npm run dev       # start dev server
npm run build     # tsc -b && vite build (type-check + production build)
npm run lint      # oxlint
npm run preview   # preview production build
```

There is **no test framework** configured. `npm run test` will fail.

## Toolchain quirks

- **Linter is Oxlint**, not ESLint. Config in `.oxlintrc.json`. Type-aware rules are not enabled.
- **Build uses `tsc -b`** (TypeScript project references / build mode). The root `tsconfig.json` references `tsconfig.app.json` (src) and `tsconfig.node.json` (vite.config.ts). Both must pass for the build to succeed.
- **React Compiler is NOT enabled.** Don't rely on automatic memoization.

## TypeScript strictness

`tsconfig.app.json` enables these non-default options — code must comply:

- `verbatimModuleSyntax: true` — type-only imports **must** use `import type { ... }`
- `erasableSyntaxOnly: true` — no enums, no parameter properties, no namespaces
- `noUnusedLocals` / `noUnusedParameters` — no unused variables or parameters
- `noFallthroughCasesInSwitch` — every `case` must `break`/`return`

## Dependencies available but unused

The following are in `package.json` and ready to import — use them rather than adding new libraries:

- `@mui/material` + `@mui/icons-material` + `@emotion/react` + `@emotion/styled` — UI component library
- `axios` — HTTP client
- `react-router-dom` — routing
