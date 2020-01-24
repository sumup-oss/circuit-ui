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

import React from 'react';
import { action } from '@storybook/addon-actions';

import docs from './Message.docs.mdx';
import Message, { MessageIcon, MessageButton } from '.';
import Heading from '../Heading';
import Text from '../Text';
import Button from '../Button';

export default {
  title: 'Components/Message',
  component: Message,
  parameters: {
    docs: { page: docs },
    jest: ['Message']
  }
};

export const base = () => (
  <Message>
    <div>
      <Heading as="h4" size={Heading.KILO} noMargin>
        New Feature — Intelligent Reporting
      </Heading>
      <Text noMargin>
        Get automatic insights into your business statistics with one click.
      </Text>
    </div>
  </Message>
);

export const success = () => (
  <Message>
    <MessageIcon type={MessageIcon.SUCCESS} />
    <Heading size={Heading.KILO} as="h4" noMargin>
      Transaction successfully refunded
    </Heading>
  </Message>
);

export const warning = () => (
  <Message>
    <MessageIcon type={MessageIcon.WARNING} />
    <Heading size={Heading.KILO} as="h4" noMargin>
      You still need to verify your account
    </Heading>
    <MessageButton>
      <Button
        size={Button.KILO}
        onClick={e => {
          action('Button clicked')(e);
        }}
      >
        Verify account
      </Button>
    </MessageButton>
  </Message>
);

export const alert = () => (
  <Message>
    <MessageIcon type={MessageIcon.ERROR} />
    <Heading size={Heading.KILO} as="h4" noMargin>
      Your transaction has failed
    </Heading>
    <MessageButton>
      <Button
        size={Button.KILO}
        onClick={e => {
          action('Button clicked')(e);
        }}
      >
        Try again
      </Button>
    </MessageButton>
  </Message>
);
