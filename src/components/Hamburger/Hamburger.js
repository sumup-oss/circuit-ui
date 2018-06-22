import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { hideVisually } from 'polished';

const LAYER_HEIGHT = '2px';

const buttonBaseStyles = ({ theme }) => css`
  label: hamburger-button;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-block;
  padding: ${theme.spacings.mega} ${theme.spacings.byte};
  width: ${theme.iconSizes.kilo};
  background: none;
  border: 0;
  position: relative;
`;

const layersBaseStyles = ({ theme }) => css`
  label: hamburger-layers;
  margin-top: calc(${LAYER_HEIGHT} / -2);
  top: 50%;
  width: calc(${theme.iconSizes.kilo} * 0.77);

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
    transform: translateY(calc((${theme.spacings.bit} + ${LAYER_HEIGHT}) * -1));
    width: ${theme.iconSizes.kilo};
  }

  &::after {
    transform: translateY(calc((${theme.spacings.bit} + ${LAYER_HEIGHT})));
    width: calc(${theme.iconSizes.kilo} * 0.88);
  }
`;

const layersActiveStyles = ({ theme, isActive }) =>
  isActive &&
  css`
    label: hamburger-layers--active;
    transform: rotate(225deg);

    &,
    &::before,
    &::after {
      transition: width 0.2s ease-out, opacity 0.1s ease-out 0.15s,
        transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0.15s;
      width: ${theme.iconSizes.kilo};
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
  ${buttonBaseStyles};
`;
const HamburgerLayers = styled('span')`
  ${layersBaseStyles} ${layersActiveStyles};
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
  className
}) => (
  <HamburgerButton className={className} onClick={onClick}>
    <HamburgerLayers isActive={isActive} />
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
  className: PropTypes.string
};

Hamburger.defaultProps = {
  onClick: () => {},
  isActive: false,
  labelActive: 'Close menu',
  labelInActive: 'Open menu',
  className: ''
};

/**
 * @component
 */
export default Hamburger;
