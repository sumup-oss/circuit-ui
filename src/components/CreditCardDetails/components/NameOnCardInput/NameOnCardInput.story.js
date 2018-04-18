import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../../../util/withTests';
import NameOnCardInput from './NameOnCardInput';

storiesOf('NameOnCardInput', module)
  .addDecorator(withTests('NameOnCardInput'))
  .add('Default NameOnCardInput', withInfo()(() => <NameOnCardInput />));
