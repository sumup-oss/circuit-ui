import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import InlineNotification from './InlineNotification';
import Card from '../Card';
import Text from '../Text';

storiesOf(`${GROUPS.COMPONENTS}|InlineNotification`, module)
  .addDecorator(withTests('InlineNotification'))
  .add(
    'Success InlineNotification',
    withInfo()(() => (
      <InlineNotification type={InlineNotification.SUCCESS}>
        Something has gone terribly right.
      </InlineNotification>
    ))
  )
  .add(
    'Danger InlineNotification',
    withInfo()(() => (
      <InlineNotification type={InlineNotification.DANGER}>
        Something has gone terribly wrong.
      </InlineNotification>
    ))
  )
  .add(
    'Warning InlineNotification',
    withInfo()(() => (
      <InlineNotification type={InlineNotification.WARNING}>
        Something might go terribly wrong.
      </InlineNotification>
    ))
  )
  .add(
    'InlineNotification with Mega spacing',
    withInfo()(() => (
      <InlineNotification
        type={InlineNotification.WARNING}
        size={InlineNotification.MEGA}
      >
        Something might go terribly wrong with a bigger card.
      </InlineNotification>
    ))
  )
  .add(
    'InlineNotification inside a Card',
    withInfo()(() => (
      <Card>
        <InlineNotification
          type={InlineNotification.WARNING}
          size={InlineNotification.GIGA}
        >
          Something might go terribly wrong with a bigger card.
        </InlineNotification>
        <Text>Sorry that is how it is.</Text>
      </Card>
    ))
  );
