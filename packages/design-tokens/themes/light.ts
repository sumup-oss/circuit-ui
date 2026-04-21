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
  {
    name: '--cui-bg-normal',
    value: '#fbfbf9',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-hovered',
    value: '#f1f0e9',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-pressed',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-disabled',
    value: 'rgba(227, 226, 214, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle',
    value: '#f5f4ed',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-hovered',
    value: '#f0eee7',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-pressed',
    value: '#e8e6dc',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-disabled',
    value: 'rgba(221, 220, 212, 0.9000)',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight',
    value: '#e8e6dc',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-hovered',
    value: '#d9d6c7',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-pressed',
    value: '#d6d2c0',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-disabled',
    value: 'rgba(117, 108, 108, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-strong',
    value: '#1e1c1c',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-hovered',
    value: '#3f3a3a',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-pressed',
    value: '#756c6c',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-disabled',
    value: 'rgba(30, 28, 28, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent',
    value: '#f5f4ed',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-hovered',
    value: '#e8e6dc',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-pressed',
    value: '#d9d6c7',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-disabled',
    value: 'rgba(227, 226, 214, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong',
    value: '#1e1c1c',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-hovered',
    value: '#332f2f',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-pressed',
    value: '#4d4949',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-disabled',
    value: 'rgba(30, 28, 28, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral',
    value: '#f0eee7',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-hovered',
    value: '#e8e6dc',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-pressed',
    value: '#d9d6c7',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-disabled',
    value: 'rgba(217, 214, 199, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong',
    value: '#c7c3b3',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-hovered',
    value: '#c3bfaf',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-pressed',
    value: '#bebaab',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-disabled',
    value: 'rgba(195, 191, 175, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success',
    value: '#dff4e2',
    type: 'color',
  },
  {
    name: '--cui-bg-success-hovered',
    value: '#e2f6e5',
    type: 'color',
  },
  {
    name: '--cui-bg-success-pressed',
    value: '#d6f2da',
    type: 'color',
  },
  {
    name: '--cui-bg-success-disabled',
    value: 'rgba(237, 249, 239, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong',
    value: '#1e862d',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-hovered',
    value: '#23a235',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-pressed',
    value: '#29bd3e',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-disabled',
    value: 'rgba(32, 184, 57, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning',
    value: '#feeed5',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-hovered',
    value: '#f6e3c6',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-pressed',
    value: '#f0dab8',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-disabled',
    value: 'rgba(254, 238, 213, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong',
    value: '#da7603',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-hovered',
    value: '#fb8804',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-pressed',
    value: '#fd9a27',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-disabled',
    value: 'rgba(248, 171, 47, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger',
    value: '#ffdacc',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-hovered',
    value: '#ffeae3',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-pressed',
    value: '#fdddd1',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-disabled',
    value: 'rgba(255, 218, 204, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong',
    value: '#d23f04',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-hovered',
    value: '#cf3e05',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-pressed',
    value: '#b63502',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-disabled',
    value: 'rgba(227, 68, 5, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo',
    value: '#ffe4fd',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-hovered',
    value: '#ffd7fc',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-pressed',
    value: '#ffcafb',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-disabled',
    value: 'rgba(255, 228, 253, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong',
    value: '#b342a9',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-hovered',
    value: '#c64bbb',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-pressed',
    value: '#d14fc6',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-disabled',
    value: 'rgba(225, 85, 214, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-brand',
    value: '#ff61f2',
    type: 'color',
  },
  {
    name: '--cui-bg-brand-hovered',
    value: '#eb58df',
    type: 'color',
  },
  {
    name: '--cui-bg-brand-pressed',
    value: '#da4ece',
    type: 'color',
  },
  {
    name: '--cui-bg-brand-disabled',
    value: 'rgba(255, 97, 242, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-fg-normal',
    value: '#1e1c1c',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-hovered',
    value: 'rgba(30, 28, 28, 0.9000)',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-pressed',
    value: 'rgba(30, 28, 28, 0.8000)',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-disabled',
    value: 'rgba(30, 28, 28, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle',
    value: '#706464',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-hovered',
    value: 'rgba(112, 100, 100, 0.9000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-pressed',
    value: 'rgba(112, 100, 100, 0.8000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-disabled',
    value: 'rgba(112, 100, 100, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder',
    value: '#76716b',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-hovered',
    value: 'rgba(118, 113, 107, 0.9000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-pressed',
    value: 'rgba(118, 113, 107, 0.8000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-disabled',
    value: 'rgba(118, 113, 107, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong',
    value: '#fbfbf9',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-hovered',
    value: 'rgba(251, 251, 249, 0.9000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-pressed',
    value: 'rgba(251, 251, 249, 0.8000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-disabled',
    value: 'rgba(251, 251, 249, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle',
    value: 'rgba(251, 251, 249, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-hovered',
    value: 'rgba(212, 201, 194, 0.9000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-pressed',
    value: 'rgba(212, 201, 194, 0.8000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-disabled',
    value: 'rgba(212, 201, 194, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-accent',
    value: '#1e1c1c',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-hovered',
    value: '#726767',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-pressed',
    value: '#887a7a',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-disabled',
    value: 'rgba(30, 28, 28, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral',
    value: '#786464',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-hovered',
    value: '#4f3c3c',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-pressed',
    value: '#3c2a2a',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-disabled',
    value: 'rgba(60, 42, 42, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-success',
    value: '#3c7411',
    type: 'color',
  },
  {
    name: '--cui-fg-success-hovered',
    value: '#0b721c',
    type: 'color',
  },
  {
    name: '--cui-fg-success-pressed',
    value: '#075b15',
    type: 'color',
  },
  {
    name: '--cui-fg-success-disabled',
    value: 'rgba(20, 126, 38, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-fg-warning',
    value: '#a65a03',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-hovered',
    value: '#9d6814',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-pressed',
    value: '#8e5c0c',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-disabled',
    value: 'rgba(174, 121, 35, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-fg-danger',
    value: '#b13606',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-hovered',
    value: '#d53d02',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-pressed',
    value: '#e94403',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-disabled',
    value: 'rgba(255, 72, 0, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-fg-promo',
    value: '#a33e9a',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-hovered',
    value: '#ec58e0',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-pressed',
    value: '#e04fd4',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-disabled',
    value: 'rgba(255, 97, 242, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-fg-brand',
    value: '#ff61f2',
    type: 'color',
  },
  {
    name: '--cui-fg-brand-hovered',
    value: '#eb58df',
    type: 'color',
  },
  {
    name: '--cui-fg-brand-pressed',
    value: '#da4ece',
    type: 'color',
  },
  {
    name: '--cui-fg-brand-disabled',
    value: 'rgba(255, 97, 242, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-border-normal',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-border-normal-hovered',
    value: '#ded7cf',
    type: 'color',
  },
  {
    name: '--cui-border-normal-pressed',
    value: '#cac4be',
    type: 'color',
  },
  {
    name: '--cui-border-normal-disabled',
    value: 'rgba(207, 206, 194, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-hovered',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-pressed',
    value: '#b7b0a9',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-disabled',
    value: 'rgba(221, 220, 212, 0.9000)',
    type: 'color',
  },
  {
    name: '--cui-border-divider',
    value: '#f1f1eb',
    type: 'color',
  },
  {
    name: '--cui-border-divider-hovered',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-border-divider-pressed',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-border-divider-disabled',
    value: 'rgba(240, 241, 231, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-border-strong',
    value: '#1e1c1c',
    type: 'color',
  },
  {
    name: '--cui-border-strong-hovered',
    value: '#494a4a',
    type: 'color',
  },
  {
    name: '--cui-border-strong-pressed',
    value: '#696969',
    type: 'color',
  },
  {
    name: '--cui-border-strong-disabled',
    value: 'rgba(15, 19, 26, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-accent',
    value: '#1e1c1c',
    type: 'color',
  },
  {
    name: '--cui-border-accent-hovered',
    value: '#726767',
    type: 'color',
  },
  {
    name: '--cui-border-accent-pressed',
    value: '#887a7a',
    type: 'color',
  },
  {
    name: '--cui-border-accent-disabled',
    value: 'rgba(30, 28, 28, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-border-success',
    value: '#3c7411',
    type: 'color',
  },
  {
    name: '--cui-border-success-hovered',
    value: '#529d18',
    type: 'color',
  },
  {
    name: '--cui-border-success-pressed',
    value: '#65b527',
    type: 'color',
  },
  {
    name: '--cui-border-success-disabled',
    value: 'rgba(32, 184, 57, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-warning',
    value: '#a65a03',
    type: 'color',
  },
  {
    name: '--cui-border-warning-hovered',
    value: '#ce7106',
    type: 'color',
  },
  {
    name: '--cui-border-warning-pressed',
    value: '#e77e06',
    type: 'color',
  },
  {
    name: '--cui-border-warning-disabled',
    value: 'rgba(248, 171, 47, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-danger',
    value: '#b13606',
    type: 'color',
  },
  {
    name: '--cui-border-danger-hovered',
    value: '#bf3802',
    type: 'color',
  },
  {
    name: '--cui-border-danger-pressed',
    value: '#ad3302',
    type: 'color',
  },
  {
    name: '--cui-border-danger-disabled',
    value: 'rgba(255, 72, 0, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-promo',
    value: '#a63f9d',
    type: 'color',
  },
  {
    name: '--cui-border-promo-hovered',
    value: '#c150b7',
    type: 'color',
  },
  {
    name: '--cui-border-promo-pressed',
    value: '#e04fd4',
    type: 'color',
  },
  {
    name: '--cui-border-promo-disabled',
    value: 'rgba(237, 84, 224, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-brand',
    value: '#ff61f2',
    type: 'color',
  },
  {
    name: '--cui-border-brand-hovered',
    value: '#eb58df',
    type: 'color',
  },
  {
    name: '--cui-border-brand-pressed',
    value: '#da4ece',
    type: 'color',
  },
  {
    name: '--cui-border-brand-disabled',
    value: 'rgba(255, 97, 242, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-overlay',
    value: 'rgba(30, 28, 28, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-bg-elevated',
    value: '#fbfbf9',
    type: 'color',
  },
  {
    name: '--cui-border-focus',
    value: '#1e1c1c',
    type: 'color',
  },
] satisfies Token[];
