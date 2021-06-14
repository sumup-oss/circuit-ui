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
import { action } from '@storybook/addon-actions';

import { ModalProvider } from '../ModalContext';
import Button from '../Button';

// import docs from './Modal.docs.mdx';
import { NotificationModal, NotificationModalProps } from './NotificationModal';
import { useNotificationModal } from './useNotificationModal';

export default {
  title: 'Components/NotificationModal',
  component: NotificationModal,
  // parameters: {
  //   docs: { page: docs },
  // },
};

export const Base = (modal: NotificationModalProps): JSX.Element => {
  const ComponentWithModal = () => {
    const { setModal } = useNotificationModal();

    return (
      <Button type="button" onClick={() => setModal(modal)}>
        Open modal
      </Button>
    );
  };
  return (
    <ModalProvider>
      <ComponentWithModal />
    </ModalProvider>
  );
};

Base.args = {
  image: {
    src: 'https://source.unsplash.com/TpHmEoVSmfQ/1600x900',
    alt: '',
  },
  headline: 'Example modal',
  body: 'Hello World!',
  actions: {
    primary: {
      children: 'Primary',
      onClick: action('primary'),
    },
    secondary: {
      children: 'Secondary',
      onClick: action('secondary'),
    },
  },
};
