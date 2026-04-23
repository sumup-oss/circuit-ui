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

export const consumer = [
  {
    name: '--cui-bg-normal',
    value: '#250723',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-hovered',
    value: '#34152f',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-pressed',
    value: '#3f1f39',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-disabled',
    value: 'rgba(47, 16, 43, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle',
    value: '#3a1037',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-hovered',
    value: '#40153c',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-pressed',
    value: '#44193e',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-disabled',
    value: 'rgba(58, 16, 55, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight',
    value: '#63215e',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-hovered',
    value: '#6b2966',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-pressed',
    value: '#73316e',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-disabled',
    value: 'rgba(99, 33, 94, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-strong',
    value: '#fbfbf9',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-hovered',
    value: '#eeede8',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-pressed',
    value: '#dfddd3',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-disabled',
    value: 'rgba(251, 251, 249, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent',
    value: '#3a1037',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-hovered',
    value: '#421839',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-pressed',
    value: '#4a2041',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-disabled',
    value: 'rgba(58, 16, 55, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong',
    value: '#fbfbf9',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-hovered',
    value: '#eeede8',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-pressed',
    value: '#dfddd3',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-disabled',
    value: 'rgba(251, 251, 249, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral',
    value: 'rgba(104, 79, 98, 0.3500)',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-hovered',
    value: '#4c4646',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-pressed',
    value: '#544e4e',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-disabled',
    value: 'rgba(68, 62, 62, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong',
    value: '#684f62',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-hovered',
    value: '#6e6262',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-pressed',
    value: '#796c6c',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-disabled',
    value: 'rgba(99, 87, 87, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success',
    value: 'rgba(32, 184, 57, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-hovered',
    value: 'rgba(37, 193, 63, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-pressed',
    value: 'rgba(43, 203, 69, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-disabled',
    value: 'rgba(32, 184, 57, 0.0000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong',
    value: '#89ec90',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-hovered',
    value: '#28cc44',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-pressed',
    value: '#30d84c',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-disabled',
    value: 'rgba(32, 184, 57, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning',
    value: 'rgba(242, 219, 47, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-hovered',
    value: 'rgba(255, 178, 51, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-pressed',
    value: 'rgba(255, 186, 55, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-disabled',
    value: 'rgba(248, 171, 47, 0.0000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong',
    value: '#efdf69',
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
    value: 'rgba(255, 75, 90, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-hovered',
    value: 'rgba(255, 81, 8, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-pressed',
    value: 'rgba(255, 87, 12, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-disabled',
    value: 'rgba(255, 76, 5, 0.0000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong',
    value: '#ff7d88',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-hovered',
    value: '#ff6122',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-pressed',
    value: '#ff753a',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-disabled',
    value: 'rgba(255, 76, 5, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo',
    value: 'rgba(255, 97, 242, 0.1800)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-hovered',
    value: '#ff65fa',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-pressed',
    value: '#ff69ff',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-disabled',
    value: 'rgba(255, 97, 242, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong',
    value: '#ffacf8',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-hovered',
    value: '#bb54b1',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-pressed',
    value: '#c366bb',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-disabled',
    value: 'rgba(179, 66, 169, 0.4000)',
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
    value: '#fbfbf9',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-hovered',
    value: '#fbfbf9',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-pressed',
    value: '#fbfbf9',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-disabled',
    value: 'rgba(251, 251, 249, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle',
    value: 'rgba(253, 234, 255, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-hovered',
    value: 'rgba(255, 255, 255, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-pressed',
    value: 'rgba(255, 255, 255, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-disabled',
    value: 'rgba(251, 251, 249, 0.0000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder',
    value: 'rgba(251, 251, 249, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-hovered',
    value: 'rgba(255, 255, 255, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-pressed',
    value: 'rgba(255, 255, 255, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-disabled',
    value: 'rgba(251, 251, 249, 0.0000)',
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
    value: 'rgba(30, 28, 28, 0.6000)',
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
    value: '#fbfbf9',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-hovered',
    value: '#d2d0ca',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-pressed',
    value: '#b8b6b2',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-disabled',
    value: 'rgba(251, 251, 249, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral',
    value: '#ccbdc6',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-hovered',
    value: '#a89da4',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-pressed',
    value: '#b6abb2',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-disabled',
    value: 'rgba(154, 141, 148, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-success',
    value: '#37f1a4',
    type: 'color',
  },
  {
    name: '--cui-fg-success-hovered',
    value: '#47feb6',
    type: 'color',
  },
  {
    name: '--cui-fg-success-pressed',
    value: '#57ffc8',
    type: 'color',
  },
  {
    name: '--cui-fg-success-disabled',
    value: 'rgba(55, 241, 164, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-warning',
    value: '#e8e538',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-hovered',
    value: '#f3fe58',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-pressed',
    value: '#f5ff76',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-disabled',
    value: 'rgba(241, 238, 55, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-danger',
    value: '#ff5866',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-hovered',
    value: '#fd6e72',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-pressed',
    value: '#fd8086',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-disabled',
    value: 'rgba(253, 90, 93, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-promo',
    value: '#ff7bf4',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-hovered',
    value: '#bb54b2',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-pressed',
    value: '#c366ba',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-disabled',
    value: 'rgba(179, 66, 169, 0.4000)',
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
    value: 'rgba(251, 251, 249, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-normal-hovered',
    value: 'rgba(255, 255, 255, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-normal-pressed',
    value: 'rgba(255, 255, 255, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-normal-disabled',
    value: 'rgba(251, 251, 249, 0.0000)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle',
    value: 'rgba(251, 251, 249, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-hovered',
    value: 'rgba(255, 255, 255, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-pressed',
    value: 'rgba(255, 255, 255, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-disabled',
    value: 'rgba(251, 251, 249, 0.0000)',
    type: 'color',
  },
  {
    name: '--cui-border-divider',
    value: 'rgba(251, 251, 249, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-border-divider-hovered',
    value: 'rgba(255, 255, 255, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-divider-pressed',
    value: 'rgba(255, 255, 255, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-divider-disabled',
    value: 'rgba(251, 251, 249, 0.0000)',
    type: 'color',
  },
  {
    name: '--cui-border-strong',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-border-strong-hovered',
    value: '#d3d2c5',
    type: 'color',
  },
  {
    name: '--cui-border-strong-pressed',
    value: '#c3c1b4',
    type: 'color',
  },
  {
    name: '--cui-border-strong-disabled',
    value: 'rgba(227, 226, 214, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-border-accent',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-border-accent-hovered',
    value: '#a7a294',
    type: 'color',
  },
  {
    name: '--cui-border-accent-pressed',
    value: '#8d887c',
    type: 'color',
  },
  {
    name: '--cui-border-accent-disabled',
    value: 'rgba(208, 205, 195, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-success',
    value: '#37f1a4',
    type: 'color',
  },
  {
    name: '--cui-border-success-hovered',
    value: '#47feb6',
    type: 'color',
  },
  {
    name: '--cui-border-success-pressed',
    value: '#57ffc8',
    type: 'color',
  },
  {
    name: '--cui-border-success-disabled',
    value: 'rgba(55, 241, 164, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-warning',
    value: '#f1ee37',
    type: 'color',
  },
  {
    name: '--cui-border-warning-hovered',
    value: '#f3fe58',
    type: 'color',
  },
  {
    name: '--cui-border-warning-pressed',
    value: '#f5ff76',
    type: 'color',
  },
  {
    name: '--cui-border-warning-disabled',
    value: 'rgba(241, 238, 55, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-danger',
    value: '#fd5a5d',
    type: 'color',
  },
  {
    name: '--cui-border-danger-hovered',
    value: '#fd6e72',
    type: 'color',
  },
  {
    name: '--cui-border-danger-pressed',
    value: '#fd8086',
    type: 'color',
  },
  {
    name: '--cui-border-danger-disabled',
    value: 'rgba(253, 90, 93, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-promo',
    value: '#b342a9',
    type: 'color',
  },
  {
    name: '--cui-border-promo-hovered',
    value: '#bb54b2',
    type: 'color',
  },
  {
    name: '--cui-border-promo-pressed',
    value: '#c366ba',
    type: 'color',
  },
  {
    name: '--cui-border-promo-disabled',
    value: 'rgba(179, 66, 169, 0.4000)',
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
    value: 'rgba(35, 31, 35, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-bg-elevated',
    value: '#322430',
    type: 'color',
  },
  {
    name: '--cui-border-focus',
    value: '#fbfbf9',
    type: 'color',
  },
] satisfies Token[];
