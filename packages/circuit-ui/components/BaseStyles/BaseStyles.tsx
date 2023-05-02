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

import { DeprecationError } from '../../util/errors.js';

/**
 * @deprecated This component has been deprecated. The base styles are included
 * in the global stylesheet (`@sumup/circuit-ui/styles.css`).
 */
export function BaseStyles() {
  if (process.env.NODE_ENV !== 'production') {
    throw new DeprecationError(
      'BaseStyles',
      'This component has been deprecated. The base styles are included in the global stylesheet (`@sumup/circuit-ui/styles.css`).',
    );
  }
  return null;
}
