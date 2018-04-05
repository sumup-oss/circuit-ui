import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../../../util/withTests';
import CardExpiryDate from './CardExpiryDate';

storiesOf('CardExpiryDate', module)
  .addDecorator(withTests('CardExpiryDate'))
  .add('Default CardExpiryDate', withInfo()(() => <CardExpiryDate />));
