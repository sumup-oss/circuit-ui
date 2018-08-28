import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import styled, { css, cx } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { size } from 'polished';

import HtmlElement from '../HtmlElement';
import { textMega, disableVisually } from '../../styles/style-helpers';
import { directions } from '../../styles/constants';
import { themePropType, childrenPropType } from '../../util/shared-prop-types';

import Tooltip from '../Tooltip';

import ErrorIcon from './error.svg';
import WarningIcon from './warning.svg';
import ValidIcon from './valid.svg';

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
  transition: border-color ${theme.transitions.default};
  width: 100%;
  ${textMega({ theme })};

  &:focus,
  &:active {
    border: 1px solid ${theme.colors.p500};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.n500};
    transition: color ${theme.transitions.default};
  }
`;

const inputWarningStyles = ({ theme, hasWarning, disabled }) =>
  !disabled &&
  hasWarning &&
  css`
    label: input--warning;
    &:not(:focus) {
      border-color: ${theme.colors.y500};

      &::placeholder {
        color: ${theme.colors.y500};
      }
    }
  `;

const inputInvalidStyles = ({ theme, invalid, disabled }) =>
  !disabled &&
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
  textAlign === directions.RIGHT &&
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

const tooltipBaseStyles = () => css`
  label: input__tooltip;
  right: 1px;
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
  ${inputWarningStyles};
  ${inputInvalidStyles};
  ${inputTextAlignRightStyles};
  ${inputPrefixStyles};
  ${inputSuffixStyles};
`;

const InputTooltip = styled(Tooltip)`
  ${tooltipBaseStyles};
`;

const validationIconBaseStyles = ({ theme }) => css`
  opacity: 0;
  transition: opacity ${theme.transitions.default};
`;

const validationIconActiveStyles = ({ invalid, hasWarning }) =>
  (invalid || hasWarning) &&
  css`
    opacity: 1;
  `;

const ValidationIconWrapper = styled('div')(
  validationIconBaseStyles,
  validationIconActiveStyles
);

const iconStyles = css`
  display: block;
  height: 100%;
  width: 100%;
`;

/* eslint-disable react/prop-types */
const ValidationIcon = ({
  invalid,
  hasWarning,
  showValid,
  disabled,
  className
}) => {
  if (disabled) {
    return null;
  }

  const icons = [
    invalid && <ErrorIcon role="img" className={iconStyles} />,
    hasWarning && <WarningIcon role="img" className={iconStyles} />,
    showValid && <ValidIcon role="img" className={iconStyles} />
  ];

  const icon = find(icons);

  return (
    <ValidationIconWrapper {...{ invalid, hasWarning, className }}>
      {icon || null}
    </ValidationIconWrapper>
  );
};
/* eslint-enable react/prop-types */

const renderFixComponent = (className, renderFn) =>
  (renderFn && renderFn({ className })) || null;

/**
 * Input component for forms. Takes optional prefix and suffix as render props.
 */
const StyledInput = ({
  children,
  renderPrefix,
  renderSuffix,
  validationHint,
  invalid,
  hasWarning,
  showValid,
  noMargin,
  inline,
  disabled,
  theme,
  wrapperClassName,
  inputClassName,
  deepRef,
  ...props
}) => {
  const prefixClassName = cx(prefixStyles({ theme }));
  const suffixClassName = cx(suffixStyles({ theme }));

  const suffix = renderFixComponent(
    suffixClassName,
    renderSuffix ||
      // eslint-disable-next-line
      (({ className }) => (
        <ValidationIcon
          {...{ invalid, hasWarning, showValid, disabled, className }}
        />
      ))
  );
  const prefix = renderFixComponent(prefixClassName, renderPrefix);

  return (
    <InputContainer
      {...{ noMargin, inline, disabled, className: wrapperClassName }}
    >
      {prefix}
      <InputElement
        {...{
          ...props,
          invalid,
          disabled,
          hasWarning,
          deepRef,
          hasPrefix: !!prefix,
          hasSuffix: !!suffix,
          className: inputClassName
        }}
        aria-invalid={invalid}
        blacklist={{
          optional: true,
          invalid: true,
          textAlign: true,
          hasWarning: true,
          hasPrefix: true,
          hasSuffix: true
        }}
      />
      {suffix}
      {!disabled &&
        validationHint && (
          <InputTooltip position={Tooltip.TOP} align={Tooltip.LEFT}>
            {validationHint}
          </InputTooltip>
        )}
      {children}
    </InputContainer>
  );
};

const Input = props => <StyledInput {...props} />;

Input.LEFT = directions.LEFT;
Input.RIGHT = directions.RIGHT;

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
  renderPrefix: PropTypes.func,
  /**
   * Render prop that should render a right-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderSuffix: PropTypes.func,
  /**
   * Warning or error message, displayed in a tooltip.
   */
  validationHint: PropTypes.string,
  /**
   * Mark input as required. Important for accessibility.
   */
  required: PropTypes.bool,
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid: PropTypes.bool,
  /**
   * Triggers warning styles on the component.
   */
  hasWarning: PropTypes.bool,
  /**
   * Enables valid styles on the component.
   */
  showValid: PropTypes.bool,
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
  textAlign: PropTypes.oneOf([Input.LEFT, Input.RIGHT]),
  /**
   * Class name to overwrite the <input> element styles.
   */
  inputClassName: PropTypes.string,
  /**
   * Class name to overwrite the input wrapper element styles.
   */
  wrapperClassName: PropTypes.string,
  /**
   * DOM node to be forwarded to the actual input being rendered by
   * styled.
   */
  deepRef: PropTypes.func
};

StyledInput.propTypes = Input.propTypes;

Input.defaultProps = {
  children: null,
  element: 'input',
  renderPrefix: null,
  renderSuffix: null,
  validationHint: null,
  required: false,
  invalid: false,
  hasWarning: false,
  showValid: false,
  optional: false,
  disabled: false,
  inline: false,
  noMargin: false,
  deepRef: undefined,
  textAlign: Input.LEFT,
  inputClassName: '',
  wrapperClassName: ''
};

/**
 * @component
 */
export default withTheme(Input);
