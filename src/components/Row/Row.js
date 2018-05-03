import styled, { css } from 'react-emotion';

import { clearfix } from '../../styles/style-helpers';

const baseStyles = ({ theme }) => css`
  label: row;

  border: 2px solid ${theme.colors.g500};
  position: relative;
  ${clearfix};
`;

/**
 * Describe your component here.
 */
const Row = styled('div')(baseStyles);

/**
 * @component
 */
export default Row;
