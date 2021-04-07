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

/** @jsx jsx */
import { ButtonHTMLAttributes } from 'react';
import { css, jsx } from '@emotion/core';
import { ChevronUp, ChevronDown } from '@sumup/icons';

import styled, { StyleProps } from '../../../../styles/styled';
import { hideVisually } from '../../../../styles/style-mixins';
import { Direction } from '../../types';

interface SortArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: Direction;
  label?: string;
}

const baseStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  width: 20px;
  position: absolute;
  left: 0;
  top: 50%;
  opacity: 0;
  transform: translateY(-50%);
  transition: opacity ${theme.transitions.default};
  color: ${theme.colors.p500};
  border: 0;
  background: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:focus {
    opacity: 1;

    &::-moz-focus-inner {
      border: 0;
    }
  }
`;

const Wrapper = styled.button(baseStyles);

const iconStyles = () => css`
  margin-top: -3px;
  margin-bottom: -3px;
`;

const Label = styled('span')(hideVisually);

/**
 * @private Arrow component for TableHeader sorting
 */
const SortArrow = ({
  label = 'Sort',
  direction,
  ...props
}: SortArrowProps): JSX.Element => (
  <Wrapper role="button" title={label} {...props}>
    {direction !== 'ascending' && <ChevronUp css={iconStyles} />}
    {direction !== 'descending' && <ChevronDown css={iconStyles} />}
    <Label>{label}</Label>
  </Wrapper>
);

export default SortArrow;
