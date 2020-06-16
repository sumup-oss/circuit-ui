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

// Adapted from https://stackoverflow.com/questions/4852017/how-to-initialize-an-arrays-length-in-javascript
export function generatePages(totalPages: number): number[] {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(totalPages)).map((_, index) => index + 1);
}
