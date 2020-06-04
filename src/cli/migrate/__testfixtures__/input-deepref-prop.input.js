import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Input } from '@sumup/circuit-ui';

const Form = () => {
  const ref = useRef(null);
  return <Input deepRef={ref} />;
};

const RedInput = styled(Input)`
  color: red;
`;

const RedForm = () => {
  const ref = useRef(null);
  return <RedInput deepRef={ref} />;
};
