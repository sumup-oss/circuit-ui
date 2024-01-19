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

import { FunctionComponent, ReactElement, PropsWithChildren } from 'react';
import '@testing-library/jest-dom/vitest';
import { configureAxe } from 'jest-axe';
import {
  render as renderTest,
  RenderOptions,
  RenderResult,
  renderHook,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';

import {
  ComponentsContext,
  defaultComponents,
} from '../components/ComponentsContext/ComponentsContext.js';

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
/**
 * @deprecated `renderToHtml` is deprecated. Instead, run axe on the container
 * from `const { container } = render(<Component />)`.
 */
const renderToHtml: RenderFn<HTMLElement> = (component) => {
  const { container } = render(component);
  return container;
};
/**
 * @deprecated `create` is deprecated. Use `render` instead.
 */
const create = (
  ...args: Parameters<RenderFn<RenderResult>>
): ChildNode | HTMLCollection | null => {
  const { container } = render(...args);
  return container.children.length > 1
    ? container.children
    : container.firstChild;
};

const axe = configureAxe({
  rules: {
    // disabled landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

export { create, render, renderToHtml, renderHook, userEvent, axe };
