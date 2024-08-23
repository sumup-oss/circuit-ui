/**
 * Copyright 2023, SumUp Ltd.
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

import {
  ESLintUtils,
  type TSESLint,
  type TSESTree,
} from '@typescript-eslint/utils';

/* eslint-disable */

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

type Config = {
  components: string[];
  props: [string];
  alternative: string;
};

const mappings: Config[] = [
  {
    components: [
      'Anchor',
      'Button',
      'Header',
      'Carousel',
      'Checkbox',
      'Hamburger',
      'ListItem',
      'NotificationBanner',
      'NotificationInline',
      'NotificationToast',
      'Pagination',
      'Popover',
      'RadioButton',
      'Select',
      'Selector',
      'Step',
      'Tag',
      // Sidebar
      'Aggregator',
      'NavItem',
    ],
    props: ['tracking'],
    alternative:
      'Use an `onClick` handler to dispatch user interaction events instead.',
  },
  {
    components: ['ProgressBar'],
    props: ['variant'],
    alternative: '',
  },
  {
    components: ['Body'],
    props: ['variant'],
    alternative:
      'Use the `weight` prop instead of the `highlight` variant and use custom CSS to replace the other variants.',
  },
];

export const noDeprecatedProps = createRule({
  name: 'no-deprecated-props',
  meta: {
    type: 'suggestion',
    schema: [],
    docs: {
      description: 'Deprecated component props should be removed or replaced',
      recommended: 'strict',
    },
    messages: {
      deprecated:
        "The {{component}}'s `{{prop}}` prop has been deprecated. {{alternative}}",
    },
  },
  defaultOptions: [],
  create(context) {
    return mappings.reduce((visitors, config) => {
      config.components.forEach((component) => {
        // eslint-disable-next-line no-param-reassign
        visitors[`JSXElement[openingElement.name.name="${component}"]`] = (
          node: TSESTree.JSXElement,
        ) => {
          const { props, alternative } = config;

          node.openingElement.attributes.forEach((attribute) => {
            if (
              attribute.type !== 'JSXAttribute' ||
              attribute.name.type !== 'JSXIdentifier'
            ) {
              return;
            }

            const prop = attribute.name.name;

            if (!props.includes(prop)) {
              return;
            }

            context.report({
              node: attribute,
              messageId: 'deprecated',
              data: { component, prop, alternative },
            });
          });
        };
      });
      return visitors;
    }, {} as TSESLint.RuleListener);
  },
});
