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

import React, { ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CacheProvider } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import createCache from '@emotion/cache';
import { Theme } from '@sumup/design-tokens';

import { InsertFactory } from './types';

const cache = createCache();

export function render(theme: Theme, insertFactory: InsertFactory) {
  return (Component: ComponentType, props = {}, componentName = '') => {
    const insert = insertFactory(componentName);
    const extendedCache = { ...cache, insert };
    return renderToStaticMarkup(
      <CacheProvider value={extendedCache}>
        <ThemeProvider theme={theme}>
          <Component {...props} />
        </ThemeProvider>
      </CacheProvider>,
    );
  };
}
