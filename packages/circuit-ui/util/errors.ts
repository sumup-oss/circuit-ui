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

import React from 'react';

export class CircuitError extends Error {
  constructor(componentName: string, message: string) {
    super(`[${componentName}] ${message}`);
    this.name = 'CircuitError';
    this.stack =
      // @ts-expect-error Since this code only runs in development, it's fine to use this internal React API.
      // eslint-disable-next-line
      React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDebugCurrentFrame.getCurrentStack() as string;
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
