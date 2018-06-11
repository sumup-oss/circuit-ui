import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { sizes, colorNames } from '../../styles/constants';

const { SUCCESS, DANGER, WARNING } = colorNames;
const { MEGA, GIGA } = sizes;

const baseStyles = css`
  label: inline-notification;
`;

const marginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: text--no-margin;
    margin-bottom: 0;
  `;

const createLeftBorderStyles = colorName => ({ theme, size, type }) => {
  const colors = {
    [DANGER]: theme.colors.danger,
    [SUCCESS]: theme.colors.success,
    [WARNING]: theme.colors.warning
  };

  const textColors = {
    [DANGER]: theme.colors.danger,
    [SUCCESS]: theme.colors.black,
    [WARNING]: theme.colors.black
  };

  return (
    colorName === type &&
    css`
      label: inline-notification--${type};
      color: ${textColors[type]};
      position: relative;
      margin-bottom: ${theme.spacings.mega};

      &:before {
        display: inline-block;
        border-top-right-radius: ${theme.borderRadius[size]};
        border-bottom-right-radius: ${theme.borderRadius[size]};
        content: '';
        position: absolute;
        left: -${theme.spacings[size]};
        top: 0;
        height: 100%;
        background-color: ${colors[type]};
        width: 3px;
      }
    `
  );
};

const successStyles = createLeftBorderStyles(SUCCESS);
const warningStyles = createLeftBorderStyles(WARNING);
const dangerStyles = createLeftBorderStyles(DANGER);

/**
 * An inline notification displayed inside a Card.
 */
const InlineNotification = styled('p')(
  baseStyles,
  dangerStyles,
  successStyles,
  warningStyles,
  marginStyles
);

InlineNotification.DANGER = DANGER;
InlineNotification.SUCCESS = SUCCESS;
InlineNotification.WARNING = WARNING;

InlineNotification.propTypes = {
  /**
   * Indicates the color of the left border and text in the notification.
   */
  type: PropTypes.oneOf([DANGER, SUCCESS, WARNING]),
  /**
   * Should correspond to the size provided to the surrounding Card component.
   */
  size: PropTypes.oneOf([MEGA, GIGA]),
  /**
   * Removes the default bottom margin from the text.
   */
  noMargin: PropTypes.bool
};

InlineNotification.defaultProps = {
  size: GIGA,
  noMargin: false
};

/**
 * @component
 */
export default InlineNotification;
