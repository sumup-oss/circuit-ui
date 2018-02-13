import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';
import { textKilo, subtractUnit } from '../../styles/style-helpers';
import { uniqueId } from '../../util/id';
import { KILO, MEGA, GIGA } from '../../styles/sizes';

const calculateSize = ({ theme, size }) => {
  const sizeMap = {
    [KILO]: theme.spacings.byte,
    [MEGA]: theme.spacings.mega,
    [GIGA]: theme.spacings.tera
  };
  return sizeMap[size];
};

const wrapperStyles = ({ theme }) => css`
  label: loading-bar;
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacings.mega};
`;

const progressStyles = ({ theme, size, value, max }) => {
  const outerBorderWidth = '1px';
  const outerBorderRadius = theme.borderRadius.mega;
  const innerBorderRadius = `${subtractUnit(
    outerBorderRadius,
    outerBorderWidth
  )}`;
  return css`
    label: loading-bar__progress;
    background-color: ${theme.colors.n100};
    border: ${outerBorderWidth} solid ${theme.colors.n300};
    border-radius: ${outerBorderRadius};
    position: relative;
    width: 100%;
    height: ${calculateSize({ theme, size })};

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
      border-radius: ${innerBorderRadius} 0 0 ${innerBorderRadius};
      transition: width 0.05s ease-out;
    }
  `;
};

const labelStyles = ({ theme }) => css`
  label: loading-bar__label;
  ${textKilo({ theme })};
  margin-left: ${theme.spacings.byte};
`;

const LoadingBarWrapper = styled('div')`
  ${wrapperStyles};
`;
const LoadingBarProgress = styled('span')`
  ${progressStyles};
`;
const LoadingBarLabel = styled('span')`
  ${labelStyles};
`;

/**
 * Loading bar component to indicate progress
 */
const LoadingBar = ({ children, max, value, ...props }) => {
  const ariaId = uniqueId('loadingBar_');
  return (
    <LoadingBarWrapper>
      <LoadingBarProgress
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
        aria-labelledby={ariaId}
        {...{ ...props, max, value }}
      />
      <LoadingBarLabel id={ariaId}>{children}</LoadingBarLabel>
    </LoadingBarWrapper>
  );
};

LoadingBar.KILO = KILO;
LoadingBar.MEGA = MEGA;
LoadingBar.GIGA = GIGA;

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
  size: PropTypes.oneOf([LoadingBar.KILO, LoadingBar.MEGA, LoadingBar.GIGA]),
  /**
   * Child nodes to be rendered as the label.
   */
  children: childrenPropType
};

LoadingBar.defaultProps = {
  size: LoadingBar.KILO,
  max: 1.0,
  value: 0,
  children: null
};

/**
 * @component
 */
export default LoadingBar;
