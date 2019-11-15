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
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { ReactComponent as Icon } from './info.svg';

const baseStyles = ({ theme }) => css`
  label: info-icon;
  border: 1px solid ${theme.colors.n500};
  border-radius: 100%;
  fill: ${theme.colors.n500};
`;

const StyledIcon = styled(Icon)(baseStyles);

/**
 * A small info icon used for triggering tooltips
 * and other informational content.
 */
const InfoIcon = props => <StyledIcon {...props} />;

/**
 * @component
 */
export default InfoIcon;
