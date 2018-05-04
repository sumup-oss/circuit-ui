import styled, { css } from 'react-emotion';

import { clearfix } from '../../styles/style-helpers';

const baseStyles = () => css`
  label: row;

  position: relative;
  ${clearfix};
`;

/**
 * Row wrapping for the Col component.
 */
const Row = styled('div')(baseStyles);

/**
 * @component
 */
export default Row;
