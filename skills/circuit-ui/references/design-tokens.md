# Circuit UI Design Tokens

Generated from `packages/design-tokens/themes/schema.ts`.
Values resolved from `themes/light.ts`, `themes/dark.ts`, and `themes/shared.ts`.

- Total tokens: **204**
- Tokens without full light/dark values: **0**

## Token Types

| Type | Count |
| --- | ---: |
| `color` | 135 |
| `dimension` | 53 |
| `duration` | 2 |
| `fontFamily` | 2 |
| `fontWeight` | 3 |
| `number` | 9 |

## Token Inventory

| Token | Type | Deprecated | Replacement | Light Value | Dark Value |
| --- | --- | --- | --- | --- | --- |
| `--cui-bg-normal` | `color` | no |  | `#ffffff` | `#171d24` |
| `--cui-bg-normal-hovered` | `color` | no |  | `#e9edf2` | `#212831` |
| `--cui-bg-normal-pressed` | `color` | no |  | `#bfc6cf` | `#28313c` |
| `--cui-bg-normal-disabled` | `color` | no |  | `rgba(255, 255, 255, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-subtle` | `color` | no |  | `#f0f1f5` | `#0c0f12` |
| `--cui-bg-subtle-hovered` | `color` | no |  | `#e0e2ea` | `#212b31` |
| `--cui-bg-subtle-pressed` | `color` | no |  | `#9da7b1` | `#36434a` |
| `--cui-bg-subtle-disabled` | `color` | no |  | `rgba(227, 231, 235, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-highlight` | `color` | no |  | `#e3e7eb` | `#363c41` |
| `--cui-bg-highlight-hovered` | `color` | no |  | `#c2c9d1` | `#3d4249` |
| `--cui-bg-highlight-pressed` | `color` | no |  | `#9da7b1` | `#424950` |
| `--cui-bg-highlight-disabled` | `color` | no |  | `rgba(15, 19, 26, 0.0800)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-strong` | `color` | no |  | `#000000` | `#ffffff` |
| `--cui-bg-strong-hovered` | `color` | no |  | `#313941` | `#f6f8f9` |
| `--cui-bg-strong-pressed` | `color` | no |  | `#4f5a65` | `#e3e7eb` |
| `--cui-bg-strong-disabled` | `color` | no |  | `rgba(23, 29, 36, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-accent` | `color` | no |  | `#eef0f2` | `#0c0f12` |
| `--cui-bg-accent-hovered` | `color` | no |  | `#e3e7eb` | `#20292e` |
| `--cui-bg-accent-pressed` | `color` | no |  | `#c2c9d1` | `#313d43` |
| `--cui-bg-accent-disabled` | `color` | no |  | `rgba(238, 240, 242, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-accent-strong` | `color` | no |  | `#0f131a` | `#e1e7ef` |
| `--cui-bg-accent-strong-hovered` | `color` | no |  | `#3b3f46` | `#ffffff` |
| `--cui-bg-accent-strong-pressed` | `color` | no |  | `#6a737c` | `#ffffff` |
| `--cui-bg-accent-strong-disabled` | `color` | no |  | `rgba(15, 19, 26, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-success` | `color` | no |  | `#e9fbe9` | `rgba(12, 211, 104, 0.2000)` |
| `--cui-bg-success-hovered` | `color` | no |  | `#d7f8d7` | `rgba(12, 211, 104, 0.2500)` |
| `--cui-bg-success-pressed` | `color` | no |  | `#c1e8c1` | `rgba(12, 211, 104, 0.3000)` |
| `--cui-bg-success-disabled` | `color` | no |  | `rgba(233, 251, 233, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-success-strong` | `color` | no |  | `#018850` | `#0cd368` |
| `--cui-bg-success-strong-hovered` | `color` | no |  | `#007a4e` | `#13e072` |
| `--cui-bg-success-strong-pressed` | `color` | no |  | `#016c26` | `#25e980` |
| `--cui-bg-success-strong-disabled` | `color` | no |  | `rgba(1, 136, 80, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-warning` | `color` | no |  | `#fdf4db` | `rgba(245, 158, 28, 0.2000)` |
| `--cui-bg-warning-hovered` | `color` | no |  | `#faeec6` | `rgba(245, 158, 28, 0.2500)` |
| `--cui-bg-warning-pressed` | `color` | no |  | `#f5dea3` | `rgba(245, 158, 28, 0.3000)` |
| `--cui-bg-warning-disabled` | `color` | no |  | `rgba(253, 244, 219, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-warning-strong` | `color` | no |  | `#e87c00` | `#f5b81c` |
| `--cui-bg-warning-strong-hovered` | `color` | no |  | `#cc6d00` | `#f7c440` |
| `--cui-bg-warning-strong-pressed` | `color` | no |  | `#b25c00` | `#f7cb59` |
| `--cui-bg-warning-strong-disabled` | `color` | no |  | `rgba(232, 124, 0, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-danger` | `color` | no |  | `#fbe9e7` | `rgba(255, 76, 53, 0.2000)` |
| `--cui-bg-danger-hovered` | `color` | no |  | `#fcddd9` | `rgba(255, 76, 53, 0.2000)` |
| `--cui-bg-danger-pressed` | `color` | no |  | `#f2bbb5` | `rgba(255, 76, 53, 0.4000)` |
| `--cui-bg-danger-disabled` | `color` | no |  | `rgba(251, 233, 231, 0.6400)` | `rgba(255, 69, 60, 0.1300)` |
| `--cui-bg-danger-strong` | `color` | no |  | `#de331d` | `#ff4e37` |
| `--cui-bg-danger-strong-hovered` | `color` | no |  | `#bd2c19` | `#ff6259` |
| `--cui-bg-danger-strong-pressed` | `color` | no |  | `#9e2415` | `#ff827b` |
| `--cui-bg-danger-strong-disabled` | `color` | no |  | `rgba(222, 51, 29, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-promo` | `color` | no |  | `#f5edfe` | `rgba(195, 83, 247, 0.2000)` |
| `--cui-bg-promo-hovered` | `color` | no |  | `#ede0fc` | `rgba(195, 83, 247, 0.2500)` |
| `--cui-bg-promo-pressed` | `color` | no |  | `#e0c9f8` | `rgba(195, 83, 247, 0.3000)` |
| `--cui-bg-promo-disabled` | `color` | no |  | `rgba(245, 237, 254, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-bg-promo-strong` | `color` | no |  | `#9e33e0` | `#c353f7` |
| `--cui-bg-promo-strong-hovered` | `color` | no |  | `#8a1ecc` | `#c768f3` |
| `--cui-bg-promo-strong-pressed` | `color` | no |  | `#7219a9` | `#ce72f8` |
| `--cui-bg-promo-strong-disabled` | `color` | no |  | `rgba(158, 51, 224, 0.4000)` | `rgba(216, 232, 248, 0.0800)` |
| `--cui-fg-normal` | `color` | no |  | `#0f131a` | `#ffffff` |
| `--cui-fg-normal-hovered` | `color` | no |  | `#0f131a` | `rgba(255, 255, 255, 0.8000)` |
| `--cui-fg-normal-pressed` | `color` | no |  | `#0f131a` | `#e3e7eb` |
| `--cui-fg-normal-disabled` | `color` | no |  | `rgba(15, 19, 26, 0.4000)` | `rgba(230, 224, 233, 0.2000)` |
| `--cui-fg-subtle` | `color` | no |  | `#6a737c` | `rgba(223, 232, 241, 0.6000)` |
| `--cui-fg-subtle-hovered` | `color` | no |  | `#6a737c` | `rgba(223, 232, 241, 0.7000)` |
| `--cui-fg-subtle-pressed` | `color` | no |  | `#6a737c` | `rgba(223, 232, 241, 0.8000)` |
| `--cui-fg-subtle-disabled` | `color` | no |  | `rgba(106, 115, 124, 0.4000)` | `rgba(216, 232, 248, 0.2000)` |
| `--cui-fg-placeholder` | `color` | no |  | `#929396` | `#555D62` |
| `--cui-fg-placeholder-hovered` | `color` | no |  | `#787A7C` | `#687278` |
| `--cui-fg-placeholder-pressed` | `color` | no |  | `#484A51` | `#7C878D` |
| `--cui-fg-placeholder-disabled` | `color` | no |  | `rgba(146, 147, 150, 0.4000)` | `rgba(85, 93, 98, 0.500)` |
| `--cui-fg-on-strong` | `color` | no |  | `#ffffff` | `#0f131a` |
| `--cui-fg-on-strong-hovered` | `color` | no |  | `#ffffff` | `#0f131a` |
| `--cui-fg-on-strong-pressed` | `color` | no |  | `#ffffff` | `#0f131a` |
| `--cui-fg-on-strong-disabled` | `color` | no |  | `rgba(255, 255, 255, 0.4000)` | `rgba(216, 232, 248, 0.3000)` |
| `--cui-fg-on-strong-subtle` | `color` | no |  | `rgba(255, 255, 255, 0.7000)` | `rgba(15, 19, 26, 0.7000)` |
| `--cui-fg-on-strong-subtle-hovered` | `color` | no |  | `rgba(255, 255, 255, 0.7000)` | `rgba(15, 19, 26, 0.7000)` |
| `--cui-fg-on-strong-subtle-pressed` | `color` | no |  | `rgba(255, 255, 255, 0.7000)` | `rgba(15, 19, 26, 0.7000)` |
| `--cui-fg-on-strong-subtle-disabled` | `color` | no |  | `rgba(255, 255, 255, 0.3000)` | `rgba(216, 232, 248, 0.2000)` |
| `--cui-fg-accent` | `color` | no |  | `#0f131a` | `#e1e7ef` |
| `--cui-fg-accent-hovered` | `color` | no |  | `#52565d` | `#ffffff` |
| `--cui-fg-accent-pressed` | `color` | no |  | `#676e7a` | `#ffffff` |
| `--cui-fg-accent-disabled` | `color` | no |  | `rgba(15, 19, 26, 0.4000)` | `rgba(216, 232, 248, 0.3000)` |
| `--cui-fg-success` | `color` | no |  | `#018850` | `#17db72` |
| `--cui-fg-success-hovered` | `color` | no |  | `#007a4e` | `#13e072` |
| `--cui-fg-success-pressed` | `color` | no |  | `#016c26` | `#25e980` |
| `--cui-fg-success-disabled` | `color` | no |  | `rgba(1, 136, 80, 0.4000)` | `rgba(216, 232, 248, 0.3000)` |
| `--cui-fg-warning` | `color` | no |  | `#e27900` | `#f5b81c` |
| `--cui-fg-warning-hovered` | `color` | no |  | `#cc6d00` | `#f7c440` |
| `--cui-fg-warning-pressed` | `color` | no |  | `#b25c00` | `#f7cb59` |
| `--cui-fg-warning-disabled` | `color` | no |  | `rgba(226, 121, 0, 0.4000)` | `rgba(216, 232, 248, 0.3000)` |
| `--cui-fg-danger` | `color` | no |  | `#de331d` | `#ff634e` |
| `--cui-fg-danger-hovered` | `color` | no |  | `#bd2c19` | `#ff5c47` |
| `--cui-fg-danger-pressed` | `color` | no |  | `#9e2415` | `#ff6a57` |
| `--cui-fg-danger-disabled` | `color` | no |  | `rgba(222, 51, 29, 0.6400)` | `rgba(255, 178, 167, 0.7000)` |
| `--cui-fg-promo` | `color` | no |  | `#9e33e0` | `#cf7bf6` |
| `--cui-fg-promo-hovered` | `color` | no |  | `#8a1ecc` | `#c768f3` |
| `--cui-fg-promo-pressed` | `color` | no |  | `#7219a9` | `#ce72f8` |
| `--cui-fg-promo-disabled` | `color` | no |  | `rgba(158, 51, 224, 0.4000)` | `rgba(216, 232, 248, 0.3000)` |
| `--cui-border-normal` | `color` | no |  | `#aeb6be` | `rgba(223, 232, 241, 0.3000)` |
| `--cui-border-normal-hovered` | `color` | no |  | `#85919e` | `rgba(223, 232, 241, 0.3500)` |
| `--cui-border-normal-pressed` | `color` | no |  | `#687686` | `rgba(223, 232, 241, 0.4500)` |
| `--cui-border-normal-disabled` | `color` | no |  | `rgba(194, 201, 209, 0.4000)` | `rgba(216, 232, 248, 0.3000)` |
| `--cui-border-subtle` | `color` | no |  | `#e3e7ec` | `rgba(223, 232, 241, 0.1500)` |
| `--cui-border-subtle-hovered` | `color` | no |  | `#c2c9d1` | `rgba(223, 232, 241, 0.2000)` |
| `--cui-border-subtle-pressed` | `color` | no |  | `#9da7b1` | `rgba(223, 232, 241, 0.3000)` |
| `--cui-border-subtle-disabled` | `color` | no |  | `rgba(230, 230, 230, 0.4000)` | `rgba(216, 232, 248, 0.1000)` |
| `--cui-border-divider` | `color` | no |  | `#e3e7eb` | `rgba(216, 232, 248, 0.3000)` |
| `--cui-border-divider-hovered` | `color` | no |  | `#9da7b1` | `rgba(223, 232, 241, 0.3500)` |
| `--cui-border-divider-pressed` | `color` | no |  | `#6a737c` | `rgba(223, 232, 241, 0.4500)` |
| `--cui-border-divider-disabled` | `color` | no |  | `rgba(194, 201, 209, 0.4000)` | `rgba(216, 232, 248, 0.1500)` |
| `--cui-border-strong` | `color` | no |  | `#0f131a` | `#ffffff` |
| `--cui-border-strong-hovered` | `color` | no |  | `#494a4a` | `#f6f8f9` |
| `--cui-border-strong-pressed` | `color` | no |  | `#696969` | `#e3e7eb` |
| `--cui-border-strong-disabled` | `color` | no |  | `rgba(15, 19, 26, 0.4000)` | `rgba(216, 232, 248, 0.1500)` |
| `--cui-border-accent` | `color` | no |  | `#0f131a` | `#ffffff` |
| `--cui-border-accent-hovered` | `color` | no |  | `#52565d` | `#f6f8f9` |
| `--cui-border-accent-pressed` | `color` | no |  | `#676e7a` | `#e3e7eb` |
| `--cui-border-accent-disabled` | `color` | no |  | `rgba(15, 19, 26, 0.4000)` | `rgba(216, 232, 248, 0.1500)` |
| `--cui-border-success` | `color` | no |  | `#018850` | `#0cd368` |
| `--cui-border-success-hovered` | `color` | no |  | `#007a4e` | `#13e072` |
| `--cui-border-success-pressed` | `color` | no |  | `#016c26` | `#25e980` |
| `--cui-border-success-disabled` | `color` | no |  | `rgba(1, 136, 80, 0.4000)` | `rgba(216, 232, 248, 0.1500)` |
| `--cui-border-warning` | `color` | no |  | `#e87c00` | `#f5b81c` |
| `--cui-border-warning-hovered` | `color` | no |  | `#cc6d00` | `#f7c440` |
| `--cui-border-warning-pressed` | `color` | no |  | `#b25c00` | `#f7cb59` |
| `--cui-border-warning-disabled` | `color` | no |  | `rgba(226, 121, 0, 0.4000)` | `rgba(216, 232, 248, 0.1500)` |
| `--cui-border-danger` | `color` | no |  | `#de331d` | `#ff634e` |
| `--cui-border-danger-hovered` | `color` | no |  | `#bd2c19` | `#ff5c47` |
| `--cui-border-danger-pressed` | `color` | no |  | `#9e2415` | `#ff6a57` |
| `--cui-border-danger-disabled` | `color` | no |  | `rgba(222, 51, 29, 0.4000)` | `rgba(255, 178, 167, 0.7000)` |
| `--cui-border-promo` | `color` | no |  | `#9e33e0` | `#c353f7` |
| `--cui-border-promo-hovered` | `color` | no |  | `#8a1ecc` | `#c768f3` |
| `--cui-border-promo-pressed` | `color` | no |  | `#7219a9` | `#ce72f8` |
| `--cui-border-promo-disabled` | `color` | no |  | `rgba(158, 51, 224, 0.4000)` | `rgba(216, 232, 248, 0.1500)` |
| `--cui-bg-overlay` | `color` | no |  | `rgba(0, 0, 0, 0.4000)` | `rgba(0, 0, 0, 0.7000)` |
| `--cui-bg-elevated` | `color` | no |  | `#ffffff` | `#2f3438` |
| `--cui-border-focus` | `color` | no |  | `#0f131a` | `#ffffff` |
| `--cui-border-radius-bit` | `dimension` | no |  | `4px` | `4px` |
| `--cui-border-radius-byte` | `dimension` | no |  | `8px` | `8px` |
| `--cui-border-radius-kilo` | `dimension` | no |  | `12px` | `12px` |
| `--cui-border-radius-mega` | `dimension` | no |  | `16px` | `16px` |
| `--cui-border-radius-circle` | `dimension` | no |  | `100%` | `100%` |
| `--cui-border-radius-pill` | `dimension` | no |  | `999999px` | `999999px` |
| `--cui-border-width-kilo` | `dimension` | no |  | `1px` | `1px` |
| `--cui-border-width-mega` | `dimension` | no |  | `2px` | `2px` |
| `--cui-font-stack-default` | `fontFamily` | no |  | `"Inter", "Inter-Fallback", Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` | `"Inter", "Inter-Fallback", Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` |
| `--cui-font-stack-mono` | `fontFamily` | no |  | `Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace` | `Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace` |
| `--cui-font-weight-regular` | `fontWeight` | no |  | `375` | `375` |
| `--cui-font-weight-semibold` | `fontWeight` | no |  | `560` | `560` |
| `--cui-font-weight-bold` | `fontWeight` | no |  | `630` | `630` |
| `--cui-icon-sizes-kilo` | `dimension` | no |  | `16px` | `16px` |
| `--cui-icon-sizes-mega` | `dimension` | no |  | `24px` | `24px` |
| `--cui-icon-sizes-giga` | `dimension` | no |  | `32px` | `32px` |
| `--cui-icon-sizes-tera` | `dimension` | no |  | `48px` | `48px` |
| `--cui-spacings-bit` | `dimension` | no |  | `4px` | `4px` |
| `--cui-spacings-byte` | `dimension` | no |  | `8px` | `8px` |
| `--cui-spacings-kilo` | `dimension` | no |  | `12px` | `12px` |
| `--cui-spacings-mega` | `dimension` | no |  | `16px` | `16px` |
| `--cui-spacings-giga` | `dimension` | no |  | `24px` | `24px` |
| `--cui-spacings-tera` | `dimension` | no |  | `32px` | `32px` |
| `--cui-spacings-peta` | `dimension` | no |  | `40px` | `40px` |
| `--cui-spacings-exa` | `dimension` | no |  | `48px` | `48px` |
| `--cui-spacings-zetta` | `dimension` | no |  | `56px` | `56px` |
| `--cui-transitions-default` | `duration` | no |  | `120ms ease-in-out` | `120ms ease-in-out` |
| `--cui-transitions-slow` | `duration` | no |  | `300ms ease-in-out` | `300ms ease-in-out` |
| `--cui-display-l-font-size` | `dimension` | no |  | `4rem` | `4rem` |
| `--cui-display-l-line-height` | `dimension` | no |  | `4.5rem` | `4.5rem` |
| `--cui-display-m-font-size` | `dimension` | no |  | `3rem` | `3rem` |
| `--cui-display-m-line-height` | `dimension` | no |  | `3.5rem` | `3.5rem` |
| `--cui-display-s-font-size` | `dimension` | no |  | `2.5rem` | `2.5rem` |
| `--cui-display-s-line-height` | `dimension` | no |  | `2.875rem` | `2.875rem` |
| `--cui-headline-l-font-size` | `dimension` | no |  | `2rem` | `2rem` |
| `--cui-headline-l-line-height` | `dimension` | no |  | `2.25rem` | `2.25rem` |
| `--cui-headline-m-font-size` | `dimension` | no |  | `1.5rem` | `1.5rem` |
| `--cui-headline-m-line-height` | `dimension` | no |  | `1.625rem` | `1.625rem` |
| `--cui-headline-s-font-size` | `dimension` | no |  | `1.125rem` | `1.125rem` |
| `--cui-headline-s-line-height` | `dimension` | no |  | `1.375rem` | `1.375rem` |
| `--cui-body-l-font-size` | `dimension` | no |  | `1.25rem` | `1.25rem` |
| `--cui-body-l-line-height` | `dimension` | no |  | `1.5rem` | `1.5rem` |
| `--cui-body-m-font-size` | `dimension` | no |  | `1rem` | `1rem` |
| `--cui-body-m-line-height` | `dimension` | no |  | `1.375rem` | `1.375rem` |
| `--cui-body-s-font-size` | `dimension` | no |  | `0.875rem` | `0.875rem` |
| `--cui-body-s-line-height` | `dimension` | no |  | `1.25rem` | `1.25rem` |
| `--cui-compact-l-font-size` | `dimension` | no |  | `1.125rem` | `1.125rem` |
| `--cui-compact-l-line-height` | `dimension` | no |  | `1.5rem` | `1.5rem` |
| `--cui-compact-m-font-size` | `dimension` | no |  | `0.9375rem` | `0.9375rem` |
| `--cui-compact-m-line-height` | `dimension` | no |  | `1.0625rem` | `1.0625rem` |
| `--cui-compact-s-font-size` | `dimension` | no |  | `0.8125rem` | `0.8125rem` |
| `--cui-compact-s-line-height` | `dimension` | no |  | `0.9375rem` | `0.9375rem` |
| `--cui-numeral-l-font-size` | `dimension` | no |  | `3rem` | `3rem` |
| `--cui-numeral-l-line-height` | `dimension` | no |  | `3.375rem` | `3.375rem` |
| `--cui-numeral-m-font-size` | `dimension` | no |  | `1.5rem` | `1.5rem` |
| `--cui-numeral-m-line-height` | `dimension` | no |  | `1.75rem` | `1.75rem` |
| `--cui-numeral-s-font-size` | `dimension` | no |  | `1rem` | `1rem` |
| `--cui-numeral-s-line-height` | `dimension` | no |  | `1.375rem` | `1.375rem` |
| `--cui-letter-spacing` | `dimension` | no |  | `-0.01375rem` | `-0.01375rem` |
| `--cui-letter-spacing-tight` | `dimension` | no |  | `-0.08rem` | `-0.08rem` |
| `--cui-z-index-default` | `number` | no |  | `0` | `0` |
| `--cui-z-index-absolute` | `number` | no |  | `1` | `1` |
| `--cui-z-index-input` | `number` | no |  | `20` | `20` |
| `--cui-z-index-popover` | `number` | no |  | `1000` | `1000` |
| `--cui-z-index-side-panel` | `number` | no |  | `30` | `30` |
| `--cui-z-index-tooltip` | `number` | no |  | `40` | `40` |
| `--cui-z-index-header` | `number` | no |  | `600` | `600` |
| `--cui-z-index-navigation` | `number` | no |  | `800` | `800` |
| `--cui-z-index-toast` | `number` | no |  | `1100` | `1100` |
