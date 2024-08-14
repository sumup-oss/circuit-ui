/**
 * Copyright 2020, SumUp Ltd.
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

import type { FunctionComponent, ReactElement, PropsWithChildren } from 'react';
import '@testing-library/jest-dom/vitest';
import { configureAxe } from 'jest-axe';
import {
  render as renderTest,
  renderHook,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { light } from '@sumup-oss/design-tokens';

import {
  ComponentsContext,
  defaultComponents,
} from '../components/ComponentsContext/ComponentsContext.js';

// biome-ignore lint/performance/noReExportAll: We re-export the package to override specific functions below
export * from '@testing-library/react';

export type RenderFn<T = unknown> = (
  component: ReactElement,
  ...rest: any[]
) => T;

const WithProviders: FunctionComponent<PropsWithChildren<unknown>> = ({
  children,
}) => (
  <ComponentsContext.Provider value={defaultComponents}>
    <ThemeProvider theme={light}>{children}</ThemeProvider>
  </ComponentsContext.Provider>
);

const render: RenderFn<RenderResult> = (component, options: RenderOptions) =>
  renderTest(component, { wrapper: WithProviders, ...options });

const axe = configureAxe({
  rules: {
    // disabled landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

export { render, renderHook, userEvent, axe };
