import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Message, { MessageIcon, MessageButton } from '.';
import Heading from '../Heading';
import Text from '../Text';
import Button from '../Button';
import ThumbsUpIcon from './thumbs-up.svg';

storiesOf(`${GROUPS.COMPONENTS}|Message`, module)
  .addDecorator(withTests('Message'))
  .add(
    'Default Message',
    withInfo()(() => (
      <Message>
        <MessageIcon>
          <ThumbsUpIcon />
        </MessageIcon>
        <Heading size={Heading.KILO} element="h4" margin={false}>
          Transaction successfully refunded
        </Heading>
      </Message>
    ))
  )
  .add(
    'Message with button',
    withInfo()(() => (
      <Message>
        <MessageIcon>
          <ThumbsUpIcon />
        </MessageIcon>
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
    ))
  );
