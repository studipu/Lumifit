# Collaboration Guide

## What Belongs In This Repository

- product code
- shared packages
- planning artifacts that drive implementation
- documentation needed by the team

## What Stays Local

- local AI assistant session state
- BMAD framework installation internals
- editor-specific command wrappers

## Recommended First GitHub Setup

1. Initialize Git in the repository root.
2. Create the first commit with the monorepo scaffold and planning artifacts.
3. Push to GitHub as the main collaboration repository.
4. Protect the default branch once the team starts opening pull requests.

## Suggested Branch Model

- `main`: stable integration branch
- `feat/*`: feature work
- `fix/*`: bug fixes
- `docs/*`: documentation-only changes

## Suggested First Milestones

1. Replace placeholder frontend pages with real flows from the PRD.
2. Define the initial API modules and database schema.
3. Add local development infrastructure and environment templates.
