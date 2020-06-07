import React from 'react';
import styled from '@emotion/styled';
import { Heading, SubHeading, Text, Input } from '@sumup/circuit-ui';

const BaseHeading = () => <Heading as="h1" />;

const RedHeading = styled(Heading)`
  color: red;
`;

const StyledHeading = () => <RedHeading as="h1" />;

const BaseSubHeading = () => <SubHeading as="h1" />;

const RedSubHeading = styled(SubHeading)`
  color: red;
`;

const StyledSubHeading = () => <RedSubHeading as="h1" />;

const BaseText = () => <Text as="h1" />;

const RedText = styled(Text)`
  color: red;
`;

const StyledText = () => <RedText as="h1" />;

const BaseInput = () => <Input as="h1" />;

const RedInput = styled(Input)`
  color: red;
`;

const StyledInput = () => <RedInput as="h1" />;
