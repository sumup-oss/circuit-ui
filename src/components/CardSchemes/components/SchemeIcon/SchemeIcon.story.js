import React from 'react';
import { keys } from 'lodash';
import { text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../../../.storybook/hierarchySeparators';
import schemeMap from '../../../CreditCardDetails/components/scheme-icons/card-scheme-map';

import SchemeIcon from './SchemeIcon';

storiesOf(`${GROUPS.MAIN}|SchemeIcon`, module).add(
  'Default SchemeIcon',
  withInfo()(() => (
    <SchemeIcon schemeId={select('Schemes Icon', ['amex', 'visa'], 'visa')} />
  ))
);
