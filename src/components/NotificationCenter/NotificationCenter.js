import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';
import { multiplyUnit } from '../../styles/style-helpers';
import Card from '../Card';

const FIXED = 'fixed';
const ABSOLUTE = 'absolute';

const TOP_LEFT = 'top-left';
const TOP_RIGHT = 'top-right';
const BOTTOM_RIGHT = 'bottom-right';
const BOTTOM_LEFT = 'bottom-left';

const baseStyles = ({ theme }) => css`
    label: notifications;
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 400px;
    max-width: 90vw; ${'' /* FALLBACK: Old Androids don't support calc()  */}
    max-width: calc(100vw - ${multiplyUnit(theme.spacings.giga, 2)});

    > * {
      margin-top: ${theme.spacings.mega};
    }

    > *:first-child {
      margin-top: 0;
    }
  `;

const positionStyles = ({ position }) =>
  position &&
  css`
    label: notification-center--${position};
    position: ${position};
  `;

const cornerStyles = ({ theme, corner }) => {
  const outerSpacing = theme.spacings.giga;
  const corners = {
    [TOP_LEFT]: `
      top: ${outerSpacing};
      left: ${outerSpacing};
    `,
    [TOP_RIGHT]: `
      top: ${outerSpacing};
      right: ${outerSpacing};
    `,
    [BOTTOM_RIGHT]: `
      bottom: ${outerSpacing};
      right: ${outerSpacing};
    `,
    [BOTTOM_LEFT]: `
      bottom: ${outerSpacing};
      left: ${outerSpacing};
    `
  };
  return (
    corner &&
    css`
      label: notification-center--${corner};
      ${corners[corner]};
    `
  );
};

/**
 * NotificationCenter displays Messages as Cards in a corner.
 */
const NotificationCenterWrapper = styled(
  'div'
)`${baseStyles} ${positionStyles} ${cornerStyles}`;

const NotificationCenter = ({ children, ...props }) => (
  <NotificationCenterWrapper {...props} aria-live="polite">
    {Children.map(children, (child, i) => (
      <Card spacing={Card.MEGA} shadow={Card.DOUBLE} key={i}>
        {child}
      </Card>
    ))}
  </NotificationCenterWrapper>
);

NotificationCenter.FIXED = FIXED;
NotificationCenter.ABSOLUTE = ABSOLUTE;

NotificationCenter.TOP_LEFT = TOP_LEFT;
NotificationCenter.TOP_RIGHT = TOP_RIGHT;
NotificationCenter.BOTTOM_RIGHT = BOTTOM_RIGHT;
NotificationCenter.BOTTOM_LEFT = BOTTOM_LEFT;

NotificationCenter.propTypes = {
  /**
   * One or more Messages.
   */
  children: childrenPropType,
  /**
   * Fixed or absolute position
   */
  position: PropTypes.oneOf([
    NotificationCenter.ABSOLUTE,
    NotificationCenter.FIXED
  ]),
  /**
   * Corner where the messages should be displayed
   */
  corner: PropTypes.oneOf([
    NotificationCenter.TOP_LEFT,
    NotificationCenter.TOP_RIGHT,
    NotificationCenter.BOTTOM_RIGHT,
    NotificationCenter.BOTTOM_LEFT
  ])
};

NotificationCenter.defaultProps = {
  children: null,
  position: NotificationCenter.FIXED,
  corner: NotificationCenter.BOTTOM_RIGHT
};

/**
 * @component
 */
export default NotificationCenter;
