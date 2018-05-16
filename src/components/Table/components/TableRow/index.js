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

const TableRow = styled.tr(baseStyles);

export default TableRow;
