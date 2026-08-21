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

import type { HTMLAttributes, Ref } from 'react';

import type { AsPropType } from '../../types/prop-types.js';
import { clsx } from '../../styles/clsx.js';

import classes from './Hr.module.css';

export interface HrProps extends HTMLAttributes<HTMLHRElement> {
  ref?: Ref<HTMLHRElement>;
  /**
   * Render the text using any HTML element.
   */
  as?: AsPropType;
}

/**
 * A horizontal rule to visually and semantically separate content.
 */
export function Hr({
  className,
  'as': Element = 'hr',
  'aria-hidden': ariaHidden = 'true',
  ...props
}: HrProps) {
  return (
    <Element
      {...props}
      className={clsx(classes.base, className)}
      aria-hidden={ariaHidden}
    />
  );
}
