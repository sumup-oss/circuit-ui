import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { directions } from '../../../../styles/constants';

const COL = 'col';
const ROW = 'row';

const baseStyles = ({ theme, align }) => css`
  label: table-header;
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.mega};
  text-align: ${align};
  transition: background-color ${theme.transitions.default};
  white-space: nowrap;
`;

const colStyles = ({ theme, scope }) =>
  scope === COL &&
  css`
    label: table-header--col;
    color: ${theme.colors.n700};
    font-size: ${theme.typography.text.kilo.fontSize};
    font-weight: ${theme.fontWeight.bold};
    padding: ${theme.spacings.byte} ${theme.spacings.mega};
    vertical-align: middle;
  `;

const rowStyles = ({ theme, fixed }) =>
  fixed &&
  css`
    label: table-header--row;
    ${theme.mq.untilMega`
      background-color: ${theme.colors.white};
      left: 0;
      top: auto;
      position: absolute;
      width: 145px;
      white-space: unset;
    `};
  `;

const sortableStyles = ({ theme, sortable }) =>
  sortable &&
  css`
    label: table-header--sortable;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.n100};
    }
  `;

const activeStyles = ({ theme, active }) =>
  active &&
  css`
    label: table-cell--hover;
    background-color: ${theme.colors.n100};
  `;

const StyledHeader = styled.th`
  ${baseStyles};
  ${rowStyles};
  ${colStyles};
  ${sortableStyles};
  ${activeStyles};
`;

const TableHeader = props => <StyledHeader {...props} />;

TableHeader.LEFT = directions.LEFT;
TableHeader.RIGHT = directions.RIGHT;
TableHeader.CENTER = directions.CENTER;
TableHeader.COL = COL;
TableHeader.ROW = ROW;

TableHeader.propTypes = {
  align: PropTypes.oneOf([
    TableHeader.LEFT,
    TableHeader.RIGHT,
    TableHeader.CENTER
  ]),
  scope: PropTypes.string,
  fixed: PropTypes.bool,
  sortable: PropTypes.bool,
  active: PropTypes.bool
};

TableHeader.defaultProps = {
  align: TableHeader.LEFT,
  scope: TableHeader.COL,
  fixed: false,
  sortable: false,
  active: false
};

export default TableHeader;
