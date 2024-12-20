/**
 * Copyright 2024, SumUp Ltd.
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

import { useState } from 'react';

import { Button } from '../../components/Button/index.js';
import { Stack } from '../../../../.storybook/components/index.js';

import { useScrollLock } from './useScrollLock.js';

export default {
  title: 'Hooks/useScrollLock',
  parameters: {
    chromatic: {
      layout: 'padded',
      disableSnapshot: true,
    },
  },
  tags: ['status:stable'],
};

export const Base = ({ height = '150vh' }) => {
  const [disableScroll, setDisableScroll] = useState(false);

  const toggleScroll = () => {
    setDisableScroll((prev) => !prev);
  };
  useScrollLock(disableScroll);

  return (
    <div
      style={{
        height,
        width: '50vw',
        backgroundColor: 'lightgray',
        padding: 'var(--cui-spacings-giga)',
      }}
    >
      <Stack>
        <Button onClick={toggleScroll}>
          {disableScroll ? 'Enable scroll' : 'Disable Scroll'} on this page
        </Button>
      </Stack>
    </div>
  );
};

export const ForDocs = () => Base({ height: 'unset' });
ForDocs.tags = ['!dev']; // hide story, used for docs only.
