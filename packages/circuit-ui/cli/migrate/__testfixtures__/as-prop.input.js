import React from 'react';
import styled from '@emotion/styled';
import { Heading, SubHeading, Text, Input } from '@sumup/circuit-ui';

const BaseHeading = () => <Heading element="h1" />;

const RedHeading = styled(Heading)`
  color: red;
`;

const StyledHeading = () => <RedHeading element="h1" />;

const BaseSubHeading = () => <SubHeading element="h1" />;

const RedSubHeading = styled(SubHeading)`
  color: red;
`;

const StyledSubHeading = () => <RedSubHeading element="h1" />;

const BaseText = () => <Text element="h1" />;

const RedText = styled(Text)`
  color: red;
`;

const StyledText = () => <RedText element="h1" />;

const BaseInput = () => <Input element="h1" />;

const RedInput = styled(Input)`
  color: red;
`;

const StyledInput = () => <RedInput element="h1" />;
