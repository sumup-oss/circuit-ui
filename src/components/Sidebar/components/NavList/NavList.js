import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = () => css`
  height: auto;
  justify-self: flex-start;
  overflow-y: auto;
  width: 100%;
`;

const NavList = styled('ul')(baseStyles);

NavList.propTypes = {
  /**
   * The children component passed to the Sidebar
   */
  children: PropTypes.node
};

export default NavList;
