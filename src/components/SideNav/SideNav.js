import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../../src/util/shared-prop-types';

const NAVIGATION_WIDTH = 270;

const NavContainer = styled('nav')(
  ({ theme }) => css`
    background-color: ${theme.colors.n900};
    padding: ${theme.spacings.kilo};
    width: ${NAVIGATION_WIDTH}px;
  `
);

const ItemWrapper = styled('li')(
  ({ theme }) => css`
    &:not(:last-of-type) {
      margin-bottom: ${theme.spacings.mega};
    }
  `
);

const NavItems = styled('ul')`
  list-style: none;
`;

const NavHeader = styled('header')(
  ({ theme }) => css`
    margin-bottom: ${theme.spacings.byte};
  `
);

/**
 * A side navigation listing a bunch of links to routes
 * and potentially a header.
 */
const SideNav = ({ header, children }) => (
  <NavContainer>
    {header && <NavHeader>{header}</NavHeader>}
    <NavItems>
      {Children.map(children, child => <ItemWrapper>{child}</ItemWrapper>)}
    </NavItems>
  </NavContainer>
);

SideNav.propTypes = {
  /**
   * SideNav items to place. They should be wrapped in a
   * Link component or <a> element.
   */
  children: childrenPropType.isRequired,
  /**
   * A react element to place in the header of the navigation.
   */
  header: PropTypes.element
};

SideNav.defaultProps = {
  header: null
};

/**
 * @component
 */
export default SideNav;
