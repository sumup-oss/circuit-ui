import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { hideVisually } from 'polished';

const LAYER_HEIGHT = '1px';
const HAMBURGUER_WIDTH = '12px';

const buttonBaseStyles = ({ theme }) => css`
  label: hamburger-button;
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: ${theme.iconSizes.giga};
  height: ${theme.iconSizes.giga};
  background: none;
  border: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  border-radius: 50%;
  position: relative;
`;

const lightButtonStyles = ({ theme, light }) =>
  light &&
  css`
    label: hamburger-button--light;
    border: ${theme.borderWidth.kilo} solid ${theme.colors.n700};
  `;

const layersBaseStyles = ({ theme }) => css`
  label: hamburger-layers;
  top: 50%;
  width: ${HAMBURGUER_WIDTH};

  &,
  &::after,
  &::before {
    background-color: ${theme.colors.n900};
    border-radius: ${theme.borderRadius.kilo};
    display: block;
    height: ${LAYER_HEIGHT};
    position: absolute;
    transition: width 0.2s ease-out 0.15s, opacity 0.1s ease-in,
      transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  &::before,
  &::after {
    top: 0;
    content: '';
  }

  &::before {
    transform: translateY(-${theme.spacings.bit});
    width: ${HAMBURGUER_WIDTH};
  }

  &::after {
    transform: translateY(${theme.spacings.bit});
    width: ${HAMBURGUER_WIDTH};
  }
`;

const layersBaseLightStyles = ({ theme, light }) =>
  light &&
  css`
    label: hamburger-layer--light;
    &,
    &::after,
    &::before {
      background-color: ${theme.colors.n100};
    }
  `;

const layersActiveStyles = ({ isActive }) =>
  isActive &&
  css`
    label: hamburger-layers--active;
    transform: rotate(225deg);

    &,
    &::before,
    &::after {
      transition: width 0.2s ease-out, opacity 0.1s ease-out 0.15s,
        transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0.15s;
      width: ${HAMBURGUER_WIDTH};
    }

    &::before {
      opacity: 0;
      transform: translateY(0);
    }

    &::after {
      transform: translateY(0) rotate(-90deg);
    }
  `;

const labelBaseStyles = () => css`
  label: hamburger-label;
  ${hideVisually()};
`;

const HamburgerButton = styled('button')`
  ${buttonBaseStyles}
  ${lightButtonStyles};
`;

const HamburgerLayers = styled('span')`
  ${layersBaseStyles}
  ${layersActiveStyles}
  ${layersBaseLightStyles};
`;
const HamburgerLabel = styled('span')`
  ${labelBaseStyles};
`;

/**
 * A hamburger button for menus. Morphs into a close icon when active.
 */
const Hamburger = ({
  onClick,
  isActive,
  labelActive,
  labelInActive,
  light,
  ...rest
}) => (
  <HamburgerButton {...rest} onClick={onClick} light={light}>
    <HamburgerLayers isActive={isActive} light={light} />
    <HamburgerLabel>{isActive ? labelActive : labelInActive}</HamburgerLabel>
  </HamburgerButton>
);

Hamburger.propTypes = {
  /**
   * Function that is called with the event when the hamburger is clicked.
   */
  onClick: PropTypes.func,
  /**
   * A consice description of the example prop.
   */
  isActive: PropTypes.bool,
  /**
   * Label for the 'active' state. Important for accessibility.
   */
  labelActive: PropTypes.string,
  /**
   * Label for the 'inactive' state. Important for accessibility.
   */
  labelInActive: PropTypes.string,
  /**
   * A Boolean to select the Light or Dark (default) version of the Hamburger.
   */
  light: PropTypes.bool,
  className: PropTypes.string
};

Hamburger.defaultProps = {
  onClick: () => {},
  isActive: false,
  labelActive: 'Close menu',
  labelInActive: 'Open menu'
};

/**
 * @component
 */
export default Hamburger;
