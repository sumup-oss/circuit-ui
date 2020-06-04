import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Input } from '@sumup/circuit-ui';

const Form = () => {
  const ref = useRef(null);
  return <Input ref={ref} />;
};

const RedInput = styled(Input)`
  color: red;
`;

const RedForm = () => {
  const ref = useRef(null);
  return <RedInput ref={ref} />;
};
