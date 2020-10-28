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

import { css } from '@emotion/core';

import styled, { StyleProps } from '../../../../styles/styled';
import { CardFooter } from '../../../Card';

const footerStyles = ({ theme }: StyleProps) => css`
  ${theme.mq.untilKilo} {
    position: sticky;
    bottom: 0;
    margin: 0 -${theme.spacings.mega};
    padding: ${theme.spacings.mega};
    width: calc(100% + 2 * ${theme.spacings.mega});
    background: ${theme.colors.white};

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: -${theme.spacings.giga};
      right: 0;
      width: 100%;
      height: ${theme.spacings.giga};
      background: linear-gradient(
        rgba(256, 256, 256, 0),
        ${theme.colors.white}
      );
    }
  }
`;

// FIXME: Remove any typecast once the Card has been migrated to TypeScript.
export const ModalFooter = styled(CardFooter as any)(footerStyles);
