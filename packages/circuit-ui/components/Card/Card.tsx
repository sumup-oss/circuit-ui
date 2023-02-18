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

import { styled } from '@linaria/react';

import { light as theme } from '@sumup/design-tokens';

export interface CardProps {
  /**
   * The padding of the Card.
   */
  spacing?: 'mega' | 'giga';
}

const spacingMap = {
  mega: `${theme.spacings.mega} ${theme.spacings.mega}`,
  giga: `${theme.spacings.mega} ${theme.spacings.giga}`,
};

export const Card = styled('div')<CardProps>`
  background-color: var(--cui-bg-normal);
  border-radius: ${theme.borderRadius.mega};
  border: ${theme.borderWidth.mega} solid var(--cui-border-subtle);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ spacing = 'giga' }) => spacingMap[spacing]};
`;
