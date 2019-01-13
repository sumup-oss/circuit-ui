import styled, { css } from 'react-emotion';

import Button from '../../Button';
import { calculatePadding } from '../../Button/components/RegularButton/RegularButton'; // eslint-disable-line max-len

const baseStyles = ({ theme }) => css`
  label: pagination__buttom;
  border-radius: 0;
  border-right: 0;
  font-weight: normal;
  border-color: ${theme.colors.n300};

  &:focus {
    border-color: ${theme.colors.n300};
    border-width: ${theme.borderWidth.kilo};
    padding: ${calculatePadding({ theme, size: 'kilo' })()};
  }

  &:hover {
    box-shadow: 1px 0 0 ${theme.colors.n500};
    z-index: 1;
  }
  &:hover:focus {
    box-shadow: none;
  }
`;

const primaryStyles = ({ theme, primary }) =>
  primary &&
  css`
    font-weight: bold;
    pointer-events: none;
    &:hover {
      border-color: ${theme.colors.n300};
      box-shadow: none;
  `;

const inactiveStyles = ({ theme, disabled }) =>
  disabled &&
  css`
    opacity: 1 !important;
    &:hover {
      border-color: ${theme.colors.n300};
    }
  `;

/**
 * Styled Component for the button page in pagination
 */
const PageButton = styled(Button)(baseStyles, primaryStyles, inactiveStyles);

PageButton.defaultProps = {
  size: Button.KILO
};

/**
 * @component
 */
export default PageButton;
