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

import { Stack } from '../../../../.storybook/components/index.js';

import { TierIndicator, type TierIndicatorProps } from './TierIndicator.js';

export default {
  title: 'Brand/TierIndicator',
  component: TierIndicator,
  tags: ['status:stable'],
};

export const Base = (args: TierIndicatorProps) => <TierIndicator {...args} />;

export const Sizes = (args: TierIndicatorProps) => (
  <dl
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 'var(--cui-spacings-giga)',
    }}
  >
    <Stack key="small">
      <dt>
        Size <strong>s</strong>:
      </dt>
      <dd>
        <TierIndicator {...args} size="s" />
      </dd>
    </Stack>
    <Stack key="medium">
      <dt>
        Size <strong>m</strong>:
      </dt>
      <dd>
        <TierIndicator {...args} size="m" />
      </dd>
    </Stack>
    <Stack key="large">
      <dt>
        {' '}
        Size <strong>l</strong>:
      </dt>
      <dd>
        <TierIndicator {...args} size="l" />
      </dd>
    </Stack>
  </dl>
);
