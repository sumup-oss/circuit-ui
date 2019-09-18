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

import PropTypes from 'prop-types';

import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

export const SIZE_PROP_TYPE = PropTypes.oneOf([KILO, MEGA, GIGA]);

// TODO: move this back to the component once we Make LoadingButton a
//       sub-component.
export const BUTTON_PROP_TYPES = {
  /**
   * Should the Button be disabled?
   */
  disabled: PropTypes.bool,
  /**
   * Button has a 'flat' variation, triggered with this prop.
   */
  flat: PropTypes.bool,
  /**
   * URL the Button should lead to. Causes the Button to render an <a> tag.
   */
  href: PropTypes.string,
  /**
   * Makes the button look and behave like a text link.
   */
  plain: PropTypes.bool,
  /**
   * Renders a primary button using the brand color.
   */
  primary: PropTypes.bool,
  /**
   * Size of the button. Use the Button's KILO, MEGA, or GIGA properties.
   */
  size: SIZE_PROP_TYPE,
  /**
   * Renders a secondary button. Secondary buttons look the same for
   * primary (default) and flat buttons.
   */
  secondary: PropTypes.bool,
  /**
   * Trigger stretch (full width) styles on the component.
   */
  stretch: PropTypes.bool,
  /**
   * Link target. Should only be passed, if href is passed, too.
   */
  target: PropTypes.string
};

export const BUTTON_DEFAULT_PROPS = {
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

export const REGULAR_BUTTON_ONLY_PROPS = [
  'deepRef',
  'as',
  'flat',
  'secondary',
  'stretch'
];
