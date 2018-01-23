import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { standard } from '../../themes';
import { bodyMega } from '../../styles/style-helpers';

const invalidStyles = ({ theme, isInvalid }) => {
  if (!isInvalid) {
    return '';
  }

  return css`
    label: input--error;
    &:not(:focus) {
      background-color: ${theme.colors.r100};
      border-color: ${theme.colors.r300};
      color: ${theme.colors.r500};
      box-shadow: none;

      &::placeholder {
        color: ${theme.colors.r300};
      }
    }
  `;
};

const optionalStyles = ({ theme, isOptional }) => {
  if (!isOptional) {
    return '';
  }

  return css`
    label: input--optional;
    background-color: ${theme.colors.n100};
    border-style: dashed;
    box-shadow: none;
  `;
};

const disabledStyles = ({ disabled }) => {
  if (!disabled) {
    return '';
  }

  return css`
    label: input--disabled;
    // TODO: this should really be consistent between different
    //       components. Buttons use 0.4.
    opacity: 0.5;
    pointer-events: none;
  `;
};

const baseStyles = ({ theme }) => css`
  label: input;
  background-color: ${theme.colors.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.21);
  color: ${theme.colors.n900};
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
  ${bodyMega({ theme })};

  &:focus,
  &:active {
    border: 1px solid ${theme.colors.b500};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.n500};
  }
`;

const Input = styled('input')(
  baseStyles,
  disabledStyles,
  optionalStyles,
  invalidStyles
);

Input.propTypes = {
  /**
   * A Circuit UI theme object. Usually provided by a ThemeProvider.
   */
  theme: PropTypes.object,
  /**
   * Triggers error styles on the component.
   */
  isInvalid: PropTypes.bool,
  /**
   * Triggers optional styles on the component.
   */
  isOptional: PropTypes.bool,
  /**
   * Triggers disabled styles on the component. This is also forwarded as
   * attribute to the <input> element.
   */
  disabled: PropTypes.bool,
  /**
   * Autocomplete attribute to be passed down to the <input> element.
   */
  autoComplete: PropTypes.string,
  /**
   * An ID passed to the <input> element via a data attribute. This
   * is used as an identifier for analytics tracking and e2e testing.
   */
  analyticsId: PropTypes.string
};

Input.defaultProps = {
  theme: standard,
  isInvalid: false,
  isOptional: false,
  disabled: false,
  autoComplete: 'none'
};

/**
 * @component
 */
export default Input;
