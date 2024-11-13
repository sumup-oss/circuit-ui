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

import type { Decorator } from '@storybook/react';
import { Fragment } from 'react';
import { screen, userEvent, within } from '@storybook/test';

import {
  FullViewport,
  Stack,
} from '../../../../.storybook/components/index.js';
import { modes } from '../../../../.storybook/modes.js';
import { Button } from '../Button/index.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';
import { Image } from '../Image/index.js';
import { ModalProvider } from '../ModalContext/index.js';

import { useModal, Modal, type ModalProps } from './Modal.js';

export default {
  title: 'Components/Modal',
  component: Modal,
  subcomponents: { ModalProvider },
  tags: ['status:under-review'],
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

const defaultModalChildren = () => (
  <Fragment>
    <Headline as="h2" size="s" style={{ marginBottom: '1rem' }}>
      Hello World!
    </Headline>
    <Body>I am a modal.</Body>
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

export const Base = (modal: ModalProps) => {
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

Base.args = {
  children: defaultModalChildren,
  variant: 'contextual',
  closeButtonLabel: 'Close modal',
};
Base.play = openModal;

export const Variants = (modal: ModalProps) => {
  const ComponentWithModal = ({ variant }: Pick<ModalProps, 'variant'>) => {
    const { setModal } = useModal();

    return (
      <Button type="button" onClick={() => setModal({ ...modal, variant })}>
        Open {variant} modal
      </Button>
    );
  };
  return (
    <ModalProvider>
      <Stack>
        <ComponentWithModal variant="contextual" />
        <ComponentWithModal variant="immersive" />
      </Stack>
    </ModalProvider>
  );
};

Variants.args = {
  children: defaultModalChildren,
  closeButtonLabel: 'Close modal',
};
Variants.parameters = {
  chromatic: { disableSnapshot: true },
};

export const PreventClose = (modal: ModalProps) => {
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

PreventClose.args = {
  children: ({ onClose }: { onClose: ModalProps['onClose'] }) => (
    <Fragment>
      <Headline as="h2" size="s" style={{ marginBottom: '1rem' }}>
        Complete the action
      </Headline>
      <Body style={{ marginBottom: '1rem' }}>
        Users have to complete the action inside the modal to close it. The
        close button is hidden and clicking outside the modal or pressing the
        escape key does not close the modal either.
      </Body>
      <Button variant="primary" onClick={onClose}>
        Close modal
      </Button>
    </Fragment>
  ),
  variant: 'immersive',
  preventClose: true,
};
PreventClose.play = openModal;

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

export const CustomStyles = (modal: ModalProps) => {
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

CustomStyles.args = {
  children: () => (
    <Fragment>
      <Image
        src="/images/illustration-waves.jpg"
        alt=""
        style={{
          borderTopLeftRadius: 'var(--cui-border-radius-mega)',
          borderTopRightRadius: 'var(--cui-border-radius-mega)',
        }}
      />
      <Headline as="h2" size="s" style={{ margin: '1rem' }}>
        Custom styles
      </Headline>
      <Body style={{ margin: '1rem' }}>
        Custom styles can be applied using the <code>className</code> or{' '}
        <code>style</code> props.
      </Body>
    </Fragment>
  ),
  style: { padding: '0' },
  variant: 'contextual',
  closeButtonLabel: 'Close modal',
};
CustomStyles.play = openModal;
