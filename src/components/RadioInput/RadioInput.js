import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { hideVisually } from 'polished';
import { shadowSingle, disableVisually } from '../../styles/style-helpers';
import { childrenPropType } from '../../util/shared-prop-types';

const baseStyles = ({ theme }) => css`
  label: radio-input__label;
  color: ${theme.colors.n700};
  padding-left: ${theme.spacings.giga};
  position: relative;

  &::before {
    ${shadowSingle({ theme })};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.n500};
    border-radius: 100%;
    content: '';
    display: block;
    height: ${theme.spacings.mega};
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: ${theme.spacings.mega};
    transition: border 0.05s ease-in;
  }

  &::after {
    background-color: ${theme.colors.b500};
    border-radius: 100%;
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: ${theme.spacings.bit};
    height: ${theme.spacings.byte};
    width: ${theme.spacings.byte};
    transform: translateY(-50%) scale(0, 0);
    visibility: hidden;
    transition: transform 0.05s ease-in, visibility 0.05s ease-in;
  }
`;

const checkedStyles = ({ theme, checked }) =>
  checked &&
  css`
    label: radio-input--active;

    &::before {
      border-color: ${theme.colors.b500};
    }

    &::after {
      transform: translateY(-50%) scale(1, 1);
      visibility: visible;
    }
  `;

const invalidStyles = ({ theme, invalid }) =>
  invalid &&
  css`
    label: radio-input--error;
    &:not(:focus)::before {
      border-color: ${theme.colors.r500};
    }

    &:not(:focus)::after {
      background-color: ${theme.colors.r500};
    }
  `;

const disabledStyles = ({ theme, disabled }) =>
  disabled &&
  css`
    label: radio-input--disabled;
    ${disableVisually()};

    &::before {
      border-color: ${theme.colors.n500};
    }

    &::after {
      background-color: ${theme.colors.n500};
    }
  `;

const inputStyles = ({ theme }) => css`
  label: radio-input__input;
  ${hideVisually()};

  &:focus + label::before {
    border-width: 2px;
    border-color: ${theme.colors.b500};
  }
`;

const Input = styled('input', { label: 'RadioInputInput' })(inputStyles);

const Label = styled('label', { label: 'RadioInputLabel' })(
  baseStyles,
  checkedStyles,
  disabledStyles,
  invalidStyles
);

/**
 * RadioInput component for forms.
 */
const RadioInput = ({ onToggle, children, name, ...props }) => (
  <Fragment>
    <Input id={name} type="radio" {...{ ...props, name }} />
    <Label htmlFor={name} onClick={onToggle} {...{ ...props }}>
      {children}
    </Label>
  </Fragment>
);

RadioInput.propTypes = {
  /**
   * Controles/Toggles the checked state.
   */
  onToggle: PropTypes.func,
  /**
   * Child nodes to be rendered as the label.
   */
  children: childrenPropType,
  /**
   * Value string for input.
   */
  value: PropTypes.string.isRequired,
  /**
   * A unique ID used to link the input and label.
   */
  name: PropTypes.string.isRequired,
  /**
   * Triggers checked styles on the component. This is also forwarded as
   * attribute to the <input> element.
   */
  checked: PropTypes.bool,
  /**
   * Triggers error styles on the component.
   */
  invalid: PropTypes.bool,
  /**
   * Triggers disabled styles on the component. This is also forwarded as
   * attribute to the <input> element.
   */
  disabled: PropTypes.bool,
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired
};

RadioInput.defaultProps = {
  checked: false,
  invalid: false,
  disabled: false,
  children: null,
  onToggle: () => {}
};

/**
 * @component
 */
export default RadioInput;
