import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';
import TextLink from './TextLink';

const { KILO, MEGA, GIGA } = TextLink;

storiesOf(`${GROUPS.TYPOGRAPHY}|TextLink`, module)
  .addDecorator(withTests('TextLink'))
  .add(
    'Default TextLink',
    withInfo()(() => (
      <TextLink
        primary={boolean('Primary', false)}
        onClick={action('onClick')}
        size={select('Size', [KILO, MEGA, GIGA], KILO)}
        href={boolean('href', false) ? 'http://www.google.com' : undefined}
      >
        Button Link
      </TextLink>
    ))
  );
