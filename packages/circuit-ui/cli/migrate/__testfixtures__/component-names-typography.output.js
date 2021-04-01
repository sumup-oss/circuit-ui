import React from 'react';
import styled from '@emotion/styled';
import { Headline, SubHeadline } from '@sumup/circuit-ui';

const BaseHeading = () => <Headline />;
const BaseSubHeading = () => <SubHeadline />;

const HeadingStyle = styled(Headline)`
  color: red;
`;

const StyledSubHeading = styled(SubHeadline)`
  color: blue;
`;
