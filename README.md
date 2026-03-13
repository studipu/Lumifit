# Lumifit

Lumifit is a multi-app monorepo for a B2B fashion fit comparison product. This repository is intended to be the team collaboration baseline for product planning artifacts and implementation code.

## Repository Scope

This repository tracks:

- implementation code under `apps/*` and `packages/*`
- root workspace configuration
- planning artifacts under `_bmad-output/planning-artifacts`

This repository does not track local AI tool runtime data or BMAD framework internals:

- `.agents/`
- `.claude/`
- `.cursor/`
- `.gemini/`
- `.omc/`
- `_bmad/`

## Workspace Layout

- `apps/web-user`: shopper-facing storefront app
- `apps/web-admin`: brand admin console
- `apps/api`: backend API service
- `apps/worker`: async generation worker
- `packages/shared-types`: shared domain contracts
- `_bmad-output/planning-artifacts`: PRD, architecture, and planning documents

## Collaboration Baseline

1. Keep product decisions synchronized with `_bmad-output/planning-artifacts`.
2. Treat `apps/*` and `packages/*` as the source of truth for implementation.
3. Do not commit local AI assistant state or generated command wrappers unless the team explicitly decides to version them.

## Getting Started

1. Run `pnpm install`.
2. Start scaffolding the real app internals for Next.js, NestJS, and the worker.
3. Add local infrastructure for database, Redis, storage, and environment variables.
