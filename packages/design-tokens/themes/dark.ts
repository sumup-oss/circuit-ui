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
    name: '--cui-bg-normal',
    value: '#000000',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-hovered',
    value: '#0f0e0c',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-pressed',
    value: '#1a1816',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-disabled',
    value: 'rgba(10, 9, 8, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle',
    value: '#141311',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-hovered',
    value: '#1a1816',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-pressed',
    value: '#1e1c18',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-disabled',
    value: 'rgba(20, 19, 17, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight',
    value: '#1e1c18',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-hovered',
    value: '#262420',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-pressed',
    value: '#2e2c28',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-disabled',
    value: 'rgba(30, 28, 24, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-strong',
    value: '#f5f4ed',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-hovered',
    value: '#e8e6dc',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-pressed',
    value: '#d9d6c7',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-disabled',
    value: 'rgba(245, 244, 237, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent',
    value: '#1a1816',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-hovered',
    value: '#222018',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-pressed',
    value: '#2a2820',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-disabled',
    value: 'rgba(26, 24, 22, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong',
    value: '#f5f4ed',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-hovered',
    value: '#e8e6dc',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-pressed',
    value: '#d9d6c7',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-disabled',
    value: 'rgba(245, 244, 237, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral',
    value: '#2b2927',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-hovered',
    value: '#201f1e',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-pressed',
    value: '#282726',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-disabled',
    value: 'rgba(24, 23, 22, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong',
    value: '#555149',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-hovered',
    value: '#605c54',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-pressed',
    value: '#6b665e',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-disabled',
    value: 'rgba(85, 81, 73, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success',
    value: '#122913',
    type: 'color',
  },
  {
    name: '--cui-bg-success-hovered',
    value: '#122814',
    type: 'color',
  },
  {
    name: '--cui-bg-success-pressed',
    value: '#18321a',
    type: 'color',
  },
  {
    name: '--cui-bg-success-disabled',
    value: 'rgba(13, 31, 14, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong',
    value: '#2db843',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-hovered',
    value: '#35cc4e',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-pressed',
    value: '#3dd856',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-disabled',
    value: 'rgba(45, 184, 67, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning',
    value: '#39260f',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-hovered',
    value: '#281c0c',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-pressed',
    value: '#302410',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-disabled',
    value: 'rgba(31, 21, 8, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong',
    value: '#f8ab2f',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-hovered',
    value: '#fabb50',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-pressed',
    value: '#fcc96e',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-disabled',
    value: 'rgba(248, 171, 47, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger',
    value: '#3c1e13',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-hovered',
    value: '#28140c',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-pressed',
    value: '#301a10',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-disabled',
    value: 'rgba(31, 15, 9, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong',
    value: '#ff6b33',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-hovered',
    value: '#ff8050',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-pressed',
    value: '#ff9468',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-disabled',
    value: 'rgba(255, 107, 51, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo',
    value: '#30182d',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-hovered',
    value: '#221020',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-pressed',
    value: '#2a1428',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-disabled',
    value: 'rgba(26, 12, 24, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong',
    value: '#d464ca',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-hovered',
    value: '#dc76d2',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-pressed',
    value: '#e488dc',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-disabled',
    value: 'rgba(212, 100, 202, 0.4000)',
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
    value: 'rgba(255, 97, 242, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-normal',
    value: '#f0eee7',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-hovered',
    value: '#f0eee7',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-pressed',
    value: '#f0eee7',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-disabled',
    value: 'rgba(240, 238, 231, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle',
    value: '#9b9590',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-hovered',
    value: '#ada8a2',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-pressed',
    value: '#c0bbb5',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-disabled',
    value: 'rgba(155, 149, 144, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder',
    value: '#706b65',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-hovered',
    value: '#807b75',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-pressed',
    value: '#8a8580',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-disabled',
    value: 'rgba(112, 107, 101, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong',
    value: '#1e1c1c',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-hovered',
    value: '#1e1c1c',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-pressed',
    value: '#1e1c1c',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-disabled',
    value: 'rgba(30, 28, 28, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle',
    value: 'rgba(30, 28, 28, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-hovered',
    value: '#3a3635',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-pressed',
    value: '#3a3635',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-disabled',
    value: 'rgba(58, 54, 53, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-accent',
    value: '#f0eee7',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-hovered',
    value: '#c7c3b8',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-pressed',
    value: '#ada9a0',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-disabled',
    value: 'rgba(240, 238, 231, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral',
    value: '#a09894',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-hovered',
    value: '#aea8a4',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-pressed',
    value: '#bcb6b2',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-disabled',
    value: 'rgba(160, 152, 148, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-success',
    value: '#5abf2e',
    type: 'color',
  },
  {
    name: '--cui-fg-success-hovered',
    value: '#6acc40',
    type: 'color',
  },
  {
    name: '--cui-fg-success-pressed',
    value: '#7ad852',
    type: 'color',
  },
  {
    name: '--cui-fg-success-disabled',
    value: 'rgba(90, 191, 46, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-warning',
    value: '#f8ab2f',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-hovered',
    value: '#fabb50',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-pressed',
    value: '#fcc96e',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-disabled',
    value: 'rgba(248, 171, 47, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-danger',
    value: '#ff7a47',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-hovered',
    value: '#ff8e5c',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-pressed',
    value: '#ffa070',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-disabled',
    value: 'rgba(255, 122, 71, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-promo',
    value: '#d87ccf',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-hovered',
    value: '#e08ed8',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-pressed',
    value: '#e8a0e0',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-disabled',
    value: 'rgba(216, 124, 207, 0.4000)',
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
    value: 'rgba(255, 97, 242, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-normal',
    value: '#302d28',
    type: 'color',
  },
  {
    name: '--cui-border-normal-hovered',
    value: '#3a3730',
    type: 'color',
  },
  {
    name: '--cui-border-normal-pressed',
    value: '#454238',
    type: 'color',
  },
  {
    name: '--cui-border-normal-disabled',
    value: 'rgba(48, 45, 40, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle',
    value: '#221f1b',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-hovered',
    value: '#2c2923',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-pressed',
    value: '#36332c',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-disabled',
    value: 'rgba(34, 31, 27, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-divider',
    value: '#171614',
    type: 'color',
  },
  {
    name: '--cui-border-divider-hovered',
    value: '#201e1a',
    type: 'color',
  },
  {
    name: '--cui-border-divider-pressed',
    value: '#2a2822',
    type: 'color',
  },
  {
    name: '--cui-border-divider-disabled',
    value: 'rgba(23, 22, 20, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-strong',
    value: '#f0eee7',
    type: 'color',
  },
  {
    name: '--cui-border-strong-hovered',
    value: '#e0ded6',
    type: 'color',
  },
  {
    name: '--cui-border-strong-pressed',
    value: '#d0cdc5',
    type: 'color',
  },
  {
    name: '--cui-border-strong-disabled',
    value: 'rgba(240, 238, 231, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-border-accent',
    value: '#f0eee7',
    type: 'color',
  },
  {
    name: '--cui-border-accent-hovered',
    value: '#c7c3b8',
    type: 'color',
  },
  {
    name: '--cui-border-accent-pressed',
    value: '#ada9a0',
    type: 'color',
  },
  {
    name: '--cui-border-accent-disabled',
    value: 'rgba(240, 238, 231, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-success',
    value: '#5abf2e',
    type: 'color',
  },
  {
    name: '--cui-border-success-hovered',
    value: '#6acc40',
    type: 'color',
  },
  {
    name: '--cui-border-success-pressed',
    value: '#7ad852',
    type: 'color',
  },
  {
    name: '--cui-border-success-disabled',
    value: 'rgba(90, 191, 46, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-warning',
    value: '#f8ab2f',
    type: 'color',
  },
  {
    name: '--cui-border-warning-hovered',
    value: '#fabb50',
    type: 'color',
  },
  {
    name: '--cui-border-warning-pressed',
    value: '#fcc96e',
    type: 'color',
  },
  {
    name: '--cui-border-warning-disabled',
    value: 'rgba(248, 171, 47, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-danger',
    value: '#ff7a47',
    type: 'color',
  },
  {
    name: '--cui-border-danger-hovered',
    value: '#ff8e5c',
    type: 'color',
  },
  {
    name: '--cui-border-danger-pressed',
    value: '#ffa070',
    type: 'color',
  },
  {
    name: '--cui-border-danger-disabled',
    value: 'rgba(255, 122, 71, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-promo',
    value: '#d87ccf',
    type: 'color',
  },
  {
    name: '--cui-border-promo-hovered',
    value: '#e08ed8',
    type: 'color',
  },
  {
    name: '--cui-border-promo-pressed',
    value: '#e8a0e0',
    type: 'color',
  },
  {
    name: '--cui-border-promo-disabled',
    value: 'rgba(216, 124, 207, 0.4000)',
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
    value: 'rgba(0, 0, 0, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-bg-elevated',
    value: '#1a1916',
    type: 'color',
  },
  {
    name: '--cui-border-focus',
    value: '#f0eee7',
    type: 'color',
  },
] satisfies Token[];
