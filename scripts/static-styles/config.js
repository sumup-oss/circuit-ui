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
import { values } from 'lodash/fp';

import {
  Badge,
  Blockquote,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Heading,
  Hr,
  Input,
  theme,
  styleConstants
} from '../../src';

const { circuit } = theme;
const { colorNames, sizes } = styleConstants;
const { KILO, MEGA, GIGA } = sizes;

const string = ['string'];
const bool = [true, false];
const func = [() => {}];
// eslint-disable-next-line react/display-name
const element = [props => <div {...props} />];

export default {
  themes: { circuit },
  components: [
    {
      name: 'badge',
      component: Badge,
      props: {
        color: values(colorNames),
        circle: bool
      }
    },
    {
      name: 'blockquote',
      component: Blockquote,
      props: {
        size: [Blockquote.KILO, Blockquote.MEGA, Blockquote.GIGA]
      },
      requiredProps: {
        children: 'string'
      }
    },
    {
      name: 'button',
      component: Button,
      props: {
        disabled: bool,
        flat: bool,
        href: string,
        plain: bool,
        primary: bool,
        size: [KILO, MEGA, GIGA],
        secondary: bool,
        stretch: bool,
        target: string
      }
    },
    {
      name: 'button-group',
      component: ButtonGroup,
      props: {
        align: [ButtonGroup.LEFT, ButtonGroup.CENTER, ButtonGroup.RIGHT],
        inlineMobile: bool
      },
      requiredProps: {
        children: 'string'
      }
    },
    {
      name: 'card',
      component: Card,
      props: {
        shadow: [Card.SINGLE, Card.DOUBLE, Card.TRIPLE],
        spacing: [Card.MEGA, Card.GIGA]
      }
    },
    {
      name: 'checkbox',
      component: Checkbox,
      props: {
        onChange: func,
        value: string,
        id: string,
        name: string,
        checked: bool,
        invalid: bool,
        disabled: bool,
        validationHint: string,
        className: string
      }
    },
    {
      name: 'heading',
      component: Heading,
      props: {
        size: [
          Heading.KILO,
          Heading.MEGA,
          Heading.GIGA,
          Heading.TERA,
          Heading.PETA,
          Heading.EXA,
          Heading.ZETTA
        ],
        className: string,
        noMargin: bool
      }
    },
    {
      name: 'hr',
      component: Hr
    },
    {
      name: 'input',
      component: Input,
      props: {
        renderPrefix: element,
        renderSuffix: element,
        validationHint: string,
        required: bool,
        invalid: bool,
        hasWarning: bool,
        showValid: bool,
        optional: bool,
        disabled: bool,
        inline: bool,
        noMargin: bool,
        textAlign: [Input.LEFT, Input.RIGHT]
      }
    }
  ]
};
