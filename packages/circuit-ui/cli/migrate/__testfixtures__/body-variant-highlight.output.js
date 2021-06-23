import styled from '@emotion/styled';
import { Body, Text, Anchor } from '@sumup/circuit-ui';

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

const BoldAnchor = () => (
  <>
    <Anchor variant="highlight">bold</Anchor>
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
    <RedBody variant="highlight">bold body</RedBody>
    <RedText variant="highlight">bold text</RedText>
    <RedAnchor variant="highlight">bold anchor</RedAnchor>
  </>
);
