import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import ButtonLink from './ButtonLink';

const { KILO, MEGA, GIGA } = ButtonLink;

storiesOf('ButtonLink', module)
  .addDecorator(withTests('ButtonLink'))
  .add(
    'Default ButtonLink',
    withInfo()(() => (
      <ButtonLink
        primary={boolean('Primary', false)}
        onClick={action('onClick')}
        size={select('Size', [KILO, MEGA, GIGA], KILO)}
        href={boolean('href', false) ? 'http://www.google.com' : undefined}
      >
        Button Link
      </ButtonLink>
    ))
  );
