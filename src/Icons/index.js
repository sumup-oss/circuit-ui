/* eslint-disable */

import React, { Component } from 'react';

import exportIcon from './export.svg';
export const ExportIcon = asIcon(exportIcon);

import balanceIcon from './balance.svg';
export const BalanceIcon = asIcon(balanceIcon);

import bankIcon from './bank.svg';
export const BankIcon = asIcon(bankIcon);

import binIcon from './bin.svg';
export const BinIcon = asIcon(binIcon);

import calendarIcon from './calendar.svg';
export const CalendarIcon = asIcon(calendarIcon);

/* eslint-enable */

export function asIcon(Icon) {
  return class extends Component {
    render() {
      const toTheme = theme => ({ dark: '#5C8BCC', light: '#EEE' }[theme]);
      const defaultProps = { width: 16, height: 16, fill: toTheme('dark') };
      const props = { ...defaultProps, ...this.props };
      return <Icon {...props} />;
    }
  };
}

const gridStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 auto',
  maxWidth: '500px'
};

export const IconGrid = ({ children }) => (
  <div style={gridStyles}>{children}</div>
);
