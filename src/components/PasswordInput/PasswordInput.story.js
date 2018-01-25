import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import PasswordInput from './PasswordInput';

storiesOf('PasswordInput', module)
  .addDecorator(withTests('PasswordInput'))
  .add('Default PasswordInput', withInfo()(() => <PasswordInput />))
  .add('Disabled PasswordInput', withInfo()(() => <PasswordInput disabled />));
