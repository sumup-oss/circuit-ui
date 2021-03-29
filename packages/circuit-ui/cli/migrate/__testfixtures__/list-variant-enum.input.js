import React from 'react';
import styled from '@emotion/styled';
import { List, Text } from '@sumup/circuit-ui';

const Base = () => (
  <>
    <List ordered>primary</List>
    <List unordered>Secondary</List>
    <List unordered={!true}>Secondary</List>
  </>
);

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
