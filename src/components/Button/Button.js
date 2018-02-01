import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import HtmlElement from '../HtmlElement/HtmlElement';
import { KILO, MEGA, GIGA } from '../../util/sizes';
import { standard } from '../../themes';
import { textMega } from '../../styles/style-helpers';

const calculatePadding = ({ theme, size }) => (diff = '0px') => {
  const sizeMap = {
    [KILO]: `calc(${theme.spacings.bit} - ${diff}) calc(${
      theme.spacings.mega
    } - ${diff})`,
    [MEGA]: `calc(${theme.spacings.byte} - ${diff}) calc(${
      theme.spacings.giga
    } - ${diff})`,
    [GIGA]: `calc(${theme.spacings.kilo} - ${diff}) calc(${
      theme.spacings.tera
    } - ${diff})`
  };

  if (!sizeMap[size] && size) {
    return null;
  }

  return sizeMap[size] || sizeMap.mega;
};

const disabledStyles = css`
  label: button--disabled;
  opacity: 0.4;
  pointer-events: none;
`;

const baseStyles = ({ theme, href, ...otherProps }) => css`
  label: button;
  background-color: ${theme.colors.b500};
  border-color: ${theme.colors.b700};
  border-radius: ${theme.borderRadius.mega};
  border-style: solid;
  border-width: 1px;
  box-shadow: inset 0 1px 0 1px rgba(255, 255, 255, 0.06);
  display: ${href ? 'inline-block' : 'block'};
  color: ${theme.colors.white};
  cursor: default;
  font-weight: ${theme.fontWeight.bold};
  width: auto;
  height: auto;
  text-decoration: none;
  ${textMega({ theme })};

  &:active {
    background-color: ${theme.colors.b700};
    border-color: ${theme.colors.b900};
    box-shadow: inset 0 4px 8px 0 rgba(12, 15, 20, 0.3);
  }

  &:focus {
    border-color: ${theme.colors.b700};
    border-width: 2px;
    outline: 0;
    padding: ${calculatePadding({ theme, ...otherProps })('1px')};
  }

  &:hover {
    background-color: ${theme.colors.b700};
  }

  &:hover,
  &:active {
    border-color: ${theme.colors.b900};
    border-width: 1px;
    padding: ${calculatePadding({ theme, ...otherProps })()};
  }

  &[disabled],
  &:disabled {
    ${disabledStyles};
  }
`;

const flatStyles = ({ theme, flat, secondary, ...otherProps }) =>
  flat &&
  !secondary &&
  css`
    label: button--flat;
    border-width: 0px;
    box-shadow: 0 0 0 1px rgba(12, 15, 20, 0.02),
      0 2px 2px 0 rgba(12, 15, 20, 0.06), 0 4px 4px 0 rgba(12, 15, 20, 0.06);

    &:active {
      background-color: ${theme.colors.b900};
      box-shadow: 0 0 0 1px rgba(12, 15, 20, 0.02),
        0 0 1px 0 rgba(12, 15, 20, 0.06), 0 2px 2px 0 rgba(12, 15, 20, 0.06);
    }

    &:active:focus,
    &:hover:focus {
      border-width: 0;
      padding: ${calculatePadding({ theme, flat, secondary, ...otherProps })()};
    }

    &:focus {
      border-width: 2px;
      padding: ${calculatePadding({ theme, flat, secondary, ...otherProps })(
        '2px'
      )};
    }
  `;

const secondaryStyles = ({ theme, secondary, flat, ...otherProps }) =>
  secondary &&
  css`
    label: button--secondary;
    background-color: transparent;
    border-color: ${theme.colors.n900};
    border-width: 0;
    box-shadow: none;
    color: ${theme.colors.n700};

    &:active {
      background-color: transparent;
      border-color: ${theme.colors.n900};
      border-width: 0;
      box-shadow: none;
    }

    &:focus {
      border-color: ${theme.colors.n900};
      border-width: 2px;
      box-shadow: none;
      padding: ${calculatePadding({ theme, flat, secondary, ...otherProps })(
        '2px'
      )};
    }

    &:hover {
      background-color: transparent;
      border-width: 0;
      border-color: ${theme.colors.n900};
    }

    &:active,
    &:hover,
    &:hover:focus,
    &:active:focus {
      padding: ${calculatePadding({ theme, flat, secondary, ...otherProps })()};
    }

    &:active,
    &:hover,
    &:focus {
      color: ${theme.colors.n900};
    }

    &:active:focus,
    &:hover:focus {
      border-color: ${theme.colors.n900};
      border-width: 2px;
      box-shadow: none;
      padding: ${calculatePadding({ theme, flat, secondary, ...otherProps })(
        '2px'
      )};
    }
  `;

const sizeStyles = props => {
  const { size } = props;
  const padding = calculatePadding(props)();
  return css({
    label: `button--${size}`,
    padding
  });
};

const TextOrButtonElement = props => (
  <HtmlElement
    blacklist={['variant', 'flat']}
    element={({ href }) => (href ? 'a' : 'button')}
    {...props}
  />
);

/**
 * The Button component. Can also be styled as an anchor by passing an href
 * prop.
 */
const Button = styled(TextOrButtonElement)(
  baseStyles,
  sizeStyles,
  flatStyles,
  secondaryStyles
);

Button.KILO = KILO;
Button.MEGA = MEGA;
Button.GIGA = GIGA;

Button.propTypes = {
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired,
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
   * Link target. Should only be passed, if href is passed, too.
   */
  target: PropTypes.string,
  /**
   * Size of the button. Use the Button's KILO, MEGA, or GIGA properties.
   */
  size: PropTypes.oneOf([KILO, MEGA, GIGA]),
  /**
   * Standard onClick function. If used on an anchor this can be used to
   * cause additional side-effects like tracking.
   */
  onClick: PropTypes.func
};

Button.defaultProps = {
  theme: standard,
  disabled: false,
  variant: 'primary',
  flat: false,
  size: Button.MEGA,
  target: undefined,
  href: undefined,
  onClick: undefined
};

export default Button;
