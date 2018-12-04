import styled, { css } from 'react-emotion';

import Button from '../../Button';

const baseStyles = ({ theme }) => css`
  label: pagination__buttom;
  border-radius: 0;
  border-right: 0;
  border-color: ${theme.colors.n300};

  &:focus {
    border-right: ${theme.borderWidth.mega} solid ${theme.colors.n500};
  }

  &:hover {
    border-right: ${theme.borderWidth.kilo} solid ${theme.colors.n500};
  }
`;

/**
 * Styled Component for the button page in pagination
 */
const PageButton = styled(Button)(baseStyles);

PageButton.defaultProps = {
  size: Button.KILO
};

/**
 * @component
 */
export default PageButton;
