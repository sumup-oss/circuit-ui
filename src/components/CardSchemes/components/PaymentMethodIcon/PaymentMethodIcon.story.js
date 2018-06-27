import React from 'react';
import { keys } from 'lodash';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../../../.storybook/hierarchySeparators';
// eslint-disable-next-line max-len
import schemeMap from '../../../CreditCardDetails/components/scheme-icons/card-scheme-icons';
import PaymentMethodIcon from './PaymentMethodIcon';

const iconSizes = [
  PaymentMethodIcon.BYTE,
  PaymentMethodIcon.KILO,
  PaymentMethodIcon.MEGA,
  PaymentMethodIcon.GIGA
];

storiesOf(`${GROUPS.ICONS}|PaymentMethodIcon`, module).add(
  'Default PaymentMethodIcon',
  withInfo()(() => (
    <PaymentMethodIcon
      size={select(
        'Schemes Size',
        iconSizes,
        iconSizes[PaymentMethodIcon.GIGA]
      )}
      schemeId={select('Schemes Icon', keys(schemeMap), 'visa')}
    />
  ))
);
