import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, cx } from 'react-emotion';

import { textMega } from '../../styles/style-helpers';
import IconInputWrapper from '../IconInputWrapper';
import DownTriangleIcon from './down-triangle.svg';

const baseSelectStyles = ({ theme }) => css`
  label: select;
  appearance: none;
  background-color: ${theme.colors.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.21);
  color: ${theme.colors.n900};
  padding: ${theme.spacings.byte} ${theme.spacings.tera} ${theme.spacings.byte}
    ${theme.spacings.kilo};
  position: relative;
  ${textMega({ theme })};
  z-index: 30;

  &:focus,
  &:hover,
  &:active {
    outline: none;
  }

  &:focus {
    border: 1px solid ${theme.colors.b500};
  }

  &::after {
  }
`;

const disabledSelectStyles = ({ disabled }) =>
  disabled &&
  css`
    label: select--disabled;
    opacity: 0.4;
    pointer-events: none;
  `;

const baseIconStyles = ({ theme }) => css`
  label: select__icon;
  fill: ${theme.colors.n700};
  display: block;
  z-index: 40;
  pointer-events: none;
`;

const SelectElement = styled('select', { label: 'SelectElement' })(
  baseSelectStyles,
  disabledSelectStyles
);
const Icon = styled(DownTriangleIcon, { label: 'SelectIcon' })(baseIconStyles);

/**
 * A native select component.
 */
const Select = ({
  options,
  value,
  placeholder,
  selector,
  disabled,
  ...props
}) => (
  <IconInputWrapper
    {...{ selector }}
    iconPosition="right"
    icon={({ className, disabledClassName }) => (
      <Icon className={cx(className, { [disabledClassName]: disabled })} />
    )}
    input={({ className }) => (
      <SelectElement {...{ ...props, className, disabled }}>
        {!value && <option key={0}>{placeholder}</option>}
        {options &&
          options.map(option => (
            <option key={option.value} {...option}>
              {option.label}
            </option>
          ))}
      </SelectElement>
    )}
  />
);

Select.propTypes = {
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired,
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string,
      disabled: PropTypes.bool
    })
  ).isRequired,
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
  placeholder: PropTypes.string
};

Select.defaultProps = {
  disabled: false,
  value: null,
  placeholder: 'Select an option'
};

/**
 * @component
 */
export default Select;
