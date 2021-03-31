import React from 'react';
import styled from '@emotion/styled';
import { CardList, IconButton as SpecialButton } from '@sumup/circuit-ui';

const BaseListView = () => <CardList />;
const BaseListViewItem = () => <CardList.Item />;

const RedListView = styled(CardList)`
  color: red;
`;

const RedListViewItem = styled(CardList.Item)`
  color: red;
`;

const BaseSpecialButton = () => <SpecialButton />;

const RedSpecialButton = styled(SpecialButton)`
  color: red;
`;
