/**
 * Copyright 2019, SumUp Ltd.
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

import { ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';

import { Stack } from '../../../../.storybook/components';
import Button from '../Button';

import docs from './Theming.docs.mdx';

export default {
  title: 'Features/Theming',
  parameters: {
    docs: { page: docs },
  },
};

export const Base = () => (
  <Stack>
    <Button variant="primary">A default primary button</Button>
    <ThemeProvider
      theme={{
        ...light,
        colors: {
          ...light.colors,
          background: {
            ...light.colors.background,
            accent: {
              idle: 'black',
              hover: '#333',
              active: '#333',
            },
          },
          border: {
            ...light.colors.border,
            accent: {
              idle: 'black',
              hover: '#333',
              active: '#333',
            },
          },
        },
      }}
    >
      <Button variant="primary">A custom primary button</Button>
    </ThemeProvider>
  </Stack>
);

Base.args = {};
