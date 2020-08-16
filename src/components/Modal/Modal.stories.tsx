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

/** @jsx jsx */
import { MouseEvent, KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { action } from '@storybook/addon-actions';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';

import docs from './Modal.docs.mdx';
import { ModalWrapper, ModalHeader, ModalFooter } from './components';
import { ModalConsumer, ModalProvider } from './ModalContext';
import { Modal, ModalProps } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: { page: docs },
  },
};

/* eslint-disable react/display-name, react/prop-types */

const PageWithModal = (modal: ModalProps) => (
  <ModalProvider>
    <ModalConsumer>
      {({ setModal }) => (
        <Button
          type="button"
          onClick={() => {
            setModal(modal);
          }}
        >
          Open modal
        </Button>
      )}
    </ModalConsumer>
  </ModalProvider>
);

const defaultModal = {
  children: () => <ModalWrapper>Hello World!</ModalWrapper>,
  onClose: () => {},
};

export const Base = (args: ModalProps) => (
  <PageWithModal {...args} {...defaultModal} />
);

export const WithHeader = (args: ModalProps) => (
  <PageWithModal {...args} {...defaultModal}>
    {() => (
      <ModalWrapper>
        <ModalHeader title="A modal" />
        <Text>Some text in the modal body.</Text>
      </ModalWrapper>
    )}
  </PageWithModal>
);

export const WithoutCloseButton = (args: ModalProps) => (
  <PageWithModal {...args} {...defaultModal}>
    {() => (
      <ModalWrapper>
        <Text>Some text in the modal body.</Text>
      </ModalWrapper>
    )}
  </PageWithModal>
);

export const WithTitleAndCloseButton = (args: ModalProps) => (
  <PageWithModal {...args} {...defaultModal}>
    {({ onClose }) => (
      <ModalWrapper>
        <ModalHeader title="A modal" onClose={onClose} />
        <Text>Some text in the modal body.</Text>
      </ModalWrapper>
    )}
  </PageWithModal>
);

export const WithFooter = (args: ModalProps) => (
  <PageWithModal {...args} {...defaultModal}>
    {({ onClose }) => (
      <ModalWrapper>
        <ModalHeader title="A modal" />
        <Text>Some text in the modal body.</Text>
        <ModalFooter>
          <ButtonGroup>
            <Button
              variant="secondary"
              onClick={(event: MouseEvent | KeyboardEvent) => {
                action('Cancel button clicked')(event);
                onClose(event);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={(event: MouseEvent | KeyboardEvent) => {
                action('Confirm button clicked')(event);
                onClose(event);
              }}
            >
              Confirm
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalWrapper>
    )}
  </PageWithModal>
);

export const WithCustomStyles = (args: ModalProps) => {
  const Container = styled('div')`
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-wrap: nowrap;
    height: 100%;
    background: #fff;
  `;

  const LeftColumn = styled('div')`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: center;
    padding: 24px 18px;
  `;

  const RightColumn = styled('div')`
    height: 100%;
    width: 50%;
    background: no-repeat center / cover
      url('https://source.unsplash.com/S4W2AU0t3lw/900x1600');
  `;

  return (
    <PageWithModal
      {...args}
      {...defaultModal}
      css={css`
        padding: 0;
        height: 50vh;
      `}
    >
      {() => (
        <div
          css={css`
            padding: 0;
            height: 50vh;
          `}
        >
          <Container>
            <LeftColumn>
              <Text>A nice custom modal for special cases.</Text>
            </LeftColumn>
            <RightColumn />
          </Container>
        </div>
      )}
    </PageWithModal>
  );
};
