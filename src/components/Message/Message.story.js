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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import Message, { MessageIcon, MessageButton } from '.';
import Heading from '../Heading';
import Text from '../Text';
import Button from '../Button';

storiesOf(`${GROUPS.COMPONENTS}|Message`, module)
  .addParameters({ jest: ['Message'] })
  .add('Default Message', () => (
    <Message>
      <MessageIcon
        type={select(
          'Message type',
          [MessageIcon.SUCCESS, MessageIcon.ERROR, MessageIcon.WARNING],
          MessageIcon.SUCCESS
        )}
      />
      <Heading size={Heading.KILO} element="h4" margin={false}>
        Transaction successfully refunded
      </Heading>
    </Message>
  ))
  .add('Message with button', () => (
    <Message>
      <MessageIcon type={MessageIcon.SUCCESS} />
      <div>
        <Heading element="h4" size={Heading.KILO} margin={false}>
          New Feature — Intelligent Reporting
        </Heading>
        <Text margin={false}>
          Get automatic insights into your business statistics with one click.
        </Text>
      </div>
      <MessageButton>
        <Button
          size={Button.KILO}
          onClick={e => {
            action('Button clicked')(e);
          }}
        >
          Read more
        </Button>
      </MessageButton>
    </Message>
  ));
