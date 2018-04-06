import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../../../util/withTests';
import ExpiryDateInput from '.';

storiesOf('ExpiryDate', module)
  .addDecorator(withTests('ExpiryDate'))
  .add('Default ExpiryDateInput', withInfo()(() => <ExpiryDateInput />));
