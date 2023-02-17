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

import { css } from '@emotion/react';
import { action } from '@storybook/addon-actions';
import { Theme } from '@sumup/design-tokens';

import { ButtonGroup, ButtonGroupProps } from './ButtonGroup';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    // we don't want to center this story to be able to see the effects of the `align` prop
    layout: 'padded',
  },
};

export const Base = (args: ButtonGroupProps): JSX.Element => (
  <ButtonGroup {...args} />
);

Base.args = {
  actions: {
    primary: {
      children: 'Look again',
      onClick: action('Still empty'),
    },
    secondary: {
      children: 'Go elsewhere',
      href: 'https://sumup.com',
    },
  },
};

export const Alignment = (args: ButtonGroupProps): JSX.Element => (
  <div
    css={(theme: Theme) => css`
      display: flex;
      flex-direction: column;
      gap: ${theme.spacings.giga};
    `}
  >
    <ButtonGroup {...args} align="center" />
    <ButtonGroup {...args} align="left" />
    <ButtonGroup {...args} align="right" />
  </div>
);

Alignment.args = Base.args;
