import React from 'react';
import { keys } from 'lodash';
import { array } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';
import schemeMap from '../CreditCardDetails/components/scheme-icons/card-scheme-map.js';

import CardSchemes from './CardSchemes';

const iconIds = keys(schemeMap);

storiesOf(`${GROUPS.MAIN}|CardSchemes`, module).add(
  'Default CardSchemes',
  withInfo()(() => <CardSchemes schemeIds={array('Card schemes', iconIds)} />)
);
