import React, { Children } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { childrenPropType } from '../../util/shared-prop-types';
import { multiplyUnit } from '../../styles/style-helpers';
import Card from '../Card';

const baseStyles = ({ theme }) => css`
  label: notification-list;
  display: flex;
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

  ${theme.mq.untilMega`
    max-width: none;
    width: 100%;
  `};
`;

const NotificationListWrapper = styled('ul')`
  ${baseStyles};
`;

const NotificationListCard = Card.withComponent('li');

/**
 * NotificationList displays Messages as Cards in a corner.
 */
const NotificationList = ({ children, ...props }) => (
  <NotificationListWrapper {...props} aria-live="polite" region="log">
    {Children.map(children, (child, i) => (
      <NotificationListCard spacing={Card.MEGA} shadow={Card.DOUBLE} key={i}>
        {child}
      </NotificationListCard>
    ))}
  </NotificationListWrapper>
);

NotificationList.propTypes = {
  /**
   * One or more Messages.
   */
  children: childrenPropType
};

NotificationList.defaultProps = {
  children: null
};

/**
 * @component
 */
export default NotificationList;
