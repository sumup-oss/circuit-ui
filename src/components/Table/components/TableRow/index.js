import styled, { css } from 'react-emotion';

const baseStyles = () => css`
  label: table-row;
  vertical-align: middle;

  tbody & &:last-child {
    th,
    td {
      border-bottom: none;
    }
  }
`;

const clickableStyles = ({ onClick }) =>
  onClick &&
  css`
    label: table-row--clickable;
    cursor: pointer;
  `;

const TableRow = styled.tr`
  ${baseStyles};
  ${clickableStyles};
`;

export default TableRow;
