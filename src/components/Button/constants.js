import PropTypes from 'prop-types';

import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

export const SIZE_PROP_TYPE = PropTypes.oneOf([KILO, MEGA, GIGA]);

export const BUTTON_PROP_TYPES = {
  /**
   * URL the Button should lead to. Causes the Button to render an <a> tag.
   */
  href: PropTypes.string,
  /**
   * Should the Button be disabled?
   */
  disabled: PropTypes.bool,
  /**
   * Button has a 'flat' variation, triggered with this prop.
   */
  flat: PropTypes.bool,
  /**
   * Renders a secondary button. Secondary buttons look the same for
   * primary (default) and flat buttons.
   */
  secondary: PropTypes.bool,
  /**
   * Renders a primary button using the brand color.
   */
  primary: PropTypes.bool,
  /**
   * Link target. Should only be passed, if href is passed, too.
   */
  target: PropTypes.string,
  /**
   * Size of the button. Use the Button's KILO, MEGA, or GIGA properties.
   */
  size: SIZE_PROP_TYPE,
  /**
   * Trigger stretch (full width) styles on the component.
   */
  stretch: PropTypes.bool
};

export const BUTTON_DEFAULT_PROPS = {
  disabled: false,
  flat: false,
  size: sizes.MEGA,
  target: null,
  href: null,
  primary: false,
  secondary: false,
  stretch: false
};
