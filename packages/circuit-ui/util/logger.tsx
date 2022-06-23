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

import { ComponentType, forwardRef } from 'react';

import { DeprecationError } from './errors';

/**
 * Always wrap in `process.env.NODE_ENV !== 'production'` to enable dead code
 * elimination.
 */
export const warn = (componentName: string, ...message: unknown[]): void =>
  console.warn(`[${componentName}]`, ...message);

const DEPRECATED: { [key: string]: true } = {};

/**
 * Always wrap in `process.env.NODE_ENV !== 'production'` to enable dead code
 * elimination.
 */
export const deprecate = (componentName: string, message: string): void => {
  const error = new DeprecationError(componentName, message);

  if (DEPRECATED[componentName]) {
    return;
  }

  DEPRECATED[componentName] = true;

  console.warn(error);
};

/**
 * Always conditionally render with `process.env.NODE_ENV !== 'production'`
 * to enable dead code elimination.
 */
export function withDeprecation<Props>(
  Component: ComponentType<Props>,
  deprecateFn: (props: Props) => string | null,
  shouldThrow = false,
): ComponentType<Props> {
  const WithDeprecation = forwardRef<unknown, Props>((props: Props, ref) => {
    const deprecation = deprecateFn(props);
    const componentName = Component.displayName as string;

    if (deprecation) {
      if (shouldThrow) {
        throw new DeprecationError(componentName, deprecation);
      } else {
        deprecate(componentName, deprecation);
      }
    }

    return <Component {...props} ref={ref} />;
  });

  return WithDeprecation as unknown as ComponentType<Props>;
}
