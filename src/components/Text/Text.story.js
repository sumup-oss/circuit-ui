import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Text from '.';

storiesOf(`${GROUPS.TYPOGRAPHY}|Text`, module)
  .addDecorator(withTests('Text'))
  .add(
    'Giga Text with p',
    withInfo()(() => (
      <Text element="p" size={Text.GIGA}>
        This is a giga Text with a p element
      </Text>
    ))
  )
  .add(
    'Mega Text with article',
    withInfo()(() => (
      <Text element="article" size={Text.MEGA}>
        This is an mega Text with an article element
      </Text>
    ))
  )
  .add(
    'Kilo Text with div',
    withInfo()(() => (
      <Text element="div" size={Text.KILO}>
        This is a kilo Text with a div element
      </Text>
    ))
  )
  .add(
    'Bold Text',
    withInfo()(() => (
      <Text bold size={Text.KILO}>
        This is bold text
      </Text>
    ))
  );
