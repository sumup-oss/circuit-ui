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

import React, {SFC} from 'react';
import { omit } from 'lodash/fp';

import PlainButton from './components/PlainButton';
import RegularButton from './components/RegularButton';
import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

const SHARED_PROPS = [
  'children',
  'className',
  'data-selector',
  'disabled',
  'href',
  'onClick',
  'primary',
  'size',
  'type'
];

export const BUTTON_PROPS = [
  ...SHARED_PROPS,
  'deepRef',
  'as',
  'flat',
  'secondary',
  'size',
  'stretch',
  'target'
];

export const PLAIN_BUTTON_PROPS = [...SHARED_PROPS, 'size', 'target'];

const REGULAR_BUTTON_ONLY_PROPS = [
  'deepRef',
  'as',
  'flat',
  'secondary',
  'stretch'
];

enum SIZE_PROP_TYPE {
  KILO,
  MEGA,
  GIGA
}

interface Props {
  size: SIZE_PROP_TYPE // Size of the button. Use the Button's KILO, MEGA, or GIGA properties.
  href: string // URL the Button should lead to. Causes the Button to render an <a> tag.
  flat: boolean // Button has a 'flat' variation, triggered with this prop.
  plain: boolean // Makes the button look and behave like a text link.
  target: string // Link target. Should only be passed, if href is passed, too.
  stretch: boolean // Trigger stretch (full width) styles on the component.
  primary: boolean // Renders a primary button using the brand color.
  disabled: boolean // Should the Button be disabled?
  secondary: boolean // Renders a secondary button. Secondary buttons look the same for primary (default) and flat buttons.
  defaultProps: {}
}

/**
 * A button component with support for the anchor and button
 * element as well as a button-looking button and a text link.
 */
const Button: SFC<Props> = ({ plain, ...props}) => 
  plain ? (
    <PlainButton {...omit(REGULAR_BUTTON_ONLY_PROPS, props)} />
  ) : (
    <RegularButton {...props} />
  );


Button.defaultProps = {
  disabled: false,
  flat: false,
  href: null,
  plain: false,
  primary: false,
  secondary: false,
  size: MEGA,
  stretch: false,
  target: null
};

Button.KILO = KILO;
Button.MEGA = MEGA;
Button.GIGA = GIGA;

/**
 * @component
 */
export default Button;
