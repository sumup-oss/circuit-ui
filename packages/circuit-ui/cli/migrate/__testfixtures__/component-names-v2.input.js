import React from 'react';
import styled from '@emotion/styled';
import { ListView, SvgButton as SpecialButton } from '@sumup/circuit-ui';

const BaseListView = () => <ListView />;
const BaseListViewItem = () => <ListView.Item />;

const RedListView = styled(ListView)`
  color: red;
`;

const RedListViewItem = styled(ListView.Item)`
  color: red;
`;

const BaseSpecialButton = () => <SpecialButton />;

const RedSpecialButton = styled(SpecialButton)`
  color: red;
`;
