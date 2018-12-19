import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const CENTER = 'center';
const TOP = 'top';

const baseStyles = ({ theme }) => css`
  label: message__button;
  display: block;
  padding-left: ${theme.spacings.giga};
  margin-left: auto;
  flex-grow: 0;
  flex-shrink: 0;
`;

const alignmentStyles = ({ align }) => {
  const alignments = {
    [CENTER]: 'center',
    [TOP]: 'flex-start'
  };
  return css`
    label: message__button--${align};
    align-self: ${alignments[align]};
  `;
};

/**
 * Button used in the Message component. Used for styling and aligment
 * purposes only.
 */
const MessageButton = styled('div')(baseStyles, alignmentStyles);

MessageButton.TOP = TOP;
MessageButton.CENTER = CENTER;

MessageButton.propTypes = {
  /**
   * Button
   */
  children: PropTypes.element.isRequired,
  /**
   * Vertical alignment
   */
  align: PropTypes.oneOf([MessageButton.TOP, MessageButton.CENTER])
};

MessageButton.defaultProps = {
  align: MessageButton.CENTER
};

/**
 * @component
 */
export default MessageButton;
