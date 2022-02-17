import styled from '@emotion/styled';
import { Badge, Body, BodyLarge } from '@sumup/circuit-ui';

/**
 * Badge
 */
const BadgeComponent = () => (
  <>
    <Badge variant="success">success</Badge>
    <Badge variant="warning">warning</Badge>
    <Badge variant="danger">danger</Badge>
  </>
);

const RedBadge = styled(Badge)`
  // don't ever do this
  color: red;
`;
const BadgeComponentStyled = () => (
  <>
    <RedBadge variant="success">success</RedBadge>
    <RedBadge variant="warning">warning</RedBadge>
    <RedBadge variant="danger">danger</RedBadge>
  </>
);

/**
 * Body and BodyLarge
 */
const BodyComponent = () => (
  <>
    <Body variant="success">success</Body>
    <Body variant="error">error</Body>
    <BodyLarge variant="success">success</BodyLarge>
    <BodyLarge variant="error">error</BodyLarge>
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
    <RedBody variant="success">success</RedBody>
    <RedBody variant="error">error</RedBody>
    <RedBodyLarge variant="success">success</RedBodyLarge>
    <RedBodyLarge variant="error">error</RedBodyLarge>
  </>
);
