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

export const dark = [
  {
    name: '--cui-┅-border-accent',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-┅-border-danger',
    value: '#de331d',
    type: 'color',
  },
  {
    name: '--cui-┅-border-divider',
    value: '#454954',
    type: 'color',
  },
  {
    name: '--cui-┅-border-focus',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-┅-border-normal',
    value: '#454954',
    type: 'color',
  },
  {
    name: '--cui-┅-border-promo',
    value: '#ae49de',
    type: 'color',
  },
  {
    name: '--cui-┅-border-strong',
    value: '#4e5155',
    type: 'color',
  },
  {
    name: '--cui-┅-border-subtle',
    value: '#2c3038',
    type: 'color',
  },
  {
    name: '--cui-┅-border-success',
    value: '#39c57a',
    type: 'color',
  },
  {
    name: '--cui-┅-border-warning',
    value: '#e87c00',
    type: 'color',
  },
  {
    name: '--cui-bg-accent',
    value: '#181d22',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-disabled',
    value: 'rgba(238, 240, 242, 0.4000)',
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
    name: '--cui-bg-accent-strong',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-disabled',
    value: 'rgba(15, 19, 26, 0.4000)',
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
    name: '--cui-bg-danger',
    value: '#5e181d',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-disabled',
    value: 'rgba(251, 233, 231, 0.4000)',
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
    name: '--cui-bg-danger-strong',
    value: '#de331d',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-disabled',
    value: 'rgba(222, 51, 29, 0.4000)',
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
    name: '--cui-bg-elevated',
    value: '#2d343a',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight',
    value: '#383f46',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-disabled',
    value: 'rgba(227, 231, 235, 0.4000)',
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
    name: '--cui-bg-normal',
    value: '#0a0e12',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-disabled',
    value: 'rgba(255, 255, 255, 0.4000)',
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
    name: '--cui-bg-overlay',
    value: 'rgba(0, 0, 0, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo',
    value: '#f5edfe',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-disabled',
    value: 'rgba(245, 237, 254, 0.4000)',
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
    name: '--cui-bg-promo-strong',
    value: '#ae49de',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-disabled',
    value: 'rgba(158, 51, 224, 0.4000)',
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
    name: '--cui-bg-strong',
    value: '#2d343a',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-disabled',
    value: 'rgba(15, 19, 26, 0.4000)',
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
    name: '--cui-bg-subtle',
    value: '#181d22',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-disabled',
    value: 'rgba(227, 231, 235, 0.4000)',
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
    name: '--cui-bg-success',
    value: '#044022',
    type: 'color',
  },
  {
    name: '--cui-bg-success-disabled',
    value: 'rgba(233, 251, 233, 0.4000)',
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
    name: '--cui-bg-success-strong',
    value: '#39c57a',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-disabled',
    value: 'rgba(1, 136, 80, 0.4000)',
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
    name: '--cui-bg-warning',
    value: '#593918',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-disabled',
    value: 'rgba(253, 244, 219, 0.4000)',
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
    name: '--cui-bg-warning-strong',
    value: '#f9d20a',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-disabled',
    value: 'rgba(232, 124, 0, 0.4000)',
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
    name: '--cui-border-accent-disabled',
    value: 'rgba(15, 19, 26, 0.4000)',
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
    name: '--cui-border-danger-disabled',
    value: 'rgba(222, 51, 29, 0.4000)',
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
    name: '--cui-border-divider-disabled',
    value: 'rgba(194, 201, 209, 0.4000)',
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
    name: '--cui-border-normal-disabled',
    value: 'rgba(194, 201, 209, 0.4000)',
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
    name: '--cui-border-promo-disabled',
    value: 'rgba(158, 51, 224, 0.4000)',
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
    name: '--cui-border-strong-disabled',
    value: 'rgba(15, 19, 26, 0.4000)',
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
    name: '--cui-border-subtle-disabled',
    value: 'rgba(230, 230, 230, 0.4000)',
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
    name: '--cui-border-success-disabled',
    value: 'rgba(1, 136, 80, 0.4000)',
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
    name: '--cui-border-warning-disabled',
    value: 'rgba(226, 121, 0, 0.4000)',
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
    name: '--cui-fg-accent',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-disabled',
    value: 'rgba(15, 19, 26, 0.4000)',
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
    name: '--cui-fg-danger',
    value: '#de331d',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-disabled',
    value: 'rgba(222, 51, 29, 0.4000)',
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
    name: '--cui-fg-normal',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-disabled',
    value: 'rgba(15, 19, 26, 0.4000)',
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
    name: '--cui-fg-on-strong',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-disabled',
    value: 'rgba(255, 255, 255, 0.4000)',
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
    name: '--cui-fg-on-strong-subtle',
    value: 'rgba(15, 19, 26, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-disabled',
    value: 'rgba(255, 255, 255, 0.3000)',
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
    name: '--cui-fg-placeholder',
    value: '#6e747a',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-disabled',
    value: 'rgba(157, 167, 177, 0.4000)',
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
    name: '--cui-fg-promo',
    value: '#ae49de',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-disabled',
    value: 'rgba(158, 51, 224, 0.4000)',
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
    name: '--cui-fg-subtle',
    value: '#8f969d',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-disabled',
    value: 'rgba(106, 115, 124, 0.4000)',
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
    name: '--cui-fg-success',
    value: '#39c57a',
    type: 'color',
  },
  {
    name: '--cui-fg-success-disabled',
    value: 'rgba(1, 136, 80, 0.4000)',
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
    name: '--cui-fg-warning',
    value: '#f9d20a',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-disabled',
    value: 'rgba(226, 121, 0, 0.4000)',
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
] satisfies Token[];
