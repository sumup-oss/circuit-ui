/**
 * Copyright 2023, SumUp Ltd.
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

import type { TokenName, TokenType } from '../types/index.js';

export const schema = [
  /* Neutral backgrounds */
  { name: '--cui-bg-normal', type: 'color' },
  { name: '--cui-bg-normal-hovered', type: 'color' },
  { name: '--cui-bg-normal-pressed', type: 'color' },
  { name: '--cui-bg-normal-disabled', type: 'color' },
  { name: '--cui-bg-subtle', type: 'color' },
  { name: '--cui-bg-subtle-hovered', type: 'color' },
  { name: '--cui-bg-subtle-pressed', type: 'color' },
  { name: '--cui-bg-subtle-disabled', type: 'color' },
  { name: '--cui-bg-highlight', type: 'color' },
  { name: '--cui-bg-highlight-hovered', type: 'color' },
  { name: '--cui-bg-highlight-pressed', type: 'color' },
  { name: '--cui-bg-highlight-disabled', type: 'color' },
  { name: '--cui-bg-strong', type: 'color' },
  { name: '--cui-bg-strong-hovered', type: 'color' },
  { name: '--cui-bg-strong-pressed', type: 'color' },
  { name: '--cui-bg-strong-disabled', type: 'color' },
  /* Accent backgrounds */
  { name: '--cui-bg-accent', type: 'color' },
  { name: '--cui-bg-accent-hovered', type: 'color' },
  { name: '--cui-bg-accent-pressed', type: 'color' },
  { name: '--cui-bg-accent-disabled', type: 'color' },
  { name: '--cui-bg-accent-strong', type: 'color' },
  { name: '--cui-bg-accent-strong-hovered', type: 'color' },
  { name: '--cui-bg-accent-strong-pressed', type: 'color' },
  { name: '--cui-bg-accent-strong-disabled', type: 'color' },
  /* Success backgrounds */
  { name: '--cui-bg-success', type: 'color' },
  { name: '--cui-bg-success-hovered', type: 'color' },
  { name: '--cui-bg-success-pressed', type: 'color' },
  { name: '--cui-bg-success-disabled', type: 'color' },
  { name: '--cui-bg-success-strong', type: 'color' },
  { name: '--cui-bg-success-strong-hovered', type: 'color' },
  { name: '--cui-bg-success-strong-pressed', type: 'color' },
  { name: '--cui-bg-success-strong-disabled', type: 'color' },
  /* Warning backgrounds */
  { name: '--cui-bg-warning', type: 'color' },
  { name: '--cui-bg-warning-hovered', type: 'color' },
  { name: '--cui-bg-warning-pressed', type: 'color' },
  { name: '--cui-bg-warning-disabled', type: 'color' },
  { name: '--cui-bg-warning-strong', type: 'color' },
  { name: '--cui-bg-warning-strong-hovered', type: 'color' },
  { name: '--cui-bg-warning-strong-pressed', type: 'color' },
  { name: '--cui-bg-warning-strong-disabled', type: 'color' },
  /* Danger backgrounds */
  { name: '--cui-bg-danger', type: 'color' },
  { name: '--cui-bg-danger-hovered', type: 'color' },
  { name: '--cui-bg-danger-pressed', type: 'color' },
  { name: '--cui-bg-danger-disabled', type: 'color' },
  { name: '--cui-bg-danger-strong', type: 'color' },
  { name: '--cui-bg-danger-strong-hovered', type: 'color' },
  { name: '--cui-bg-danger-strong-pressed', type: 'color' },
  { name: '--cui-bg-danger-strong-disabled', type: 'color' },
  /* Promo backgrounds */
  { name: '--cui-bg-promo', type: 'color' },
  { name: '--cui-bg-promo-hovered', type: 'color' },
  { name: '--cui-bg-promo-pressed', type: 'color' },
  { name: '--cui-bg-promo-disabled', type: 'color' },
  { name: '--cui-bg-promo-strong', type: 'color' },
  { name: '--cui-bg-promo-strong-hovered', type: 'color' },
  { name: '--cui-bg-promo-strong-pressed', type: 'color' },
  { name: '--cui-bg-promo-strong-disabled', type: 'color' },
  /* Neutral foregrounds */
  { name: '--cui-fg-normal', type: 'color' },
  { name: '--cui-fg-normal-hovered', type: 'color' },
  { name: '--cui-fg-normal-pressed', type: 'color' },
  { name: '--cui-fg-normal-disabled', type: 'color' },
  { name: '--cui-fg-subtle', type: 'color' },
  { name: '--cui-fg-subtle-hovered', type: 'color' },
  { name: '--cui-fg-subtle-pressed', type: 'color' },
  { name: '--cui-fg-subtle-disabled', type: 'color' },
  { name: '--cui-fg-placeholder', type: 'color' },
  { name: '--cui-fg-placeholder-hovered', type: 'color' },
  { name: '--cui-fg-placeholder-pressed', type: 'color' },
  { name: '--cui-fg-placeholder-disabled', type: 'color' },
  { name: '--cui-fg-on-strong', type: 'color' },
  { name: '--cui-fg-on-strong-hovered', type: 'color' },
  { name: '--cui-fg-on-strong-pressed', type: 'color' },
  { name: '--cui-fg-on-strong-disabled', type: 'color' },
  { name: '--cui-fg-on-strong-subtle', type: 'color' },
  { name: '--cui-fg-on-strong-subtle-hovered', type: 'color' },
  { name: '--cui-fg-on-strong-subtle-pressed', type: 'color' },
  { name: '--cui-fg-on-strong-subtle-disabled', type: 'color' },
  /* Accent foregrounds */
  { name: '--cui-fg-accent', type: 'color' },
  { name: '--cui-fg-accent-hovered', type: 'color' },
  { name: '--cui-fg-accent-pressed', type: 'color' },
  { name: '--cui-fg-accent-disabled', type: 'color' },
  /* Success foregrounds */
  { name: '--cui-fg-success', type: 'color' },
  { name: '--cui-fg-success-hovered', type: 'color' },
  { name: '--cui-fg-success-pressed', type: 'color' },
  { name: '--cui-fg-success-disabled', type: 'color' },
  /* Warning foregrounds */
  { name: '--cui-fg-warning', type: 'color' },
  { name: '--cui-fg-warning-hovered', type: 'color' },
  { name: '--cui-fg-warning-pressed', type: 'color' },
  { name: '--cui-fg-warning-disabled', type: 'color' },
  /* Danger foregrounds */
  { name: '--cui-fg-danger', type: 'color' },
  { name: '--cui-fg-danger-hovered', type: 'color' },
  { name: '--cui-fg-danger-pressed', type: 'color' },
  { name: '--cui-fg-danger-disabled', type: 'color' },
  /* Promo foregrounds */
  { name: '--cui-fg-promo', type: 'color' },
  { name: '--cui-fg-promo-hovered', type: 'color' },
  { name: '--cui-fg-promo-pressed', type: 'color' },
  { name: '--cui-fg-promo-disabled', type: 'color' },
  /* Neutral borders */
  { name: '--cui-border-normal', type: 'color' },
  { name: '--cui-border-normal-hovered', type: 'color' },
  { name: '--cui-border-normal-pressed', type: 'color' },
  { name: '--cui-border-normal-disabled', type: 'color' },
  { name: '--cui-border-subtle', type: 'color' },
  { name: '--cui-border-subtle-hovered', type: 'color' },
  { name: '--cui-border-subtle-pressed', type: 'color' },
  { name: '--cui-border-subtle-disabled', type: 'color' },
  { name: '--cui-border-divider', type: 'color' },
  { name: '--cui-border-divider-hovered', type: 'color' },
  { name: '--cui-border-divider-pressed', type: 'color' },
  { name: '--cui-border-divider-disabled', type: 'color' },
  { name: '--cui-border-strong', type: 'color' },
  { name: '--cui-border-strong-hovered', type: 'color' },
  { name: '--cui-border-strong-pressed', type: 'color' },
  { name: '--cui-border-strong-disabled', type: 'color' },
  /* Accent borders */
  { name: '--cui-border-accent', type: 'color' },
  { name: '--cui-border-accent-hovered', type: 'color' },
  { name: '--cui-border-accent-pressed', type: 'color' },
  { name: '--cui-border-accent-disabled', type: 'color' },
  /* Success borders */
  { name: '--cui-border-success', type: 'color' },
  { name: '--cui-border-success-hovered', type: 'color' },
  { name: '--cui-border-success-pressed', type: 'color' },
  { name: '--cui-border-success-disabled', type: 'color' },
  /* Warning borders */
  { name: '--cui-border-warning', type: 'color' },
  { name: '--cui-border-warning-hovered', type: 'color' },
  { name: '--cui-border-warning-pressed', type: 'color' },
  { name: '--cui-border-warning-disabled', type: 'color' },
  /* Danger borders */
  { name: '--cui-border-danger', type: 'color' },
  { name: '--cui-border-danger-hovered', type: 'color' },
  { name: '--cui-border-danger-pressed', type: 'color' },
  { name: '--cui-border-danger-disabled', type: 'color' },
  /* Promo borders */
  { name: '--cui-border-promo', type: 'color' },
  { name: '--cui-border-promo-hovered', type: 'color' },
  { name: '--cui-border-promo-pressed', type: 'color' },
  { name: '--cui-border-promo-disabled', type: 'color' },
  /* Special colors */
  { name: '--cui-bg-overlay', type: 'color' },
  { name: '--cui-bg-elevated', type: 'color' },
  { name: '--cui-border-focus', type: 'color' },
  /* Border radii */
  { name: '--cui-border-radius-bit', type: 'dimension' },
  { name: '--cui-border-radius-byte', type: 'dimension' },
  { name: '--cui-border-radius-kilo', type: 'dimension' },
  { name: '--cui-border-radius-mega', type: 'dimension' },
  { name: '--cui-border-radius-circle', type: 'dimension' },
  { name: '--cui-border-radius-pill', type: 'dimension' },
  /* Border widths */
  { name: '--cui-border-width-kilo', type: 'dimension' },
  { name: '--cui-border-width-mega', type: 'dimension' },
  /* Font families */
  { name: '--cui-font-stack-default', type: 'fontFamily' },
  { name: '--cui-font-stack-mono', type: 'fontFamily' },
  /* Font weights */
  { name: '--cui-font-weight-regular', type: 'fontWeight' },
  { name: '--cui-font-weight-bold', type: 'fontWeight' },
  /* Icon sizes */
  { name: '--cui-icon-sizes-kilo', type: 'dimension' },
  { name: '--cui-icon-sizes-mega', type: 'dimension' },
  { name: '--cui-icon-sizes-giga', type: 'dimension' },
  { name: '--cui-icon-sizes-tera', type: 'dimension' },
  /* Spacings */
  { name: '--cui-spacings-bit', type: 'dimension' },
  { name: '--cui-spacings-byte', type: 'dimension' },
  { name: '--cui-spacings-kilo', type: 'dimension' },
  { name: '--cui-spacings-mega', type: 'dimension' },
  { name: '--cui-spacings-giga', type: 'dimension' },
  { name: '--cui-spacings-tera', type: 'dimension' },
  { name: '--cui-spacings-peta', type: 'dimension' },
  { name: '--cui-spacings-exa', type: 'dimension' },
  { name: '--cui-spacings-zetta', type: 'dimension' },
  /* Transitions */
  { name: '--cui-transitions-default', type: 'duration' },
  { name: '--cui-transitions-slow', type: 'duration' },
  /* Typography */
  { name: '--cui-typography-display-l-font-size', type: 'dimension' },
  { name: '--cui-typography-display-l-line-height', type: 'dimension' },
  { name: '--cui-typography-display-l-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-display-m-font-size', type: 'dimension' },
  { name: '--cui-typography-display-m-line-height', type: 'dimension' },
  { name: '--cui-typography-display-m-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-display-s-font-size', type: 'dimension' },
  { name: '--cui-typography-display-s-line-height', type: 'dimension' },
  { name: '--cui-typography-display-s-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-headline-l-font-size', type: 'dimension' },
  { name: '--cui-typography-headline-l-line-height', type: 'dimension' },
  { name: '--cui-typography-headline-l-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-headline-m-font-size', type: 'dimension' },
  { name: '--cui-typography-headline-m-line-height', type: 'dimension' },
  { name: '--cui-typography-headline-m-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-headline-s-font-size', type: 'dimension' },
  { name: '--cui-typography-headline-s-line-height', type: 'dimension' },
  { name: '--cui-typography-headline-s-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-body-l-font-size', type: 'dimension' },
  { name: '--cui-typography-body-l-line-height', type: 'dimension' },
  { name: '--cui-typography-body-l-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-body-m-font-size', type: 'dimension' },
  { name: '--cui-typography-body-m-line-height', type: 'dimension' },
  { name: '--cui-typography-body-m-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-body-s-font-size', type: 'dimension' },
  { name: '--cui-typography-body-s-line-height', type: 'dimension' },
  { name: '--cui-typography-body-s-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-compact-l-font-size', type: 'dimension' },
  { name: '--cui-typography-compact-l-line-height', type: 'dimension' },
  { name: '--cui-typography-compact-l-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-compact-m-font-size', type: 'dimension' },
  { name: '--cui-typography-compact-m-line-height', type: 'dimension' },
  { name: '--cui-typography-compact-m-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-compact-s-font-size', type: 'dimension' },
  { name: '--cui-typography-compact-s-line-height', type: 'dimension' },
  { name: '--cui-typography-compact-s-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-numeral-l-font-size', type: 'dimension' },
  { name: '--cui-typography-numeral-l-line-height', type: 'dimension' },
  { name: '--cui-typography-numeral-l-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-numeral-m-font-size', type: 'dimension' },
  { name: '--cui-typography-numeral-m-line-height', type: 'dimension' },
  { name: '--cui-typography-numeral-m-letter-spacing', type: 'dimension' },
  { name: '--cui-typography-numeral-s-font-size', type: 'dimension' },
  { name: '--cui-typography-numeral-s-line-height', type: 'dimension' },
  { name: '--cui-typography-numeral-s-letter-spacing', type: 'dimension' },
  /* eslint-disable @sumup-oss/circuit-ui/no-deprecated-custom-properties */
  {
    name: '--cui-typography-headline-one-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-headline-l-font-size',
    },
  },
  {
    name: '--cui-typography-headline-one-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-headline-l-line-height',
    },
  },
  {
    name: '--cui-typography-headline-two-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-headline-m-font-size',
    },
  },
  {
    name: '--cui-typography-headline-two-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-headline-m-line-height',
    },
  },
  {
    name: '--cui-typography-headline-three-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-headline-m-font-size',
    },
  },
  {
    name: '--cui-typography-headline-three-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-headline-m-line-height',
    },
  },
  {
    name: '--cui-typography-headline-four-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-headline-s-font-size',
    },
  },
  {
    name: '--cui-typography-headline-four-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-headline-s-line-height',
    },
  },
  {
    name: '--cui-typography-title-one-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-display-l-font-size',
    },
  },
  {
    name: '--cui-typography-title-one-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-display-l-line-height',
    },
  },
  {
    name: '--cui-typography-title-two-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-display-m-font-size',
    },
  },
  {
    name: '--cui-typography-title-two-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-display-m-line-height',
    },
  },
  {
    name: '--cui-typography-title-three-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-display-m-font-size',
    },
  },
  {
    name: '--cui-typography-title-three-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-display-m-line-height',
    },
  },
  {
    name: '--cui-typography-title-four-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-display-s-font-size',
    },
  },
  {
    name: '--cui-typography-title-four-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-display-s-line-height',
    },
  },
  {
    name: '--cui-typography-sub-headline-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-headline-s-font-size',
    },
  },
  {
    name: '--cui-typography-sub-headline-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-headline-s-line-height',
    },
  },
  {
    name: '--cui-typography-body-one-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-body-m-font-size',
    },
  },
  {
    name: '--cui-typography-body-one-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-body-m-line-height',
    },
  },
  {
    name: '--cui-typography-body-two-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-body-s-font-size',
    },
  },
  {
    name: '--cui-typography-body-two-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-body-s-line-height',
    },
  },
  {
    name: '--cui-typography-body-large-font-size',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-body-l-font-size',
    },
  },
  {
    name: '--cui-typography-body-large-line-height',
    type: 'dimension',
    deprecation: {
      replacement: '--cui-typography-body-l-line-height',
    },
  },
  /* eslint-disable @sumup-oss/circuit-ui/no-deprecated-custom-properties */
  /* Z-indices */
  { name: '--cui-z-index-default', type: 'number' },
  { name: '--cui-z-index-absolute', type: 'number' },
  { name: '--cui-z-index-input', type: 'number' },
  { name: '--cui-z-index-popover', type: 'number' },
  { name: '--cui-z-index-tooltip', type: 'number' },
  { name: '--cui-z-index-header', type: 'number' },
  { name: '--cui-z-index-backdrop', type: 'number' },
  { name: '--cui-z-index-navigation', type: 'number' },
  { name: '--cui-z-index-modal', type: 'number' },
  { name: '--cui-z-index-toast', type: 'number' },
] satisfies {
  name: TokenName;
  type: TokenType;
  deprecation?: { replacement: TokenName };
}[];
