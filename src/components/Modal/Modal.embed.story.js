import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import { ModalWrapper, ModalHeader, ModalFooter } from './components';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';

// eslint-disable-next-line react/prop-types
const ExampleWrap = ({ children }) => (
  <div style={{ width: '70vw', minWidth: '300px ' }}>{children}</div>
);

storiesOf(`${GROUPS.COMPONENTS}|Modal Embed`, module)
  .addDecorator(withTests('Modal'))
  .add(
    'Modal',
    withInfo()(() => (
      <ExampleWrap>
        <ModalWrapper>Hello World!</ModalWrapper>
      </ExampleWrap>
    ))
  )
  .add(
    'Modal with title',
    withInfo()(() => (
      <ExampleWrap>
        <ModalWrapper>
          <ModalHeader title="A title" />
          <Text>Hello world!</Text>
        </ModalWrapper>
      </ExampleWrap>
    ))
  )
  .add(
    'Modal without close button',
    withInfo()(() => (
      <ExampleWrap>
        <ModalWrapper>
          <Text>Some text in the modal body.</Text>
        </ModalWrapper>
      </ExampleWrap>
    ))
  )
  .add(
    'Modal with title and close button',
    withInfo()(() => (
      <ExampleWrap>
        <ModalWrapper>
          <ModalHeader title="A modal" onClose={action('onClose')} />
          <Text>Some text in the modal body.</Text>
        </ModalWrapper>
      </ExampleWrap>
    ))
  )
  .add(
    'Modal with footer buttons',
    withInfo()(() => (
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
    ))
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

      return (
        <ExampleWrap>
          <div className={cardClassName}>
            <Container>
              <LeftColumn>
                <Text>A nice custom modal for special cases.</Text>
              </LeftColumn>
              <RightColumn />
            </Container>
          </div>
        </ExampleWrap>
      );
    })
  );
