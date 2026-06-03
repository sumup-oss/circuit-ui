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

import {forwardRef, type HTMLAttributes} from 'react';
import styles from "./Row.module.css"
import { clsx } from '../../../../styles/clsx.js';



/**
 * @legacy
 *
 * Row wrapping for the Col component.
 */
export const Row = forwardRef<HTMLDivElement , HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props}, ref) =>
    <div ref={ref} className={clsx(styles.base, className)} {...props}></div>
  )
