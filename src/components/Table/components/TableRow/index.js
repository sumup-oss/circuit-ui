import PropTypes from 'prop-types';
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

TableRow.propTypes = {
  header: PropTypes.bool
};

TableRow.defaultProps = {
  header: false
};

export default TableRow;
