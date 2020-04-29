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
import isPropValid from '@emotion/is-prop-valid';

import { StyledText } from '../../../Text';

const baseStyles = ({ theme }) => css`
  label: button__link;
  box-shadow: none;
  border: none;
  background: none;
  font-weight: normal;
  padding: 0;
  color: ${theme.colors.n500};
  cursor: pointer;
  outline: none;

  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: ${theme.colors.n900};
  }
`;

const primaryStyles = ({ theme, primary }) =>
  primary &&
  css`
    label: button__link--primary;
    color: ${theme.colors.p500};

    &:active {
      color: ${theme.colors.b900};
    }
  `;

const ButtonLinkWrapper = styled(StyledText, {
  shouldForwardProp: isPropValid
})(baseStyles, primaryStyles).withComponent('button');

/* eslint-disable react/prop-types */
const PlainButton = ({ components, href, ...props }) => {
  const PlainButtonWrapper = ButtonLinkWrapper.withComponent(components.Link);

  return href ? (
    <PlainButtonWrapper noMargin {...{ ...props, href }} />
  ) : (
    <ButtonLinkWrapper noMargin {...props} />
  );
};

export default PlainButton;
