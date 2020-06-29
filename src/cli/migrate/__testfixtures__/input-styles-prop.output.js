import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Input, TextArea } from '@sumup/circuit-ui';

const Form = () => (
  <>
    <Input
      labelStyles={theme => css`
        color: red;
      `}
    />
    <TextArea
      labelStyles={theme => css`
        color: red;
      `}
    />
  </>
);

const RedInput = styled(Input)`
  color: red;
`;

const RedTextArea = styled(TextArea)`
  color: red;
`;

const RedForm = () => (
  <>
    <RedInput
      labelStyles={theme => css`
        color: red;
      `}
    />
    <RedTextArea
      labelStyles={theme => css`
        color: red;
      `}
    />
  </>
);
