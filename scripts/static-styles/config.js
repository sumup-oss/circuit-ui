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

import React from 'react';
import { entries, isFunction, kebabCase } from 'lodash/fp';
import { light } from '@sumup/design-tokens';

import {
  Badge,
  Blockquote,
  ButtonGroup,
  Card,
  Checkbox,
  Hr,
  Image,
  Input,
  // Label,
  RadioButton,
  // Select,
  Selector,
  Tag,
  TextArea,
  Toggle
} from '../../src';

const element = props => <div {...props} />;

export const PropTypes = {
  string: ['string'],
  number: [1],
  bool: [true, false],
  func: [() => {}],
  element: [element],
  custom: ({ raw }) => {
    if (raw.startsWith('childrenPropType')) {
      return [element];
    }
    return null;
  }
};

const requiredPropTypes = {
  string: 'string',
  bool: true,
  func: () => {},
  element
};

function getVariations(name, prop, propOverrides) {
  if (propOverrides[name]) {
    return propOverrides[name];
  }
  const { name: type, ...meta } = prop.type;
  if (PropTypes[type]) {
    const propType = PropTypes[type];
    return isFunction(propType) ? propType(meta) : propType;
  }
  return null;
}

function getProps(props, propOverrides) {
  return entries(props).reduce((acc, [name, prop]) => {
    const { name: type } = prop.type;
    const variations = getVariations(name, prop, propOverrides);
    if (!variations) {
      console.warn(
        [
          `No variations found for prop "${name}" of type "${type}"`,
          'Please provide a custom override.'
        ].join(' ')
      );
      return acc;
    }
    return { ...acc, [name]: variations };
  }, {});
}

function getRequiredProps(props) {
  return entries(props)
    .filter(([, prop]) => prop.required)
    .reduce((acc, [name, prop]) => {
      const value = requiredPropTypes[prop.type.name];
      return { ...acc, [name]: value };
    }, {});
}

export function getComponentInfo(component, propOverrides = {}) {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const { displayName, props } = component.__docgenInfo;
    return {
      component,
      name: kebabCase(displayName),
      props: getProps(props, propOverrides),
      requiredProps: getRequiredProps(props)
    };
  } catch (error) {
    console.error(component);
    throw error;
  }
}

// TODO: Make React DocGen work with TypeScript
export default {
  themes: { light },
  components: [
    {
      name: 'badge',
      component: Badge,
      props: {
        color: ['neutral', 'primary', 'success', 'warning', 'danger'],
        circle: PropTypes.bool
      }
    },
    // getComponentInfo(Button, { size: [KILO, MEGA] }),
    getComponentInfo(Blockquote, {
      size: [Blockquote.KILO, Blockquote.MEGA, Blockquote.GIGA]
    }),
    getComponentInfo(ButtonGroup, {
      align: [ButtonGroup.LEFT, ButtonGroup.CENTER, ButtonGroup.RIGHT]
    }),
    {
      name: 'card',
      component: Card,
      props: {
        shadow: [Card.SINGLE, Card.DOUBLE, Card.TRIPLE],
        spacing: [Card.MEGA, Card.GIGA]
      }
    },
    getComponentInfo(Checkbox),
    // getComponentInfo(Hamburger),
    // getComponentInfo(Heading, {
    //   size: [
    //     "kilo",
    //     "mega",
    //     "giga",
    //     "tera",
    //     "peta",
    //     "exa",
    //     "zetta"
    //   ]
    // }),
    { name: 'hr', component: Hr },
    { name: 'image', component: Image },
    getComponentInfo(Input, {
      renderPrefix: PropTypes.element,
      renderSuffix: PropTypes.element,
      textAlign: [Input.LEFT, Input.RIGHT]
    }),
    // getComponentInfo(Label),
    // getComponentInfo(List, {
    //   size: [List.KILO, List.MEGA, List.GIGA]
    // }),
    // TODO: Need to eliminate dynamic styles.
    // getComponentInfo(ProgressBar, {
    //   size: ['kilo', 'mega', 'giga']
    // }),
    getComponentInfo(RadioButton),
    // getComponentInfo(Select, {
    //   renderPrefix: PropTypes.element
    // }),
    { name: 'selector', component: Selector },
    // TODO: Make React DocGen work with TypeScript
    // getComponentInfo(SubHeading, {
    //   size: ['kilo', 'mega']
    // }),
    getComponentInfo(Tag, {
      onRemove: PropTypes.func,
      prefix: PropTypes.element,
      suffix: PropTypes.element
    }),
    // getComponentInfo(Text, {
    //   size: ['kilo', 'mega', 'giga']
    // }),
    getComponentInfo(TextArea),
    getComponentInfo(Toggle)
  ]
};
