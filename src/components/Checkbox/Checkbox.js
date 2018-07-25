import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { hideVisually, size } from 'polished';

import { disableVisually } from '../../styles/style-helpers';
import { childrenPropType } from '../../util/shared-prop-types';
import { uniqueId } from '../../util/id';

const checkmarkSvg = fill =>
  // NOTE: Optimizing SVGs in data URIs, https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
  `data:image/svg+xml,${encodeURIComponent(
    `<svg width='10' height='10' xmlns='http://www.w3.org/2000/svg'><path d='M3.438 6.973l5.097-5.694a.858.858 0 0 1 1.175-.086c.349.288.389.793.089 1.128l-5.73 6.4a.856.856 0 0 1-1.264 0L.201 5.812a.778.778 0 0 1 .09-1.128.858.858 0 0 1 1.174.086l1.973 2.203z' fill='${fill}' fill-rule='nonzero'/></svg>`
  )}`;

const labelBaseStyles = ({ theme }) => css`
  label: checkbox__label;
  color: ${theme.colors.n700};
  display: inline-block;
  padding-left: ${theme.spacings.giga};
  position: relative;

  &::before {
    ${size(theme.spacings.mega)};
    box-sizing: border-box;
    box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.12);
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.n500};
    border-radius: 3px;
    content: '';
    display: block;
    position: absolute;
    top: ${theme.spacings.kilo};
    left: 0;
    transform: translateY(-50%);
    transition: border 0.05s ease-in;
  }

  &::after {
    ${size(10)};
    box-sizing: border-box;
    content: url("${checkmarkSvg(theme.colors.p500)}");
    display: block;
    left: 3px;
    line-height: 0;
    opacity: 0;
    position: absolute;
    top: ${theme.spacings.kilo};
    transform: translateY(-50%) scale(0, 0);
    transition: transform 0.05s ease-in, opacity 0.05s ease-in;
  }

`;

const labelInvalidStyles = ({ theme, invalid }) =>
  invalid &&
  css`
    label: checkbox--error;
    &:not(:focus)::before {
      border-color: ${theme.colors.r500};
    }

    &:not(:focus)::after {
      content: url("${checkmarkSvg(theme.colors.r500)}");
    }
  `;

const labelDisabledStyles = ({ theme, disabled }) =>
  disabled &&
  css`
    label: checkbox--disabled;
    ${disableVisually()};

    &::before {
      ${disableVisually()};
      border-color: ${theme.colors.n500};
      background-color: ${theme.colors.n100};
    }

    &::after {
      ${disableVisually()};
      content: url("${checkmarkSvg(theme.colors.n500)}");
    }
  `;

const inputStyles = ({ theme }) => css`
  label: checkbox__input;
  ${hideVisually()};

  &:focus + label::before {
    border-width: 2px;
    border-color: ${theme.colors.p500};
  }

  &:checked + label::after {
    transform: translateY(-50%) scale(1, 1);
    opacity: 1;
  }

  &:checked + label::before {
    border-color: ${theme.colors.p500};
  }
`;

const checkboxWrapperBaseStyles = ({ theme }) => css`
  label: checkbox;
  &:last-of-type {
    margin-bottom: ${theme.spacings.mega};
  }
`;

const CheckboxInput = styled('input')`
  ${inputStyles};
`;

const CheckboxLabel = styled('label')`
  ${labelBaseStyles};
  ${labelDisabledStyles};
  ${labelInvalidStyles};
`;

const CheckboxWrapper = styled('div')`
  ${checkboxWrapperBaseStyles};
`;

/**
 * Checkbox component for forms.
 */
const Checkbox = ({ children, id: customId, className, ...props }) => {
  const id = customId || uniqueId('checkbox_');
  return (
    <CheckboxWrapper className={className}>
      <CheckboxInput {...props} id={id} type="checkbox" />
      <CheckboxLabel {...props} htmlFor={id}>
        {children}
      </CheckboxLabel>
    </CheckboxWrapper>
  );
};

Checkbox.propTypes = {
  /**
   * Controles/Toggles the checked state.
   */
  onChange: PropTypes.func,
  /**
   * Value string for input.
   */
  value: PropTypes.string,
  /**
   * Child nodes to be rendered as the label.
   */
  children: childrenPropType,
  /**
   * A unique ID used to link the input and label.
   */
  id: PropTypes.string,
  /**
   * The name of the checkbox.
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
   * Override styles for the Checkbox component.
   */
  className: PropTypes.string
};

Checkbox.defaultProps = {
  onChange: undefined,
  id: null,
  checked: false,
  value: '',
  invalid: false,
  disabled: false,
  children: null,
  className: ''
};

/**
 * @component
 */
export default Checkbox;
