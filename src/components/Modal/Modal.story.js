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
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';

import { ModalConsumer, ModalProvider } from '.';
import { ModalWrapper, ModalHeader, ModalFooter } from './components';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';

/* eslint-disable react/display-name, react/prop-types */

const PageWithModal = ({ modal }) => (
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
  onClose: e => {
    action('Modal closed')(e);
  }
};

export default {
  title: 'Components|Modal',

  parameters: {
    jest: ['Modal']
  }
};

export const modal = () => <PageWithModal modal={defaultModal} />;

modal.story = {
  name: 'Modal'
};

export const modalWithTitle = () => (
  <PageWithModal
    modal={{
      ...defaultModal,
      children: () => (
        <ModalWrapper>
          <ModalHeader title="A modal" />
          <Text>Some text in the modal body.</Text>
        </ModalWrapper>
      )
    }}
  />
);

modalWithTitle.story = {
  name: 'Modal with title'
};

export const modalWithoutCloseButton = () => {
  const modalWithTitleAndCloser = {
    ...defaultModal,
    children: () => (
      <ModalWrapper>
        <Text>Some text in the modal body.</Text>
      </ModalWrapper>
    )
  };
  return <PageWithModal modal={modalWithTitleAndCloser} />;
};

modalWithoutCloseButton.story = {
  name: 'Modal without close button'
};

export const modalWithTitleAndCloseButton = () => (
  <PageWithModal
    modal={{
      ...defaultModal,
      children: ({ onClose }) => (
        <ModalWrapper>
          <ModalHeader title="A modal" onClose={onClose} />
          <Text>Some text in the modal body.</Text>
        </ModalWrapper>
      )
    }}
  />
);

modalWithTitleAndCloseButton.story = {
  name: 'Modal with title and close button'
};

export const modalWithFooterButtons = () => (
  <PageWithModal
    modal={{
      ...defaultModal,
      children: ({ onClose }) => (
        <ModalWrapper>
          <ModalHeader title="A modal" />
          <Text>Some text in the modal body.</Text>
          <ModalFooter>
            <ButtonGroup>
              <Button
                secondary
                onClick={e => {
                  action('Cancel button clicked')(e);
                  onClose(e);
                }}
              >
                Cancel
              </Button>
              <Button
                primary
                onClick={e => {
                  action('Confirm button clicked')(e);
                  onClose(e);
                }}
              >
                Confirm
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalWrapper>
      )
    }}
  />
);

modalWithFooterButtons.story = {
  name: 'Modal with footer buttons'
};

export const modalWithCardStylesOverride = () => {
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

  const cardClassName = css`
    padding: 0;
    height: 50vh;
  `;
  return (
    <PageWithModal
      modal={{
        ...defaultModal,
        className: cardClassName,
        hasCloseButton: false,
        children: () => (
          <div css={cardClassName}>
            <Container>
              <LeftColumn>
                <Text>A nice custom modal for special cases.</Text>
              </LeftColumn>
              <RightColumn />
            </Container>
          </div>
        )
      }}
    />
  );
};

modalWithCardStylesOverride.story = {
  name: 'Modal with Card styles override'
};
