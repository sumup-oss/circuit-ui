import React from 'react';
import styled from '@emotion/styled';
import { List, Text } from '@sumup/circuit-ui';

const Ordered = () => <List ordered>primary</List>;

const Unordered = () => <List unordered>Secondary</List>;

const RedList = styled(List)`
  color: red;
`;

const BlueList = styled(List)`
  color: blue;
`;

const BlueText = styled(Text)`
  color: blue;
`;

const Styled = () => (
  <>
    <RedList ordered>Ordered red</RedList>
    <BlueList unordered>Unordered blue</BlueList>
    <Text ordered>Text</Text>
    <BlueText unordered>Text blue</BlueText>
  </>
);
