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

import React, { MouseEvent, KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { text } from '@storybook/addon-knobs';
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
    docs: { page: docs }
  }
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
  onClose: () => {}
};

export const base = () => (
  <PageWithModal
    {...defaultModal}
    tracking={{
      label: text('Tracking Label', 'trackingId')
    }}
  />
);

export const withHeader = () => (
  <PageWithModal {...defaultModal}>
    {() => (
      <ModalWrapper>
        <ModalHeader title="A modal" />
        <Text>Some text in the modal body.</Text>
      </ModalWrapper>
    )}
  </PageWithModal>
);

export const withoutCloseButton = () => (
  <PageWithModal {...defaultModal}>
    {() => (
      <ModalWrapper>
        <Text>Some text in the modal body.</Text>
      </ModalWrapper>
    )}
  </PageWithModal>
);

export const withTitleAndCloseButton = () => (
  <PageWithModal {...defaultModal}>
    {({ onClose }) => (
      <ModalWrapper>
        <ModalHeader title="A modal" onClose={onClose} />
        <Text>Some text in the modal body.</Text>
      </ModalWrapper>
    )}
  </PageWithModal>
);

export const withFooter = () => (
  <PageWithModal {...defaultModal}>
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

export const withCustomStyles = () => {
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
      url('https://source.unsplash.com/random');
  `;

  return (
    <PageWithModal
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
