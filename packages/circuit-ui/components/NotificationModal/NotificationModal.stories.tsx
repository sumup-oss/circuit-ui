/**
 * Copyright 2021, SumUp Ltd.
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

import type { Decorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { screen, userEvent, within } from '@storybook/test';

import { FullViewport } from '../../../../.storybook/components/index.js';
import { ModalProvider } from '../ModalContext/index.js';
import Button from '../Button/index.js';

import {
  NotificationModal,
  type NotificationModalProps,
} from './NotificationModal.js';
import { useNotificationModal } from './useNotificationModal.js';

export default {
  title: 'Notification/NotificationModal',
  component: NotificationModal,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <FullViewport>
        <Story />
      </FullViewport>
    ),
  ] as Decorator[],
};

export const Base = (modal: NotificationModalProps) => {
  const ComponentWithModal = () => {
    const { setModal } = useNotificationModal();

    return <Button onClick={() => setModal(modal)}>Open modal</Button>;
  };
  return (
    <ModalProvider>
      <ComponentWithModal />
    </ModalProvider>
  );
};

Base.args = {
  image: {
    src: '/images/illustration-update.svg',
    alt: '',
  },
  headline: "It's time to update your browser",
  body: "You'll soon need a more up-to-date browser to continue using SumUp.",
  actions: {
    primary: {
      children: 'Update now',
      onClick: action('primary'),
    },
    secondary: {
      children: 'Not now',
      onClick: action('secondary'),
    },
  },
  closeButtonLabel: 'Close',
};
Base.play = async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button', {
    name: 'Open modal',
  });

  await userEvent.click(button);
  await screen.findByRole('dialog');
};
