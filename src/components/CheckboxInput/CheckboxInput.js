import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { hideVisually } from 'polished';
import { shadowSingle, disableVisually } from '../../styles/style-helpers';
import { childrenPropType } from '../../util/shared-prop-types';

const checkmarkSvg = fill =>
  // NOTE: Optimizing SVGs in data URIs, https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
  `data:image/svg+xml,${encodeURIComponent(
    `<svg width='10' height='10' xmlns='http://www.w3.org/2000/svg'><path d='M3.438 6.973l5.097-5.694a.858.858 0 0 1 1.175-.086c.349.288.389.793.089 1.128l-5.73 6.4a.856.856 0 0 1-1.264 0L.201 5.812a.778.778 0 0 1 .09-1.128.858.858 0 0 1 1.174.086l1.973 2.203z' fill='${fill}' fill-rule='nonzero'/></svg>`
  )}`;

const baseStyles = ({ theme }) => css`
  label: Checkbox-input__label;
  color: ${theme.colors.n700};
  padding-left: ${theme.spacings.giga};
  position: relative;

  &::before {
    ${shadowSingle({ theme })};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.n500};
    border-radius: 3px;
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
    line-height: 0;
    content: url("${checkmarkSvg(theme.colors.b500)}");
    display: block;
    position: absolute;
    top: 50%;
    left: 3px;
    height: 10px;
    width: 10px;
    transform: translateY(-50%) scale(0, 0);
    visibility: hidden;
    transition: transform 0.05s ease-in, visibility 0.05s ease-in;
  }
`;

const checkedStyles = ({ theme, checked }) =>
  checked &&
  css`
    label: Checkbox-input--active;

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
    label: Checkbox-input--error;
    &:not(:focus)::before {
      border-color: ${theme.colors.r500};
    }

    &:not(:focus)::after {
      content: url("${checkmarkSvg(theme.colors.r500)}");
    }
  `;

const disabledStyles = ({ theme, disabled }) =>
  disabled &&
  css`
    label: Checkbox-input--disabled;
    ${disableVisually()};

    &::before {
      border-color: ${theme.colors.n500};
    }

    &::after {
      content: url("${checkmarkSvg(theme.colors.n500)}");
    }
  `;

const inputStyles = ({ theme }) => css`
  label: Checkbox-input__input;
  ${hideVisually()};

  &:focus + label::before {
    border-width: 2px;
    border-color: ${theme.colors.b500};
  }
`;

const Input = styled('input', { label: 'CheckboxInputInput' })(inputStyles);

const Label = styled('label', { label: 'CheckboxInputLabel' })(
  baseStyles,
  checkedStyles,
  disabledStyles,
  invalidStyles
);

/**
 * CheckboxInput component for forms.
 */
const CheckboxInput = ({ onToggle, children, name, ...props }) => (
  <Fragment>
    <Input id={name} type="checkbox" {...{ ...props, name }} />
    <Label htmlFor={name} onClick={onToggle} {...{ ...props }}>
      {children}
    </Label>
  </Fragment>
);

CheckboxInput.propTypes = {
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

CheckboxInput.defaultProps = {
  checked: false,
  invalid: false,
  disabled: false,
  children: null,
  onToggle: () => {}
};

/**
 * @component
 */
export default CheckboxInput;
