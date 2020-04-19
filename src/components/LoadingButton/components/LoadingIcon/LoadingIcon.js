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
import { css, keyframes } from '@emotion/core';
import { size as sizeMixin } from 'polished';
import { CircleCheckmarkFilled, CircleCrossFilled } from '@sumup/icons';

import { sizes } from '../../../../styles/constants';

import Spinner from '../../../Spinner';
import { DISABLED, ACTIVE, SUCCESS, ERROR } from '../../constants';

const { KILO, MEGA, GIGA } = sizes;

/**
 * Keyframes
 */
const iconEnter = keyframes`
  0% {
    opacity: 1;
    transform: scale3d(0, 0, 0);
  }

  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

/**
 * General purpose style functions.
 */
const centeredStyles = () => css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const sizeStyles = label => ({ theme, size }) => {
  const sizeMap = {
    [KILO]: theme.spacings.mega,
    [MEGA]: theme.spacings.giga,
    [GIGA]: theme.spacings.tera
  };

  const sizeValue = sizeMap[size] || sizeMap.GIGA;

  return css`
    label: ${`${label}--${size.toLowerCase()}`};
    ${sizeMixin(sizeValue)};
  `;
};

const IconContainer = styled.div`
  ${sizeStyles('loading-icon__status')};
  ${centeredStyles};
  width: 100%;
`;

const iconStyles = theme => css`
  ${sizeMixin('100%')};
  position: absolute;
  transform: scale3d(0, 0, 0);
  opacity: 0;
  transition: opacity ${theme.transitions.default};
  animation: ${iconEnter} ${theme.transitions.default};
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`;

/**
 * The components center themselves in the relatively positioned parent.
 */
const LoadingIcon = ({ loadingState, size }) => (
  <IconContainer size={size}>
    <Spinner size={size} active={loadingState === ACTIVE} />
    {loadingState === SUCCESS && <CircleCheckmarkFilled css={iconStyles} />}
    {loadingState === ERROR && <CircleCrossFilled css={iconStyles} />}
  </IconContainer>
);

LoadingIcon.propTypes = {
  /**
   * Current loading state of the button. Determines whether the icon shows
   * and whether Spinner or Success are shown.
   */
  loadingState: PropTypes.oneOf([DISABLED, ACTIVE, SUCCESS, ERROR]).isRequired,
  /**
   * Size prop from the Button.
   */
  size: PropTypes.string.isRequired
};

LoadingIcon.defaultProps = {
  size: GIGA
};

/**
 * @component
 */
export default LoadingIcon;
