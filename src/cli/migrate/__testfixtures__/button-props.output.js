import React from 'react';
import styled from '@emotion/styled';
import { Button, LoadingButton, Text } from '@sumup/circuit-ui';

const Primary = () => <Button variant="primary">primary</Button>;

const Secondary = () => <Button variant="secondary">Secondary</Button>;

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
    <RedButton variant="secondary">Secondary red</RedButton>
    <BlueButton variant="primary">Primary blue</BlueButton>
    <Text secondary>Text</Text>
    <BlueText secondary>Text blue</BlueText>
  </>
);

const Flat = () => <Button variant="secondary">Flat</Button>;

const Loading = () => (
  <LoadingButton variant="secondary">Secondary Loading Button</LoadingButton>
);
