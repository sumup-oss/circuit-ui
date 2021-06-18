import styled from '@emotion/styled';
import {
  Headline,
  SubHeadline,
  Body,
  NotificationCard,
} from '@sumup/circuit-ui';

const BaseHeading = () => <Headline />;
const BaseSubHeading = () => <SubHeadline />;
const BodyText = () => <Body />;
const BaseNotificationBanner = () => <NotificationCard />;

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

const RedNotificationBanner = styled(NotificationCard)`
  color: red;
`;
