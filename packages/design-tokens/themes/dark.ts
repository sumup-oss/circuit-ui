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
    'name': '--cui-bg-normal',
    'value': '#1e1c1c',
    'type': 'color',
  },
  {
    'name': '--cui-bg-normal-hovered',
    'value': '#332f2f',
    'type': 'color',
  },
  {
    'name': '--cui-bg-normal-pressed',
    'value': '#4a4444',
    'type': 'color',
  },
  {
    'name': '--cui-bg-normal-disabled',
    'value': 'rgba(227, 226, 214, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-subtle',
    'value': '#332f2f',
    'type': 'color',
  },
  {
    'name': '--cui-bg-subtle-hovered',
    'value': '#756c6c',
    'type': 'color',
  },
  {
    'name': '--cui-bg-subtle-pressed',
    'value': '#b7b0a9',
    'type': 'color',
  },
  {
    'name': '--cui-bg-subtle-disabled',
    'value': 'rgba(183, 176, 169, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-highlight',
    'value': '#443e3e',
    'type': 'color',
  },
  {
    'name': '--cui-bg-highlight-hovered',
    'value': '#605a5a',
    'type': 'color',
  },
  {
    'name': '--cui-bg-highlight-pressed',
    'value': '#756c6c',
    'type': 'color',
  },
  {
    'name': '--cui-bg-highlight-disabled',
    'value': 'rgba(117, 108, 108, 0.2000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-strong',
    'value': '#f0f1e7',
    'type': 'color',
  },
  {
    'name': '--cui-bg-strong-hovered',
    'value': '#e3e2d6',
    'type': 'color',
  },
  {
    'name': '--cui-bg-strong-pressed',
    'value': '#d0cdc3',
    'type': 'color',
  },
  {
    'name': '--cui-bg-strong-disabled',
    'value': 'rgba(227, 226, 214, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-accent',
    'value': '#332f2f',
    'type': 'color',
  },
  {
    'name': '--cui-bg-accent-hovered',
    'value': '#756c6c',
    'type': 'color',
  },
  {
    'name': '--cui-bg-accent-pressed',
    'value': '#b7b0a9',
    'type': 'color',
  },
  {
    'name': '--cui-bg-accent-disabled',
    'value': 'rgba(183, 176, 169, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-accent-strong',
    'value': '#f0f1e7',
    'type': 'color',
  },
  {
    'name': '--cui-bg-accent-strong-hovered',
    'value': '#d8d7c7',
    'type': 'color',
  },
  {
    'name': '--cui-bg-accent-strong-pressed',
    'value': '#c9c8b6',
    'type': 'color',
  },
  {
    'name': '--cui-bg-accent-strong-disabled',
    'value': 'rgba(227, 226, 214, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-success',
    'value': 'rgba(32, 184, 57, 0.2000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-success-hovered',
    'value': 'rgba(32, 184, 57, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-success-pressed',
    'value': 'rgba(32, 184, 57, 0.6000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-success-disabled',
    'value': 'rgba(32, 184, 57, 0.1000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-success-strong',
    'value': '#20b839',
    'type': 'color',
  },
  {
    'name': '--cui-bg-success-strong-hovered',
    'value': '#179d2d',
    'type': 'color',
  },
  {
    'name': '--cui-bg-success-strong-pressed',
    'value': '#118324',
    'type': 'color',
  },
  {
    'name': '--cui-bg-success-strong-disabled',
    'value': 'rgba(32, 184, 57, 0.1000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-warning',
    'value': 'rgba(248, 171, 47, 0.2000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-warning-hovered',
    'value': 'rgba(248, 171, 47, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-warning-pressed',
    'value': 'rgba(248, 171, 47, 0.6000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-warning-disabled',
    'value': 'rgba(248, 171, 47, 0.1000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-warning-strong',
    'value': '#f8ab2f',
    'type': 'color',
  },
  {
    'name': '--cui-bg-warning-strong-hovered',
    'value': '#e89c21',
    'type': 'color',
  },
  {
    'name': '--cui-bg-warning-strong-pressed',
    'value': '#d0850c',
    'type': 'color',
  },
  {
    'name': '--cui-bg-warning-strong-disabled',
    'value': 'rgba(248, 171, 47, 0.1000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-danger',
    'value': 'rgba(255, 76, 5, 0.3000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-danger-hovered',
    'value': '#e76942',
    'type': 'color',
  },
  {
    'name': '--cui-bg-danger-pressed',
    'value': '#cd5531',
    'type': 'color',
  },
  {
    'name': '--cui-bg-danger-disabled',
    'value': 'rgba(255, 132, 95, 0.2000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-danger-strong',
    'value': '#ff4c05',
    'type': 'color',
  },
  {
    'name': '--cui-bg-danger-strong-hovered',
    'value': '#e94201',
    'type': 'color',
  },
  {
    'name': '--cui-bg-danger-strong-pressed',
    'value': '#d24008',
    'type': 'color',
  },
  {
    'name': '--cui-bg-danger-strong-disabled',
    'value': 'rgba(255, 72, 0, 0.1000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-promo',
    'value': '#ff61f2',
    'type': 'color',
  },
  {
    'name': '--cui-bg-promo-hovered',
    'value': '#ec58e0',
    'type': 'color',
  },
  {
    'name': '--cui-bg-promo-pressed',
    'value': '#e04fd4',
    'type': 'color',
  },
  {
    'name': '--cui-bg-promo-disabled',
    'value': 'rgba(255, 97, 242, 0.1000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-promo-strong',
    'value': '#ed54e0',
    'type': 'color',
  },
  {
    'name': '--cui-bg-promo-strong-hovered',
    'value': '#df49d2',
    'type': 'color',
  },
  {
    'name': '--cui-bg-promo-strong-pressed',
    'value': '#c934bd',
    'type': 'color',
  },
  {
    'name': '--cui-bg-promo-strong-disabled',
    'value': 'rgba(237, 84, 224, 0.1000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-normal',
    'value': '#f0f1e7',
    'type': 'color',
  },
  {
    'name': '--cui-fg-normal-hovered',
    'value': '#e3e2d6',
    'type': 'color',
  },
  {
    'name': '--cui-fg-normal-pressed',
    'value': '#d0cdc3',
    'type': 'color',
  },
  {
    'name': '--cui-fg-normal-disabled',
    'value': 'rgba(227, 226, 214, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-subtle',
    'value': '#b7b0a9',
    'type': 'color',
  },
  {
    'name': '--cui-fg-subtle-hovered',
    'value': '#756c6c',
    'type': 'color',
  },
  {
    'name': '--cui-fg-subtle-pressed',
    'value': '#b7b0a9',
    'type': 'color',
  },
  {
    'name': '--cui-fg-subtle-disabled',
    'value': 'rgba(183, 176, 169, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-placeholder',
    'value': '#756c6c',
    'type': 'color',
  },
  {
    'name': '--cui-fg-placeholder-hovered',
    'value': '#584e4e',
    'type': 'color',
  },
  {
    'name': '--cui-fg-placeholder-pressed',
    'value': '#332f2f',
    'type': 'color',
  },
  {
    'name': '--cui-fg-placeholder-disabled',
    'value': 'rgba(117, 108, 108, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-on-strong',
    'value': '#1e1c1c',
    'type': 'color',
  },
  {
    'name': '--cui-fg-on-strong-hovered',
    'value': '#ffffff',
    'type': 'color',
  },
  {
    'name': '--cui-fg-on-strong-pressed',
    'value': '#ffffff',
    'type': 'color',
  },
  {
    'name': '--cui-fg-on-strong-disabled',
    'value': 'rgba(255, 255, 255, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-on-strong-subtle',
    'value': 'rgba(30, 28, 28, 0.7000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-on-strong-subtle-hovered',
    'value': 'rgba(255, 255, 255, 0.7000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-on-strong-subtle-pressed',
    'value': 'rgba(255, 255, 255, 0.7000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-on-strong-subtle-disabled',
    'value': 'rgba(255, 255, 255, 0.3000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-accent',
    'value': '#b9aead',
    'type': 'color',
  },
  {
    'name': '--cui-fg-accent-hovered',
    'value': '#968c8b',
    'type': 'color',
  },
  {
    'name': '--cui-fg-accent-pressed',
    'value': '#756c6c',
    'type': 'color',
  },
  {
    'name': '--cui-fg-accent-disabled',
    'value': 'rgba(185, 174, 173, 0.2000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-success',
    'value': '#1fbc3a',
    'type': 'color',
  },
  {
    'name': '--cui-fg-success-hovered',
    'value': '#18aa30',
    'type': 'color',
  },
  {
    'name': '--cui-fg-success-pressed',
    'value': '#16982c',
    'type': 'color',
  },
  {
    'name': '--cui-fg-success-disabled',
    'value': 'rgba(31, 188, 58, 0.2000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-warning',
    'value': '#df9d30',
    'type': 'color',
  },
  {
    'name': '--cui-fg-warning-hovered',
    'value': '#9d6814',
    'type': 'color',
  },
  {
    'name': '--cui-fg-warning-pressed',
    'value': '#8e5c0c',
    'type': 'color',
  },
  {
    'name': '--cui-fg-warning-disabled',
    'value': 'rgba(174, 121, 35, 0.2000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-danger',
    'value': '#ff845f',
    'type': 'color',
  },
  {
    'name': '--cui-fg-danger-hovered',
    'value': '#ce3c02',
    'type': 'color',
  },
  {
    'name': '--cui-fg-danger-pressed',
    'value': '#b93502',
    'type': 'color',
  },
  {
    'name': '--cui-fg-danger-disabled',
    'value': 'rgba(230, 65, 0, 0.1000)',
    'type': 'color',
  },
  {
    'name': '--cui-fg-promo',
    'value': '#ff61f2',
    'type': 'color',
  },
  {
    'name': '--cui-fg-promo-hovered',
    'value': '#ec58e0',
    'type': 'color',
  },
  {
    'name': '--cui-fg-promo-pressed',
    'value': '#e04fd4',
    'type': 'color',
  },
  {
    'name': '--cui-fg-promo-disabled',
    'value': 'rgba(255, 97, 242, 0.2000)',
    'type': 'color',
  },
  {
    'name': '--cui-border-normal',
    'value': '#756c6c',
    'type': 'color',
  },
  {
    'name': '--cui-border-normal-hovered',
    'value': '#d0cdc3',
    'type': 'color',
  },
  {
    'name': '--cui-border-normal-pressed',
    'value': '#b7b0a9',
    'type': 'color',
  },
  {
    'name': '--cui-border-normal-disabled',
    'value': 'rgba(227, 226, 214, 0.3000)',
    'type': 'color',
  },
  {
    'name': '--cui-border-subtle',
    'value': '#b7b0a9',
    'type': 'color',
  },
  {
    'name': '--cui-border-subtle-hovered',
    'value': '#e3e2d6',
    'type': 'color',
  },
  {
    'name': '--cui-border-subtle-pressed',
    'value': '#d0cdc3',
    'type': 'color',
  },
  {
    'name': '--cui-border-subtle-disabled',
    'value': 'rgba(240, 241, 231, 0.5000)',
    'type': 'color',
  },
  {
    'name': '--cui-border-divider',
    'value': '#514a4a',
    'type': 'color',
  },
  {
    'name': '--cui-border-divider-hovered',
    'value': '#e3e2d6',
    'type': 'color',
  },
  {
    'name': '--cui-border-divider-pressed',
    'value': '#d0cdc3',
    'type': 'color',
  },
  {
    'name': '--cui-border-divider-disabled',
    'value': 'rgba(240, 241, 231, 0.5000)',
    'type': 'color',
  },
  {
    'name': '--cui-border-strong',
    'value': '#e3e2d6',
    'type': 'color',
  },
  {
    'name': '--cui-border-strong-hovered',
    'value': '#d8d7c7',
    'type': 'color',
  },
  {
    'name': '--cui-border-strong-pressed',
    'value': '#c9c8b6',
    'type': 'color',
  },
  {
    'name': '--cui-border-strong-disabled',
    'value': 'rgba(227, 226, 214, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-border-accent',
    'value': '#d0cdc3',
    'type': 'color',
  },
  {
    'name': '--cui-border-accent-hovered',
    'value': '#b7b0a9',
    'type': 'color',
  },
  {
    'name': '--cui-border-accent-pressed',
    'value': '#756c6c',
    'type': 'color',
  },
  {
    'name': '--cui-border-accent-disabled',
    'value': 'rgba(208, 205, 195, 0.2000)',
    'type': 'color',
  },
  {
    'name': '--cui-border-success',
    'value': '#20b839',
    'type': 'color',
  },
  {
    'name': '--cui-border-success-hovered',
    'value': '#12a129',
    'type': 'color',
  },
  {
    'name': '--cui-border-success-pressed',
    'value': '#0f9024',
    'type': 'color',
  },
  {
    'name': '--cui-border-success-disabled',
    'value': 'rgba(32, 184, 57, 0.2000)',
    'type': 'color',
  },
  {
    'name': '--cui-border-warning',
    'value': '#f8ab2f',
    'type': 'color',
  },
  {
    'name': '--cui-border-warning-hovered',
    'value': '#e89c21',
    'type': 'color',
  },
  {
    'name': '--cui-border-warning-pressed',
    'value': '#d0850c',
    'type': 'color',
  },
  {
    'name': '--cui-border-warning-disabled',
    'value': 'rgba(248, 171, 47, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-border-danger',
    'value': '#ff4800',
    'type': 'color',
  },
  {
    'name': '--cui-border-danger-hovered',
    'value': '#bd2c19',
    'type': 'color',
  },
  {
    'name': '--cui-border-danger-pressed',
    'value': '#cc3a00',
    'type': 'color',
  },
  {
    'name': '--cui-border-danger-disabled',
    'value': 'rgba(255, 72, 0, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-border-promo',
    'value': '#ff61f2',
    'type': 'color',
  },
  {
    'name': '--cui-border-promo-hovered',
    'value': '#ec58e0',
    'type': 'color',
  },
  {
    'name': '--cui-border-promo-pressed',
    'value': '#e04fd4',
    'type': 'color',
  },
  {
    'name': '--cui-border-promo-disabled',
    'value': 'rgba(237, 84, 224, 0.4000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-overlay',
    'value': 'rgba(30, 28, 28, 0.6000)',
    'type': 'color',
  },
  {
    'name': '--cui-bg-elevated',
    'value': '#443e3e',
    'type': 'color',
  },
  {
    'name': '--cui-border-focus',
    'value': '#f0f1e7',
    'type': 'color',
  },
] satisfies Token[];
