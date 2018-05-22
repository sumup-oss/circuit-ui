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
    'LoadingButton',
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
