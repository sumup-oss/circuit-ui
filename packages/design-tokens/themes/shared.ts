/**
 * Copyright 2024, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Token } from '../types/index.js';

export const shared = [
  /* Border radii */
  {
    name: '--cui-border-radius-bit',
    value: '4px',
    type: 'dimension',
  },
  {
    name: '--cui-border-radius-byte',
    value: '8px',
    type: 'dimension',
  },
  {
    name: '--cui-border-radius-kilo',
    value: '12px',
    type: 'dimension',
  },
  {
    name: '--cui-border-radius-mega',
    value: '16px',
    type: 'dimension',
  },
  {
    name: '--cui-border-radius-circle',
    value: '100%',
    type: 'dimension',
  },
  {
    name: '--cui-border-radius-pill',
    value: '999999px',
    type: 'dimension',
  },
  /* Border widths */
  {
    name: '--cui-border-width-kilo',
    value: '1px',
    type: 'dimension',
  },
  {
    name: '--cui-border-width-mega',
    value: '2px',
    type: 'dimension',
  },
  {
    name: '--cui-font-stack-default',
    value:
      '"Inter", "Inter-Fallback", Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    type: 'fontFamily',
  },
  {
    name: '--cui-font-stack-mono',
    value:
      'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
    type: 'fontFamily',
  },
  /* Font weights */
  {
    name: '--cui-font-weight-regular',
    value: '375',
    type: 'fontWeight',
  },
  {
    name: '--cui-font-weight-semibold',
    value: '560',
    type: 'fontWeight',
  },
  {
    name: '--cui-font-weight-bold',
    value: '630',
    type: 'fontWeight',
  },
  /* Letter spacing */
  {
    name: '--cui-letter-spacing',
    value: '-0.01375rem',
    type: 'dimension',
  },
  {
    name: '--cui-letter-spacing-tight',
    value: '-0.08rem',
    type: 'dimension',
  },
  /* Icon sizes */
  {
    name: '--cui-icon-sizes-kilo',
    value: '16px',
    type: 'dimension',
  },
  {
    name: '--cui-icon-sizes-mega',
    value: '24px',
    type: 'dimension',
  },
  {
    name: '--cui-icon-sizes-giga',
    value: '32px',
    type: 'dimension',
  },
  {
    name: '--cui-icon-sizes-tera',
    value: '48px',
    type: 'dimension',
  },
  /* Spacings */
  {
    name: '--cui-spacings-bit',
    value: '4px',
    type: 'dimension',
  },
  {
    name: '--cui-spacings-byte',
    value: '8px',
    type: 'dimension',
  },
  {
    name: '--cui-spacings-kilo',
    value: '12px',
    type: 'dimension',
  },
  {
    name: '--cui-spacings-mega',
    value: '16px',
    type: 'dimension',
  },
  {
    name: '--cui-spacings-giga',
    value: '24px',
    type: 'dimension',
  },
  {
    name: '--cui-spacings-tera',
    value: '32px',
    type: 'dimension',
  },
  {
    name: '--cui-spacings-peta',
    value: '40px',
    type: 'dimension',
  },
  {
    name: '--cui-spacings-exa',
    value: '48px',
    type: 'dimension',
  },
  {
    name: '--cui-spacings-zetta',
    value: '56px',
    type: 'dimension',
  },
  /* Transitions */
  {
    name: '--cui-transitions-default',
    value: '120ms ease-in-out',
    type: 'duration',
  },
  {
    name: '--cui-transitions-slow',
    value: '300ms ease-in-out',
    type: 'duration',
  },
  /* Typography */
  {
    name: '--cui-display-l-font-size',
    value: '4rem',
    type: 'dimension',
  },
  {
    name: '--cui-display-l-line-height',
    value: '4.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-display-m-font-size',
    value: '3rem',
    type: 'dimension',
  },
  {
    name: '--cui-display-m-line-height',
    value: '3.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-display-s-font-size',
    value: '2.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-display-s-line-height',
    value: '2.875rem',
    type: 'dimension',
  },
  {
    name: '--cui-headline-l-font-size',
    value: '2rem',
    type: 'dimension',
  },
  {
    name: '--cui-headline-l-line-height',
    value: '2.25rem',
    type: 'dimension',
  },
  {
    name: '--cui-headline-m-font-size',
    value: '1.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-headline-m-line-height',
    value: '1.625rem',
    type: 'dimension',
  },
  {
    name: '--cui-headline-s-font-size',
    value: '1.125rem',
    type: 'dimension',
  },
  {
    name: '--cui-headline-s-line-height',
    value: '1.375rem',
    type: 'dimension',
  },
  {
    name: '--cui-body-l-font-size',
    value: '1.25rem',
    type: 'dimension',
  },
  {
    name: '--cui-body-l-line-height',
    value: '1.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-body-m-font-size',
    value: '1rem',
    type: 'dimension',
  },
  {
    name: '--cui-body-m-line-height',
    value: '1.375rem',
    type: 'dimension',
  },
  {
    name: '--cui-body-s-font-size',
    value: '0.875rem',
    type: 'dimension',
  },
  {
    name: '--cui-body-s-line-height',
    value: '1.25rem',
    type: 'dimension',
  },
  {
    name: '--cui-compact-l-font-size',
    value: '1.125rem',
    type: 'dimension',
  },
  {
    name: '--cui-compact-l-line-height',
    value: '1.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-compact-m-font-size',
    value: '0.9375rem',
    type: 'dimension',
  },
  {
    name: '--cui-compact-m-line-height',
    value: '1.0625rem',
    type: 'dimension',
  },
  {
    name: '--cui-compact-s-font-size',
    value: '0.8125rem',
    type: 'dimension',
  },
  {
    name: '--cui-compact-s-line-height',
    value: '0.9375rem',
    type: 'dimension',
  },
  {
    name: '--cui-numeral-l-font-size',
    value: '3rem',
    type: 'dimension',
  },
  {
    name: '--cui-numeral-l-line-height',
    value: '3.375rem',
    type: 'dimension',
  },
  {
    name: '--cui-numeral-m-font-size',
    value: '1.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-numeral-m-line-height',
    value: '1.75rem',
    type: 'dimension',
  },
  {
    name: '--cui-numeral-s-font-size',
    value: '1rem',
    type: 'dimension',
  },
  {
    name: '--cui-numeral-s-line-height',
    value: '1.375rem',
    type: 'dimension',
  },
  /* eslint-disable @sumup-oss/circuit-ui/no-deprecated-custom-properties */
  {
    name: '--cui-typography-headline-one-font-size',
    value: '2rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-one-line-height',
    value: '2.25rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-two-font-size',
    value: '1.375rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-two-line-height',
    value: '1.625rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-three-font-size',
    value: '1.375rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-three-line-height',
    value: '1.625rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-four-font-size',
    value: '1.125rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-four-line-height',
    value: '1.375rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-one-font-size',
    value: '4rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-one-line-height',
    value: '4.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-two-font-size',
    value: '3rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-two-line-height',
    value: '3.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-three-font-size',
    value: '3rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-three-line-height',
    value: '3.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-four-font-size',
    value: '2.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-four-line-height',
    value: '2.875rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-sub-headline-font-size',
    value: '1.125rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-sub-headline-line-height',
    value: '1.375rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-body-one-font-size',
    value: '1rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-body-one-line-height',
    value: '1.375rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-body-two-font-size',
    value: '0.875rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-body-two-line-height',
    value: '1.25rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-body-large-font-size',
    value: '1.25rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-body-large-line-height',
    value: '1.5rem',
    type: 'dimension',
  },
  /* eslint-enable @sumup-oss/circuit-ui/no-deprecated-custom-properties */
  /* Z-indices */
  {
    name: '--cui-z-index-default',
    value: 0,
    type: 'number',
  },
  {
    name: '--cui-z-index-absolute',
    value: 1,
    type: 'number',
  },
  {
    name: '--cui-z-index-input',
    value: 20,
    type: 'number',
  },
  {
    name: '--cui-z-index-popover',
    value: 1000,
    type: 'number',
  },
  {
    name: '--cui-z-index-side-panel',
    value: 30,
    type: 'number',
  },
  {
    name: '--cui-z-index-tooltip',
    value: 40,
    type: 'number',
  },
  {
    name: '--cui-z-index-header',
    value: 600,
    type: 'number',
  },
  {
    name: '--cui-z-index-navigation',
    value: 800,
    type: 'number',
  },
  {
    name: '--cui-z-index-toast',
    value: 1100,
    type: 'number',
  },
] satisfies Token[];
