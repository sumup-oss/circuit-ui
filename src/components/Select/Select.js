/** @jsx jsx */

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { size } from 'polished';
import { withTheme } from 'emotion-theming';

import {
  themePropType,
  eitherOrPropType,
  childrenPropType
} from '../../util/shared-prop-types';
import { textMega, disableVisually } from '../../styles/style-helpers';

import ArrowsIcon from './arrows.svg';

const selectBaseStyles = ({ theme }) => css`
  label: select;
  appearance: none;
  background-color: ${theme.colors.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.12);
  color: ${theme.colors.n900};
  padding: ${theme.spacings.byte} ${theme.spacings.tera} ${theme.spacings.byte}
    ${theme.spacings.kilo};
  position: relative;
  width: 100%;
  z-index: ${theme.zIndex.select};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${textMega({ theme })};

  &:focus,
  &:hover,
  &:active {
    outline: none;
  }

  &:focus {
    border-color: ${theme.colors.p500};
  }

  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
`;

const selectInvalidStyles = ({ theme, invalid, disabled }) =>
  invalid &&
  !disabled &&
  css`
    label: select--invalid;
    border-color: ${theme.colors.r300};
  `;

const iconBaseStyles = ({ theme }) => css`
  label: select__icon;
  fill: ${theme.colors.n700};
  display: block;
  z-index: 40;
  pointer-events: none;
  position: absolute;
  ${size(theme.spacings.kilo)};
  top: 50%;
  right: ${theme.spacings.kilo};
  transform: translateY(-50%);
`;

const containerBaseStyles = ({ theme }) => css`
  label: select__container;
  color: ${theme.colors.n900};
  display: block;
  position: relative;
  margin-bottom: ${theme.spacings.mega};
`;

const containerDisabledStyles = ({ disabled }) =>
  disabled &&
  css`
    label: select__container--disabled;
    ${disableVisually()};
  `;

const containerInlineStyles = ({ theme, inline }) =>
  inline &&
  css`
    label: select__container--inline;
    display: inline-block;
    margin-right: ${theme.spacings.mega};
  `;

const containerNoMarginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: select__container--no-margin;
    margin-bottom: 0;
  `;

const prefixStyles = ({ theme }) => css`
  label: select__prefix;
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: 40;
  ${size(theme.spacings.mega)};
  margin: ${theme.spacings.kilo};
  pointer-events: none;
`;

const selectPrefixStyles = ({ theme, hasPrefix }) =>
  hasPrefix &&
  css`
    label: select--prefix;
    padding-left: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

const SelectContainer = styled('div')`
  ${containerBaseStyles};
  ${containerNoMarginStyles};
  ${containerDisabledStyles};
  ${containerInlineStyles};
`;

const SelectElement = styled('select')`
  ${selectBaseStyles};
  ${selectInvalidStyles};
  ${selectPrefixStyles};
`;

const Icon = styled(ArrowsIcon)`
  ${iconBaseStyles};
`;

const renderFixComponent = (className, renderFn) =>
  (renderFn && renderFn({ className })) || null;

/**
 * A native select component.
 */
const Select = ({
  value,
  placeholder,
  disabled,
  noMargin,
  inline,
  options,
  children,
  theme,
  renderPrefix: RenderPrefix,
  ...props
}) => {
  const prefix = RenderPrefix && <RenderPrefix css={prefixStyles} />;

  return (
    <SelectContainer {...{ noMargin, inline, disabled }}>
      {prefix}
      <SelectElement
        {...{
          ...props,
          value,
          disabled,
          hasPrefix: !!prefix
        }}
        blacklist={{
          hasPrefix: true
        }}
      >
        {!value && (
          <option key="placeholder" value="">
            {placeholder}
          </option>
        )}
        {children ||
          (options &&
            options.map(({ label, ...rest }) => (
              <option key={rest.value} {...rest}>
                {label}
              </option>
            )))}
      </SelectElement>
      <Icon />
    </SelectContainer>
  );
};

Select.propTypes = {
  theme: themePropType.isRequired,
  /**
   * onChange handler, called when the selection changes.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Name of the select form element.
   */
  name: PropTypes.string.isRequired,
  /**
   * Options to select from. Can also be provided with the options prop.
   */
  children: eitherOrPropType('children', 'options', childrenPropType, true),
  /**
   * Options to select from. Can also be provided with the children prop.
   */
  options: eitherOrPropType(
    'children',
    'options',
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
        disabled: PropTypes.bool
      })
    ),
    true
  ),
  /**
   * Styles the select as disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid: PropTypes.bool,
  /**
   * Currently selected value. Matches the "value" property of
   * the options objects. If value is falsy, Select will render
   * the "placeholder" prop as currently selected.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * String to show when no selection is made.
   */
  placeholder: PropTypes.string,
  /**
   * Trigger inline styles on the component.
   */
  inline: PropTypes.bool,
  /**
   * Removes the default bottom margin from the select.
   */
  noMargin: PropTypes.bool,
  /**
   * Render prop that should render a left-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderPrefix: PropTypes.func
};

Select.defaultProps = {
  children: null,
  options: null,
  disabled: false,
  invalid: false,
  value: null,
  placeholder: 'Select an option',
  inline: false,
  noMargin: false,
  renderPrefix: null
};

/**
 * @component
 */
export default withTheme(Select);
