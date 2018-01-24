import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import BodyText from './BodyText';

storiesOf('BodyText', module)
  .addDecorator(withTests('BodyText'))
  .add(
    'Giga BodyText with p',
    withInfo()(() => (
      <BodyText element="p" size="giga">
        This is a giga BodyText with a p element
      </BodyText>
    ))
  )
  .add(
    'Mega BodyText with article',
    withInfo()(() => (
      <BodyText element="article" size="mega">
        This is an mega BodyText with an article element
      </BodyText>
    ))
  )
  .add(
    'Kilo BodyText with div',
    withInfo()(() => (
      <BodyText element="div" size="kilo">
        This is a kilo BodyText with a div element
      </BodyText>
    ))
  );
