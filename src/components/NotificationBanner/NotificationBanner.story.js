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
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import NotificationBanner from './NotificationBanner';
import Message, { MessageButton, MessageIcon } from '../Message';
import Markdown from '../Markdown';
import Heading from '../Heading';
import Text from '../Text';
import Button from '../Button';

storiesOf(`${GROUPS.COMPONENTS}|NotificationBanner`, module)
  .addDecorator(withTests('NotificationBanner'))
  .add(
    'Default NotificationBanner',
    withInfo()(() => (
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <NotificationBanner>
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
                into your business statistics with one click.`}
            </Markdown>
            <MessageButton>
              <Button
                size={Button.KILO}
                onClick={e => {
                  action('Close button clicked')(e);
                }}
              >
                Read more
              </Button>
            </MessageButton>
          </Message>
        </NotificationBanner>
      </div>
    ))
  );
