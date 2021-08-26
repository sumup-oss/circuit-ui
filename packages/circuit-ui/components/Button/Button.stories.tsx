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
import { Download } from '@sumup/icons';

import { Stack } from '../../../../.storybook/components';
import ButtonGroup from '../ButtonGroup';
import LoadingButton from '../LoadingButton';
import IconButton from '../IconButton';
import CloseButton from '../CloseButton';

import { Button, ButtonProps } from './Button';
import docs from './Button.docs.mdx';

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: { LoadingButton, IconButton, CloseButton, ButtonGroup },
  parameters: {
    docs: { page: docs },
  },
  argTypes: {
    children: { control: 'text' },
  },
};

export const Base = (args: ButtonProps) => <Button {...args} />;

Base.args = {
  onClick: () => alert('Hello'),
  children: `Say hello`,
};

export const Variants = (args: ButtonProps) => (
  <Stack>
    <Button {...args} variant="primary">
      Primary
    </Button>
    <Button {...args} variant="secondary">
      Secondary
    </Button>
    <Button {...args} variant="tertiary">
      Tertiary
    </Button>
  </Stack>
);

export const Destructive = (args: ButtonProps) => (
  <Stack>
    <Button {...args} variant="primary" destructive>
      Primary
    </Button>
    <Button {...args} variant="secondary" destructive>
      Secondary
    </Button>
    <Button {...args} variant="tertiary" destructive>
      Tertiary
    </Button>
  </Stack>
);

export const Sizes = (args: ButtonProps) => (
  <Stack>
    <Button {...args} size="kilo">
      Kilo
    </Button>
    <Button {...args} size="giga">
      Giga
    </Button>
  </Stack>
);

export const WithIcon = (args: ButtonProps) => (
  <Button {...args} icon={Download}>
    Like
  </Button>
);

export const Tracking = (args: ButtonProps) => (
  <Button
    {...args}
    onClick={action('Button Click')}
    tracking={{
      label: 'track-button',
      customParameters: { key: 'value' },
    }}
  >
    Track me
  </Button>
);
