import React from 'react';
import styled, { css } from 'react-emotion';

import { textMega } from '../../../../styles/style-helpers';
import { sizes } from '../../../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

const calculatePadding = ({ theme, size: buttonSize }) => (diff = '0px') => {
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

  if (!sizeMap[buttonSize] && buttonSize) {
    return null;
  }

  return sizeMap[buttonSize] || sizeMap.mega;
};

const disabledStyles = css`
  label: button--disabled;
  opacity: 0.4;
  pointer-events: none;
  user-selectable: none;
`;

const stretchStyles = ({ stretch }) =>
  stretch &&
  css`
    label: button--stretched;
    width: 100%;
    display: block;
  `;

const baseStyles = ({ theme, href, ...otherProps }) => css`
  label: button;
  background-color: ${theme.colors.n100};
  border-color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  border-style: solid;
  border-width: 1px;
  box-shadow: inset 0 1px 0 1px rgba(255, 255, 255, 0.06);
  display: ${href ? 'inline-block' : 'block'};
  color: ${theme.colors.n700};
  cursor: pointer;
  font-weight: ${theme.fontWeight.bold};
  width: auto;
  height: auto;
  text-align: center;
  text-decoration: none;
  ${textMega({ theme })};

  &:active {
    background-color: ${theme.colors.n300};
    border-color: ${theme.colors.n500};
    box-shadow: inset 0 4px 8px 0 rgba(12, 15, 20, 0.3);
  }

  &:focus {
    border-color: ${theme.colors.n500};
    border-width: 2px;
    outline: 0;
    padding: ${calculatePadding({ theme, ...otherProps })('1px')};
  }

  &:hover {
    background-color: ${theme.colors.n300};
  }

  &:hover,
  &:active {
    border-color: ${theme.colors.n500};
    border-width: 1px;
    padding: ${calculatePadding({ theme, ...otherProps })()};
  }

  &[disabled],
  &:disabled {
    ${disabledStyles};
  }
`;

const primaryStyles = ({ theme, primary }) =>
  primary &&
  css`
    label: button--primary;
    background-color: ${theme.colors.p500};
    border-color: ${theme.colors.p700};
    color: ${theme.colors.white};

    &:active {
      background-color: ${theme.colors.p700};
      border-color: ${theme.colors.p900};
    }

    &:focus {
      border-color: ${theme.colors.p700};
    }

    &:hover {
      background-color: ${theme.colors.p700};
    }

    &:hover,
    &:active {
      border-color: ${theme.colors.p900};
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
      background-color: ${theme.colors.p900};
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
  const { size: buttonSize } = props;
  const padding = calculatePadding(props)();
  return css({
    label: `button--${buttonSize}`,
    padding
  });
};

const buttonLoadingStyles = ({ isLoading }) =>
  isLoading &&
  css`
    label: button--loading;
    overflow-y: hidden;
    pointer-events: none;
  `;

const ButtonElement = styled('button')`
  ${baseStyles};
  ${primaryStyles};
  ${sizeStyles};
  ${flatStyles};
  ${secondaryStyles};
  ${stretchStyles};
  ${buttonLoadingStyles};
`;

const LinkButtonElement = ButtonElement.withComponent('a');

// eslint-disable-next-line react/prop-types
const RegularButton = ({ href, ...props }) =>
  href ? (
    <LinkButtonElement {...{ ...props, href }} />
  ) : (
    <ButtonElement {...props} />
  );

export default RegularButton;
