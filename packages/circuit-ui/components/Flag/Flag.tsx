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

import { forwardRef } from 'react';
import { Flag as IconsFlag, type FlagProps } from '@sumup-oss/icons';

import { deprecate } from '../../util/logger.js';

export type { FlagProps };

/**
 * @deprecated Import `Flag` from `@sumup-oss/icons` instead.
 */
export const Flag = forwardRef<HTMLImageElement, FlagProps>((props, ref) => {
  if (process.env.NODE_ENV !== 'production') {
    deprecate(
      'Flag',
      'The Flag component has moved. Import it from `@sumup-oss/icons` instead.',
    );
  }

  return <IconsFlag {...props} ref={ref} />;
});

Flag.displayName = 'Flag';
