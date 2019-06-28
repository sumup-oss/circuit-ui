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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { size as sizeMixin } from 'polished';

import { sizes } from '../../../../styles/constants';
import { values } from '../../../../util/fp';

import PureSpinner from '../../../Spinner';
import { ReactComponent as SuccessSvg } from '../icons/success.svg';
import { LOADING_STATES } from '../../constants';
import { SIZE_PROP_TYPE } from '../../../Button/constants';

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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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

/**
 * Icon styles for success icon
 */

const successIconBaseStyles = ({ theme }) => css`
  label: loading-icon__success;
  transform: scale3d(0, 0, 0);
  opacity: 0;
  transition: opacity ${theme.transitions.default};
  ${sizeMixin('100%')};
`;

const successIconVisibleStyles = ({ theme, visible }) =>
  visible &&
  css`
    label: loading-icon__success--visible;
    animation: ${iconEnter} ${theme.transitions.default};
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  `;

const SuccessIcon = styled(SuccessSvg)(
  successIconBaseStyles,
  successIconVisibleStyles
);
const SuccessContainer = styled('div')(
  centeredStyles,
  sizeStyles('loading-icon__success')
);

/**
 * Direct sub-components
 */

const Spinner = styled(PureSpinner)(
  sizeStyles('loading-icon__spinner'),
  centeredStyles
);

// TODO: add ARIA labels to icon.
const Success = ({ size, visible }) => (
  <SuccessContainer size={size}>
    <SuccessIcon visible={visible ? 1 : 0} />
  </SuccessContainer>
);

Success.propTypes = {
  /**
   * Size prop from the Button.
   */
  size: SIZE_PROP_TYPE,
  visible: PropTypes.bool
};

Success.defaultProps = {
  size: GIGA,
  visible: false
};

/**
 * Two components that center themselves in the relatively positioned
 * parent.
 */
const LoadingIcon = ({ loadingState, size }) => (
  <Fragment>
    <Spinner size={size} active={loadingState === LOADING_STATES.ACTIVE} />
    <Success size={size} visible={loadingState === LOADING_STATES.SUCCESS} />
  </Fragment>
);

LoadingIcon.propTypes = {
  /**
   * Current loading state of the button. Determines whether the icon shows
   * and whether Spinner or Success are shown.
   */
  loadingState: PropTypes.oneOf(values(LOADING_STATES)).isRequired,
  /**
   * Size prop from the Button.
   */
  size: PropTypes.string.isRequired
};

/**
 * @component
 */
export default LoadingIcon;
