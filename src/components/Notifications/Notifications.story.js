import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import Notifications from './Notifications';
import Alert, { AlertButton, AlertIcon } from '../Alert';
import ThumbsUpIcon from '../Alert/thumbs-up.svg';
import Markdown from '../Markdown';
import Heading from '../Heading';
import Text from '../Text';
import CloseButton from '../CloseButton';

storiesOf('Notifications', module)
  .addDecorator(withTests('Notifications'))
  .add(
    'Default Notifications',
    withInfo()(() => (
      <Notifications>
        <Alert>
          <AlertIcon>
            <ThumbsUpIcon />
          </AlertIcon>
          <Heading size={Heading.KILO} element="h4" margin={false}>
            Transaction successfully refunded
          </Heading>
        </Alert>
        <Alert>
          <AlertIcon>
            <ThumbsUpIcon />
          </AlertIcon>
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
            {`# New Feature — Intelligent Reporting\nGet automatic insights into your business statistics with one click. [Learn more here](#)`}
          </Markdown>
          <AlertButton alignment={AlertButton.TOP}>
            <CloseButton
              onClick={e => {
                action('Close button clicked')(e);
              }}
            />
          </AlertButton>
        </Alert>
      </Notifications>
    ))
  );
