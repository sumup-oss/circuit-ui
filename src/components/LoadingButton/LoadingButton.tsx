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

import React, { FC } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { hideVisually } from '../../styles/style-helpers';
import Button from '../Button';
import { ButtonProps } from '../Button/Button';
import Spinner from '../Spinner';

export interface LoadingButtonProps extends ButtonProps {
  /**
   * Visually disables the button and shows a loading spinner.
   */
  isLoading?: boolean;
  /**
   * Visually hidden label to communicate the loading state to visually
   * impaired users.
   */
  loadingLabel: string;
}

const buttonStyles = css`
  position: relative;
  overflow: hidden;
`;

const spinnerBaseStyles = ({ theme }: StyleProps) => css`
  position: absolute;
  opacity: 0;
  visibility: hidden;
  transition: opacity ${theme.transitions.default},
    visibility ${theme.transitions.default};
`;

const spinnerLoadingStyles = ({ isLoading }: { isLoading: boolean }) =>
  isLoading &&
  css`
    opacity: 1;
    visibility: visible;
  `;

const LoadingIcon = styled(Spinner)<{ isLoading: boolean }>(
  spinnerBaseStyles,
  spinnerLoadingStyles,
);

const LoadingLabel = styled.span(hideVisually);

const childrenStyles = ({ theme }: StyleProps) => css`
  opacity: 1;
  visibility: visible;
  transform: scale3d(1, 1, 1);
  transition: opacity ${theme.transitions.default},
    transform ${theme.transitions.default},
    visibility ${theme.transitions.default};
`;

const childrenLoadingStyles = ({ isLoading }: { isLoading: boolean }) =>
  isLoading &&
  css`
    opacity: 0;
    visibility: hidden;
    transform: scale3d(0, 0, 0);
  `;

const Children = styled.span<{ isLoading: boolean }>(
  childrenStyles,
  childrenLoadingStyles,
);

export const LoadingButton: FC<LoadingButtonProps> = ({
  children,
  isLoading = false,
  loadingLabel = 'Loading',
  ...props
}) => (
  <Button
    css={buttonStyles}
    disabled={isLoading}
    aria-live="polite"
    aria-busy={isLoading}
    {...props}
  >
    <LoadingIcon isLoading={isLoading}>
      <LoadingLabel>{loadingLabel}</LoadingLabel>
    </LoadingIcon>
    <Children isLoading={isLoading}>{children}</Children>
  </Button>
);
