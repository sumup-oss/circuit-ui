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

import { css } from '@emotion/react';
import { ChevronLeft, ChevronRight, Pause, Play } from '@sumup/icons';

import styled, { StyleProps } from '../../../../styles/styled.js';
import IconButton, { IconButtonProps } from '../../../IconButton/index.js';

const buttonListStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonList = styled('div')(buttonListStyles);

const buttonStyles = ({ theme }: StyleProps) => css`
  margin-left: ${theme.spacings.byte};

  &:first-of-type {
    margin-left: 0;
  }
`;

export const Button = styled(IconButton)(buttonStyles);

Button.defaultProps = {
  size: 'kilo',
};

type ButtonProps = Omit<IconButtonProps, 'children'>;

export const NextButton = (props: ButtonProps) => (
  <Button {...props}>
    <ChevronRight size="16" />
  </Button>
);

export const PrevButton = (props: ButtonProps) => (
  <Button {...props}>
    <ChevronLeft size="16" />
  </Button>
);

export const PlayButton = ({
  paused,
  ...props
}: ButtonProps & { paused?: boolean }) => (
  <Button {...props}>
    {paused ? <Play size="16" /> : <Pause size="16" />}
  </Button>
);