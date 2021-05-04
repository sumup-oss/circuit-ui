import React from 'react';
import styled from '@emotion/styled';
import { Heading, SubHeading, Text } from '@sumup/circuit-ui';

const BaseHeading = () => <Heading />;
const BaseSubHeading = () => <SubHeading />;
const BodyText = () => <Text />;

const HeadingStyle = styled(Heading)`
  color: red;
`;

const StyledSubHeading = styled(SubHeading)`
  color: blue;
`;

const StyledText = styled(Text)`
  color: blue;
  width: 66%;
`;
