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

import type React from 'react';

export const isEnter = (event: KeyboardEvent | React.KeyboardEvent): boolean =>
  event.key === 'Enter';

export const isEscape = (event: KeyboardEvent | React.KeyboardEvent): boolean =>
  event.key === 'Escape';

export const isSpacebar = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean => event.key === ' ';

export const isArrowLeft = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean => event.key === 'ArrowLeft';

export const isArrowUp = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean => event.key === 'ArrowUp';

export const isArrowRight = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean => event.key === 'ArrowRight';

export const isArrowDown = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean => event.key === 'ArrowDown';

export const isBackspace = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean => event.key === 'Backspace';

export const isDelete = (event: KeyboardEvent | React.KeyboardEvent): boolean =>
  event.key === 'Delete';
