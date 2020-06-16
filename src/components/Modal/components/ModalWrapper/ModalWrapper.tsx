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

import styled, { StyleProps } from '../../../../styles/styled';
import Card from '../../../Card';

// TODO: Extend CardProps once the Card has been migrated to TypeScript.
export interface ModalWrapperProps {
  /**
   * The shadow depth of the Modal.
   */
  shadow?: 'single' | 'double' | 'triple';
  /**
   * The padding of the Modal.
   */
  spacing?: 'mega' | 'giga';
}

const baseStyles = ({ theme }: StyleProps) => css`
  width: 100%;

  ${theme.mq.untilKilo} {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    min-width: initial;
    position: relative;
  }
`;

// FIXME: Remove any typecast once the Card has been migrated to TypeScript.
const Wrapper = styled(Card as any)<ModalWrapperProps>(baseStyles);

export const ModalWrapper: FC<ModalWrapperProps> = props => (
  <Wrapper shadow="triple" spacing="giga" {...props} />
);
