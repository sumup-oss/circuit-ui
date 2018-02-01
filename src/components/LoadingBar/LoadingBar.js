import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';

const calculateSize = ({ theme, size }) => {
  const sizeMap = {
    kilo: theme.spacings.byte,
    mega: theme.spacings.mega,
    giga: theme.spacings.tera
  };
  return sizeMap[size];
};

const baseStyles = ({ theme, size, value, max }) => css`
  label: loading-bar__progress;
  background-color: ${theme.colors.n100};
  border: 1px solid ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  position: relative;
  width: 100%;
  height: ${calculateSize({ theme, size })};
  margin-bottom: ${theme.spacings.mega};

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${value / max * 100}%;
    background-color: ${theme.colors.b500};
    border: 1px solid ${theme.colors.b700};
    box-shadow: inset 0 1px 0 0 ${theme.colors.b300};
    border-radius: 3px 0 0 3px;
    transition: width 0.05s ease-out;
  }
`;

const Progress = styled('div', { label: 'LoadingBarProgress' })(baseStyles);

/**
 * Loading bar component to indicate progress
 */
const LoadingBar = ({ children, max, value, ...props }) => (
  <div>
    <Progress
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax={max}
      {...{ ...props, max, value }}
    />
    {children}
  </div>
);

LoadingBar.propTypes = {
  /**
   * A number greater than zero, indicating how much work the task requires.
   */
  max: PropTypes.number,
  /**
   * A number between 0 and max, indicating how much of the task has been
   * completed.
   */
  value: PropTypes.number,
  /**
   * Size
   */
  size: PropTypes.oneOf(['kilo', 'mega', 'giga']),
  /**
   * Child nodes to be rendered as the label.
   */
  children: childrenPropType
};

LoadingBar.defaultProps = {
  size: 'kilo',
  max: 1.0,
  value: 0,
  children: null
};

/**
 * @component
 */
export default LoadingBar;
