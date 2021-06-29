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

import { FunctionComponent, ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import '@testing-library/jest-dom/extend-expect';
import { configureAxe } from 'jest-axe';
import { render as renderTest, RenderResult } from '@testing-library/react';
import { renderHook, act as actHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'emotion-theming';
import { light } from '@sumup/design-tokens';

import {
  ComponentsContext,
  defaultComponents,
} from '../components/ComponentsContext/ComponentsContext';

export * from '@testing-library/react';

export type RenderFn<T = any> = (component: ReactElement, ...rest: any) => T;

const WithProviders: FunctionComponent = ({ children }) => (
  <ComponentsContext.Provider value={defaultComponents}>
    <ThemeProvider theme={light}>{children}</ThemeProvider>
  </ComponentsContext.Provider>
);

const render: RenderFn<RenderResult> = (component, options) =>
  renderTest(component, { wrapper: WithProviders, ...options });
const renderToHtml: RenderFn<string> = (component) =>
  renderToStaticMarkup(<WithProviders>{component}</WithProviders>);
const create = (...args: Parameters<RenderFn<RenderResult>>) => {
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

export { create, render, renderToHtml, renderHook, actHook, userEvent, axe };
