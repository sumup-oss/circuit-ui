import React from 'react';
import styled from '@emotion/styled';
import { InlineMessage } from '@sumup/circuit-ui';

const Warning = () => <InlineMessage type="warning">warning</InlineMessage>;
const Success = () => <InlineMessage type="success">success</InlineMessage>;
const Danger = () => <InlineMessage type="danger">danger</InlineMessage>;

const RedInlineMessage = styled(InlineMessage)`
  color: red;
`;

const Styled = () => (
  <RedInlineMessage type="danger">Styled Component</RedInlineMessage>
);
