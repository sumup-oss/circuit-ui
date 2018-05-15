import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';
import { size as sizeMixin, transparentize } from 'polished';

import { includes } from '../../util/fp';
import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

const validModifierSizes = [KILO, MEGA];

const isValidSize = size => includes(size, validModifierSizes);

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const sizeStyles = ({ theme, size }) => {
  if (!isValidSize(size)) {
    return null;
  }

  const sizeMap = {
    KILO: theme.spacings.kilo,
    MEGA: theme.spacings.mega
  };

  const sizeValue = sizeMap[size];

  return css`
    label: spinner--${size};
    ${sizeMixin(sizeValue)};
    border-radius: ${sizeValue};
  `;
};

const darkStyles = ({ theme, dark }) =>
  dark &&
  css`
    border: 2px solid ${theme.colors.n900};
    border-top: 2px solid ${transparentize(0.7, theme.colors.n900)};
  `;

const baseStyles = ({ theme }) => css`
  label: spinner;
  animation: ${spin} 1s infinite ease;
  border-radius: ${theme.spacings.giga};
  border: 2px solid ${theme.colors.white};
  border-top: 2px solid ${transparentize(0.7, theme.colors.white)};
  transform: translateZ(0);
  ${sizeMixin(theme.spacings.giga)};
`;

/**
 * A loading spinner.
 */
const Spinner = styled('div')(baseStyles, sizeStyles);

Spinner.KILO = KILO;
Spinner.MEGA = MEGA;

Spinner.propTypes = {
  /**
   * Size of the Spinner. Usually passed down from parent
   * like a Button.
   */
  size: PropTypes.oneOf(validModifierSizes)
};

Spinner.defaultProps = {
  size: GIGA
};

/**
 * @component
 */
export default Spinner;
