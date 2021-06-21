import React from 'react';
import styled from '@emotion/styled';
import { Button, IconButton } from '@sumup/circuit-ui';

const Large = () => <Button size="mega">large</Button>;
const LargeIconButton = () => <IconButton size="mega">large</IconButton>;
const Small = () => <Button size="kilo">small</Button>;

const RedButton = styled(Button)`
  color: red;
`;

const Styled = () => <RedButton size="mega">red</RedButton>;
