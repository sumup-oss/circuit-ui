import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';
import { multiplyUnit } from '../../styles/style-helpers';
import Card from '../Card';

const TOP_LEFT = 'top-left';
const TOP_RIGHT = 'top-right';
const BOTTOM_RIGHT = 'bottom-right';
const BOTTOM_LEFT = 'bottom-left';

const baseStyles = ({ theme, position }) => {
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
  return css`
    label: notifications;
    display: flex;
    position: fixed;
    flex-direction: column;
    width: 400px;
    max-width: 90vw; ${'' /* FALLBACK: Old Androids don't support calc()  */}
    max-width: calc(100vw - ${multiplyUnit(outerSpacing, 2)});
    ${corners[position]};

    > * {
      margin-top: ${theme.spacings.mega};
    }

    > *:first-child {
      margin-top: 0;
    }
  `;
};

/**
 * Notifications positions Messages in one corner of the viewport.
 */
const NotificationsWrapper = styled('div')(baseStyles);

const Notifications = ({ children, ...props }) => (
  <NotificationsWrapper {...props} aria-live="polite">
    {Children.map(children, (child, i) => (
      <Card spacing={Card.MEGA} shadow={Card.DOUBLE} key={i}>
        {child}
      </Card>
    ))}
  </NotificationsWrapper>
);

Notifications.TOP_LEFT = TOP_LEFT;
Notifications.TOP_RIGHT = TOP_RIGHT;
Notifications.BOTTOM_RIGHT = BOTTOM_RIGHT;
Notifications.BOTTOM_LEFT = BOTTOM_LEFT;

Notifications.propTypes = {
  /**
   * One or more Messages.
   */
  children: childrenPropType,
  /**
   * Corner position where the notifications should be displayed
   */
  position: PropTypes.oneOf([
    Notifications.TOP_LEFT,
    Notifications.TOP_RIGHT,
    Notifications.BOTTOM_RIGHT,
    Notifications.BOTTOM_LEFT
  ])
};

Notifications.defaultProps = {
  children: null,
  position: Notifications.BOTTOM_RIGHT
};

/**
 * @component
 */
export default Notifications;
