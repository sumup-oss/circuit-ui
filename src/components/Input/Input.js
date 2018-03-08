import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import HtmlElement from '../HtmlElement/HtmlElement';
import { textMega, disableVisually } from '../../styles/style-helpers';
import {
  childrenPropType,
  stretchPropType
} from '../../util/shared-prop-types';

const inputBaseStyles = ({ theme }) => css`
  label: input;
  background-color: ${theme.colors.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.12);
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
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

const inputInvalidStyles = ({ theme, invalid }) =>
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

const inputOptionalStyles = ({ theme, optional }) =>
  optional &&
  css`
    label: input--optional;
    background-color: ${theme.colors.n100};
    border-style: dashed;
    box-shadow: none;
  `;

const inputStretchStyles = ({ stretch }) =>
  stretch &&
  css`
    label: input--stretch;
    width: 100%;
  `;

const containerBaseStyles = ({ theme }) => css`
  label: input__container;
  color: ${theme.colors.n900};
  display: block;
  position: relative;
  margin-bottom: ${theme.spacings.mega};
`;

const containerDisabledStyles = ({ disabled }) =>
  disabled &&
  css`
    label: input__container--disabled;
    ${disableVisually()};
  `;

const containerInlineStyles = ({ theme, inline }) =>
  inline &&
  css`
    label: input__container--inline;
    display: inline-block;
    margin-right: ${theme.spacings.mega};
  `;

const containerNoMarginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: input__container--no-margin;
    margin-bottom: 0;
  `;

const InputContainer = styled('div')`
  ${containerBaseStyles};
  ${containerNoMarginStyles};
  ${containerDisabledStyles};
  ${containerInlineStyles};
`;

const InputElement = styled(HtmlElement)`
  ${inputBaseStyles};
  ${inputOptionalStyles};
  ${inputInvalidStyles};
  ${inputStretchStyles};
`;

// TODO: Add dynamic invalid aria attribute.
/**
 * Input component for forms.
 */
const Input = ({ noMargin, inline, disabled, stretch, children, ...props }) => (
  <InputContainer {...{ noMargin, inline, disabled }}>
    <InputElement
      {...{ ...props, disabled, stretch }}
      blacklist={{ optional: true, invalid: true, stretch: true }}
    />
    {children}
  </InputContainer>
);

Input.propTypes = {
  children: childrenPropType,
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
   * Trigger inline styles on the component.
   */
  inline: PropTypes.bool,
  /**
   * Trigger stretch (full width) styles on the component.
   */
  stretch: stretchPropType,
  /**
   * Removes the default bottom margin from the input.
   */
  noMargin: PropTypes.bool,
  /**
   * The HTML input element to render.
   */
  element: PropTypes.oneOf(['input', 'textarea'])
};

Input.defaultProps = {
  children: null,
  element: 'input',
  invalid: false,
  optional: false,
  disabled: false,
  inline: false,
  stretch: false,
  noMargin: false
};

/**
 * @component
 */
export default Input;
