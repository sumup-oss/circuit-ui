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

import { Fragment } from 'react';
import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import Body from '../Body';
import Headline from '../Headline';
import Badge from '../Badge';
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import { useModal } from '../Modal';
import NotificationInline from '../NotificationInline';
import { useNotificationToast } from '../NotificationToast';
import { ToastProvider } from '../ToastContext';
import { ModalProvider } from '../ModalContext';
import { spacing } from '../../styles/style-mixins';

import ThemeContext from './ThemeContext';
import docs from './Theming.docs.mdx';

export default {
  title: 'Features/Theming',
  parameters: {
    docs: { page: docs },
  },
};

const Theming = () => {
  const { setModal } = useModal();
  const { setToast } = useNotificationToast();
  return (
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
        css={css`
          align-items: baseline;
        `}
      >
        <Headline
          as="h3"
          size="four"
          noMargin
          css={spacing({ bottom: 'giga' })}
        >
          Themes
        </Headline>
        <Body noMargin css={spacing({ bottom: 'giga' })}>
          Circuit UI will export some themes ready for use. You will also be
          able to create your own themes, for an entire application or for a
          single component.
        </Body>
        <Button
          onClick={() =>
            setModal({
              variant: 'contextual',
              closeButtonLabel: 'Close',
              // eslint-disable-next-line react/display-name
              children: ({ onClose }) => (
                <Fragment>
                  <Headline
                    as="h2"
                    size="four"
                    noMargin
                    css={spacing({ bottom: 'giga' })}
                  >
                    Themes
                  </Headline>
                  <Body noMargin css={spacing({ bottom: 'giga' })}>
                    There will be at least two themes available in Circuit UI:
                  </Body>
                  <Body noMargin css={spacing({ bottom: 'bit' })}>
                    Light <Badge variant="confirm">Ready</Badge>
                  </Body>
                  <Body noMargin css={spacing({ bottom: 'giga' })}>
                    Dark <Badge variant="notify">In progress</Badge>
                  </Body>
                  <NotificationInline
                    variant="notify"
                    body="Do not use the dark theme yet."
                    css={spacing({ bottom: 'giga' })}
                  />
                  <Body noMargin css={spacing({ bottom: 'giga' })}>
                    Does this answer your question?
                  </Body>
                  <ButtonGroup
                    align="left"
                    actions={{
                      primary: {
                        children: 'Yes',
                        onClick: () => {
                          setToast({
                            variant: 'confirm',
                            body: 'Happy to hear!',
                          });
                          onClose();
                        },
                      },
                      secondary: {
                        children: 'No',
                        destructive: true,
                        onClick: () => {
                          setToast({
                            variant: 'info',
                            body: 'Sorry about this :(',
                          });
                          onClose();
                        },
                      },
                    }}
                  />
                </Fragment>
              ),
            })
          }
        >
          View available themes
        </Button>
      </Card>
    </div>
  );
};

export const Base = (args, context) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const isLight = context?.globals?.backgrounds?.value !== '#1A1A1A';

  return (
    <ThemeContext.Provider value={isLight ? 'light' : 'dark'}>
      <ModalProvider>
        <ToastProvider>
          <Theming />
        </ToastProvider>
      </ModalProvider>
    </ThemeContext.Provider>
  );
};

Base.args = {};
