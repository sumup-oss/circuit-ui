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

import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import Body from '../Body';
import Headline from '../Headline';
import Badge from '../Badge';
import Card from '../Card';
import Button from '../Button';
import NotificationBanner from '../NotificationBanner';
import { ToastProvider } from '../ToastContext';
import { ModalProvider } from '../ModalContext';
import { cx, spacing } from '../../styles/style-mixins';

import docs from './Theming.docs.mdx';

export default {
  title: 'Features/Theming',
  parameters: {
    docs: { page: docs },
  },
};

const Theming = () => (
  <div
    css={css`
      max-width: 600px;
    `}
  >
    <div
      css={(theme: Theme) => css`
        display: flex;
        gap: ${theme.spacings.mega};
        align-items: center;
        margin-bottom: ${theme.spacings.giga};
      `}
    >
      <Headline as="h1" size="two" noMargin>
        Theming
      </Headline>
      <Badge variant="promo">New</Badge>
    </div>
    <Body variant="subtle" css={spacing({ bottom: 'giga' })}>
      Introducing Circuit UI theming.
    </Body>
    <Card
      css={cx(
        css`
          align-items: baseline;
        `,
        spacing({ bottom: 'giga' }),
      )}
    >
      <Headline as="h3" size="four" noMargin css={spacing({ bottom: 'giga' })}>
        Themes
      </Headline>
      <Body noMargin css={spacing({ bottom: 'giga' })}>
        Circuit UI will export some themes ready for use. You will also be able
        to create your own themes, for an entire application or for a single
        component.
      </Body>
      <Button variant="primary">View available themes</Button>
    </Card>
    <NotificationBanner
      body="Reach out to us on Slack (internal) if you want to help out!"
      action={{
        children: 'Go to Slack',
        variant: 'tertiary',
        href: 'https://sumup.slack.com/archives/C8VJTUADU',
      }}
    />
  </div>
);

export const Base = () => (
  <ModalProvider>
    <ToastProvider>
      <Theming />
    </ToastProvider>
  </ModalProvider>
);

Base.args = {};
