import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const baseStyles = () => css`
  label: nav-list;
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
