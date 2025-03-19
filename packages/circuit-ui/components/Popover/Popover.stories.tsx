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

import { type ReactNode, useState } from 'react';
import { NotificationCenter } from '@sumup-oss/icons';

import { IconButton } from '../Button/index.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';
import { Hr } from '../Hr/index.js';
import { modes } from '../../../../.storybook/modes.js';

import { Popover, type PopoverProps } from './Popover.js';

export default {
  title: 'Components/Popover',
  component: Popover,
  tags: ['status:stable'],
  chromatic: {
    modes: {
      mobile: modes.smallMobile,
      desktop: modes.desktop,
    },
    pauseAnimationAtEnd: true,
  },
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: { control: 'text' },
  },
};

const PopoverContent = (
  <div>
    <Headline as="h3" size="s">
      Notifications
    </Headline>
    <div>
      <Body as="p">Your monthly payment is due in 3 days 💸</Body>
      <Body as="p" size="s" color="subtle">
        3 hours ago
      </Body>
      <Hr />
      <Body as="p">Review and confirm your contact information.</Body>
      <Body as="p" size="s" color="subtle">
        16 hours ago
      </Body>
      <Hr />
      <Body as="p">Find out what&apos;s new in your app ✨</Body>
      <Body as="p" size="s" color="subtle">
        21 hours ago
      </Body>
    </div>
  </div>
);

function PopoverWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        height: '350px',
        width: '100%',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}
export const Base = (args: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <PopoverWrapper>
      <Popover
        {...args}
        isOpen={isOpen}
        onToggle={setIsOpen}
        component={(props) => (
          <IconButton
            size="s"
            variant="secondary"
            icon={NotificationCenter}
            {...props}
          >
            Notifications
          </IconButton>
        )}
      />
    </PopoverWrapper>
  );
};

Base.args = {
  children: PopoverContent,
};

export const Offset = (args: PopoverProps) => <Base {...args} />;

Offset.args = {
  children: PopoverContent,
  offset: 20,
};
