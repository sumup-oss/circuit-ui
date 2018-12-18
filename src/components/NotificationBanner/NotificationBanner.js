import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from 'emotion';

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
 * NotificationBanner displays a persistent Message.
 */
const NotificationBanner = ({ children, ...props }) => (
  <NotificationBannerOuter {...props} aria-live="polite" region="status">
    <NotificationBannerInner>{children}</NotificationBannerInner>
  </NotificationBannerOuter>
);

NotificationBanner.propTypes = {
  /**
   * A single Message.
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
