import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

import { childrenPropType } from '../../util/shared-prop-types';
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
  z-index: 30;
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

const containerNoMarginStyles = ({ margin }) =>
  margin &&
  css`
    label: select__container--no-margin;
    margin-bottom: 0;
  `;

const SelectContainer = styled('div')`
  ${containerBaseStyles};
  ${containerNoMarginStyles};
  ${containerDisabledStyles};
  ${containerInlineStyles};
`;

const SelectElement = styled('select')`
  ${selectBaseStyles};
`;

const Icon = styled(ArrowsIcon)`
  ${iconBaseStyles};
`;

/**
 * A native select component.
 */
const Select = ({
  value,
  placeholder,
  disabled,
  noMargin,
  inline,

  children,
  ...props
}) => (
  <SelectContainer {...{ noMargin, inline, disabled }}>
    <SelectElement {...{ ...props, disabled }}>
      {!value && <option key="placeholder">{placeholder}</option>}
      {children}
    </SelectElement>
    <Icon />
  </SelectContainer>
);

Select.propTypes = {
  /**
   * onChange handler, called when the selection changes.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Name of the select form element.
   */
  name: PropTypes.string.isRequired,
  /**
   * Options to select from.
   */
  children: childrenPropType.isRequired,
  /**
   * Styles the select as disabled.
   */
  disabled: PropTypes.bool,
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
  noMargin: PropTypes.bool
};

Select.defaultProps = {
  disabled: false,
  value: null,
  placeholder: 'Select an option',
  inline: false,
  noMargin: false
};

/**
 * @component
 */
export default Select;
