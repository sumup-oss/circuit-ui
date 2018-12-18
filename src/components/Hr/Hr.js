import styled from '@emotion/styled';
import { css } from 'emotion';

const baseStyles = ({ theme }) => css`
  label: hr;
  border: 1px solid ${theme.colors.n300};
  margin-top: ${theme.spacings.mega};
  margin-bottom: ${theme.spacings.mega};
`;

/**
 * A horizontal rule to visually and semantically separate text.
 */
const Hr = styled('hr')(baseStyles);

/**
 * @component
 */
export default Hr;
