import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import NotificationBanner from './NotificationBanner';
import Message, { MessageButton, MessageIcon } from '../Message';
import ThumbsUpIcon from '../Message/thumbs-up.svg';
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
