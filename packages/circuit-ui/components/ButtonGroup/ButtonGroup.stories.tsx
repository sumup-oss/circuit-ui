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

import { action } from '@storybook/addon-actions';

import { ButtonGroup, ButtonGroupProps } from './ButtonGroup';

export default {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
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
