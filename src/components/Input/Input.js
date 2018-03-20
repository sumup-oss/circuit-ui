import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, cx } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { size } from 'polished';

import HtmlElement from '../HtmlElement';
import { textMega, disableVisually } from '../../styles/style-helpers';
import { themePropType, childrenPropType } from '../../util/shared-prop-types';

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

const inputBaseStyles = ({ theme }) => css`
  label: input;
  background-color: ${theme.colors.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.12);
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
  width: 100%;
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

const inputTextAlignRightStyles = ({ textAlign }) =>
  textAlign === 'right' &&
  css`
    label: input--right;
    text-align: right;
  `;

const inputPrefixStyles = ({ theme, hasPrefix }) =>
  hasPrefix &&
  css`
    label: input--prefix;
    padding-left: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

const inputSuffixStyles = ({ theme, hasSuffix }) =>
  hasSuffix &&
  css`
    label: input--suffix;
    padding-right: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

const prefixStyles = ({ theme }) => css`
  label: input__prefix;
  position: absolute;
  top: 1px;
  left: 1px;
  ${size(theme.spacings.mega)};
  margin: ${theme.spacings.kilo};
  pointer-events: none;
`;

const suffixStyles = ({ theme }) => css`
  label: input__suffix;
  position: absolute;
  top: 1px;
  right: 1px;
  ${size(theme.spacings.mega)};
  margin: ${theme.spacings.kilo};
  pointer-events: none;
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
  ${inputTextAlignRightStyles};
  ${inputPrefixStyles};
  ${inputSuffixStyles};
`;

/**
 * Input component for forms. Takes optional prefix and suffix as render props.
 */
const Input = ({
  suffix,
  prefix,
  invalid,
  noMargin,
  inline,
  disabled,
  theme,
  ...props
}) => {
  const prefixClassName = cx(prefixStyles({ theme }));

  const suffixClassName = cx(suffixStyles({ theme }));

  const hasPrefix = !!prefix;
  const hasSuffix = !!suffix;

  return (
    <InputContainer {...{ noMargin, inline, disabled }}>
      {prefix && prefix({ className: prefixClassName })}
      <InputElement
        {...{ ...props, invalid, disabled, hasPrefix, hasSuffix }}
        aria-invalid={invalid}
        blacklist={{
          optional: true,
          invalid: true,
          textAlign: true,
          hasPrefix: true,
          hasSuffix: true
        }}
      />
      {suffix && suffix({ className: suffixClassName })}
    </InputContainer>
  );
};

Input.propTypes = {
  theme: themePropType.isRequired,
  children: childrenPropType,
  /**
   * The HTML input element to render.
   */
  element: PropTypes.oneOf(['input', 'textarea']),
  /**
   * Render prop that should render a left-aligned overlay icon or element.
   * Receives a className prop.
   */
  prefix: PropTypes.func,
  /**
   * Render prop that should render a right-aligned overlay icon or element.
   * Receives a className prop.
   */
  suffix: PropTypes.func,
  /**
   * Mark input as required. Important for accessibility.
   */
  required: PropTypes.bool,
  /**
   * Triggers error styles on the component. Important for accessibility.
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
   * Removes the default bottom margin from the input.
   */
  noMargin: PropTypes.bool,
  /**
   * Aligns text in the input
   */
  textAlign: PropTypes.oneOf(['left', 'right'])
};

Input.defaultProps = {
  children: null,
  element: 'input',
  prefix: null,
  suffix: null,
  required: false,
  invalid: false,
  optional: false,
  disabled: false,
  inline: false,
  noMargin: false,
  textAlign: 'left'
};

/**
 * @component
 */
export default withTheme(Input);
