import React from 'react';
import { keys } from 'lodash';
import { array, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';
// eslint-disable-next-line max-len
import schemeMap from '../CreditCardDetails/components/scheme-icons/card-scheme-icons';

import CardSchemes from './CardSchemes';

const iconIds = keys(schemeMap);
const iconSizes = [
  CardSchemes.BYTE,
  CardSchemes.KILO,
  CardSchemes.MEGA,
  CardSchemes.GIGA
];

storiesOf(`${GROUPS.ICONS}|CardSchemes`, module).add(
  'Default CardSchemes',
  withInfo()(() => (
    <CardSchemes
      size={select('Schemes Size', iconSizes, iconSizes[CardSchemes.GIGA])}
      schemeIds={array('Card schemes', iconIds)}
    />
  ))
);
