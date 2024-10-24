/**
 * Copyright 2024, SumUp Ltd.
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

export function getEnvVariable(name: string) {
  if (name === 'NODE_ENV') {
    // Some bundlers have special logic for `process.env.NODE_ENV` which
    // relies on it being written as a continuous string. Destructuring or
    // dynamically accessing `NODE_ENV` can break this logic.
    throw new Error('Do not dynamically access NODE_ENV');
  }

  if (typeof process !== 'undefined') {
    return process.env?.[name];
  }

  return undefined;
}
