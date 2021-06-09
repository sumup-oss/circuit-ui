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

import { MouseEvent, KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Body from '../Body';
import { ModalProvider } from '../ModalContext';

import docs from './Modal.docs.mdx';
import { ModalWrapper, ModalHeader, ModalFooter } from './components';
import { Modal, ModalProps } from './Modal';
import { useModal } from './useModal';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: { page: docs },
  },
};

export const Base = (modal: ModalProps): JSX.Element => {
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
  children: () => <ModalWrapper>Hello World!</ModalWrapper>,
};

export const Multiple = (modal: ModalProps) => {
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

const NestedModal = () => {
  const { setModal } = useModal();
  return (
    <ModalWrapper>
      <Button
        type="button"
        onClick={() => setModal({ children: () => <NestedModal /> })}
      >
        Open another modal
      </Button>
    </ModalWrapper>
  );
};

Multiple.args = {
  children: () => <NestedModal />,
};

// export const WithHeader = (args: ModalProps) => (
//   <PageWithModal {...args} {...defaultModal}>
//     {() => (
//       <ModalWrapper>
//         <ModalHeader title="A modal" />
//         <Body>Some text in the modal body.</Body>
//       </ModalWrapper>
//     )}
//   </PageWithModal>
// );

// export const WithoutCloseButton = (args: ModalProps) => (
//   <PageWithModal {...args} {...defaultModal}>
//     {() => (
//       <ModalWrapper>
//         <Body>Some text in the modal body.</Body>
//       </ModalWrapper>
//     )}
//   </PageWithModal>
// );

// export const WithTitleAndCloseButton = (args: ModalProps) => (
//   <PageWithModal {...args} {...defaultModal}>
//     {({ onClose }) => (
//       <ModalWrapper>
//         <ModalHeader title="A modal" onClose={onClose} />
//         <Body>Some text in the modal body.</Body>
//       </ModalWrapper>
//     )}
//   </PageWithModal>
// );

// export const WithFooter = (args: ModalProps) => (
//   <PageWithModal {...args} {...defaultModal}>
//     {({ onClose }) => (
//       <ModalWrapper>
//         <ModalHeader title="A modal" />
//         <Body>Some text in the modal body.</Body>
//         <ModalFooter>
//           <ButtonGroup>
//             <Button
//               variant="secondary"
//               onClick={(event: MouseEvent | KeyboardEvent) => {
//                 action('Cancel button clicked')(event);
//                 onClose(event);
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="primary"
//               onClick={(event: MouseEvent | KeyboardEvent) => {
//                 action('Confirm button clicked')(event);
//                 onClose(event);
//               }}
//             >
//               Confirm
//             </Button>
//           </ButtonGroup>
//         </ModalFooter>
//       </ModalWrapper>
//     )}
//   </PageWithModal>
// );

// export const WithCustomStyles = (args: ModalProps) => {
//   const Container = styled('div')`
//     display: flex;
//     justify-content: stretch;
//     align-items: stretch;
//     flex-wrap: nowrap;
//     height: 100%;
//     background: #fff;
//   `;

//   const LeftColumn = styled('div')`
//     display: flex;
//     align-items: center;
//     width: 50%;
//     justify-content: center;
//     padding: 24px 18px;
//   `;

//   const RightColumn = styled('div')`
//     height: 100%;
//     width: 50%;
//     background: no-repeat center / cover
//       url('https://source.unsplash.com/S4W2AU0t3lw/900x1600');
//   `;

//   return (
//     <PageWithModal
//       {...args}
//       {...defaultModal}
//       css={css`
//         padding: 0;
//         height: 50vh;
//       `}
//     >
//       {() => (
//         <div
//           css={css`
//             padding: 0;
//             height: 50vh;
//           `}
//         >
//           <Container>
//             <LeftColumn>
//               <Body>A nice custom modal for special cases.</Body>
//             </LeftColumn>
//             <RightColumn />
//           </Container>
//         </div>
//       )}
//     </PageWithModal>
//   );
// };
