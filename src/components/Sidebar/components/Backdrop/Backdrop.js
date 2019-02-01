import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme, visible }) => css`
  label: backdrop;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  transition: opacity 150ms ease-in-out, visibility 150ms ease-in-out;
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
