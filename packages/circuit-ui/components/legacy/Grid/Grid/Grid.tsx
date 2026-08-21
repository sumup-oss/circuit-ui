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
import { clsx } from '../../../../styles/clsx.js';
import styles from './Grid.module.css';

/**
 * @legacy
 *
 * A basic 12-column grid component.
 */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export const Grid = ({ className, ...props }: GridProps) => (
  <div className={clsx(styles.base, className)} {...props} />
);
