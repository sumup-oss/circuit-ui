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

import React from 'react';

/**
 * `event.keyCode` has been deprecated and replaced by `event.key`, however,
 * not all browsers implement it yet.
 * TypeScript assumes that `event.key` is always available, so it complains
 * about `event.keyCode` never being available.
 * FIXME: Clean up when we drop support for IE.
 */

export const isEnter = (event: KeyboardEvent | React.KeyboardEvent): boolean =>
  // @ts-expect-error `keyCode` is needed to support older browsers.
  'key' in event ? event.key === 'Enter' : event.keyCode === 13;

export const isEscape = (event: KeyboardEvent | React.KeyboardEvent): boolean =>
  // @ts-expect-error `keyCode` is needed to support older browsers.
  'key' in event ? event.key === 'Escape' : event.keyCode === 27;

export const isSpacebar = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean =>
  // @ts-expect-error `keyCode` is needed to support older browsers.
  'key' in event ? event.key === ' ' : event.keyCode === 32;

export const isArrowLeft = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean =>
  // @ts-expect-error `keyCode` is needed to support older browsers.
  'key' in event ? event.key === 'ArrowLeft' : event.keyCode === 37;

export const isArrowUp = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean =>
  // @ts-expect-error `keyCode` is needed to support older browsers.
  'key' in event ? event.key === 'ArrowUp' : event.keyCode === 38;

export const isArrowRight = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean =>
  // @ts-expect-error `keyCode` is needed to support older browsers.
  'key' in event ? event.key === 'ArrowRight' : event.keyCode === 39;

export const isArrowDown = (
  event: KeyboardEvent | React.KeyboardEvent,
): boolean =>
  // @ts-expect-error `keyCode` is needed to support older browsers.
  'key' in event ? event.key === 'ArrowDown' : event.keyCode === 40;
