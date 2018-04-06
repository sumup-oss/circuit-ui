import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../../../util/withTests';
import SecurityCodeInput from './SecurityCodeInput';
import { schemes } from '../..';

const { SCHEMES } = schemes;

storiesOf('SecurityCodeInput', module)
  .addDecorator(withTests('SecurityCodeInput'))
  .add('Default SecurityCodeInput', withInfo()(() => <SecurityCodeInput />))
  .add(
    'AMEX SecurityCodeInput',
    withInfo()(() => <SecurityCodeInput cardScheme={SCHEMES.AMEX} />)
  );
