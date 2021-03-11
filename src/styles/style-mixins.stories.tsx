/**
 * Copyright 2021, SumUp Ltd.
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

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';

import Button from '../components/Button';

import docs from './style-mixins.docs.mdx';
import { spacing } from './style-mixins';

export default {
  title: 'Styles/Spacing Mixin',
  parameters: {
    docs: { page: docs },
  },
  argTypes: {
    top: {
      control: {
        type: 'select',
        options: ['mega', 'giga', 'kilo'],
      },
    },
    bottom: {
      control: {
        type: 'select',
        options: ['mega', 'giga', 'kilo'],
      },
    },
    right: {
      control: {
        type: 'select',
        options: ['mega', 'giga', 'kilo'],
      },
    },
    left: {
      control: {
        type: 'select',
        options: ['mega', 'giga', 'kilo'],
      },
    },
  },
};

const background = (theme: Theme) => css`
  background-color: ${theme.colors.n200};
`;

export const SpacingObjectOneSide = (args) => (
  <div css={background}>
    <Button css={spacing(args)}>Example</Button>
  </div>
);

SpacingObjectOneSide.args = { top: 'mega' };

export const SpacingObjectAllSides = (args) => (
  <div css={background}>
    <Button css={spacing(args)}>Example</Button>
  </div>
);

SpacingObjectAllSides.args = {
  top: 'mega',
  right: 'kilo',
  bottom: 'mega',
  left: 'kilo',
};

export const SpacingString = (args) => (
  <div css={background}>
    <Button css={spacing(args)}>Example</Button>
  </div>
);

SpacingString.argTypes = {
  size: {
    control: {
      type: 'select',
      options: ['mega', 'giga', 'kilo'],
    },
  },
};
