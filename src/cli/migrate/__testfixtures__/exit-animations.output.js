import React from 'react';
import styled from '@emotion/styled';
import { LoadingButton } from '@sumup/circuit-ui';

const BaseLoadingButton = () => (
  <LoadingButton />
);

const RedLoadingButton = styled(LoadingButton)`
  color: red;
`;

const StyledLoadingButton = () => (
  <RedLoadingButton />
);
