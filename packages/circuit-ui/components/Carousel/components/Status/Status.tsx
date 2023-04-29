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

import { typography } from '../../../../styles/style-mixins.js';
import styled, { StyleProps } from '../../../../styles/styled.js';
import Body, { BodyProps } from '../../../Body/index.js';

export interface StatusProps extends BodyProps {
  /**
   * Current active index of a carousel.
   */
  step: number;
  /**
   * Total number of slides in a carousel.
   */
  total: number;
}

const textStyles = ({ theme }: StyleProps) => css`
  ${theme.mq.untilKilo} {
    ${typography('two')(theme)};
  }
`;

const StyledText = styled(Body)(textStyles);

export function Status({ step = 0, total = 0, ...props }: StatusProps) {
  return (
    <StyledText variant="highlight" {...props}>
      {step + 1} / {total}
    </StyledText>
  );
}
