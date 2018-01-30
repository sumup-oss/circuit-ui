import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import HtmlElement from '../HtmlElement/HtmlElement';
import { standard } from '../../themes';
import { textMega } from '../../styles/style-helpers';

const colorSelectorFor = baseColor => identifier => `${baseColor}${identifier}`;

const calculatePadding = ({ theme, size }) => (diff = '0px') => {
  const sizeMap = {
    kilo: `calc(${theme.spacings.bit} - ${diff}) calc(${
      theme.spacings.mega
    } - ${diff})`,
    mega: `calc(${theme.spacings.byte} - ${diff}) calc(${
      theme.spacings.giga
    } - ${diff})`,
    giga: `calc(${theme.spacings.kilo} - ${diff}) calc(${
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

const baseStyles = ({ theme, href }) => css`
  label: button;
  border-radius: ${theme.borderRadius.mega};
  color: ${theme.colors.white};
  display: ${href ? 'inline-block' : 'block'};
  width: auto;
  height: auto;
  text-decoration: none;
  ${textMega({ theme })};

  &:focus {
    outline: 0;
  }

  &:active {
  }

  &:hover {
  }

  &[disabled],
  &:disabled {
    ${disabledStyles};
  }
`;

const colorStyles = ({ theme, variant, flat }) => {
  // TODO: this will most likely have to change once we actually
  //       introuce secondary button styles.
  const colorMap = {
    primary: 'b',
    secondary: 'n'
  };

  const baseColor = colorMap[variant] || colorMap.primary;
  const selectColor = colorSelectorFor(baseColor);

  return css`
    label: button--${variant}${flat ? '--flat' : ''};
    background-color: ${theme.colors[selectColor(500)]};
    border-color: ${theme.colors[selectColor(700)]};
    cursor: default;

    &:hover {
      background-color: ${theme.colors[selectColor(700)]};
    }

    &:active {
      background-color: ${theme.colors[
        flat ? selectColor(900) : selectColor(700)
      ]};
      border-color: ${theme.colors[selectColor(900)]};
    }

    &:focus {
      border-color: ${theme.colors[selectColor(700)]};
    }

    &:hover,
    &:active {
      border-color: ${theme.colors[selectColor(900)]};
    }
  `;
};

const sizeStyles = props => {
  const { size } = props;
  const padding = calculatePadding(props)();
  return css({
    label: `button--${size}`,
    padding
  });
};

const depthStyles = props => {
  const { flat } = props;
  if (flat) {
    return css`
      label: button--flat;
      border-width: 0px;
      box-shadow: 0 0 0 1px rgba(12, 15, 20, 0.02),
        0 2px 2px 0 rgba(12, 15, 20, 0.06), 0 4px 4px 0 rgba(12, 15, 20, 0.06);

      &:active {
        box-shadow: 0 0 0 1px rgba(12, 15, 20, 0.02),
          0 0 1px 0 rgba(12, 15, 20, 0.06), 0 2px 2px 0 rgba(12, 15, 20, 0.06);
      }

      &:active:focus,
      &:hover:focus {
        border-width: 0;
        padding: ${calculatePadding(props)()};
      }

      &:focus {
        border-width: 2px;
        padding: ${calculatePadding(props)('2px')};
      }
    `;
  }

  return css`
    border-width: 1px;
    border-style: solid;
    box-shadow: inset 0 1px 0 1px rgba(255, 255, 255, 0.06);

    &:active {
      box-shadow: inset 0 4px 8px 0 rgba(12, 15, 20, 0.3);
    }

    &:hover:focus,
    &:hover:active {
      border-width: 1px;
      padding: ${calculatePadding(props)()};
    }

    &:focus {
      border-width: 2px;
      padding: ${calculatePadding(props)('1px')};
    }
  `;
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
  colorStyles,
  depthStyles
);

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
   * Type of button to render. For example, use 'primary' for confirmation button
   * and 'secondary' for cancel button.
   */
  variant: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * Button has a 'flat' variation, triggered with this prop.
   */
  flat: PropTypes.bool,
  /**
   * Link target. Should only be passed, if href is passed, too.
   */
  target: PropTypes.string,
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
  target: undefined,
  href: undefined,
  onClick: undefined
};

export default Button;
