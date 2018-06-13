import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { size } from 'polished';

import { themePropType } from '../../../../util/shared-prop-types';

import Text from '../../../Text';

const itemContainerActiveStyles = ({ theme, isActive }) =>
  isActive &&
  css`
    background-color: ${theme.colors.black};
  `;

const itemContainerBaseStyles = ({ theme }) => css`
  label: navigation-item__container;
  border: ${theme.borderWidth.mega} solid transparent;
  background-color: transparent;
  border-radius: ${theme.borderRadius.mega};
  cursor: pointer;
  display: flex;
  transition: background-color ${theme.transitions.default};
`;

const ItemContainer = styled('div')(
  itemContainerBaseStyles,
  itemContainerActiveStyles
);

const IconWrapper = styled('div')(
  ({ theme }) => css`
    label: navigation-item__icon-wrapper;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${theme.spacings.kilo};
  `
);

const ItemLabel = styled(Text)(
  ({ theme }) => css`
    label: navigation-item__item-label;
    color: ${theme.colors.white};
    margin-left: ${theme.spacings.byte};
    padding: ${theme.spacings.kilo} 0;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `
);

/**
 * Describe SideNavItem here.
 */
const SideNavItem = ({ icon: Icon, children, theme, isActive }) => (
  <ItemContainer isActive={isActive}>
    <IconWrapper>
      <Icon
        css={`
          ${size(theme.iconSizes.mega)};
          display: block;
        `}
      />
    </IconWrapper>
    <ItemLabel size={Text.MEGA} noMargin>
      {children}
    </ItemLabel>
  </ItemContainer>
);

SideNavItem.propTypes = {
  /**
   * The label to show for this navigation item.
   */
  children: PropTypes.string.isRequired,
  /**
   * An icon to show for this navigation item.
   */
  icon: PropTypes.element.isRequired,
  theme: themePropType.isRequired,
  isActive: PropTypes.bool
};

SideNavItem.defaultProps = {
  isActive: false
};

/**
 * @component
 */
export default withTheme(SideNavItem);
