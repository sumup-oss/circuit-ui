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

// `event.keyCode` has been deprecated and replaced by `event.key`,
// however, not all browsers implement it yet.

export const isEnter = (event) =>
  'key' in event ? event.key === 'Enter' : event.keyCode === 13;

export const isSpacebar = (event) =>
  'key' in event ? event.key === ' ' : event.keyCode === 32;

export const isArrowLeft = (event) =>
  'key' in event ? event.key === 'ArrowLeft' : event.keyCode === 37;

export const isArrowRight = (event) =>
  'key' in event ? event.key === 'ArrowRight' : event.keyCode === 39;

export const isArrowDown = (event) =>
  'key' in event ? event.key === 'ArrowDown' : event.keyCode === 40;
