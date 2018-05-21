import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../../../.storybook/hierarchySeparators';

import withTests from '../../../../util/withTests';
import ExpiryDateInput from '.';

storiesOf(`${GROUPS.FORMS}|CreditCardDetails/ExpiryDate`, module)
  .addDecorator(withTests('ExpiryDate'))
  .add('Default ExpiryDateInput', withInfo()(() => <ExpiryDateInput />));
