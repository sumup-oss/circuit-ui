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

import { ModalWrapper, ModalHeader, ModalFooter } from './components';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';

// eslint-disable-next-line react/prop-types
const ExampleWrap = ({ children }) => (
  <div style={{ width: '70vw', minWidth: '300px ' }}>{children}</div>
);

export default {
  title: 'Components|Modal Embed',

  parameters: {
    jest: ['Modal']
  }
};

export const modal = () => (
  <ExampleWrap>
    <ModalWrapper>Hello World!</ModalWrapper>
  </ExampleWrap>
);

modal.story = {
  name: 'Modal'
};

export const modalWithTitle = () => (
  <ExampleWrap>
    <ModalWrapper>
      <ModalHeader title="A title" />
      <Text>Hello world!</Text>
    </ModalWrapper>
  </ExampleWrap>
);

modalWithTitle.story = {
  name: 'Modal with title'
};

export const modalWithoutCloseButton = () => (
  <ExampleWrap>
    <ModalWrapper>
      <Text>Some text in the modal body.</Text>
    </ModalWrapper>
  </ExampleWrap>
);

modalWithoutCloseButton.story = {
  name: 'Modal without close button'
};

export const modalWithTitleAndCloseButton = () => (
  <ExampleWrap>
    <ModalWrapper>
      <ModalHeader title="A modal" onClose={action('onClose')} />
      <Text>Some text in the modal body.</Text>
    </ModalWrapper>
  </ExampleWrap>
);

modalWithTitleAndCloseButton.story = {
  name: 'Modal with title and close button'
};

export const modalWithFooterButtons = () => (
  <ExampleWrap>
    <ModalWrapper>
      <ModalHeader title="A modal" />
      <Text>Some text in the modal body.</Text>
      <ModalFooter>
        <ButtonGroup>
          <Button secondary onClick={action('Cancel button clicked')}>
            Cancel
          </Button>
          <Button primary onClick={action('Confirm button clicked')}>
            Confirm
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </ModalWrapper>
  </ExampleWrap>
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

  return (
    <ExampleWrap>
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
    </ExampleWrap>
  );
};

modalWithCardStylesOverride.story = {
  name: 'Modal with Card styles override'
};
