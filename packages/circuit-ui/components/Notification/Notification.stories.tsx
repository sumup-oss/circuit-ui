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

/** @jsxRuntime classic */
/** @jsx jsx */
import { Fragment } from 'react';
import { action } from '@storybook/addon-actions';
import { css, jsx } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';

import Headline from '../Headline';
import Body from '../Body';
import Button from '../Button';
import NotificationList from '../NotificationList';
import NotificationCard from '../NotificationCard';

import docs from './Notification.docs.mdx';
import { Notification, NotificationProps } from './Notification';

export default {
  title: 'Components/Notification',
  component: Notification,
  subcomponents: { NotificationList, NotificationCard },
  parameters: {
    docs: { page: docs },
  },
};

const notificationStyles = (theme: Theme) =>
  css`
    width: 600px;
    max-width: 95vw;
    margin-bottom: ${theme.spacings.mega};
  `;

const headingStyles = (theme: Theme) =>
  css`
    margin-bottom: ${theme.spacings.kilo};
  `;

export const Base = (args: NotificationProps) => (
  <Notification {...args}>
    <Headline as="h4" size="four" noMargin>
      New Feature — Intelligent Reporting
    </Headline>
    <Body>
      Get automatic insights into your business statistics with one click.
    </Body>
    <Button size="kilo" onClick={action('Action clicked')}>
      Learn more
    </Button>
  </Notification>
);

Base.args = {
  variant: 'success',
  onClose: action('Notification dismissed'),
  closeLabel: 'Close',
};

export const Variants = () => (
  <Fragment>
    <Notification variant="success" css={notificationStyles}>
      <Headline size="four" as="h4" noMargin>
        Transaction successfully refunded
      </Headline>
    </Notification>
    <Notification variant="warning" css={notificationStyles}>
      <Headline size="four" as="h4" noMargin>
        You need to verify your account
      </Headline>
      <Body>
        We need to verify your identity before you can continue transacting.
      </Body>
      <Button size="kilo" onClick={action('Button clicked')}>
        Verify account
      </Button>
    </Notification>
    <Notification variant="error" css={notificationStyles}>
      <Headline size="four" as="h4" css={headingStyles}>
        We failed to process your transaction
      </Headline>
      <Button size="kilo" onClick={action('Button clicked')}>
        Try again
      </Button>
    </Notification>
  </Fragment>
);

Variants.parameters = {
  controls: { hideNoControlsWarning: true },
};
