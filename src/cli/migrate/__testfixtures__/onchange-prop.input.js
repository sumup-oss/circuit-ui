import React from 'react';
import styled from '@emotion/styled';
import { RadioButton, Switch } from '@sumup/circuit-ui';

const BaseRadioButton = () => <RadioButton onToggle={console.log} checked />;

const RedRadioButton = styled(RadioButton)`
  color: red;
`;

const StyledRadioButton = () => (
  <RedRadioButton onToggle={console.log} checked />
);

const BaseSwitch = () => <Switch onToggle={console.log} checked />;

const RedSwitch = styled(Switch)`
  color: red;
`;

const StyledSwitch = () => <RedSwitch onToggle={console.log} checked />;
