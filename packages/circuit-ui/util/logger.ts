/* eslint-disable no-console */
/**
 * Copyright 2021, SumUp Ltd.
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

/**
 * Always wrap in `process.env.NODE_ENV !== 'production'` to enable dead code
 * elimination.
 */
export const warn = (componentName: string, ...message: unknown[]): void =>
  console.error(`[${componentName}]`, ...message);

const deprecated: { [key: string]: true } = {};

/**
 * Always wrap in `process.env.NODE_ENV !== 'production'` to enable dead code
 * elimination.
 */
export const deprecate = (component: string, ...messages: string[]): void => {
  const message = `[${component}] DEPRECATION: ${messages.join(' ')}`;
  if (!deprecated[message]) {
    console.warn(message);
    deprecated[message] = true;
  }
};
