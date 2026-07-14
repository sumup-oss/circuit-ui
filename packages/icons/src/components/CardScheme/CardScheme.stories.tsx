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
import {
  CardScheme,
  type CardSchemeProps,
  CARD_SCHEMES,
} from './CardScheme.js';

import { Body } from '@sumup-oss/circuit-ui';

export default {
  title: 'Components/CardScheme',
  component: CardScheme,
  tags: ['status:stable'],
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
  },
};

const LIST_STYLE: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  rowGap: 'var(--cui-spacings-giga)',
  columnGap: 'var(--cui-spacings-giga)',
  width: '100vw',
  padding: 'var(--cui-spacings-mega)',
};

const WRAPPER_STYLE: CSSProperties = {
  display: 'flex',
  gap: 'var(--cui-spacings-mega)',
  alignItems: 'center',
  justifyContent: 'start',
};

function formatName(name: string) {
  return name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const Base = () => (
  <div style={LIST_STYLE}>
    {CARD_SCHEMES.map((name) => (
      <div key={name} style={WRAPPER_STYLE}>
        <CardScheme name={name} alt="" size="l" />
        <Body>{formatName(name)}</Body>
      </div>
    ))}
  </div>
);

Base.parameters = {
  chromatic: {
    modes: {
      dark: { disable: true },
      consumer: { disable: true },
    },
  },
};

export const Example = (args: CardSchemeProps) => <CardScheme {...args} />;
Example.tags = ['!dev'];
Example.parameters = {
  chromatic: { disableSnapshot: true },
};
Example.args = {
  name: 'visa',
  alt: 'Visa',
  size: 'l',
};
