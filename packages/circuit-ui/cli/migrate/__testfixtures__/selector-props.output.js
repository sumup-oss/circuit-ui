import React from 'react';
import styled from '@emotion/styled';
import { Selector } from '@sumup/circuit-ui';

const BaseSelector = () => <Selector onChange={console.log} checked />;

const RedSelector = styled(Selector)`
  color: red;
`;

const StyledSelector = () => <RedSelector onChange={console.log} checked />;
