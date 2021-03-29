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
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { action } from '@storybook/addon-actions';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';

import { ModalHeader, ModalFooter } from './components';
import {
  ModalWrapper,
  ModalWrapperProps,
} from './components/ModalWrapper/ModalWrapper';

export default {
  title: 'Components/Modal/Embedded',
  component: ModalWrapper,
};

export const Base = (args: ModalWrapperProps) => (
  <ModalWrapper {...args}>Hello World!</ModalWrapper>
);

export const WithTitle = (args: ModalWrapperProps) => (
  <ModalWrapper {...args}>
    <ModalHeader title="A title" />
    <Text>Hello world!</Text>
  </ModalWrapper>
);

export const WithoutCloseButton = (args: ModalWrapperProps) => (
  <ModalWrapper {...args}>
    <Text>Some text in the modal body.</Text>
  </ModalWrapper>
);

export const WithTitleAndCloseButton = (args: ModalWrapperProps) => (
  <ModalWrapper {...args}>
    <ModalHeader title="A modal" onClose={action('onClose')} />
    <Text>Some text in the modal body.</Text>
  </ModalWrapper>
);

export const WithFooter = (args: ModalWrapperProps) => (
  <ModalWrapper {...args}>
    <ModalHeader title="A modal" />
    <Text>Some text in the modal body.</Text>
    <ModalFooter>
      <ButtonGroup>
        <Button variant="secondary" onClick={action('Cancel button clicked')}>
          Cancel
        </Button>
        <Button variant="primary" onClick={action('Confirm button clicked')}>
          Confirm
        </Button>
      </ButtonGroup>
    </ModalFooter>
  </ModalWrapper>
);

export const WithCustomStyles = (args: ModalWrapperProps) => {
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
      url('https://source.unsplash.com/9K9ipjhDdks/900x1600');
  `;

  return (
    <ModalWrapper
      {...args}
      css={css`
        width: 100%;
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
    </ModalWrapper>
  );
};
