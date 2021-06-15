import React from 'react';
import styled from '@emotion/styled';
import { NotificationCard } from '@sumup/circuit-ui';

const BaseNotificationBanner = () => <NotificationCard />;

const RedNotificationBanner = styled(NotificationCard)`
  color: red;
`;
