import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../../../.storybook/hierarchySeparators';

import withTests from '../../../../util/withTests';
import NameOnCardInput from './NameOnCardInput';

storiesOf(`${GROUPS.FORMS}|CreditCardDetails/NameOnCardInput`, module)
  .addDecorator(withTests('NameOnCardInput'))
  .add('Default NameOnCardInput', withInfo()(() => <NameOnCardInput />));
