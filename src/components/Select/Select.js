/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { find } from 'lodash/fp';
import { SelectExpand, CircleCross } from '@sumup/icons';
import { useClickTrigger } from '@sumup/collector';

import {
  eitherOrPropType,
  childrenPropType
} from '../../util/shared-prop-types';
import {
  textMega,
  disableVisually,
  hideVisually
} from '../../styles/style-helpers';

import Tooltip from '../Tooltip';
import Label from '../Label';
import { uniqueId } from '../../util/id';

// HACK: Firefox includes the border-width in the overall height of the element
//       (despite box-sizing: border-box), so we have to force the height.
//       line-height + 2px + (vertical padding * 2) + (border-width * 2)
const MAX_HEIGHT = '42px';

const selectBaseStyles = ({ theme }) => css`
  label: select;
  appearance: none;
  cursor: pointer;
  background-color: ${theme.colors.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.12);
  color: ${theme.colors.n900};
  padding: ${theme.spacings.byte} ${theme.spacings.tera} ${theme.spacings.byte}
    ${theme.spacings.kilo};
  max-height: ${MAX_HEIGHT};
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
    padding-right: ${theme.spacings.zetta};
  `;

const suffixBaseStyles = ({ theme }) => css`
  label: select__icon;
  color: ${theme.colors.n700};
  display: block;
  z-index: 40;
  pointer-events: none;
  position: absolute;
  height: ${theme.spacings.peta};
  width: ${theme.spacings.peta};
  top: 1px;
  right: 1px;
  padding: ${theme.spacings.kilo};
`;

const suffixInvalidStyles = ({ theme, invalid }) =>
  invalid &&
  css`
    label: select__icon--invalid;
    right: calc(1px + ${theme.spacings.giga});
  `;

const containerBaseStyles = ({ theme }) => css`
  label: select__container;
  color: ${theme.colors.n900};
  display: block;
  position: relative;
  margin-bottom: ${theme.spacings.mega};

  label > &,
  label + & {
    margin-top: ${theme.spacings.bit};
  }
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

/**
 * Used with css prop directly, so it does not require prop
 * destructuring.
 */
const prefixStyles = theme => css`
  label: select__prefix;
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: 40;
  height: ${theme.spacings.peta};
  width: ${theme.spacings.peta};
  padding: ${theme.spacings.kilo};
  pointer-events: none;
`;

const selectPrefixStyles = ({ theme, hasPrefix }) =>
  hasPrefix &&
  css`
    label: select--prefix;
    padding-left: ${theme.spacings.peta};
  `;

const tooltipBaseStyles = css`
  label: select__tooltip;
  right: 1px;
`;

const labelTextStyles = ({ visuallyHidden }) =>
  visuallyHidden && hideVisually();

const LabelText = styled('span')(labelTextStyles);

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

const SelectIcon = styled(SelectExpand)`
  ${suffixBaseStyles};
  ${suffixInvalidStyles};
`;

const InvalidIcon = styled(CircleCross)`
  ${suffixBaseStyles};
  color: ${p => p.theme.colors.danger};
`;

const SelectTooltip = styled(Tooltip)`
  ${tooltipBaseStyles};
`;

const SelectComponent = (
  {
    value,
    placeholder,
    disabled,
    noMargin,
    inline,
    invalid,
    options,
    children,
    renderPrefix: RenderPrefix,
    validationHint,
    label,
    labelVisuallyHidden,
    id: customId,
    onChange,
    ...props
  },
  ref
) => {
  const id = customId || uniqueId('select_');

  const prefix = RenderPrefix && (
    <RenderPrefix css={prefixStyles} value={value} />
  );
  const showInvalid = !disabled && invalid;

  const dispatch = useClickTrigger();
  const handleChange = e => {
    const selectedValue = e.target.value;
    const selectedOption =
      find(option => option.value === selectedValue, options) || {};
    const { label: trackingLabel, component = 'select', customParameters } =
      selectedOption.tracking || {};

    if (trackingLabel) {
      dispatch({
        label: trackingLabel,
        component,
        customParameters
      });
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Label htmlFor={id}>
      {label ? (
        <LabelText visuallyHidden={labelVisuallyHidden}>{label}</LabelText>
      ) : null}
      <SelectContainer {...{ noMargin, inline, disabled }}>
        {prefix}
        <SelectElement
          {...{
            ...props,
            invalid,
            value,
            disabled,
            hasPrefix: !!prefix,
            id,
            ref,
            onChange: handleChange
          }}
        >
          {!value && (
            <option key="placeholder" value="">
              {placeholder}
            </option>
          )}
          {children ||
            (options &&
              options.map(({ label: labelValue, tracking, ...rest }) => (
                <option key={rest.value} {...rest}>
                  {labelValue}
                </option>
              )))}
        </SelectElement>
        <SelectIcon invalid={showInvalid} />
        {showInvalid && <InvalidIcon />}
        {!disabled && validationHint && (
          <SelectTooltip position={Tooltip.TOP} align={Tooltip.LEFT}>
            {validationHint}
          </SelectTooltip>
        )}
      </SelectContainer>
    </Label>
  );
};

/**
 * A native select component.
 */
const Select = React.forwardRef(SelectComponent);

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
        disabled: PropTypes.bool,
        tracking: PropTypes.shape({
          label: PropTypes.string.isRequired,
          component: PropTypes.string,
          customParameters: PropTypes.object
        })
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
  renderPrefix: PropTypes.func,
  /**
   * Warning or error message, displayed in a tooltip.
   */
  validationHint: PropTypes.string,
  /**
   * A clear and concise description of the input purpose.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Visually hide the label. This should only be used in rare cases and only if the
   * purpose of the field can be inferred from other context.
   */
  labelVisuallyHidden: PropTypes.bool,
  /**
   * A unique identifier for the input field. If not defined, a randomly generated id is used.
   */
  id: PropTypes.string.isRequired,
  /**
   * The ref to the html dom element
   */
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.oneOf([PropTypes.instanceOf(HTMLSelectElement)])
    })
  ])
};

Select.defaultProps = {
  children: null,
  options: null,
  disabled: false,
  invalid: false,
  placeholder: 'Select an option',
  inline: false,
  noMargin: false,
  ref: undefined,
  renderPrefix: null
};

/**
 * @component
 */
export default Select;
