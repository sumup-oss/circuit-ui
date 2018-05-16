import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import SortArrow from '../SortArrow';
import { directions } from '../../../../styles/constants';
import { childrenPropType } from '../../../../util/shared-prop-types';
import { ASCENDING, DESCENDING, COL, ROW } from '../../constants';

const getAriaSort = (sortable, sortDirection) =>
  sortable ? sortDirection || 'none' : null;

const baseStyles = ({ theme, align }) => css`
  label: table-header;
  background-color: ${theme.colors.white};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.giga};
  text-align: ${align};
  transition: background-color ${theme.transitions.default},
    color ${theme.transitions.default};
  white-space: nowrap;
`;

const colStyles = ({ theme, scope }) =>
  scope === COL &&
  css`
    label: table-header--col;
    color: ${theme.colors.n700};
    font-size: ${theme.typography.text.kilo.fontSize};
    font-weight: ${theme.fontWeight.bold};
    padding: ${theme.spacings.byte} ${theme.spacings.giga};
    vertical-align: middle;
  `;

const rowStyles = ({ theme, fixed }) =>
  fixed &&
  css`
    label: table-header--row;
    ${theme.mq.untilMega`
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
    position: relative;
    user-select: none;

    &:hover {
      background-color: ${theme.colors.n100};
      color: ${theme.colors.b500};

      & > button {
        opacity: 1;
      }
    }
  `;

const sortableActiveStyles = ({ sortable, isSorted }) =>
  sortable &&
  isSorted &&
  css`
    & > button {
      opacity: 1;
    }
  `;

const activeStyles = ({ theme, isActive }) =>
  isActive &&
  css`
    label: table-cell--hover;
    background-color: ${theme.colors.n100};
  `;

const StyledHeader = styled.th`
  ${baseStyles};
  ${activeStyles};
  ${rowStyles};
  ${colStyles};
  ${sortableStyles};
  ${sortableActiveStyles};
`;

const TableHeader = ({ sortable, children, sortDirection, ...rest }) => (
  <StyledHeader
    sortable={sortable}
    aria-sort={getAriaSort(sortable, sortDirection)}
    {...rest}
  >
    {sortable && <SortArrow direction={sortDirection} />}
    {children}
  </StyledHeader>
);

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
  isActive: PropTypes.bool,
  children: childrenPropType,
  sortDirection: PropTypes.oneOf([ASCENDING, DESCENDING]),
  isSorted: PropTypes.bool
};

TableHeader.defaultProps = {
  align: TableHeader.LEFT,
  scope: TableHeader.COL,
  fixed: false,
  sortable: false,
  isActive: false,
  children: null,
  sortDirection: null,
  isSorted: false
};

export default TableHeader;
