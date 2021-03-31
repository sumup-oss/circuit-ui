import React from 'react';
import styled from '@emotion/styled';
import { Selector } from '@sumup/circuit-ui';

const BaseSelector = () => <Selector onClick={console.log} selected />;

const RedSelector = styled(Selector)`
  color: red;
`;

const StyledSelector = () => <RedSelector onClick={console.log} selected />;
