import React from 'react';
import styled from '@emotion/styled';
import { Badge } from '@sumup/circuit-ui';

const Primary = () => <Badge color="primary">primary</Badge>;
const Neutral = () => <Badge color="neutral">neutral</Badge>;
const Warning = () => <Badge color="warning">warning</Badge>;
const Success = () => <Badge color="success">success</Badge>;
const Danger = () => <Badge color="danger">danger</Badge>;

const RedBadge = styled(Badge)`
  color: red;
`;

const Styled = () => <RedBadge color="danger">Styled</RedBadge>;
