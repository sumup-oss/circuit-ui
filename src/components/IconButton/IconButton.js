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

import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { size, hideVisually } from 'polished';

const buttonStyles = ({ theme }) => css`
  label: icon-button;
  padding: 0;
  margin: 0;
  display: inline-block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  fill: ${theme.colors.black};
  overflow: initial;

  &:focus,
  &:active {
    outline: none;
  }

  > svg {
    ${size('100%')};
  }
`;

const Button = styled('button')(buttonStyles);

const labelStyles = () => css`
  ${hideVisually()};
`;

const Label = styled('span')(labelStyles);

/**
 * Accessible icon button.
 */
const IconButton = ({ children, label, ...props }) => {
  if (!children) {
    return null;
  }
  const iconChild = Children.only(children);
  const icon = cloneElement(iconChild, { role: 'presentation' });
  return (
    <Button type="button" {...props}>
      {icon}
      {label && <Label>{label}</Label>}
    </Button>
  );
};

IconButton.propTypes = {
  /**
   * The icon element. Must be a single child.
   */
  children: PropTypes.element.isRequired,
  /**
   * Visually hidden text label for screen readers. Crucial for accessibility.
   */
  label: PropTypes.string.isRequired
};

/**
 * @component
 */
export default IconButton;
