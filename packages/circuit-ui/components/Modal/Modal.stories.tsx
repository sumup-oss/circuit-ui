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

/* eslint-disable react/display-name */
import { Fragment } from 'react';
import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import { Stack } from '../../../../.storybook/components';
import Button from '../Button';
import Headline from '../Headline';
import Body from '../Body';
import Image from '../Image';
import { ModalProvider } from '../ModalContext';
import { spacing } from '../../styles/style-mixins';

import docs from './Modal.docs.mdx';
import { Modal, ModalProps, useModal } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  subcomponents: { ModalProvider },
  parameters: {
    docs: { page: docs },
  },
};

const defaultModalChildren = () => (
  <Fragment>
    <Headline as="h2" size="four" noMargin css={spacing({ bottom: 'giga' })}>
      Hello World!
    </Headline>
    <Body>I am a modal.</Body>
  </Fragment>
);

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
  children: defaultModalChildren,
  variant: 'contextual',
  closeButtonLabel: 'Close modal',
};

export const Variants = (modal: ModalProps): JSX.Element => {
  const ComponentWithModal = ({ variant }: Pick<ModalProps, 'variant'>) => {
    const { setModal } = useModal();

    return (
      <Button type="button" onClick={() => setModal({ ...modal, variant })}>
        Open {variant} modal
      </Button>
    );
  };
  return (
    <ModalProvider>
      <Stack>
        <ComponentWithModal variant="contextual" />
        <ComponentWithModal variant="immersive" />
      </Stack>
    </ModalProvider>
  );
};

Variants.args = {
  children: defaultModalChildren,
  closeButtonLabel: 'Close modal',
};

export const PreventClose = (modal: ModalProps): JSX.Element => {
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

PreventClose.args = {
  children: ({ onClose }: { onClose: ModalProps['onClose'] }) => (
    <Fragment>
      <Headline as="h2" size="four" noMargin css={spacing({ bottom: 'giga' })}>
        Complete the action
      </Headline>
      <Body css={spacing({ bottom: 'giga' })}>
        Users have to complete the action inside the modal to close it. The
        close button is hidden and clicking outside the modal or pressing the
        escape key does not close the modal either.
      </Body>
      <Button variant="primary" onClick={onClose}>
        Close modal
      </Button>
    </Fragment>
  ),
  variant: 'immersive',
  preventClose: true,
};

export const InitiallyOpen = (modal: ModalProps): JSX.Element => {
  const initialModal = { id: 'initial', component: Modal, ...modal };
  return (
    <ModalProvider initialState={[initialModal]}>
      <div />
    </ModalProvider>
  );
};

InitiallyOpen.args = {
  children: defaultModalChildren,
  variant: 'contextual',
  closeButtonLabel: 'Close modal',
};

export const CustomStyles = (modal: ModalProps): JSX.Element => {
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

CustomStyles.args = {
  children: () => (
    <Fragment>
      <Image
        src="/images/illustration-waves.jpg"
        alt=""
        css={(theme: Theme) =>
          css`
            border-top-left-radius: ${theme.borderRadius.mega};
            border-top-right-radius: ${theme.borderRadius.mega};
          `
        }
      />
      <Headline as="h2" size="four" css={spacing('giga')} noMargin>
        Custom styles
      </Headline>
      <Body css={spacing('giga')}>
        Custom styles can be applied using the <code>css</code> prop.
      </Body>
    </Fragment>
  ),
  css: (theme: Theme) => css`
    ${theme.mq.untilKilo} {
      padding: 0;
    }
    ${theme.mq.kilo} {
      padding: 0;
    }
  `,
  variant: 'contextual',
  closeButtonLabel: 'Close modal',
};
