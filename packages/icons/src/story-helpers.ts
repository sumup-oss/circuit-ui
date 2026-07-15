/**
 * Copyright 2026, SumUp Ltd.
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

import type { CSSProperties } from 'react';

export const LIST_STYLE: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  rowGap: 'var(--cui-spacings-giga)',
  columnGap: 'var(--cui-spacings-giga)',
  width: '100vw',
  padding: 'var(--cui-spacings-mega)',
};

export const WRAPPER_STYLE: CSSProperties = {
  display: 'flex',
  gap: 'var(--cui-spacings-mega)',
  alignItems: 'center',
  justifyContent: 'start',
};

export function formatName(name: string): string {
  return name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
