import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import RestrictedInput from './RestrictedInput';

storiesOf('RestrictedInput', module)
  .addDecorator(withTests('RestrictedInput'))
  .add('Default RestrictedInput', withInfo()(() => <RestrictedInput />));
