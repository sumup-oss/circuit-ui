---
name: circuit-ui
description: Use this skill when working with the Circuit UI design system. It provides generated inventories of design tokens and exported UI components from the source code, so you can answer usage and availability questions with current data.
license: Apache-2.0
---

# Circuit UI Design System

Use this skill for questions and implementation work related to Circuit UI tokens and components.

## Entrypoint

- Read `references/design-tokens.md` for the source-of-truth token inventory.
- Read `references/components.md` for the source-of-truth exported component inventory index.
- Open linked files in `references/components/` for component usage guidance copied from MDX stories/docs.

## Required Workflow

1. Determine whether the request is token-focused, component-focused, or both.
2. Use the generated references first.
3. If the request needs deeper implementation details, then inspect component/token source files.
4. Keep answers aligned with currently exported APIs, not internal modules.

## Notes

- Token inventory is generated from `packages/design-tokens/themes/schema.ts`.
- Component inventory is generated from `packages/circuit-ui/index.ts`.
- Component usage references are copied from `packages/circuit-ui/components/**/*.mdx`.
- Treat generated references as the primary interface docs for this skill.
