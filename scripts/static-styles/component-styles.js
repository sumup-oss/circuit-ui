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

import createCache from '@emotion/cache';
import Stylis from '@emotion/stylis';
import { entries, values } from 'lodash/fp';

import render from './render';

const cache = createCache();
const stylis = new Stylis();

function cleanLabel(string) {
  let label = string;
  try {
    // Strip the `.css-[id]-`.
    [, label] = /^\.css-\w*-([\w-]*)$/i.exec(string);
    // Deduplicate the base name, e.g. `badge-badge--neutral`.
    return label.replace(/(?:\W|^)(.+)-\1/, '$1');
  } catch (error) {
    // A regex probably failed.
    console.error(error.message, label);
    return null;
  }
}

function cleanRules(stylesObj, label) {
  let rules = stylesObj.styles;
  try {
    // Strip source maps.
    rules = rules.replace(/\/\*#.*\*\//i, '');
    // Strip superfluous whitespace.
    rules = rules.replace(/\s{2,}/g, '');
    // Strip duplicate semicolons.
    rules = rules.replace(/;{2,}/g, ';');
    // Extract only the relevant rules.
    const regex = new RegExp(`label:${label};(.*)`, 'i');
    return regex.exec(rules)[1];
  } catch (error) {
    // A regex probably failed.
    console.error(error.message, label, rules);
    return null;
  }
}

export default function main({ components, theme } = {}) {
  const styleSheets = {};

  const insert = (...args) => {
    const label = cleanLabel(args[0]);
    const rules = cleanRules(args[1], label);

    if (!label || !rules) {
      return;
    }

    const selector = `.${label}`;
    const styles = stylis(selector, rules);

    if (styleSheets[selector]) {
      if (styleSheets[selector] !== styles) {
        console.error(
          [
            `Found selector "${selector}" with different styles.`,
            `This is usually caused by dynamic props.`,
            styleSheets[selector],
            styles
          ].join('\n')
        );
      }
      return;
    }

    styleSheets[selector] = styles;
  };

  const renderFn = render({ cache: { ...cache, insert }, theme });

  components.forEach(({ component: Component, props }) => {
    // Reset all props to `null`.
    const baseProps = entries(props).reduce(
      (acc, [prop]) => ({ ...acc, [prop]: null }),
      {}
    );

    // Render the plain base component.
    renderFn(Component, baseProps);

    // Render each prop variation (not combination).
    entries(props).forEach(([key, variations]) => {
      variations.forEach(value => {
        renderFn(Component, { ...baseProps, [key]: value });
      });
    });
  });

  const styleSheet = values(styleSheets).join('');

  return styleSheet;
}
