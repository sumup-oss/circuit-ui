import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import MaskedInput from './MaskedInput';

storiesOf('MaskedInput', module)
  .addDecorator(withTests('MaskedInput'))
  .add('Default MaskedInput', withInfo()(() => <MaskedInput />));
