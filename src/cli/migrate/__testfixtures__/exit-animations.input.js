import React from 'react';
import styled from '@emotion/styled';
import { LoadingButton } from '@sumup/circuit-ui';

const BaseLoadingButton = () => (
  <LoadingButton
    exitAnimation={LoadingButton.ERROR}
    onAnimationComplete={console.log}
    exitAnimationDuration={300}
  />
);

const RedLoadingButton = styled(LoadingButton)`
  color: red;
`;

const StyledLoadingButton = () => (
  <RedLoadingButton
    exitAnimation={LoadingButton.ERROR}
    onAnimationComplete={console.log}
    exitAnimationDuration={300}
  />
);
