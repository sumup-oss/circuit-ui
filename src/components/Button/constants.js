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

const SHARED_PROPS = ['children', 'disabled', 'onClick', 'primary'];

export const BUTTON_PROPS = [
  ...SHARED_PROPS,
  'flat',
  'href',
  'secondary',
  'size',
  'stretch',
  'target'
];

export const PLAIN_BUTTON_PROPS = [...SHARED_PROPS, 'href', 'size', 'target'];
