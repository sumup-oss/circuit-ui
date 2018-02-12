import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import Alert, { AlertIcon, AlertButton } from '.';
import Heading from '../Heading';
import Text from '../Text';
import Button from '../Button';
import ThumbsUpIcon from './thumbs-up.svg';

storiesOf('Alert', module)
  .addDecorator(withTests('Alert'))
  .add(
    'Default Alert',
    withInfo()(() => (
      <Alert>
        <AlertIcon>
          <ThumbsUpIcon />
        </AlertIcon>
        <Heading size={Heading.KILO} element="h4" margin={false}>
          Transaction successfully refunded
        </Heading>
      </Alert>
    ))
  )
  .add(
    'Alert with button',
    withInfo()(() => (
      <Alert>
        <AlertIcon>
          <ThumbsUpIcon />
        </AlertIcon>
        <div>
          <Heading element="h4" size={Heading.KILO} margin={false}>
            New Feature — Intelligent Reporting
          </Heading>
          <Text margin={false}>
            Get automatic insights into your business statistics with one click.
          </Text>
        </div>
        <AlertButton>
          <Button
            size={Button.KILO}
            onClick={e => {
              action('Button clicked')(e);
            }}
          >
            Read more
          </Button>
        </AlertButton>
      </Alert>
    ))
  );
