import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { directions } from '../../../../styles/constants';

const COL = 'col';
const ROW = 'row';

const sortableStyles = ({ theme, sortable }) =>
  sortable &&
  css`
    label: table-header--sortable;
    cursor: pointer;
    transition: background-color ${theme.transitions.default};

    &:hover {
      background-color: ${theme.colors.n100};
    }
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

const baseStyles = ({ theme, align }) => css`
  label: table-header;
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.mega};
  text-align: ${align};
  white-space: nowrap;
`;

const TableHeader = styled.th`
  ${baseStyles};
  ${rowStyles};
  ${colStyles};
  ${sortableStyles};
`;

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
  sortable: PropTypes.bool
};

TableHeader.defaultProps = {
  align: TableHeader.LEFT,
  scope: TableHeader.COL,
  fixed: false,
  sortable: false
};

export default TableHeader;
