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

import { HTMLAttributes } from 'react';
import { css } from '@emotion/react';
import { ChevronUp, ChevronDown } from '@sumup/icons';

import styled, { StyleProps } from '../../../../styles/styled.js';
import { hideVisually } from '../../../../styles/style-mixins';
import { Direction } from '../../types.js';

interface SortArrowProps extends HTMLAttributes<HTMLButtonElement> {
  direction?: Direction;
  label: string;
}

const baseStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 36px;
  width: ${theme.spacings.giga};
  position: absolute;
  left: 0;
  top: 50%;
  opacity: 0;
  transform: translateY(-50%);
  transition: opacity ${theme.transitions.default};
  color: var(--cui-fg-accent);
  border: 0;
  background: none;
  outline: 0;
  padding: 2px 4px;
  margin: 0;
  cursor: pointer;

  &:focus {
    opacity: 1;

    &::-moz-focus-inner {
      border: 0;
    }
  }
`;

const Button = styled.button(baseStyles);

const iconStyles = css`
  margin: -2px 0;
`;

const Label = styled('span')(hideVisually);

/**
 * SortArrow for the Table component. The Table handles rendering it.
 */
const SortArrow = ({
  label,
  direction,
  ...props
}: SortArrowProps): JSX.Element => (
  <Button role="button" title={label} {...props}>
    {direction !== 'ascending' && <ChevronUp size="16" css={iconStyles} />}
    {direction !== 'descending' && <ChevronDown size="16" css={iconStyles} />}
    <Label>{label}</Label>
  </Button>
);

export default SortArrow;
