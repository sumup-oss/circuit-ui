import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import styled, { css } from 'react-emotion';

import withTests from '../../util/withTests';
import Modal, { ModalProvider } from '.';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';

// eslint-disable-next-line react/prop-types
const PageWithModal = ({ modal }) => (
  <ModalProvider>
    <Modal>
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
    </Modal>
  </ModalProvider>
);

const defaultModal = {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  children: () => <div>Hello World!</div>,
  onClose: e => {
    action('Modal closed')(e);
  }
};

storiesOf('Modal', module)
  .addDecorator(withTests('Modal'))
  .add('Modal', withInfo()(() => <PageWithModal modal={defaultModal} />))
  .add(
    'Modal with title',
    withInfo()(() => {
      const modalWithTitle = {
        ...defaultModal,
        title: 'A modal',
        children: () => <Text>Some text in the modal body.</Text>
      };
      return <PageWithModal modal={modalWithTitle} />;
    })
  )
  .add(
    'Modal without close button',
    withInfo()(() => {
      const modalWithTitleAndCloser = {
        ...defaultModal,
        hasCloseButton: false,
        // eslint-disable-next-line react/prop-types
        children: () => <Text>Some text in the modal body.</Text>
      };
      return <PageWithModal modal={modalWithTitleAndCloser} />;
    })
  )
  .add(
    'Modal with title and close button',
    withInfo()(() => {
      const modalWithTitle = {
        ...defaultModal,
        title: 'A modal',
        // eslint-disable-next-line react/prop-types
        children: () => <Text>Some text in the modal body.</Text>
      };
      return <PageWithModal modal={modalWithTitle} />;
    })
  )
  .add(
    'Modal with footer buttons',
    withInfo()(() => {
      const modalWithTitle = {
        ...defaultModal,
        title: 'A modal',
        // eslint-disable-next-line react/prop-types
        buttons: ({ onClose }) => (
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
        ),
        children: () => <Text>Some text in the modal body.</Text>
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
          <Container>
            <LeftColumn>
              <Text>A nice custom modal for special cases.</Text>
            </LeftColumn>
            <RightColumn />
          </Container>
        )
      };
      return <PageWithModal modal={modalWithTitle} />;
    })
  );
