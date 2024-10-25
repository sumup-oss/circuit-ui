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

import { userEvent, within } from '@storybook/test';
import { ArrowSlanted, Info } from '@sumup-oss/icons';

import { Stack } from '../../../../.storybook/components/index';
import { IconButton } from '../Button/index';

import {
  Toggletip,
  type ToggletipProps,
  type ToggletipReferenceProps,
} from './Toggletip';

export default {
  title: 'Components/Toggletip',
  component: Toggletip,
};

const showToggletip = async ({
  canvasElement,
}: {
  canvasElement: HTMLCanvasElement;
}) => {
  const canvas = within(canvasElement);
  const referenceEl = canvas.getAllByRole('button');

  await userEvent.click(referenceEl[0]);
};

const wrapperStyle = { display: 'flex', gap: '4px', alignItems: 'center' };

export const Base = (args: ToggletipProps) => (
  <div style={wrapperStyle}>
    Chargeback
    <Toggletip
      {...args}
      component={(props) => (
        <IconButton {...props} icon={Info} variant="tertiary" size="s">
          View details
        </IconButton>
      )}
    />
  </div>
);

Base.args = {
  headline: 'What is a chargeback?',
  body: 'A chargeback is a return of money to a payer of a transaction, especially a credit card transaction.',
  action: {
    children: 'Learn more',
    navigationIcon: ArrowSlanted,
    href: 'https://help.sumup.com/en-US/articles/3ztthQLEXab3K0vUaQqgwx-chargeback-faq',
    target: '_blank',
  },
  offset: 8,
};

Base.play = showToggletip;

const ReferenceButton = (props: ToggletipReferenceProps) => (
  <IconButton {...props} icon={Info} variant="tertiary" size="s">
    View details
  </IconButton>
);

export const Placements = (args: ToggletipProps) => (
  <Stack>
    <Toggletip {...args} component={ReferenceButton} placement="left" />
    <Toggletip {...args} component={ReferenceButton} placement="bottom-start" />
    <Toggletip {...args} component={ReferenceButton} placement="right-end" />
  </Stack>
);

Placements.args = {
  headline: 'What is a chargeback?',
  body: 'A chargeback is a return of money to a payer of a transaction, especially a credit card transaction.',
  action: {
    children: 'Learn more',
    navigationIcon: ArrowSlanted,
    href: 'https://help.sumup.com/en-US/articles/3ztthQLEXab3K0vUaQqgwx-chargeback-faq',
    target: '_blank',
  },
  offset: 8,
};

Placements.play = showToggletip;
