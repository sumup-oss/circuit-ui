import React from 'react';
import styled from '@emotion/styled';
import {
  Button,
  IconButton,
  LoadingButton,
  CloseButton,
} from '@sumup/circuit-ui';

const Large = () => <Button size="mega">large</Button>;
const LargeIconButton = () => <IconButton size="mega">large</IconButton>;
const LargeLoadingButton = () => (
  <LoadingButton size="mega">large</LoadingButton>
);
const LargeCloseButton = () => <CloseButton size="mega">large</CloseButton>;
const Small = () => <Button size="kilo">small</Button>;

const RedButton = styled(Button)`
  color: red;
`;

const Styled = () => <RedButton size="mega">red</RedButton>;
