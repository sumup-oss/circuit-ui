/**
 * Copyright 2021, SumUp Ltd.
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

import { deprecate } from '../../util/logger.js';
import { Body, type BodyProps } from '../Body/Body.js';

export type BodyLargeProps = Omit<BodyProps, 'size'>;
/**
 * @deprecated Use the Body component in size `l` instead.
 */
export const BodyLarge = forwardRef<HTMLParagraphElement, BodyLargeProps>(
  (props, ref) => {
    if (process.env.NODE_ENV !== 'production') {
      deprecate(
        'BodyLarge',
        'The BodyLarge component has been deprecated. Use the Body component in size `l` instead.',
      );
    }

    return <Body {...props} ref={ref} size="l" />;
  },
);

BodyLarge.displayName = 'BodyLarge';
