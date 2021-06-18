import styled from '@emotion/styled';
import { Body, Text } from '@sumup/circuit-ui';

const BoldBody = () => (
  <>
    <Body variant="highlight">bold</Body>
    <Body bold={!true}>bold</Body>
  </>
);

const BoldText = () => (
  <>
    <Text variant="highlight">bold</Text>
    <Text bold={!true}>bold</Text>
  </>
);

const RedBody = styled(Body)`
  color: red;
`;

const RedText = styled(Text)`
  color: red;
`;

const Styled = () => (
  <>
    <RedBody variant="highlight">bold body</RedBody>
    <RedText variant="highlight">bold text</RedText>
  </>
);
