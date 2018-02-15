import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import NotificationCenter from './NotificationCenter';
import Message, { MessageButton, MessageIcon } from '../Message';
import ThumbsUpIcon from '../Message/thumbs-up.svg';
import Markdown from '../Markdown';
import Heading from '../Heading';
import Text from '../Text';
import CloseButton from '../CloseButton';

storiesOf('NotificationCenter', module)
  .addDecorator(withTests('NotificationCenter'))
  .add(
    'Default NotificationCenter',
    withInfo()(() => (
      <NotificationCenter>
        <Message>
          <MessageIcon>
            <ThumbsUpIcon />
          </MessageIcon>
          <Heading size={Heading.KILO} element="h4" margin={false}>
            Transaction successfully refunded
          </Heading>
        </Message>
        <Message>
          <MessageIcon>
            <ThumbsUpIcon />
          </MessageIcon>
          <Markdown
            overrides={{
              h1: {
                component: Heading,
                props: {
                  element: 'h4',
                  size: Heading.KILO,
                  margin: false
                }
              },
              p: {
                component: Text,
                props: {
                  margin: false
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
      </NotificationCenter>
    ))
  );
