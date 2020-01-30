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

import { shadowSingle } from '../../styles/style-helpers';

const outerStyles = ({ theme }) => css`
  label: notification-banner;
  width: 100%;
  background-color: ${theme.colors.white};
  ${shadowSingle({ theme })};
`;

const innerStyles = ({ theme }) => css`
  label: notification-banner__inner;
  padding: ${theme.spacings.mega} ${theme.spacings.giga};
  max-width: ;
`;

const NotificationBannerOuter = styled('div')`
  ${outerStyles};
`;
const NotificationBannerInner = styled('div')`
  ${innerStyles};
`;

/**
 * NotificationBanner displays a persistent Notification.
 */
const NotificationBanner = ({ children, ...props }) => (
  <NotificationBannerOuter {...props} aria-live="polite" region="status">
    <NotificationBannerInner>{children}</NotificationBannerInner>
  </NotificationBannerOuter>
);

NotificationBanner.propTypes = {
  /**
   * A single Notification.
   */
  children: PropTypes.element
};

NotificationBanner.defaultProps = {
  children: null
};

/**
 * @component
 */
export default NotificationBanner;
