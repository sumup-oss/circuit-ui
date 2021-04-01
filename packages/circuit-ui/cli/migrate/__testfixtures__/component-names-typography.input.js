import React from 'react';
import styled from '@emotion/styled';
import { Heading, SubHeading } from '@sumup/circuit-ui';

const BaseHeading = () => <Heading />;
const BaseSubHeading = () => <SubHeading />;

const HeadingStyle = styled(Heading)`
  color: red;
`;

const StyledSubHeading = styled(SubHeading)`
  color: blue;
`;
