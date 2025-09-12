/**
 * Copyright 2022, SumUp Ltd.
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

/* eslint-disable max-classes-per-file */
import React, { type ReactNode } from 'react';

import { isString } from './type-check.js';

export class CircuitError extends Error {
  constructor(componentName: string, message: string) {
    super(`[${componentName}] ${message}`);
    this.name = 'CircuitError';

    if (React.captureOwnerStack) {
      this.stack = React.captureOwnerStack() ?? undefined;
      return;
    }

    // Adapted from https://stackoverflow.com/questions/33474179/react-access-parent-component-name

    /* eslint-disable no-underscore-dangle, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
    if (
      // @ts-expect-error Since this code only runs in development, it's fine to use this internal React API.
      React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        ?.ReactCurrentOwner?.return?.type
    ) {
      this.stack =
        // @ts-expect-error This is fine.
        React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
          .ReactCurrentOwner.return.type as string;
    }
    if (
      // @ts-expect-error Since this code only runs in development, it's fine to use this internal React API.
      React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        ?.ReactDebugCurrentFrame?.getCurrentStack
    ) {
      this.stack =
        // @ts-expect-error This is fine.
        React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDebugCurrentFrame.getCurrentStack() as string;
    }
    /* eslint-enable no-underscore-dangle, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
  }
}

export class DeprecationError extends CircuitError {
  constructor(componentName: string, message: string) {
    super(componentName, message);
    this.name = 'DeprecationError';
  }
}

export class AccessibilityError extends CircuitError {
  constructor(componentName: string, message: string) {
    super(componentName, message);
    this.name = 'AccessibilityError';
  }
}

/**
 * Validates that a valid [accessible name](https://w3c.github.io/accname/#dfn-accessible-name) (label, `aria-label` or `aria-labelledby`) exists.
 *
 * The [accessible name](https://w3c.github.io/accname/#dfn-accessible-name)
 * shouldn't contain structured markup since it is ignored by screen readers.
 * We allow this only as an escape hatch to use at your own risk.
 */
export function isSufficientlyLabelled(
  label?: ReactNode,
  attributes?: {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-hidden'?: string | boolean;
  },
): boolean {
  if (
    attributes?.['aria-hidden'] === true ||
    attributes?.['aria-hidden'] === 'true'
  ) {
    return true;
  }
  if (label) {
    return isString(label) ? Boolean(label.trim()) : true;
  }
  const attribute =
    attributes?.['aria-label'] || attributes?.['aria-labelledby'];
  return isString(attribute) ? Boolean(attribute.trim()) : false;
}
