import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../../../util/withTests';
import SecurityCodeInput from '.';
import { schemes } from '../..';

const { SCHEMES } = schemes;

storiesOf('SecurityCodeInput', module)
  .addDecorator(withTests('SecurityCodeInput'))
  .add('Default SecurityCodeInput', withInfo()(() => <SecurityCodeInput />))
  .add(
    'AMEX SecurityCodeInput',
    withInfo()(() => <SecurityCodeInput cardScheme={SCHEMES.AMEX} />)
  )
  .add(
    'SecurityCodeInput with modal toggle',
    withInfo()(() => (
      <SecurityCodeInput onShowInfo={action('Security modal toggled')} />
    ))
  );
