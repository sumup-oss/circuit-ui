import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

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
