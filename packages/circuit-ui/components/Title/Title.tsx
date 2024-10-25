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

import { forwardRef } from 'react';

import { deprecate } from '../../util/logger';
import { Display, type DisplayProps } from '../Display/Display';

export interface TitleProps extends DisplayProps {}

/**
 * @deprecated The Title component has been renamed to Display.
 */
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (props, ref) => {
    if (process.env.NODE_ENV !== 'production') {
      deprecate('Title', 'The Title component has been renamed to Display.');
    }

    return <Display {...props} ref={ref} />;
  },
);

Title.displayName = 'Title';
