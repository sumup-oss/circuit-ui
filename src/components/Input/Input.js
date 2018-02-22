import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { standard } from '../../themes';
import { textMega, disableVisually } from '../../styles/style-helpers';

const invalidStyles = ({ theme, invalid }) =>
  invalid &&
  css`
    label: input--error;
    &:not(:focus) {
      border-color: ${theme.colors.r300};

      &::placeholder {
        color: ${theme.colors.r300};
      }
    }
  `;

const optionalStyles = ({ theme, optional }) =>
  optional &&
  css`
    label: input--optional;
    background-color: ${theme.colors.n100};
    border-style: dashed;
    box-shadow: none;
  `;

const disabledStyles = ({ disabled }) =>
  disabled &&
  css`
    label: input--disabled;
    ${disableVisually()};
  `;

const inlineStyles = ({ theme, inline }) =>
  inline &&
  css`
    label: input--inline;
    display: inline-block;
    margin-right: ${theme.spacings.mega};
  `;

const stretchStyles = ({ stretch }) =>
  stretch &&
  css`
    label: input--stretch;
    width: 100%;
  `;

const marginStyles = ({ theme, margin }) =>
  margin &&
  css`
    label: input--margin;
    margin-bottom: ${theme.spacings.mega};
  `;

const baseStyles = ({ theme }) => css`
  label: input;
  background-color: ${theme.colors.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.12);
  color: ${theme.colors.n900};
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
  display: block;
  ${textMega({ theme })};

  &:focus,
  &:active {
    border: 1px solid ${theme.colors.p500};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.n500};
  }
`;

// TODO: Add dynamic invalid aria attribute.
/**
 * Input component for forms.
 */
const Input = styled('input')`
  ${baseStyles};
  ${marginStyles};
  ${disabledStyles};
  ${optionalStyles};
  ${invalidStyles};
  ${inlineStyles};
  ${stretchStyles};
`;

Input.propTypes = {
  /**
   * Triggers error styles on the component.
   */
  invalid: PropTypes.bool,
  /**
   * Triggers optional styles on the component.
   */
  optional: PropTypes.bool,
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
   * Trigger inline styles on the component.
   */
  inline: PropTypes.bool,
  /**
   * Trigger stretch (full width) styles on the component.
   */
  stretch: (props, propName, componentName) => {
    if (props.inline && props.stretch) {
      return new Error(
        'You cannot use both inline and stretch properties at the same time.'
      );
    }

    return PropTypes.checkPropTypes(
      { propName: PropTypes.bool },
      props,
      propName,
      componentName
    );
  },
  /**
   * Adds bottom margin to the input.
   */
  margin: PropTypes.bool
};

Input.defaultProps = {
  theme: standard,
  invalid: false,
  optional: false,
  disabled: false,
  autoComplete: 'none',
  inline: false,
  stretch: false,
  margin: true
};

/**
 * @component
 */
export default Input;
