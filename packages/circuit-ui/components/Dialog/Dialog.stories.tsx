/**
 * Copyright 2024, SumUp Ltd.
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

import { Fragment, type ReactNode, useState } from 'react';
import { screen, userEvent, within } from '@storybook/test';

import { modes } from '../../../../.storybook/modes.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';
import { Button } from '../Button/index.js';

import { Dialog, type DialogProps, useModal } from './Dialog.js';
import { ModalDialogProvider } from './ModalDialogContext.js';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['status:experimental'],
  parameters: {
    viewport: {
      defaultViewport: 'reset',
    },
    chromatic: {
      modes: {
        mobile: modes.smallMobile,
        desktop: modes.desktop,
      },
    },
  },
};

const defaultModalChildren = (): ReactNode => (
  <Fragment>
    <Headline id="title" as="h2" size="s" style={{ marginBottom: '1rem' }}>
      Hello World!
    </Headline>
    <Body id="log1">I am a modal dialog.</Body>
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

export const Base = () => {
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
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeButtonLabel="Close"
        aria-label="Hello World!"
        aria-describedby="log1"
      >
        {defaultModalChildren}
      </Dialog>
    </>
  );
};

export const WithUseModal = (modal: DialogProps) => {
  const ComponentWithModal = () => {
    const { setModal } = useModal();

    return (
      <Button type="button" onClick={() => setModal(modal)}>
        Open modal
      </Button>
    );
  };
  return (
    <ModalDialogProvider>
      <ComponentWithModal />
    </ModalDialogProvider>
  );
};

WithUseModal.args = {
  children: defaultModalChildren,
  variant: 'contextual',
  closeButtonLabel: 'Close modal',
};

export const InitiallyOpen = (modal: DialogProps) => {
  const initialModal = { id: 'initial', component: Dialog, ...modal };

  return (
    <ModalDialogProvider initialState={[initialModal]}>
      <div />
    </ModalDialogProvider>
  );
};

InitiallyOpen.args = {
  children: defaultModalChildren,
  variant: 'contextual',
  closeButtonLabel: 'Close modal',
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
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeButtonLabel="Close"
        aria-label="Hello World!"
        aria-describedby="log1"
        variant="immersive"
      >
        {defaultModalChildren}
      </Dialog>
    </>
  );
};

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
      <Dialog
        open={modalOpen}
        preventClose
        onClose={() => setModalOpen(false)}
        closeButtonLabel="Close"
        aria-label="Hello World!"
        aria-describedby="log1"
      >
        {defaultModalChildren}
      </Dialog>
    </>
  );
};

Immersive.parameters = {
  chromatic: { disableSnapshot: true },
  viewport: {
    defaultViewport: 'smallMobile',
  },
};

InitiallyOpen.play = openModal;
Immersive.play = openModal;
PreventClose.play = openModal;
Base.play = openModal;
