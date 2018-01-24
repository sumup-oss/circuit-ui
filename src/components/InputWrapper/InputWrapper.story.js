import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import InputWrapper from './InputWrapper';

storiesOf('InputWrapper', module)
  .addDecorator(withTests('InputWrapper'))
  .add('Default InputWrapper', withInfo()(() => <InputWrapper />));
