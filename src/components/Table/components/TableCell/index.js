import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { directions } from '../../../../styles/constants';

const baseStyles = ({ theme, align }) => css`
  label: table-cell;
  text-align: ${align};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.mega};
  white-space: nowrap;
`;

const TableCell = styled.td(baseStyles);

TableCell.LEFT = directions.LEFT;
TableCell.RIGHT = directions.RIGHT;
TableCell.CENTER = directions.CENTER;

TableCell.propTypes = {
  align: PropTypes.oneOf([TableCell.LEFT, TableCell.RIGHT, TableCell.CENTER])
};

TableCell.defaultProps = {
  align: TableCell.LEFT
};

export default TableCell;
