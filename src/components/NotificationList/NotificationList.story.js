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
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import NotificationList from './NotificationList';
import Message, { MessageButton, MessageIcon } from '../Message';
import Markdown from '../Markdown';
import Heading from '../Heading';
import Text from '../Text';
import CloseButton from '../CloseButton';

storiesOf(`${GROUPS.COMPONENTS}|NotificationList`, module)
  .addParameters({ jest: ['NotificationList'] })
  .add('Default NotificationList', () => (
    <NotificationList>
      <Message>
        <MessageIcon type={MessageIcon.SUCCESS} />
        <Heading size={Heading.KILO} element="h4" noMargin>
          Transaction successfully refunded
        </Heading>
      </Message>
      <Message>
        <MessageIcon type={MessageIcon.SUCCESS} />
        <Markdown
          overrides={{
            h1: {
              component: Heading,
              props: {
                as: 'h4',
                size: Heading.KILO,
                noMargin: true
              }
            },
            p: {
              component: Text,
              props: {
                noMargin: true
              }
            }
          }}
        >
          {`# New Feature — Intelligent Reporting\nGet automatic insights
                into your business statistics with one click.
                [Learn more here](#)`}
        </Markdown>
        <MessageButton align={MessageButton.TOP}>
          <CloseButton
            onClick={e => {
              action('Close button clicked')(e);
            }}
          />
        </MessageButton>
      </Message>
    </NotificationList>
  ));
