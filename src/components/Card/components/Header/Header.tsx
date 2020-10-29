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

import React, { FC, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { css } from '@emotion/core';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../../../styles/styled';
import {
  CloseButton,
  CloseButtonProps,
} from '../../../CloseButton/CloseButton';

export interface CardHeaderProps {
  /**
   * Heading to be shown.
   */
  children: ReactNode;
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  labelCloseButton?: string;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * Callback for the close button. If not specified, the button won't
   * be shown.
   */
  onClose?: (event: MouseEvent | KeyboardEvent) => void;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: card__header;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacings.giga};
`;

const CardHeaderContainer = styled('header')<CardHeaderProps>(baseStyles);

const closeButtonStyles = ({ theme }: StyleProps) => css`
  margin-top: -${theme.spacings.byte};
  margin-right: -${theme.spacings.kilo};
  margin-bottom: -${theme.spacings.byte};
`;

const CardHeaderCloseButton = styled(CloseButton)<CloseButtonProps>(
  closeButtonStyles,
);

/**
 * Header used in the Card component. Used for styling and alignment
 * purposes only.
 */
export const CardHeader: FC<CardHeaderProps> = ({
  children,
  tracking,
  onClose,
  labelCloseButton,
  ...props
}) => (
  <CardHeaderContainer
    labelCloseButton={labelCloseButton}
    tracking={tracking}
    onClose={onClose}
    {...props}
  >
    {children}
    {onClose && labelCloseButton && (
      <CardHeaderCloseButton
        label={labelCloseButton}
        data-testid="header-close"
        onClick={onClose}
        tracking={{
          component: 'close-button',
          ...tracking,
        }}
      />
    )}
  </CardHeaderContainer>
);
