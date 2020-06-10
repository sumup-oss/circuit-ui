import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Input } from '@sumup/circuit-ui';

const Form = () => (
  <Input
    labelStyles={css`
      color: blue;
    `}
  />
);

const RedInput = styled(Input)`
  color: red;
`;

const RedForm = () => (
  <RedInput
    labelStyles={css`
      color: blue;
    `}
  />
);
