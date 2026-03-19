---
name: circuit-ui
description: Use this skill when working with the Circuit UI design system. It provides generated inventories of design tokens plus exported Circuit UI components and hooks from the source code, so you can answer usage and availability questions with current data.
license: Apache-2.0
---

# Circuit UI Design System

Use this skill for questions and implementation work related to Circuit UI tokens, components, and hooks.

## Entrypoint

- Read `references/design-tokens.md` for the source-of-truth token inventory.
- Read `references/components.md` for the source-of-truth exported API inventory index for available components.
- Read `references/hooks.md` for the source-of-truth exported API inventory index for available hooks.
- Open linked files in `references/components/` and `references/hooks/` for usage guidance copied from MDX stories/docs.

## Required Workflow

1. Determine whether the request is token-focused, component-focused, hook-focused, or a mix.
2. Use the generated references first.
3. If the request needs deeper implementation details, then inspect component, hook, or token source files.
4. Keep answers aligned with currently exported APIs, not internal modules.

## Notes

- Token inventory is generated from `packages/design-tokens/themes/schema.ts`.
- API inventory is generated from `packages/circuit-ui/index.ts`.
- Component and hook usage references are copied from `packages/circuit-ui/components/**/*.mdx` and `packages/circuit-ui/hooks/**/*.mdx`.
- Treat generated references as the primary interface docs for this skill.
