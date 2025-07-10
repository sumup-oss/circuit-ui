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

import { Fragment, useState } from 'react';
import { screen, userEvent, within } from 'storybook/test';
import type { Decorator } from '@storybook/react-vite';

import { modes } from '../../../../.storybook/modes.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';
import { Button } from '../Button/index.js';
import { FullViewport } from '../../../../.storybook/components/index.js';

import { ModalProvider } from './ModalContext.js';

import { Modal, type ModalProps, useModal } from './index.js';

export default {
  title: 'Components/Modal',
  component: Modal,
  tags: ['status:stable'],
  chromatic: {
    modes: {
      mobile: modes.smallMobile,
      desktop: modes.desktop,
    },
    pauseAnimationAtEnd: true,
  },
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

const defaultModalChildren = () => (
  <Fragment>
    <Headline id="title" as="h2" size="s" style={{ marginBottom: '1rem' }}>
      Hello World!
    </Headline>
    <Body id="description">I am a modal dialog.</Body>
  </Fragment>
);

const openModal = async ({
  canvasElement,
}: {
  canvasElement: HTMLCanvasElement;
}) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button', {
    name: 'Open modal',
  });

  await userEvent.click(button);
  await screen.findByRole('dialog');
};

const baseArgs: ModalProps = {
  open: false,
  onClose: () => {},
  variant: 'contextual',
  children: defaultModalChildren,
};

export const Base = (modal: ModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open modal
      </Button>
      <Modal {...modal} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
Base.args = baseArgs;
Base.play = openModal;
Base.parameters = {
  layout: 'fullscreen',
  chromatic: {
    cropToViewport: true,
    modes: {
      mobile: modes.smallMobile,
    },
  },
};

export const WithUseModal = (modal: ModalProps) => {
  const ComponentWithModal = () => {
    const { setModal } = useModal();

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
WithUseModal.args = {
  children: defaultModalChildren,
  closeButtonLabel: 'Close modal',
};
WithUseModal.play = openModal;

export const InitiallyOpen = (modal: ModalProps) => {
  const initialModal = { id: 'initial', component: Modal, ...modal };

  return (
    <ModalProvider initialState={[initialModal]}>
      <div />
    </ModalProvider>
  );
};
InitiallyOpen.args = {
  children: defaultModalChildren,
  variant: 'contextual',
  closeButtonLabel: 'Close modal',
};
InitiallyOpen.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Immersive = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open modal
      </Button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeButtonLabel="Close"
        aria-labelledby="title"
        aria-describedby="description"
        variant="immersive"
      >
        {defaultModalChildren}
      </Modal>
    </>
  );
};
Immersive.parameters = {
  chromatic: {
    cropToViewport: true,
    modes: {
      mobile: modes.smallMobile,
    },
  },
};
Immersive.play = openModal;

export const PreventClose = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open modal
      </Button>
      <Modal
        open={modalOpen}
        preventClose
        onClose={() => setModalOpen(false)}
        closeButtonLabel="Close"
        aria-labelledby="title"
        aria-describedby="description"
      >
        {defaultModalChildren}
      </Modal>
    </>
  );
};
PreventClose.parameters = {
  chromatic: { disableSnapshot: true },
};
PreventClose.play = openModal;
