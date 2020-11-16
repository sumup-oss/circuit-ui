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
import { Theme } from '@sumup/design-tokens';

import { warning } from '../../util/warning';

import { ComponentConfig, InsertFactory } from './types';
import { render } from './render';

const stylis = new Stylis();

function cleanLabel(string: string, name: string) {
  let label = string;
  try {
    // Strip the `.css-[id]-` prefix.
    const matchOne = /^\.css-\w*-([\w-]*)$/i.exec(string);

    if (!matchOne) {
      warning(
        `A style object in "${name}" appears to be missing a label. This can happen when a style helper is used directly.`,
      );

      return null;
    }

    [, label] = matchOne;

    // It's likely a wrapped styled component.
    if (!label.startsWith(name)) {
      const regex = new RegExp(`.*(${name}.*)`, 'i');
      const matchTwo = regex.exec(label);

      if (!matchTwo) {
        warning(
          `A style object in "${name}" has a label that doesn't match or contain the component name.`,
        );

        return null;
      }

      [, label] = matchTwo;
    }

    // Deduplicate the base name, e.g. `badge-badge--neutral`.
    return label.replace(/(?:\W|^)(.+)-\1/, '$1');
  } catch (error) {
    // A regex probably failed.
    console.error(error.message, name, label);
    return null;
  }
}

function cleanRules(styles: string, label: string) {
  let rules = styles;
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

export function componentStyles({
  components,
  theme,
}: {
  components: ComponentConfig[];
  theme: Theme;
}) {
  const styleSheets: { [label: string]: string } = {};

  const insertFactory: InsertFactory = (name: string) => (
    selector,
    serialized,
  ) => {
    const label = cleanLabel(selector, name);

    if (!label) {
      return;
    }

    const rules = cleanRules(serialized.styles, label);

    if (!rules) {
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
    ({ component: Component, name: componentName, propTypes = {} }) => {
      // Reset all props to `null`.
      const baseProps = entries(propTypes).reduce(
        (acc, [prop]) => ({ ...acc, [prop]: null }),
        {},
      );

      // Render the plain base component.
      renderFn(Component, baseProps, componentName);

      // Render each prop variation (not combination).
      entries(propTypes).forEach(([key, variations]) => {
        variations.forEach((value) => {
          renderFn(Component, { ...baseProps, [key]: value }, componentName);
        });
      });
    },
  );

  const styleSheet = entries(styleSheets)
    .map(([label, rules]) => stylis(`.${label}`, rules))
    .join('');

  return styleSheet;
}
