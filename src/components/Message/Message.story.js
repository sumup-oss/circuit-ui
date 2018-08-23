import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';
import Message, { MessageIcon, MessageButton } from '.';
import Heading from '../Heading';
import Text from '../Text';
import Button from '../Button';

storiesOf(`${GROUPS.COMPONENTS}|Message`, module)
  .addDecorator(withTests('Message'))
  .add(
    'Default Message',
    withInfo()(() => (
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
  )
  .add(
    'Message with button',
    withInfo()(() => (
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
    ))
  );
