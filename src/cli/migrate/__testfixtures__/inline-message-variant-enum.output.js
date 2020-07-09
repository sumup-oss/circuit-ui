import React from 'react';
import styled from '@emotion/styled';
import { InlineMessage } from '@sumup/circuit-ui';

const Warning = () => <InlineMessage variant="warning">warning</InlineMessage>;
const Success = () => <InlineMessage variant="success">success</InlineMessage>;
const Danger = () => <InlineMessage variant="danger">danger</InlineMessage>;

const RedInlineMessage = styled(InlineMessage)`
  color: red;
`;

const Styled = () => (
  <RedInlineMessage variant="danger">Styled Component</RedInlineMessage>
);
