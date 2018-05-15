import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import SortArrow from '../SortArrow';
import { directions } from '../../../../styles/constants';
import { childrenPropType } from '../../../../util/shared-prop-types';
import { ASCENDING, DESCENDING } from '../../constants';

const COL = 'col';
const ROW = 'row';

const baseStyles = ({ theme, align }) => css`
  label: table-header;
  background-color: ${theme.colors.white};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.mega};
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
    padding: ${theme.spacings.byte} ${theme.spacings.mega};
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

    &:hover {
      background-color: ${theme.colors.n100};
      color: ${theme.colors.b500};

      & > span {
        opacity: 1;
      }
    }
  `;

const sortableActiveStyles = ({ sortable, isSorted }) =>
  sortable &&
  isSorted &&
  css`
    & > span {
      opacity: 1;
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
  ${activeStyles};
  ${rowStyles};
  ${colStyles};
  ${sortableStyles};
  ${sortableActiveStyles};
`;

const TableHeader = ({ sortable, children, sortDirection, ...rest }) => (
  <StyledHeader sortable {...rest}>
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
  active: PropTypes.bool,
  children: childrenPropType,
  sortDirection: PropTypes.oneOf([ASCENDING, DESCENDING]),
  isSorted: PropTypes.bool
};

TableHeader.defaultProps = {
  align: TableHeader.LEFT,
  scope: TableHeader.COL,
  fixed: false,
  sortable: false,
  active: false,
  children: null,
  sortDirection: null,
  isSorted: false
};

export default TableHeader;
