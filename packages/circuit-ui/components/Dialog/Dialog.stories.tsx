/**
 * Copyright 2025, SumUp Ltd.
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
import { useState } from 'react';
import { screen, userEvent, within } from '@storybook/test';

import { FullViewport } from '../../../../.storybook/components/index.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';
import { modes } from '../../../../.storybook/modes.js';
import { Button } from '../Button/index.js';

import { Dialog, type DialogProps } from './Dialog.js';

export default {
  title: 'Components/Modal/Dialog',
  component: Dialog,
  tags: ['status:stable'],
  chromatic: {
    modes: {
      mobile: modes.smallMobile,
      desktop: modes.desktop,
    },
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

const defaultChildren = () => (
  <div style={{ padding: 'var(--cui-spacings-mega)' }}>
    <Headline id="title" as="h2" size="s" style={{ marginBottom: '1rem' }}>
      Hello World!
    </Headline>
    <Body id="description">I am the dialog content.</Body>
  </div>
);

const openDialog = async ({
  canvasElement,
}: {
  canvasElement: HTMLCanvasElement;
}) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button', {
    name: 'Open dialog',
  });

  await userEvent.click(button);
  await screen.findByRole('dialog');
};

const dialogStyles = {
  border: '1px solid var(--cui-border-normal)',
  borderRadius: 'var(--cui-border-radius-byte)',
};

const baseArgs: DialogProps = {
  open: false,
  onCloseEnd: () => {},
  'aria-labelledby': 'title',
  'aria-describedby': 'description',
  children: defaultChildren,
  style: dialogStyles,
};

export const Base = (dialog: DialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Open dialog
      </Button>
      <Dialog
        {...dialog}
        open={dialogOpen}
        onCloseEnd={() => setDialogOpen(false)}
      />
    </>
  );
};
Base.args = baseArgs;
Base.play = openDialog;

export const Modal = (dialog: DialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Open dialog
      </Button>
      <Dialog
        {...dialog}
        open={dialogOpen}
        onCloseEnd={() => setDialogOpen(false)}
      />
    </>
  );
};
Modal.args = { ...baseArgs, isModal: true };
Modal.play = openDialog;
