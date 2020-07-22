import React from 'react';
import styled from '@emotion/styled';
import { RadioButton, Switch, Toggle } from '@sumup/circuit-ui';

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

const BaseToggle = () => <Toggle onChange={console.log} checked />;

const RedToggle = styled(Toggle)`
  color: red;
`;

const StyledToggle = () => <RedToggle onChange={console.log} checked />;
