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

import { theme as themes } from '../../src';

import globalStyles from './global-styles';

describe('Global styles', () => {
  const { circuit: theme } = themes;

  // FIXME: For some reason, the `insert` function is never called.
  it.skip('should return the global styles', () => {
    const actual = globalStyles({ theme });
    expect(actual).not.toBeFalsy();
  });
});
