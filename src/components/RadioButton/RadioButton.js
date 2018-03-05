import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { hideVisually, size } from 'polished';
import { disableVisually } from '../../styles/style-helpers';
import { childrenPropType } from '../../util/shared-prop-types';

const labelBaseStyles = ({ theme }) => css`
  label: radio-button__label;
  color: ${theme.colors.n700};
  padding-left: ${theme.spacings.giga};
  position: relative;

  &::before {
    ${size(theme.spacings.mega)};
    box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.12);
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.n500};
    border-radius: 100%;
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: border 0.05s ease-in;
  }

  &::after {
    ${size(theme.spacings.byte)};
    background-color: ${theme.colors.p500};
    border-radius: 100%;
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: ${theme.spacings.bit};
    transform: translateY(-50%) scale(0, 0);
    opacity: 0;
    transition: transform 0.05s ease-in, opacity 0.05s ease-in;
  }
`;

const labelCheckedStyles = ({ theme, checked }) =>
  checked &&
  css`
    label: radio-button--active;

    &::before {
      border-color: ${theme.colors.p500};
    }

    &::after {
      transform: translateY(-50%) scale(1, 1);
      opacity: 1;
    }
  `;

const labelInvalidStyles = ({ theme, invalid }) =>
  invalid &&
  css`
    label: radio-button--error;
    &:not(:focus)::before {
      border-color: ${theme.colors.r500};
    }

    &:not(:focus)::after {
      background-color: ${theme.colors.r500};
    }
  `;

const labelDisabledStyles = ({ theme, disabled }) =>
  disabled &&
  css`
    label: radio-button--disabled;
    ${disableVisually()};

    &::before {
      ${disableVisually()};
      border-color: ${theme.colors.n500};
      background-color: ${theme.colors.n100};
    }

    &::after {
      ${disableVisually()};
      background-color: ${theme.colors.n500};
    }
  `;

const inputStyles = ({ theme }) => css`
  label: radio-button__input;
  ${hideVisually()};

  &:focus + label::before {
    border-width: 2px;
    border-color: ${theme.colors.p500};
  }
`;

const RadioButtonInput = styled('input')`
  ${inputStyles};
`;

const RadioButtonLabel = styled('label')`
  ${labelBaseStyles}
  ${labelCheckedStyles}
  ${labelDisabledStyles}
  ${labelInvalidStyles}
`;

/**
 * RadioButton component for forms.
 */
const RadioButton = ({ onToggle, children, name, ...props }) => (
  <Fragment>
    <RadioButtonInput id={name} type="radio" {...{ ...props, name }} />
    <RadioButtonLabel htmlFor={name} onClick={onToggle} {...{ ...props }}>
      {children}
    </RadioButtonLabel>
  </Fragment>
);

RadioButton.propTypes = {
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
  disabled: PropTypes.bool
};

RadioButton.defaultProps = {
  checked: false,
  invalid: false,
  disabled: false,
  children: null,
  onToggle: () => {}
};

/**
 * @component
 */
export default RadioButton;
