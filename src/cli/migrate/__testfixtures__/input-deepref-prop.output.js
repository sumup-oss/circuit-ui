import React, { useRef, Fragment } from 'react';
import styled from '@emotion/styled';
import { Input, TextArea } from '@sumup/circuit-ui';

const Form = () => {
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);
  return (
    <Fragment>
      <Input ref={inputRef} />
      <TextArea ref={textAreaRef} />
    </Fragment>
  );
};

const RedInput = styled(Input)`
  color: red;
`;

const RedTextArea = styled(TextArea)`
  color: red;
`;

const RedForm = () => {
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);
  return (
    <Fragment>
      <RedInput ref={inputRef} />
      <RedTextArea ref={textAreaRef} />
    </Fragment>
  );
};
