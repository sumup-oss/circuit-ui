import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  IconGrid,
  ExportIcon,
  BalanceIcon,
  BankIcon,
  BinIcon,
  CalendarIcon
} from '..';

storiesOf('Icons', module).add('Icons', () => (
  <IconGrid>
    <ExportIcon />
    <BalanceIcon />
    <BankIcon />
    <BinIcon />
    <CalendarIcon />
  </IconGrid>
));
