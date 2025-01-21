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
    value: '#171d24',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-hovered',
    value: '#212831',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-pressed',
    value: '#28313c',
    type: 'color',
  },
  {
    name: '--cui-bg-normal-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle',
    value: '#0c0f12',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-hovered',
    value: '#212b31',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-pressed',
    value: '#36434a',
    type: 'color',
  },
  {
    name: '--cui-bg-subtle-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight',
    value: '#363c41',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-hovered',
    value: '#3d4249',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-pressed',
    value: '#424950',
    type: 'color',
  },
  {
    name: '--cui-bg-highlight-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-strong',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-hovered',
    value: '#f6f8f9',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-pressed',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-bg-strong-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent',
    value: '#0c0f12',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-hovered',
    value: '#20292e',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-pressed',
    value: '#313d43',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong',
    value: '#e1e7ef',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-hovered',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-pressed',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-bg-accent-strong-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-success',
    value: 'rgba(12, 211, 104, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-hovered',
    value: 'rgba(12, 211, 104, 0.2500)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-pressed',
    value: 'rgba(12, 211, 104, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong',
    value: '#0cd368',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-hovered',
    value: '#13e072',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-pressed',
    value: '#25e980',
    type: 'color',
  },
  {
    name: '--cui-bg-success-strong-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning',
    value: 'rgba(245, 158, 28, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-hovered',
    value: 'rgba(245, 158, 28, 0.2500)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-pressed',
    value: 'rgba(245, 158, 28, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong',
    value: '#f5b81c',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-hovered',
    value: '#f7c440',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-pressed',
    value: '#f7cb59',
    type: 'color',
  },
  {
    name: '--cui-bg-warning-strong-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger',
    value: 'rgba(255, 76, 53, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-hovered',
    value: 'rgba(255, 76, 53, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-pressed',
    value: 'rgba(255, 76, 53, 0.4000)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-disabled',
    value: 'rgba(255, 69, 60, 0.1300)',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong',
    value: '#ff4e37',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-hovered',
    value: '#ff6259',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-pressed',
    value: '#ff827b',
    type: 'color',
  },
  {
    name: '--cui-bg-danger-strong-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo',
    value: 'rgba(195, 83, 247, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-hovered',
    value: 'rgba(195, 83, 247, 0.2500)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-pressed',
    value: 'rgba(195, 83, 247, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong',
    value: '#c353f7',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-hovered',
    value: '#c768f3',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-pressed',
    value: '#ce72f8',
    type: 'color',
  },
  {
    name: '--cui-bg-promo-strong-disabled',
    value: 'rgba(216, 232, 248, 0.0800)',
    type: 'color',
  },
  {
    name: '--cui-fg-normal',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-hovered',
    value: 'rgba(255, 255, 255, 0.8000)',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-pressed',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-fg-normal-disabled',
    value: 'rgba(230, 224, 233, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle',
    value: 'rgba(223, 232, 241, 0.6000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-hovered',
    value: 'rgba(223, 232, 241, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-pressed',
    value: 'rgba(223, 232, 241, 0.8000)',
    type: 'color',
  },
  {
    name: '--cui-fg-subtle-disabled',
    value: 'rgba(216, 232, 248, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder',
    value: '#555D62',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-hovered',
    value: '#687278',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-pressed',
    value: '#7C878D',
    type: 'color',
  },
  {
    name: '--cui-fg-placeholder-disabled',
    value: 'rgba(85, 93, 98, 0.500)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-hovered',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-pressed',
    value: '#0f131a',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-disabled',
    value: 'rgba(216, 232, 248, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle',
    value: 'rgba(15, 19, 26, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-hovered',
    value: 'rgba(15, 19, 26, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-pressed',
    value: 'rgba(15, 19, 26, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-on-strong-subtle-disabled',
    value: 'rgba(216, 232, 248, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-fg-accent',
    value: '#e1e7ef',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-hovered',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-pressed',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-fg-accent-disabled',
    value: 'rgba(216, 232, 248, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-success',
    value: '#17db72',
    type: 'color',
  },
  {
    name: '--cui-fg-success-hovered',
    value: '#13e072',
    type: 'color',
  },
  {
    name: '--cui-fg-success-pressed',
    value: '#25e980',
    type: 'color',
  },
  {
    name: '--cui-fg-success-disabled',
    value: 'rgba(216, 232, 248, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-warning',
    value: '#f5b81c',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-hovered',
    value: '#f7c440',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-pressed',
    value: '#f7cb59',
    type: 'color',
  },
  {
    name: '--cui-fg-warning-disabled',
    value: 'rgba(216, 232, 248, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-fg-danger',
    value: '#ff634e',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-hovered',
    value: '#ff5c47',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-pressed',
    value: '#ff6a57',
    type: 'color',
  },
  {
    name: '--cui-fg-danger-disabled',
    value: 'rgba(255, 178, 167, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-fg-promo',
    value: '#cf7bf6',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-hovered',
    value: '#c768f3',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-pressed',
    value: '#ce72f8',
    type: 'color',
  },
  {
    name: '--cui-fg-promo-disabled',
    value: 'rgba(216, 232, 248, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-normal',
    value: 'rgba(223, 232, 241, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-normal-hovered',
    value: 'rgba(223, 232, 241, 0.3500)',
    type: 'color',
  },
  {
    name: '--cui-border-normal-pressed',
    value: 'rgba(223, 232, 241, 0.4500)',
    type: 'color',
  },
  {
    name: '--cui-border-normal-disabled',
    value: 'rgba(216, 232, 248, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle',
    value: 'rgba(223, 232, 241, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-hovered',
    value: 'rgba(223, 232, 241, 0.2000)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-pressed',
    value: 'rgba(223, 232, 241, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-subtle-disabled',
    value: 'rgba(216, 232, 248, 0.1000)',
    type: 'color',
  },
  {
    name: '--cui-border-divider',
    value: 'rgba(216, 232, 248, 0.3000)',
    type: 'color',
  },
  {
    name: '--cui-border-divider-hovered',
    value: 'rgba(223, 232, 241, 0.3500)',
    type: 'color',
  },
  {
    name: '--cui-border-divider-pressed',
    value: 'rgba(223, 232, 241, 0.4500)',
    type: 'color',
  },
  {
    name: '--cui-border-divider-disabled',
    value: 'rgba(216, 232, 248, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-border-strong',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-border-strong-hovered',
    value: '#f6f8f9',
    type: 'color',
  },
  {
    name: '--cui-border-strong-pressed',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-border-strong-disabled',
    value: 'rgba(216, 232, 248, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-border-accent',
    value: '#ffffff',
    type: 'color',
  },
  {
    name: '--cui-border-accent-hovered',
    value: '#f6f8f9',
    type: 'color',
  },
  {
    name: '--cui-border-accent-pressed',
    value: '#e3e7eb',
    type: 'color',
  },
  {
    name: '--cui-border-accent-disabled',
    value: 'rgba(216, 232, 248, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-border-success',
    value: '#0cd368',
    type: 'color',
  },
  {
    name: '--cui-border-success-hovered',
    value: '#13e072',
    type: 'color',
  },
  {
    name: '--cui-border-success-pressed',
    value: '#25e980',
    type: 'color',
  },
  {
    name: '--cui-border-success-disabled',
    value: 'rgba(216, 232, 248, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-border-warning',
    value: '#f5b81c',
    type: 'color',
  },
  {
    name: '--cui-border-warning-hovered',
    value: '#f7c440',
    type: 'color',
  },
  {
    name: '--cui-border-warning-pressed',
    value: '#f7cb59',
    type: 'color',
  },
  {
    name: '--cui-border-warning-disabled',
    value: 'rgba(216, 232, 248, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-border-danger',
    value: '#ff634e',
    type: 'color',
  },
  {
    name: '--cui-border-danger-hovered',
    value: '#ff5c47',
    type: 'color',
  },
  {
    name: '--cui-border-danger-pressed',
    value: '#ff6a57',
    type: 'color',
  },
  {
    name: '--cui-border-danger-disabled',
    value: 'rgba(255, 178, 167, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-border-promo',
    value: '#c353f7',
    type: 'color',
  },
  {
    name: '--cui-border-promo-hovered',
    value: '#c768f3',
    type: 'color',
  },
  {
    name: '--cui-border-promo-pressed',
    value: '#ce72f8',
    type: 'color',
  },
  {
    name: '--cui-border-promo-disabled',
    value: 'rgba(216, 232, 248, 0.1500)',
    type: 'color',
  },
  {
    name: '--cui-bg-overlay',
    value: 'rgba(0, 0, 0, 0.7000)',
    type: 'color',
  },
  {
    name: '--cui-bg-elevated',
    value: '#2f3438',
    type: 'color',
  },
  {
    name: '--cui-border-focus',
    value: '#ffffff',
    type: 'color',
  },
] satisfies Token[];
