import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const CENTER = 'center';
const TOP = 'top';

const baseStyles = ({ theme }) => css`
  label: alert__button;
  display: block;
  padding-left: ${theme.spacings.giga};
  margin-left: auto;
  flex-grow: 0;
  flex-shrink: 0;
`;

const alignmentStyles = ({ alignment }) => {
  const alignments = {
    [CENTER]: 'center',
    [TOP]: 'flex-start'
  };
  return css`
    label: alert__button--${alignment};
    align-self: ${alignments[alignment]};
  `;
};

/**
 * Button used in the Message component. Used for styling and aligment
 * pruposes only.
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
  alignment: PropTypes.oneOf([MessageButton.TOP, MessageButton.CENTER])
};

MessageButton.defaultProps = {
  alignment: MessageButton.CENTER
};

/**
 * @component
 */
export default MessageButton;
