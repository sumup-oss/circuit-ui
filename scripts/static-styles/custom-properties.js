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

import { entries, includes, isObject, isNil, set } from 'lodash';

const DEFAULT_OPTIONS = {
  omit: ['__esModule', 'mq', 'grid'],
};

export function createTheme(theme, options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const staticTheme = {};

  traverse(theme, buildTheme(staticTheme, opts.omit));

  return staticTheme;
}

export function createGlobalStyles(theme, options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const customProperties = {};

  traverse(theme, buildGlobalStyles(customProperties, opts.omit));

  const rules = entries(customProperties).map(
    ([name, value]) => `${name}: ${value};`,
  );

  return `:root { ${rules.join(' ')} }`;
}

export function buildTheme(theme, omit) {
  return (key, value, path) => {
    if (includes(omit, path[0])) {
      set(theme, path, value);
      return;
    }

    const variable = `var(--${path.join('-')})`;
    set(theme, path, variable);
  };
}

export function buildGlobalStyles(customProperties, omit) {
  return (key, value, path) => {
    if (includes(omit, path[0])) {
      return;
    }
    const name = `--${path.join('-')}`;
    set(customProperties, name, value);
  };
}

export function traverse(obj, fn, path = []) {
  entries(obj).forEach(([key, value]) => {
    const fullPath = [...path, key];

    if (isNil(value)) {
      return;
    }

    if (!isObject(value)) {
      fn(key, value, fullPath);
      return;
    }

    traverse(value, fn, fullPath);
  });
}
