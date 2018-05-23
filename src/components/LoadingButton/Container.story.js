import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs/react';

import withTests from '../../util/withTests';
import LoadingButton from '.';

storiesOf('LoadingButton', module)
  .addDecorator(withTests('LoadingButton'))
  .add(
    'LoadingButton with Success animation',
    withInfo()(() => (
      <LoadingButton
        isLoading={boolean('Loading', false)}
        onClick={action('clicked')}
        onAnimationComplete={action('animation completed')}
        exitAnimation={LoadingButton.SUCCESS}
        primary
      >
        Touch my knob
      </LoadingButton>
    ))
  )
  .add(
    'LoadingButton with no exit animation',
    withInfo()(() => (
      <LoadingButton
        isLoading={boolean('Loading', false)}
        onClick={action('clicked')}
        onAnimationComplete={action('animation completed')}
        primary
      >
        Touch my knob
      </LoadingButton>
    ))
  );
