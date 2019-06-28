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

import { withProps } from 'recompose';

import { isEnter, isSpacebar } from './key-codes';

export const createOnKeyDown = onClick => {
  if (!onClick) {
    return null;
  }

  return event => {
    // Most clickable HTML elements can also be triggered by pressing the
    // spacebar or enter key.
    if (isEnter(event) || isSpacebar(event)) {
      onClick(event);
    }
  };
};

export default withProps(({ onClick, ...props }) => ({
  onKeyDown: createOnKeyDown(onClick),
  onClick,
  ...props
}));
