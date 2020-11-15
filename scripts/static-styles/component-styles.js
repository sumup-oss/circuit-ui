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

import Stylis from '@emotion/stylis';
import { entries } from 'lodash/fp';

// TODO: Remove file extension once moved to ./src/cli
import { warning } from '../../src/util/warning.ts';

import render from './render';

const stylis = new Stylis();

function cleanLabel(string, name) {
  let label = string;
  try {
    // Strip the `.css-[id]-`.
    const match = /^\.css-\w*-([\w-]*)$/i.exec(string);

    // The styles have no label. This can happen when a style helper
    // is used directly.
    if (!match) {
      warning(`A style object in "${name}" appears to be missing a label.`);

      return null;
    }

    [, label] = match;

    // It's a wrapped styled component.
    if (!label.startsWith(name)) {
      const regex = new RegExp(`.*(${name}.*)`, 'i');
      [, label] = regex.exec(label);
    }

    // Deduplicate the base name, e.g. `badge-badge--neutral`.
    return label.replace(/(?:\W|^)(.+)-\1/, '$1');
  } catch (error) {
    // A regex probably failed.
    console.error(error.message, name, label);
    return null;
  }
}

function cleanRules(stylesObj, label) {
  let rules = stylesObj.styles;
  try {
    // Strip source maps.
    rules = rules.replace(/\/\*#.*?\*\//gi, '');
    // Strip superfluous whitespace.
    rules = rules.replace(/\s{2,}/g, '');
    // Strip duplicate semicolons.
    rules = rules.replace(/;{2,}/g, ';');

    // Extract only the relevant rules.
    const regex = new RegExp(`label:${label};(.*)`, 'i');
    const match = regex.exec(rules);

    if (match) {
      return match[1];
    }

    // It's a wrapped styled component.
    return rules.replace(/label:[\w-]*;/gi, '');
  } catch (error) {
    // A regex probably failed.
    console.error(error.message, label, rules);
    return null;
  }
}

export default function componentStyles({ components, theme } = {}) {
  const styleSheets = {};

  const insertFactory = (props, name) => (...args) => {
    const label = cleanLabel(args[0], name);
    const rules = cleanRules(args[1], label);

    if (!label || !rules) {
      return;
    }

    if (!styleSheets[label]) {
      styleSheets[label] = rules;
      return;
    }

    if (styleSheets[label].includes(rules)) {
      return;
    }

    styleSheets[label] += rules;
  };

  const renderFn = render(theme, insertFactory);

  components.forEach(
    ({ component: Component, name, props = {}, requiredProps = {} }) => {
      // Reset all props to `null`.
      const baseProps = entries(props).reduce(
        (acc, [prop]) => ({ ...acc, [prop]: null }),
        requiredProps,
      );

      // Render the plain base component.
      renderFn(Component, baseProps, name);

      // Render each prop variation (not combination).
      entries(props).forEach(([key, variations]) => {
        variations.forEach((value) => {
          renderFn(Component, { ...baseProps, [key]: value }, name);
        });
      });
    },
  );

  const styleSheet = entries(styleSheets)
    .map(([label, rules]) => stylis(`.${label}`, rules))
    .join('');

  return styleSheet;
}
