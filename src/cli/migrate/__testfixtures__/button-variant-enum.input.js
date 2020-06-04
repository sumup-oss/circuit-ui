import React from 'react';
import styled from '@emotion/styled';
import { Button, LoadingButton, Text } from '@sumup/circuit-ui';

const Primary = () => <Button primary>primary</Button>;

const Secondary = () => <Button secondary>Secondary</Button>;

const RedButton = styled(Button)`
  color: red;
`;

const BlueButton = styled(Button)`
  color: blue;
`;

const BlueText = styled(Text)`
  color: blue;
`;

const Styled = () => (
  <>
    <RedButton secondary>Secondary red</RedButton>
    <BlueButton primary>Primary blue</BlueButton>
    <Text secondary>Text</Text>
    <BlueText secondary>Text blue</BlueText>
  </>
);

const Flat = () => <Button flat>Flat</Button>;

const Loading = () => (
  <LoadingButton secondary>Secondary Loading Button</LoadingButton>
);
