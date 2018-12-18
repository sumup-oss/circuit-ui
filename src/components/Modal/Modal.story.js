import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
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

storiesOf(`${GROUPS.COMPONENTS}|Modal`, module)
  .addDecorator(withTests('Modal'))
  .add('Modal', withInfo()(() => <PageWithModal modal={defaultModal} />))
  .add(
    'Modal with title',
    withInfo()(() => {
      const modalWithTitle = {
        ...defaultModal,
        children: () => (
          <ModalWrapper>
            <ModalHeader title="A modal" />
            <Text>Some text in the modal body.</Text>
          </ModalWrapper>
        )
      };
      return <PageWithModal modal={modalWithTitle} />;
    })
  )
  .add(
    'Modal without close button',
    withInfo()(() => {
      const modalWithTitleAndCloser = {
        ...defaultModal,
        children: () => (
          <ModalWrapper>
            <Text>Some text in the modal body.</Text>
          </ModalWrapper>
        )
      };
      return <PageWithModal modal={modalWithTitleAndCloser} />;
    })
  )
  .add(
    'Modal with title and close button',
    withInfo()(() => {
      const modalWithTitle = {
        ...defaultModal,
        children: ({ onClose }) => (
          <ModalWrapper>
            <ModalHeader title="A modal" onClose={onClose} />
            <Text>Some text in the modal body.</Text>
          </ModalWrapper>
        )
      };
      return <PageWithModal modal={modalWithTitle} />;
    })
  )
  .add(
    'Modal with footer buttons',
    withInfo()(() => {
      const modalWithTitle = {
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
      };
      return <PageWithModal modal={modalWithTitle} />;
    })
  )
  .add(
    'Modal with Card styles override',
    withInfo()(() => {
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
      const modalWithTitle = {
        ...defaultModal,
        className: cardClassName,
        hasCloseButton: false,
        children: () => (
          <div className={cardClassName}>
            <Container>
              <LeftColumn>
                <Text>A nice custom modal for special cases.</Text>
              </LeftColumn>
              <RightColumn />
            </Container>
          </div>
        )
      };
      return <PageWithModal modal={modalWithTitle} />;
    })
  );
