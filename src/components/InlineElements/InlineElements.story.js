import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import styled from 'react-emotion';

import withTests from '../../util/withTests';
import InlineElements from './InlineElements';

const Box = styled('div')`
  height: 42px;

  &:nth-of-type(n) {
    background-color: yellow;
  }

  &:nth-of-type(2n) {
    background-color: red;
  }
`;

const Container = styled('div')({
  width: '95vw',
  maxWidth: '600px',
  margin: '0 auto',
  border: '1px solid green',
  padding: '12px'
});

storiesOf('InlineElements', module)
  .addDecorator(withTests('InlineElements'))
  .add(
    'Two InlineElements',
    withInfo()(() => (
      <Container>
        <InlineElements>
          <Box />
          <Box />
        </InlineElements>
      </Container>
    ))
  )
  .add(
    'Three InlineElements',
    withInfo()(() => (
      <Container>
        <InlineElements>
          <Box />
          <Box />
          <Box />
        </InlineElements>
      </Container>
    ))
  )
  .add(
    'Three InlineElements stacked on mobile',
    withInfo()(() => (
      <Container>
        <InlineElements inlineMobile>
          <Box />
          <Box />
          <Box />
        </InlineElements>
      </Container>
    ))
  );
