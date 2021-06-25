import styled from '@emotion/styled';
import {
  Heading,
  SubHeading,
  Text,
  Headline,
  SubHeadline,
  Body,
  List,
  Anchor,
} from '@sumup/circuit-ui';

const HeadlineZetta = () => <Headline size="zetta">Headline 1</Headline>;
const HeadlineExa = () => <Headline size="one">Headline 1</Headline>;
const HeadlinePeta = () => <Headline size="one">Headline 1</Headline>;
const HeadlineTera = () => <Headline size="two">Headline 2</Headline>;
const HeadlineGiga = () => <Headline size="three">Headline 3</Headline>;
const HeadlineMega = () => <Headline size="four">Headline 4</Headline>;
const HeadlineKilo = () => <Headline size="four">Headline 4</Headline>;

const HeadingZetta = () => <Heading size="zetta">Headline 1</Heading>;
const HeadingExa = () => <Heading size="one">Headline 1</Heading>;
const HeadingPeta = () => <Heading size="one">Headline 1</Heading>;
const HeadingTera = () => <Heading size="two">Headline 2</Heading>;
const HeadingGiga = () => <Heading size="three">Headline 3</Heading>;
const HeadingMega = () => <Heading size="four">Headline 4</Heading>;
const HeadingKilo = () => <Heading size="four">Headline 4</Heading>;

const SubHeadlineMega = () => <SubHeadline>Test</SubHeadline>;
const SubHeadlineKilo = () => <SubHeadline>Test</SubHeadline>;

const SubHeadingMega = () => <SubHeading>Test</SubHeading>;
const SubHeadingKilo = () => <SubHeading>Test</SubHeading>;

const BodyGiga = () => <Body size="giga">Body 1</Body>;
const BodyMega = () => <Body size="one">Body 1</Body>;
const BodyKilo = () => <Body size="two">Body 2</Body>;

const TextGiga = () => <Text size="giga">Body 1</Text>;
const TextMega = () => <Text size="one">Body 1</Text>;
const TextKilo = () => <Text size="two">Body 2</Text>;

const ListGiga = () => <List size="giga">Body 1</List>;
const ListMega = () => <List size="one">Body 1</List>;
const ListKilo = () => <List size="two">Body 2</List>;

const AnchorGiga = () => <Anchor size="giga">Body 1</Anchor>;
const AnchorMega = () => <Anchor size="one">Body 1</Anchor>;
const AnchorKilo = () => <Anchor size="two">Body 2</Anchor>;

const RedHeadline = styled(Headline)`
  color: red;
`;

const StyledComponent = () => <RedHeadline size="one" />;
