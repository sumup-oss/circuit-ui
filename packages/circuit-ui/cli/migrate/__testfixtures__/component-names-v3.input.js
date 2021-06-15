import React from 'react';
import styled from '@emotion/styled';
import { NotificationBanner } from '@sumup/circuit-ui';

const BaseNotificationBanner = () => <NotificationBanner />;

const RedNotificationBanner = styled(NotificationBanner)`
  color: red;
`;
