/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

import Button from '../components/Button';

import docs from './style-mixins.docs.mdx';
import { spacing } from './style-mixins';

export default {
  title: 'Advanced/Style Mixins',
  parameters: {
    docs: { page: docs },
  },
};

const spaceOptions = {
  control: {
    type: 'select',
    options: [
      'bit',
      'byte',
      'kilo',
      'mega',
      'giga',
      'tera',
      'peta',
      'exa',
      'zetta',
    ],
  },
};

const background = () => css`
  background-color: #f8cb9c;
  display: inline-block;
`;

export const ApplySpacingOneSide = (args) => (
  <div css={background}>
    <Button css={spacing(args)}>Example</Button>
  </div>
);

ApplySpacingOneSide.args = { top: 'mega' };

ApplySpacingOneSide.argTypes = {
  top: spaceOptions,
};

export const ApplySpacingFourSides = (args) => (
  <div css={background}>
    <Button css={spacing(args)}>Example</Button>
  </div>
);

ApplySpacingFourSides.args = {
  top: 'mega',
  right: 'giga',
  bottom: 'mega',
  left: 'giga',
};

ApplySpacingFourSides.argTypes = {
  top: spaceOptions,
  bottom: spaceOptions,
  right: spaceOptions,
};

export const ApplySpacingAllSides = (args) => (
  <div css={background}>
    <Button css={spacing(args.size)}>Example</Button>
  </div>
);
ApplySpacingAllSides.args = { size: 'kilo' };
ApplySpacingAllSides.argTypes = {
  size: spaceOptions,
};

export const ResetSpacing = (args) => (
  <div css={background}>
    <Button css={spacing(args.size)}>Example</Button>
  </div>
);
ResetSpacing.args = { size: 'kilo' };
ResetSpacing.argTypes = {
  size: {
    control: {
      type: 'select',
      options: ['kilo', 0],
    },
  },
};
