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

import { isEmpty, isArray, includes } from 'lodash/fp';

const DEFAULT_WHITELISTED_KEYS = [
  'Tab',
  'Return',
  'Delete',
  'Backspace',
  'Meta',
  'Control',
  'Alt',
  'F5',
  'Unidentified' // This is here because legacy Chrome on XP sends it.
];

export const handleKeyDown = (onKeyDown, userWhitelistedKeys) => {
  if (!isArray(userWhitelistedKeys) || isEmpty(userWhitelistedKeys)) {
    return onKeyDown;
  }
  const whitelistedKeys = [...DEFAULT_WHITELISTED_KEYS, ...userWhitelistedKeys];
  return event => {
    // TODO: think about replacing this with a regex.
    if (event.key !== undefined && !includes(event.key, whitelistedKeys)) {
      event.preventDefault();
      return;
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
};

export const handleCarretPosition = (outerHandler, alignCarretLeft) => e => {
  const { target } = e;
  const position = alignCarretLeft ? 0 : target.value.length;
  target.setSelectionRange(position, position);
  if (outerHandler) {
    outerHandler(e);
  }
};
