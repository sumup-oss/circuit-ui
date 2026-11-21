/**
 * Copyright 2026, SumUp Ltd.
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

import { clsx } from '../../styles/clsx.js';

import classes from './Code.module.css';

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

/**
 * The Code component presents inline code within text.
 */
export function Code({ className, ...props }: CodeProps) {
  return <code {...props} className={clsx(classes.base, className)} />;
}
