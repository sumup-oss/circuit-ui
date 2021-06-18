import styled from '@emotion/styled';
import { Body, Text } from '@sumup/circuit-ui';

const BoldBody = () => (
  <>
    <Body bold>bold</Body>
    <Body bold={!true}>bold</Body>
  </>
);

const BoldText = () => (
  <>
    <Text bold>bold</Text>
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
    <RedBody bold>bold body</RedBody>
    <RedText bold>bold text</RedText>
  </>
);
