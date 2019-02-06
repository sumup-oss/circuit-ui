import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: sidebar-backdrop;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${theme.colors.n900};
  transition: opacity ${theme.transitions.default},
    visibility ${theme.transitions.default};
  visibility: hidden;
  opacity: 0;
  z-index: ${theme.zIndex.backdrop};
  ${theme.mq.mega`
    visibility: hidden;  
  `};
`;

const visibleStyles = ({ visible }) =>
  visible &&
  css`
    label: sidebar-backdrop--visible;
    visibility: visible;
    opacity: 0.56;
  `;

const Backdrop = styled('div')(baseStyles, visibleStyles);

Backdrop.propTypes = {
  /**
   * The children component passed to the Sidebar
   */
  children: PropTypes.node,
  /**
   * Tells if the Backdrop is visible
   */
  visible: PropTypes.bool
};

export default Backdrop;
