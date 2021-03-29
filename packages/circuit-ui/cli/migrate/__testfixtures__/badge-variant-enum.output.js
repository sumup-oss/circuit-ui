import React from 'react';
import styled from '@emotion/styled';
import { Badge } from '@sumup/circuit-ui';

const Primary = () => <Badge variant="primary">primary</Badge>;
const Neutral = () => <Badge variant="neutral">neutral</Badge>;
const Warning = () => <Badge variant="warning">warning</Badge>;
const Success = () => <Badge variant="success">success</Badge>;
const Danger = () => <Badge variant="danger">danger</Badge>;

const RedBadge = styled(Badge)`
  color: red;
`;

const Styled = () => <RedBadge variant="danger">Styled</RedBadge>;
