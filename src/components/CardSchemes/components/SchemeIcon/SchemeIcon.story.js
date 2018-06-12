import React from 'react';
import { keys } from 'lodash';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../../../.storybook/hierarchySeparators';
// eslint-disable-next-line max-len
import schemeMap from '../../../CreditCardDetails/components/scheme-icons/card-scheme-map';
import SchemeIcon from './SchemeIcon';

const iconSizes = [
  SchemeIcon.BYTE,
  SchemeIcon.KILO,
  SchemeIcon.MEGA,
  SchemeIcon.GIGA
];

storiesOf(`${GROUPS.ICONS}|SchemeIcon`, module).add(
  'Default SchemeIcon',
  withInfo()(() => (
    <SchemeIcon
      size={select('Schemes Size', iconSizes, iconSizes[SchemeIcon.GIGA])}
      schemeId={select('Schemes Icon', keys(schemeMap), 'visa')}
    />
  ))
);
