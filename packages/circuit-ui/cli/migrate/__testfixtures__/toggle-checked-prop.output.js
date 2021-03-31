import React from 'react';
import styled from '@emotion/styled';
import { Toggle } from '@sumup/circuit-ui';

const Form = () => (
  <Toggle
    label="This is a test toggle"
    checked={false}
    labelChecked="on"
    labelUnchecked="off"
  />
);

const RedToggle = styled(Toggle)`
  color: red;
`;

const RedForm = () => (
  <RedToggle
    label="This is a test toggle"
    checked={false}
    labelChecked="on"
    labelUnchecked="off"
  />
);
