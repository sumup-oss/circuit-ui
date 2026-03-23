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
    value: '#190618',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-hovered',
    value: '#30172c',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-pressed',
    value: '#45253f',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-disabled',
    value: 'rgba(227, 226, 214, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle',
    value: '#261525',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-hovered',
    value: '#7d5b76',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-pressed',
    value: '#ba9eb4',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-disabled',
    value: 'rgba(202, 182, 198, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight',
    value: '#4f374a',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-hovered',
    value: '#674b61',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-pressed',
    value: '#7b5c74',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-disabled',
    value: 'rgba(124, 93, 118, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-strong',
    value: '#fbfbf9',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-hovered',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-pressed',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-disabled',
    value: 'rgba(227, 226, 214, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent',
    value: '#382233',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-hovered',
    value: '#775c71',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-pressed',
    value: '#c09bb8',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-disabled',
    value: 'rgba(193, 184, 175, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong',
    value: '#f0f1e7',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-hovered',
    value: '#d8d7c7',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-pressed',
    value: '#c9c8b6',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-disabled',
    value: 'rgba(227, 226, 214, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral',
    value: '#443e3e',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-hovered',
    value: '#756c6c',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-pressed',
    value: '#b7b0a9',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-disabled',
    value: 'rgba(51, 47, 47, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong',
    value: '#635757',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-hovered',
    value: '#605a5a',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-pressed',
    value: '#756c6c',
    type: 'color',
  },
  {
    name: '--cui-bg-neutral-strong-disabled',
    value: 'rgba(117, 108, 108, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success',
    value: 'rgba(32, 184, 57, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-hovered',
    value: 'rgba(32, 184, 57, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-pressed',
    value: 'rgba(32, 184, 57, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-disabled',
    value: 'rgba(32, 184, 57, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong',
    value: '#20b839',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-hovered',
    value: '#179d2d',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-pressed',
    value: '#118324',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-disabled',
    value: 'rgba(32, 184, 57, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning',
    value: 'rgba(248, 171, 47, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-hovered',
    value: 'rgba(248, 171, 47, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-pressed',
    value: 'rgba(248, 171, 47, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-disabled',
    value: 'rgba(248, 171, 47, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong',
    value: '#f8ab2f',
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
    value: 'rgba(255, 76, 5, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-hovered',
    value: '#e76942',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-pressed',
    value: '#cd5531',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-disabled',
    value: 'rgba(255, 132, 95, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong',
    value: '#ff4c05',
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
    value: '#0bcbfb',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-hovered',
    value: '#0ab1db',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-pressed',
    value: '#0ab3de',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-disabled',
    value: 'rgba(11, 203, 251, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong',
    value: '#0bcbfb',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-hovered',
    value: '#0ab1db',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-pressed',
    value: '#0ab3de',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-disabled',
    value: 'rgba(11, 203, 251, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-bg-brand',
    value: '#ff61f2',
    type: 'color',
  },
  {
    name: '--cui-bg-brand-hovered',
    value: '#ff3def',
    type: 'color',
  },
  {
    name: '--cui-bg-brand-pressed',
    value: '#da4ece',
    type: 'color',
  },
  {
    name: '--cui-bg-brand-disabled',
    value: 'rgba(255, 97, 242, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-fg-normal',
    value: '#f0f1e7',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-hovered',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-pressed',
    value: '#332f2f',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-disabled',
    value: 'rgba(227, 226, 214, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle',
    value: '#c4b0bb',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-hovered',
    value: '#78656e',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-pressed',
    value: '#b29aae',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-disabled',
    value: 'rgba(183, 176, 169, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder',
    value: '#8c7783',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-hovered',
    value: '#584c53',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-pressed',
    value: '#2f262b',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-disabled',
    value: 'rgba(117, 108, 108, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong',
    value: '#22001c',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-hovered',
    value: '#30172c',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-pressed',
    value: '#45253f',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-disabled',
    value: 'rgba(227, 214, 225, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle',
    value: 'rgba(34, 0, 28, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-hovered',
    value: 'rgba(34, 0, 28, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-pressed',
    value: 'rgba(34, 0, 28, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-disabled',
    value: 'rgba(34, 0, 28, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-accent',
    value: '#b9aead',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-hovered',
    value: '#968c8b',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-pressed',
    value: '#756c6c',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-disabled',
    value: 'rgba(185, 174, 173, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral',
    value: '#9a8d94',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-hovered',
    value: '#584e4e',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-pressed',
    value: '#332f2f',
    type: 'color',
  },
  {
    name: '--cui-fg-neutral-disabled',
    value: 'rgba(117, 108, 108, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-fg-success',
    value: '#1fbc3a',
    type: 'color',
  },
  {
    name: '--cui-fg-success-hovered',
    value: '#18aa30',
    type: 'color',
  },
  {
    name: '--cui-fg-success-pressed',
    value: '#16982c',
    type: 'color',
  },
  {
    name: '--cui-fg-success-disabled',
    value: 'rgba(31, 188, 58, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-fg-warning',
    value: '#df9d30',
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
    value: '#ff845f',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-hovered',
    value: '#ce3c02',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-pressed',
    value: '#b93502',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-disabled',
    value: 'rgba(230, 65, 0, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-fg-promo',
    value: '#0bcbfb',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-hovered',
    value: '#0ab1db',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-pressed',
    value: '#0ab3de',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-disabled',
    value: 'rgba(11, 203, 251, 0.2000)',
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
    value: 'rgba(255, 97, 242, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-border-normal',
    value: '#70626e',
    type: 'color',
  },
  {
    name: '--cui-border-normal-hovered',
    value: '#544a53',
    type: 'color',
  },
  {
    name: '--cui-border-normal-pressed',
    value: '#3b343a',
    type: 'color',
  },
  {
    name: '--cui-border-normal-disabled',
    value: 'rgba(112, 98, 110, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle',
    value: '#40333a',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-hovered',
    value: '#2e252a',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-pressed',
    value: '#241d21',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-disabled',
    value: 'rgba(64, 51, 58, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-border-divider',
    value: '#40333a',
    type: 'color',
  },
  {
    name: '--cui-border-divider-hovered',
    value: '#2e252a',
    type: 'color',
  },
  {
    name: '--cui-border-divider-pressed',
    value: '#241d21',
    type: 'color',
  },
  {
    name: '--cui-border-divider-disabled',
    value: 'rgba(64, 51, 58, 0.5000)',
    type: 'color',
  },
  {
    name: '--cui-border-strong',
    value: '#e3e2d6',
    type: 'color',
  },
  {
    name: '--cui-border-strong-hovered',
    value: '#d8d7c7',
    type: 'color',
  },
  {
    name: '--cui-border-strong-pressed',
    value: '#c9c8b6',
    type: 'color',
  },
  {
    name: '--cui-border-strong-disabled',
    value: 'rgba(227, 226, 214, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-accent',
    value: '#d0cdc3',
    type: 'color',
  },
  {
    name: '--cui-border-accent-hovered',
    value: '#b7b0a9',
    type: 'color',
  },
  {
    name: '--cui-border-accent-pressed',
    value: '#756c6c',
    type: 'color',
  },
  {
    name: '--cui-border-accent-disabled',
    value: 'rgba(208, 205, 195, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-border-success',
    value: '#20b839',
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
    value: '#f8ab2f',
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
    value: '#ff4800',
    type: 'color',
  },
  {
    name: '--cui-border-danger-hovered',
    value: '#bd2c19',
    type: 'color',
  },
  {
    name: '--cui-border-danger-pressed',
    value: '#cc3a00',
    type: 'color',
  },
  {
    name: '--cui-border-danger-disabled',
    value: 'rgba(255, 72, 0, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-border-promo',
    value: '#0bcbfb',
    type: 'color',
  },
  {
    name: '--cui-border-promo-hovered',
    value: '#0ab1db',
    type: 'color',
  },
  {
    name: '--cui-border-promo-pressed',
    value: '#0ab3de',
    type: 'color',
  },
  {
    name: '--cui-border-promo-disabled',
    value: 'rgba(11, 203, 251, 0.4000)',
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
    value: 'rgba(255, 97, 242, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-overlay',
    value: 'rgba(35, 31, 35, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-bg-elevated',
    value: '#473143',
    type: 'color',
  },
  {
    name: '--cui-border-focus',
    value: '#f0f1e7',
    type: 'color',
  },
] satisfies Token[];
