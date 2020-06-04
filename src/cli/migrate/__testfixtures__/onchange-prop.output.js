import React from 'react';
import styled from '@emotion/styled';
import { RadioButton, Switch } from '@sumup/circuit-ui';

const BaseRadioButton = () => <RadioButton onChange={console.log} checked />;

const RedRadioButton = styled(RadioButton)`
  color: red;
`;

const StyledRadioButton = () => (
  <RedRadioButton onChange={console.log} checked />
);

const BaseSwitch = () => <Switch onChange={console.log} checked />;

const RedSwitch = styled(Switch)`
  color: red;
`;

const StyledSwitch = () => <RedSwitch onChange={console.log} checked />;
