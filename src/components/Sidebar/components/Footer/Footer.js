import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: sidebar-footer;
  display: flex;
  flex: 1;
  align-items: flex-end;
  padding: ${theme.spacings.giga};
  background-color: ${theme.colors.n900};
  color: ${theme.colors.n100};
`;

const Footer = styled('div')(baseStyles);

Footer.propTypes = {
  /**
   * The children component passed to the Footer
   */
  children: PropTypes.node
};

export default Footer;
