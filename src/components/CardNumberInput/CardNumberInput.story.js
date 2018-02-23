import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import CardNumberInput from './CardNumberInput';

storiesOf('CardNumberInput', module)
  .addDecorator(withTests('CardNumberInput'))
  .add('Default CardNumberInput', withInfo()(() => <CardNumberInput />));
