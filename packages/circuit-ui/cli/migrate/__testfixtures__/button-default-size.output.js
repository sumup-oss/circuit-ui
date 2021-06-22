import React from 'react';
import styled from '@emotion/styled';
import {
  Button,
  IconButton,
  LoadingButton,
  CloseButton,
} from '@sumup/circuit-ui';

const Large = () => <Button size="giga">large</Button>;
const LargeIconButton = () => <IconButton size="giga">large</IconButton>;
const LargeLoadingButton = () => (
  <LoadingButton size="giga">large</LoadingButton>
);
const LargeCloseButton = () => <CloseButton size="giga">large</CloseButton>;
const Small = () => <Button size="kilo">small</Button>;

const RedButton = styled(Button)`
  color: red;
`;

const Styled = () => <RedButton size="giga">red</RedButton>;
