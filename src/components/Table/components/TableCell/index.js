import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { directions } from '../../../../styles/constants';

const PRESENTATION = 'presentation';

const baseStyles = ({ theme, align }) => css`
  label: table-cell;
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  padding: ${theme.spacings.mega};
  text-align: ${align};
  vertical-align: middle;
  white-space: nowrap;
`;

const presentationStyles = ({ theme, role, header }) =>
  role === PRESENTATION &&
  css`
    label: table-cell--presentation;
    display: none;

    ${header && `padding: ${theme.spacings.byte} ${theme.spacings.mega}`};

    ${theme.mq.untilMega`
      display: table-cell;
      min-width: 145px;
      white-space: unset;
      width: 145px;
    `};
  `;

const TableCell = styled.td`
  ${baseStyles};
  ${presentationStyles};
`;

TableCell.LEFT = directions.LEFT;
TableCell.RIGHT = directions.RIGHT;
TableCell.CENTER = directions.CENTER;

TableCell.propTypes = {
  align: PropTypes.oneOf([TableCell.LEFT, TableCell.RIGHT, TableCell.CENTER]),
  header: PropTypes.bool
};

TableCell.defaultProps = {
  align: TableCell.LEFT,
  header: false
};

export default TableCell;
