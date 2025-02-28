/**
 * Copyright 2025, SumUp Ltd.
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

import type { HTMLAttributes } from 'react';
import { PlusTier } from '@sumup-oss/icons';

export interface TierIndicatorProps extends HTMLAttributes<SVGElement> {
  /**
   * The tier name.
   */
  variant: 'plus';
  /**
   * Choose from 3 sizes.
   * @default 'm'
   */
  size?: 's' | 'm' | 'l';
}
const sizeMap: Record<string, '16' | '24' | '32'> = {
  s: '16',
  m: '24',
  l: '32',
};

export const TierIndicator = ({
  size = 'm',
  variant,
  ...props
}: TierIndicatorProps) => (
  <PlusTier aria-label={variant} size={sizeMap[size]} {...props} />
);
