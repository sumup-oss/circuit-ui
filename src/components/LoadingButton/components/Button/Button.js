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

import Button from '../../../Button';
import LoadingIcon from '../LoadingIcon';
import { DISABLED, ACTIVE, SUCCESS, ERROR } from '../../constants';
import {
  BUTTON_PROP_TYPES,
  BUTTON_DEFAULT_PROPS
} from '../../../Button/constants';

const StyledButton = styled(Button)`
  position: relative;
  overflow: hidden;
`;

const childrenWrapperStyles = ({ theme }) => css`
  display: inline-block;
  opacity: 1;
  transform: translate(0, 0);
  transition: opacity ${theme.transitions.default},
    transform ${theme.transitions.default};
`;

const childrenWrapperLoadingStyles = ({ loadingState }) =>
  loadingState !== DISABLED &&
  css`
    opacity: 0;
    transform: translate(0, 100%);
  `;

const ChildrenWrapper = styled.span`
  ${childrenWrapperStyles};
  ${childrenWrapperLoadingStyles};
`;

const LoadingButton = ({
  loadingState,
  size,
  children,
  onClick,
  isLoading,
  ...otherProps
}) => (
  <StyledButton
    {...otherProps}
    size={size}
    onClick={isLoading ? null : onClick}
    isLoading={isLoading}
  >
    <LoadingIcon size={size} loadingState={loadingState} />
    <ChildrenWrapper loadingState={loadingState}>{children}</ChildrenWrapper>
  </StyledButton>
);

LoadingButton.propTypes = {
  ...BUTTON_PROP_TYPES,
  loadingState: PropTypes.oneOf([DISABLED, ACTIVE, SUCCESS, ERROR]),
  isLoading: PropTypes.bool
};

LoadingButton.defaultProps = {
  ...BUTTON_DEFAULT_PROPS,
  loadingState: DISABLED,
  isLoading: false
};

export default LoadingButton;
