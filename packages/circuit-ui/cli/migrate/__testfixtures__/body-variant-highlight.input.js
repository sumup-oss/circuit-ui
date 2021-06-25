import styled from '@emotion/styled';
import { Body, Text, Anchor } from '@sumup/circuit-ui';

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

const BoldAnchor = () => (
  <>
    <Anchor bold>bold</Anchor>
    <Anchor bold={!true}>bold</Anchor>
  </>
);

const RedBody = styled(Body)`
  color: red;
`;

const RedText = styled(Text)`
  color: red;
`;

const RedAnchor = styled(Anchor)`
  color: red;
`;

const Styled = () => (
  <>
    <RedBody bold>bold body</RedBody>
    <RedText bold>bold text</RedText>
    <RedAnchor bold>bold anchor</RedAnchor>
  </>
);
