import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-start;
  height: 64px;
  width: 100%;
  padding: ${theme.spacings.giga};
  background-color: ${theme.colors.bodyColor};
  color: ${theme.colors.n100};
`;

const Header = styled('div')(baseStyles);

Header.propTypes = {
  /**
   * The children component passed to the Sidebar
   */
  children: PropTypes.node
};

export default Header;
