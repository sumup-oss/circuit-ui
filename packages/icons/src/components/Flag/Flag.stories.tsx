/**
 * Copyright 2025, SumUp Ltd.
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
import { Flag, type FlagProps, FLAGS } from './Flag.js';

export default {
  title: 'Icons/Flag',
  component: Flag,
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

export const Base = () => {
  // eslint-disable-next-line compat/compat
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  function formatCountryName(countryCode: string) {
    if (countryCode === 'XX') {
      return 'Unknown';
    }
    if (countryCode === 'ES-CT') {
      return 'Catalonia';
    }
    return regionNames.of(countryCode);
  }

  return (
    <div style={LIST_STYLE}>
      {FLAGS.map((code) => (
        <div key={code} style={WRAPPER_STYLE}>
          <Flag key={code} countryCode={code} alt="" size="l" />
          <p>
            {formatCountryName(code)} ({code})
          </p>
        </div>
      ))}
    </div>
  );
};

Base.parameters = {
  chromatic: {
    modes: {
      // the theme does not impact flags
      dark: { disable: true },
      consumer: { disable: true },
    },
  },
};

export const Example = (args: FlagProps) => <Flag {...args} />;
Example.tags = ['!dev'];
Example.parameters = {
  chromatic: { disableSnapshot: true },
};
Example.args = {
  countryCode: 'PR',
  alt: 'Puerto Rico',
  size: 'l',
};
