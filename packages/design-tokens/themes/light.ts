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
    value: '#f0f1e7',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-pressed',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-disabled',
    value: 'rgba(227, 226, 214, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle',
    value: '#f0f1e7',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-hovered',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-pressed',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-disabled',
    value: 'rgba(240, 241, 231, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-hovered',
    value: '#b7b0a9',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-pressed',
    value: '#756c6c',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-disabled',
    value: 'rgba(117, 108, 108, 0.2000)',
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
    value: 'rgba(23, 29, 36, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-hovered',
    value: '#d8d7c7',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-pressed',
    value: '#c9c8b6',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-disabled',
    value: 'rgba(227, 226, 214, 0.4000)',
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
    value: '#756c6c',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-disabled',
    value: 'rgba(51, 47, 47, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success',
    value: '#edf9ef',
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
    value: 'rgba(237, 249, 239, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong',
    value: '#1ba532',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-hovered',
    value: '#12a129',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-pressed',
    value: '#0f9024',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-disabled',
    value: 'rgba(32, 184, 57, 0.1000)',
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
    value: 'rgba(254, 238, 213, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong',
    value: '#d37101',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-hovered',
    value: '#e89c21',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-pressed',
    value: '#d0850c',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-disabled',
    value: 'rgba(248, 171, 47, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger',
    value: '#ffdacc',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-hovered',
    value: '#f3ccbe',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-pressed',
    value: '#f3ccbe',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-disabled',
    value: 'rgba(255, 218, 204, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong',
    value: '#ed4b0b',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-hovered',
    value: '#e94201',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-pressed',
    value: '#d24008',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-disabled',
    value: 'rgba(255, 72, 0, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo',
    value: '#ffe4fd',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-hovered',
    value: '#ec58e0',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-pressed',
    value: '#e04fd4',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-disabled',
    value: 'rgba(255, 97, 242, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong',
    value: '#ff61f2',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-hovered',
    value: '#ec58e0',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-pressed',
    value: '#e04fd4',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-disabled',
    value: 'rgba(255, 97, 242, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-fg-normal',
    value: '#1e1c1c',
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
    value: 'rgba(15, 19, 26, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle',
    value: '#756c6c',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-hovered',
    value: '#9c948d',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-pressed',
    value: '#756c6c',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-disabled',
    value: 'rgba(183, 176, 169, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder',
    value: '#76716b',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-hovered',
    value: '#584e4e',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-pressed',
    value: '#332f2f',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-disabled',
    value: 'rgba(117, 108, 108, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong',
    value: '#fbfbf9',
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
    value: 'rgba(255, 255, 255, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle',
    value: 'rgba(251, 251, 249, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-hovered',
    value: 'rgba(255, 255, 255, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-pressed',
    value: 'rgba(255, 255, 255, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-disabled',
    value: 'rgba(255, 255, 255, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-accent',
    value: '#332f2f',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-hovered',
    value: '#1d1a1a',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-pressed',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-disabled',
    value: 'rgba(51, 47, 47, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-fg-success',
    value: '#1ba532',
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
    value: 'rgba(20, 126, 38, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-fg-warning',
    value: '#de7103',
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
    value: 'rgba(174, 121, 35, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-fg-danger',
    value: '#ed4b0b',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-hovered',
    value: '#ce3c02',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-pressed',
    value: '#ac3100',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-disabled',
    value: 'rgba(230, 65, 0, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-fg-promo',
    value: '#ff61f2',
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
    value: 'rgba(255, 97, 242, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-border-normal',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-border-normal-hovered',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-border-normal-pressed',
    value: '#b7b0a9',
    type: 'color',
  },
  {
    name: '--cui-border-normal-disabled',
    value: 'rgba(227, 226, 214, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-hovered',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-pressed',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-disabled',
    value: 'rgba(240, 241, 231, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-border-divider',
    value: '#e3e2d6',
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
    value: '#332f2f',
    type: 'color',
  },
  {
    name: '--cui-border-accent-hovered',
    value: '#1d1a1a',
    type: 'color',
  },
  {
    name: '--cui-border-accent-pressed',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-border-accent-disabled',
    value: 'rgba(51, 47, 47, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-border-success',
    value: '#1ba532',
    type: 'color',
  },
  {
    name: '--cui-border-success-hovered',
    value: '#12a129',
    type: 'color',
  },
  {
    name: '--cui-border-success-pressed',
    value: '#0f9024',
    type: 'color',
  },
  {
    name: '--cui-border-success-disabled',
    value: 'rgba(32, 184, 57, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-border-warning',
    value: '#df7000',
    type: 'color',
  },
  {
    name: '--cui-border-warning-hovered',
    value: '#e89c21',
    type: 'color',
  },
  {
    name: '--cui-border-warning-pressed',
    value: '#d0850c',
    type: 'color',
  },
  {
    name: '--cui-border-warning-disabled',
    value: 'rgba(248, 171, 47, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-danger',
    value: '#ed4b0b',
    type: 'color',
  },
  {
    name: '--cui-border-danger-hovered',
    value: '#ee4401',
    type: 'color',
  },
  {
    name: '--cui-border-danger-pressed',
    value: '#cc3a00',
    type: 'color',
  },
  {
    name: '--cui-border-danger-disabled',
    value: 'rgba(204, 58, 0, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-promo',
    value: '#ff61f2',
    type: 'color',
  },
  {
    name: '--cui-border-promo-hovered',
    value: '#ec58e0',
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
    name: '--cui-bg-overlay',
    value: 'rgba(0, 0, 0, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-elevated',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-border-focus',
    value: '#1e1c1c',
    type: 'color',
  },
] satisfies Token[];
