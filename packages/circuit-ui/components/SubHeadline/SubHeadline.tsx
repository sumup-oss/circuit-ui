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

import { forwardRef, type HTMLAttributes } from 'react';

import { deprecate } from '../../util/logger';
import { Headline } from '../Headline/Headline';

export interface SubHeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * The HTML heading element to render. Headings should be nested sequentially
   * without skipping any levels. Learn more at
   * https://www.w3.org/WAI/tutorials/page-structure/headings/.
   */
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * @deprecated Use the Headline component with `size="s"` instead.
 */
export const SubHeadline = forwardRef<HTMLHeadingElement, SubHeadlineProps>(
  (props, ref) => {
    if (process.env.NODE_ENV !== 'production') {
      deprecate(
        'SubHeadline',
        'The SubHeadline component has been deprecated. Use the Headline component in size `s` instead.',
      );
    }

    return <Headline {...props} ref={ref} size="s" />;
  },
);

SubHeadline.displayName = 'SubHeadline';
