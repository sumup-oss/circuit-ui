import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';

const baseStyles = ({ theme, visible }) => css`
  outline: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.n100};
  position: absolute;
  bottom: 16px;
  right: 16px;
  transition: opacity 150ms ease-in-out, visibility 150ms ease-in-out;
  visibility: ${visible ? 'visible' : 'hidden'};
  opacity: ${visible ? 1 : 0};
  z-index: 1;
  ${theme.mq.mega`
    visibility: hidden;  
  `};
`;

const CloseButton = styled('button')(baseStyles);

CloseButton.propTypes = {
  /**
   * Tells if the CloseButton is visible
   */
  visible: PropTypes.bool
};

export default CloseButton;
