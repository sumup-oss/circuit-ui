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

import type { Token } from '../types/index.js';

export const light = [
  /* Neutral backgrounds */
  {
    name: '--cui-bg-normal',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-hovered',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-pressed',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-disabled',
    value: 'rgba(255, 255, 255, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle',
    value: '#f6f7f9',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-hovered',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-pressed',
    value: '#c2c9d1',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-disabled',
    value: 'rgba(227, 231, 235, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-hovered',
    value: '#c2c9d1',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-pressed',
    value: '#9da7b1',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-disabled',
    value: 'rgba(227, 231, 235, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-bg-strong',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-hovered',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-pressed',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-disabled',
    value: 'rgba(15, 19, 26, 0.4)',
    type: 'color',
  },
  /* Accent backgrounds */
  {
    name: '--cui-bg-accent',
    value: '#eef0f2',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-hovered',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-pressed',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-disabled',
    value: 'rgba(238, 240, 242, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-hovered',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-pressed',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-disabled',
    value: 'rgba(15, 19, 26, 0.4)',
    type: 'color',
  },
  /* Success backgrounds */
  {
    name: '--cui-bg-success',
    value: '#e9fbe9',
    type: 'color',
  },
  {
    name: '--cui-bg-success-hovered',
    value: '#d7f8d7',
    type: 'color',
  },
  {
    name: '--cui-bg-success-pressed',
    value: '#c1e8c1',
    type: 'color',
  },
  {
    name: '--cui-bg-success-disabled',
    value: 'rgba(233, 251, 233, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong',
    value: '#018850',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-hovered',
    value: '#007a4e',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-pressed',
    value: '#016c26',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-disabled',
    value: 'rgba(1, 136, 80, 0.4)',
    type: 'color',
  },
  /* Warning backgrounds */
  {
    name: '--cui-bg-warning',
    value: '#fdf4db',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-hovered',
    value: '#faeec6',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-pressed',
    value: '#f5dea3',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-disabled',
    value: 'rgba(253, 244, 219, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong',
    value: '#e87c00',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-hovered',
    value: '#cc6d00',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-pressed',
    value: '#b25c00',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-disabled',
    value: 'rgba(232, 124, 0, 0.4)',
    type: 'color',
  },
  /* Danger backgrounds */
  {
    name: '--cui-bg-danger',
    value: '#fbe9e7',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-hovered',
    value: '#fcddd9',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-pressed',
    value: '#f7ccc7',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-disabled',
    value: 'rgba(251, 233, 231, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong',
    value: '#de331d',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-hovered',
    value: '#bd2c19',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-pressed',
    value: '#9e2415',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-disabled',
    value: 'rgba(222, 51, 29, 0.4)',
    type: 'color',
  },
  /* Promo backgrounds */
  {
    name: '--cui-bg-promo',
    value: '#f5edfe',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-hovered',
    value: '#ede0fc',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-pressed',
    value: '#e0c9f8',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-disabled',
    value: 'rgba(245, 237, 254, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong',
    value: '#9e33e0',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-hovered',
    value: '#8a1ecc',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-pressed',
    value: '#7219a9',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-disabled',
    value: 'rgba(158, 51, 224, 0.4)',
    type: 'color',
  },
  /* Neutral foregrounds */
  {
    name: '--cui-fg-normal',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-hovered',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-pressed',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-disabled',
    value: 'rgba(15, 19, 26, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle',
    value: '#6a737c',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-hovered',
    value: '#33373e',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-pressed',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-disabled',
    value: 'rgba(106, 115, 124, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder',
    value: '#9da7b1',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-hovered',
    value: '#9da7b1',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-pressed',
    value: '#9da7b1',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-disabled',
    value: 'rgba(157, 167, 177, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-hovered',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-pressed',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-disabled',
    value: 'rgba(255, 255, 255, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle',
    value: 'rgba(255, 255, 255, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-hovered',
    value: 'rgba(255, 255, 255, 0.8000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-pressed',
    value: 'rgba(255, 255, 255, 0.9000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-disabled',
    value: 'rgba(255, 255, 255, 0.3000)',
    type: 'color',
  },
  /* Accent foregrounds */
  {
    name: '--cui-fg-accent',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-hovered',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-pressed',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-disabled',
    value: 'rgba(15, 19, 26, 0.4)',
    type: 'color',
  },
  /* Success foregrounds */
  {
    name: '--cui-fg-success',
    value: '#018850',
    type: 'color',
  },
  {
    name: '--cui-fg-success-hovered',
    value: '#007a4e',
    type: 'color',
  },
  {
    name: '--cui-fg-success-pressed',
    value: '#016c26',
    type: 'color',
  },
  {
    name: '--cui-fg-success-disabled',
    value: 'rgba(1, 136, 80, 0.4)',
    type: 'color',
  },
  /* Warning foregrounds */
  {
    name: '--cui-fg-warning',
    value: '#e27900',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-hovered',
    value: '#cc6d00',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-pressed',
    value: '#b25c00',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-disabled',
    value: 'rgba(226, 121, 0, 0.4)',
    type: 'color',
  },
  /* Danger foregrounds */
  {
    name: '--cui-fg-danger',
    value: '#de331d',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-hovered',
    value: '#bd2c19',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-pressed',
    value: '#9e2415',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-disabled',
    value: 'rgba(222, 51, 29, 0.4)',
    type: 'color',
  },
  /* Promo foregrounds */
  {
    name: '--cui-fg-promo',
    value: '#9e33e0',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-hovered',
    value: '#8a1ecc',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-pressed',
    value: '#7219a9',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-disabled',
    value: 'rgba(158, 51, 224, 0.4)',
    type: 'color',
  },
  /* Neutral borders */
  {
    name: '--cui-border-normal',
    value: '#c2c9d1',
    type: 'color',
  },
  {
    name: '--cui-border-normal-hovered',
    value: '#9da7b1',
    type: 'color',
  },
  {
    name: '--cui-border-normal-pressed',
    value: '#6a737c',
    type: 'color',
  },
  {
    name: '--cui-border-normal-disabled',
    value: 'rgba(194, 201, 209, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle',
    value: '#d6dbe1',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-hovered',
    value: '#c2c9d1',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-pressed',
    value: '#9da7b1',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-disabled',
    value: 'rgba(230, 230, 230, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-border-divider',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-border-divider-hovered',
    value: '#9da7b1',
    type: 'color',
  },
  {
    name: '--cui-border-divider-pressed',
    value: '#6a737c',
    type: 'color',
  },
  {
    name: '--cui-border-divider-disabled',
    value: 'rgba(194, 201, 209, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-border-strong',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-border-strong-hovered',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-border-strong-pressed',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-border-strong-disabled',
    value: 'rgba(15, 19, 26, 0.4)',
    type: 'color',
  },
  /* Accent borders */
  {
    name: '--cui-border-accent',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-border-accent-hovered',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-border-accent-pressed',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-border-accent-disabled',
    value: 'rgba(15, 19, 26, 0.4)',
    type: 'color',
  },
  /* Success borders */
  {
    name: '--cui-border-success',
    value: '#018850',
    type: 'color',
  },
  {
    name: '--cui-border-success-hovered',
    value: '#007a4e',
    type: 'color',
  },
  {
    name: '--cui-border-success-pressed',
    value: '#016c26',
    type: 'color',
  },
  {
    name: '--cui-border-success-disabled',
    value: 'rgba(1, 136, 80, 0.4)',
    type: 'color',
  },
  /* Warning borders */
  {
    name: '--cui-border-warning',
    value: '#e87c00',
    type: 'color',
  },
  {
    name: '--cui-border-warning-hovered',
    value: '#cc6d00',
    type: 'color',
  },
  {
    name: '--cui-border-warning-pressed',
    value: '#b25c00',
    type: 'color',
  },
  {
    name: '--cui-border-warning-disabled',
    value: 'rgba(226, 121, 0, 0.4)',
    type: 'color',
  },
  /* Danger borders */
  {
    name: '--cui-border-danger',
    value: '#de331d',
    type: 'color',
  },
  {
    name: '--cui-border-danger-hovered',
    value: '#bd2c19',
    type: 'color',
  },
  {
    name: '--cui-border-danger-pressed',
    value: '#9e2415',
    type: 'color',
  },
  {
    name: '--cui-border-danger-disabled',
    value: 'rgba(222, 51, 29, 0.4)',
    type: 'color',
  },
  /* Promo borders */
  {
    name: '--cui-border-promo',
    value: '#9e33e0',
    type: 'color',
  },
  {
    name: '--cui-border-promo-hovered',
    value: '#8a1ecc',
    type: 'color',
  },
  {
    name: '--cui-border-promo-pressed',
    value: '#7219a9',
    type: 'color',
  },
  {
    name: '--cui-border-promo-disabled',
    value: 'rgba(158, 51, 224, 0.4)',
    type: 'color',
  },
  /* Special colors */
  {
    name: '--cui-bg-overlay',
    value: 'rgba(0, 0, 0, 0.4)',
    type: 'color',
  },
  {
    name: '--cui-bg-elevated',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-border-focus',
    value: '#3064e3',
    type: 'color',
  },
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
  /* Font families */
  {
    name: '--cui-font-stack-default',
    value:
      'aktiv-grotesk, Helvetica, Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
    value: '400',
    type: 'fontWeight',
  },
  {
    name: '--cui-font-weight-bold',
    value: '700',
    type: 'fontWeight',
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
    value: '1.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-two-line-height',
    value: '1.75rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-three-font-size',
    value: '1.25rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-three-line-height',
    value: '1.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-four-font-size',
    value: '1.125rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-headline-four-line-height',
    value: '1.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-one-font-size',
    value: '7.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-one-line-height',
    value: '7.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-two-font-size',
    value: '6rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-two-line-height',
    value: '6rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-three-font-size',
    value: '4rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-three-line-height',
    value: '4rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-four-font-size',
    value: '3.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-title-four-line-height',
    value: '3.5rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-sub-headline-font-size',
    value: '0.875rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-sub-headline-line-height',
    value: '1.25rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-body-one-font-size',
    value: '1rem',
    type: 'dimension',
  },
  {
    name: '--cui-typography-body-one-line-height',
    value: '1.5rem',
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
    value: '1.75rem',
    type: 'dimension',
  },
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
    name: '--cui-z-index-backdrop',
    value: 700,
    type: 'number',
  },
  {
    name: '--cui-z-index-navigation',
    value: 800,
    type: 'number',
  },
  {
    name: '--cui-z-index-modal',
    value: 1000,
    type: 'number',
  },
  {
    name: '--cui-z-index-toast',
    value: 1100,
    type: 'number',
  },
] satisfies Token[];
