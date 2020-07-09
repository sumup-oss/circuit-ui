/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { CircleCheckmark, CircleCross, CircleWarning } from '@sumup/icons';

const colorMap = {
  success: 'success',
  error: 'danger',
  warning: 'warning',
};

const iconMap = {
  success: CircleCheckmark,
  error: CircleCross,
  warning: CircleWarning,
};

const baseStyles = ({ theme }) => css`
  label: notification__icon;
  display: block;
  margin: 0 0 ${theme.spacings.mega} 0;
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 0;

  ${theme.mq.kilo} {
    margin: 0 ${theme.spacings.mega} 0 0;
  }
`;

const iconColor = (type) => (theme) =>
  css`
    color: ${theme.colors[colorMap[type]]};
  `;

/**
 * Icon used in the Notification component. Used for styling and alignment
 * purposes only.
 */
const NotificationIconContainer = styled('div')(baseStyles);

const NotificationIcon = ({ type, children }) => {
  const Icon = iconMap[type];

  return (
    <NotificationIconContainer>
      {Icon ? <Icon css={iconColor(type)} size="large" /> : children}
    </NotificationIconContainer>
  );
};

NotificationIcon.propTypes = {
  /**
   * A custom icon to display.
   */
  children: PropTypes.element,
  /**
   * The icon type. Overrides a custom icon.
   */
  type: PropTypes.oneOf(['success', 'error', 'warning']),
};

/**
 * @component
 */
export default NotificationIcon;
