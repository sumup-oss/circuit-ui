import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const rowStyles = ({ theme, header }) =>
  !header &&
  css`
    label: table-row--header;
    &:hover {
      background-color: ${theme.colors.n100};
    }
  `;

const baseStyles = ({ theme }) => css`
  label: table-row;
  position: relative;
  transition: background-color ${theme.transitions.default};

  &:last-child {
    th,
    td {
      border-bottom: none;
    }
  }
`;

const TableRow = styled.tr`
  ${baseStyles};
  ${rowStyles};
`;

TableRow.propTypes = {
  header: PropTypes.bool
};

TableRow.defaultProps = {
  header: false
};

export default TableRow;
