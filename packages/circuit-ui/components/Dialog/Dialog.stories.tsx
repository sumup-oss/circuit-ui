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

import type { Decorator } from '@storybook/react';
import { Fragment, type ReactNode, useRef, useState } from 'react';
import { screen, userEvent, within } from '@storybook/test';

import { modes } from '../../../../.storybook/modes.js';
import { FullViewport } from '../../../../.storybook/components/index.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';
import { Button } from '../Button/index.js';
import { Input } from '../Input/index.js';

import { Dialog, type DialogProps, useModal } from './Dialog.js';
import { ModalDialogProvider } from './ModalDialogContext.js';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['status:experimental'],
  parameters: {
    chromatic: {
      modes: {
        mobile: modes.smallMobile,
        desktop: modes.desktop,
      },
    },
  },
  decorators: [
    (Story) => (
      <FullViewport>
        <Story />
      </FullViewport>
    ),
  ] as Decorator[],
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

export const Modal = () => {
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

export const Simultaneous = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  return (
    <>
      <div> TODO handle closing of simultaneous modals</div>
      <Button
        type="button"
        onClick={() => {
          setModalOpen(true);
          setModalOpen2(true);
        }}
      >
        Open modal
      </Button>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeButtonLabel="Close"
      >
        {defaultModalChildren}
      </Dialog>
      <Dialog
        open={modalOpen2}
        onClose={() => setModalOpen2(false)}
        closeButtonLabel="Close"
      >
        {() => <div>hi</div>}
      </Dialog>
    </>
  );
};

const NestedModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open child modal
      </Button>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeButtonLabel="Close"
      >
        {defaultModalChildren}
      </Dialog>
    </>
  );
};

export const Nested = () => {
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
      >
        {() => <NestedModal />}
      </Dialog>
    </>
  );
};

export const withUseModal = (modal: DialogProps) => {
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

const ConfirmContent = () => (
  <form method="dialog">
    <Headline
      as="h2"
      size="s"
      style={{ marginBottom: 'var(--cui-spacings-giga)', textAlign: 'center' }}
    >
      Are you sure you want to proceed ?
    </Headline>

    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <Button type="submit" value="no">
        Cancel
      </Button>
      <Button type="submit" value="yes">
        Submit
      </Button>
    </div>
  </form>
);

export const ConfirmationModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onDialogClosed = () => {
    setModalOpen(false);
    setTimeout(() => {
      // wait for animation to finish
      alert(`user chose: ${dialogRef?.current?.returnValue}`);
    }, 300);
  };

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
        ref={dialogRef}
        open={modalOpen}
        onClose={onDialogClosed}
        closeButtonLabel="Close"
        aria-label="Are you sure you want to proceed ?"
      >
        {() => <ConfirmContent />}
      </Dialog>
    </>
  );
};

const FormContent = () => (
  <form method="dialog">
    <Headline
      as="h2"
      size="s"
      style={{ marginBottom: 'var(--cui-spacings-giga)', textAlign: 'center' }}
    >
      Please enter recipient information
    </Headline>

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--cui-spacings-mega)',
      }}
    >
      <Input label="First Name" />
      <Input label="Last Name" />
      <Input label="Address" />
    </div>

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: 'var(--cui-spacings-giga)',
      }}
    >
      <Button type="submit">Cancel</Button>
      <Button type="submit">Submit</Button>
    </div>
  </form>
);

export const WithInteractiveContent = () => {
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
        aria-label="Please enter recipient information"
      >
        {() => <FormContent />}
      </Dialog>
    </>
  );
};

export const Variants = () => {
  const [isImmersive, setIsImmersive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setIsImmersive(false);
          setModalOpen(true);
        }}
      >
        Open contextual modal
      </Button>
      <Button
        type="button"
        onClick={() => {
          setIsImmersive(true);
          setModalOpen(true);
        }}
      >
        Open immersive modal
      </Button>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeButtonLabel="Close"
        aria-label="Hello World!"
        aria-describedby="log1"
        variant={isImmersive ? 'immersive' : 'contextual'}
      >
        {defaultModalChildren}
      </Dialog>
    </>
  );
};

Variants.args = {
  children: defaultModalChildren,
  closeButtonLabel: 'Close modal',
};
Variants.parameters = {
  chromatic: { disableSnapshot: true },
};
withUseModal.args = {
  children: defaultModalChildren,
  closeButtonLabel: 'Close',
  onClose: () => console.log('closed'),
  open: true,
  'aria-label': 'Hello World!',
};

Base.play = openModal;
