import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import ModalConsumer, { ModalProvider } from '.';
import Button from '../Button';

const modalConfig = {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  children: ({ onClose }) => <div>Hello World!</div>,
  onClose: () => {
    // eslint-disable-next-line
    console.log('Modal closed');
  }
};

const PageWithModal = () => (
  <ModalProvider>
    <ModalConsumer>
      {({ setModal }) => (
        <Fragment>
          <div>This page can open a modal!</div>
          <Button
            type="button"
            onClick={() => {
              setModal(modalConfig);
            }}
          >
            Open modal
          </Button>
        </Fragment>
      )}
    </ModalConsumer>
  </ModalProvider>
);

storiesOf('Modal', module)
  .addDecorator(withTests('Modal'))
  .add('Default Modal', withInfo()(() => <PageWithModal />));
