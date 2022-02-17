import styled from '@emotion/styled';
import { Badge, Body, BodyLarge } from '@sumup/circuit-ui';

/**
 * Badge
 */
const BadgeComponent = () => (
  <>
    <Badge variant="confirm">success</Badge>
    <Badge variant="notify">warning</Badge>
    <Badge variant="alert">danger</Badge>
  </>
);

const RedBadge = styled(Badge)`
  // don't ever do this
  color: red;
`;
const BadgeComponentStyled = () => (
  <>
    <RedBadge variant="confirm">success</RedBadge>
    <RedBadge variant="notify">warning</RedBadge>
    <RedBadge variant="alert">danger</RedBadge>
  </>
);

/**
 * Body and BodyLarge
 */
const BodyComponent = () => (
  <>
    <Body variant="confirm">success</Body>
    <Body variant="alert">error</Body>
    <BodyLarge variant="confirm">success</BodyLarge>
    <BodyLarge variant="alert">error</BodyLarge>
  </>
);

const RedBody = styled(Body)`
  color: red;
`;
const RedBodyLarge = styled(BodyLarge)`
  color: red;
`;
const BodyComponentStyled = () => (
  <>
    <RedBody variant="confirm">success</RedBody>
    <RedBody variant="alert">error</RedBody>
    <RedBodyLarge variant="confirm">success</RedBodyLarge>
    <RedBodyLarge variant="alert">error</RedBodyLarge>
  </>
);
