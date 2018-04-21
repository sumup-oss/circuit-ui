import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { uniqueId } from '../../util/id';

import RadioButton from '../RadioButton';

/**
 * A group of RadioButtons.
 */
const RadioButtonGroup = ({
  options,
  onChange: onToggle,
  value: activeValue,
  name: customName
}) => {
  const baseStyles = ({ theme }) => css`
    label: radio-button-group;
    margin-bottom: ${theme.spacings.mega};
  `;
  const marginStyles = ({ noMargin }) =>
    noMargin &&
    css`
      label: radio-button-group--no-margin;
      margin-bottom: 0;
    `;
  const Wrapper = styled('div')`
    ${baseStyles} ${marginStyles};
  `;
  const name = customName || uniqueId('radio-button-group_');
  return (
    <Wrapper>
      {options &&
        options.map(({ label, value, className, ...props }) => (
          <div key={value} className={className}>
            <RadioButton
              {...{ ...props, value, name, onToggle }}
              checked={value === activeValue}
            >
              {label}
            </RadioButton>
          </div>
        ))}
    </Wrapper>
  );
};

RadioButtonGroup.propTypes = {
  /**
   * A collection of available options. Each option must have at least
   * a value and label.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    })
  ).isRequired,
  /**
   * Controles/Toggles the checked state. Passed on to the RadioButtons.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The value of the currently checked RadioButton.
   */
  value: PropTypes.string.isRequired,
  /**
   * A unique name for the radio group.
   */
  name: PropTypes.string,
  /**
   * Whether to omit the default margin bottom.
   */
  noMargin: PropTypes.bool
};

RadioButtonGroup.defaultProps = {
  name: null,
  noMargin: false
};

/**
 * @component
 */
export default RadioButtonGroup;
