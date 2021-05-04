import React from 'react';
import styled from '@emotion/styled';
import { Headline, SubHeadline, Body } from '@sumup/circuit-ui';

const BaseHeading = () => <Headline />;
const BaseSubHeading = () => <SubHeadline />;
const BodyText = () => <Body />;

const HeadingStyle = styled(Headline)`
  color: red;
`;

const StyledSubHeading = styled(SubHeadline)`
  color: blue;
`;

const StyledText = styled(Body)`
  color: blue;
  width: 66%;
`;
