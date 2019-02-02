import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme, visible }) => css`
  label: sidebar-backdrop;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  transition: opacity ${theme.transitions.default},
    visibility ${theme.transitions.default};
  visibility: ${visible ? 'visible' : 'hidden'};
  opacity: ${visible ? 0.56 : 0};
  z-index: 0;
  ${theme.mq.mega`
    visibility: hidden;  
  `};
`;

const Backdrop = styled('div')(baseStyles);

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
