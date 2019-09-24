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

import { values } from 'lodash/fp';

import { Badge, Button, Card, theme, styleConstants } from '../../src';

const { circuit } = theme;
const { colorNames, sizes } = styleConstants;
const { KILO, MEGA, GIGA } = sizes;

const bool = [true, false];
const string = ['string'];

export default {
  themes: { circuit },
  components: [
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
      name: 'badge',
      component: Badge,
      props: {
        color: values(colorNames),
        circle: bool
      }
    },
    {
      name: 'card',
      component: Card,
      props: {
        shadow: [Card.SINGLE, Card.DOUBLE, Card.TRIPLE],
        spacing: [Card.MEGA, Card.GIGA]
      }
    }
  ]
};
