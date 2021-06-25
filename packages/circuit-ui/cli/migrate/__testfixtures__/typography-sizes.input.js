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
const HeadlineExa = () => <Headline size="exa">Headline 1</Headline>;
const HeadlinePeta = () => <Headline size="peta">Headline 1</Headline>;
const HeadlineTera = () => <Headline size="tera">Headline 2</Headline>;
const HeadlineGiga = () => <Headline size="giga">Headline 3</Headline>;
const HeadlineMega = () => <Headline size="mega">Headline 4</Headline>;
const HeadlineKilo = () => <Headline size="kilo">Headline 4</Headline>;

const HeadingZetta = () => <Heading size="zetta">Headline 1</Heading>;
const HeadingExa = () => <Heading size="exa">Headline 1</Heading>;
const HeadingPeta = () => <Heading size="peta">Headline 1</Heading>;
const HeadingTera = () => <Heading size="tera">Headline 2</Heading>;
const HeadingGiga = () => <Heading size="giga">Headline 3</Heading>;
const HeadingMega = () => <Heading size="mega">Headline 4</Heading>;
const HeadingKilo = () => <Heading size="kilo">Headline 4</Heading>;

const SubHeadlineMega = () => <SubHeadline size="mega">Test</SubHeadline>;
const SubHeadlineKilo = () => <SubHeadline size="kilo">Test</SubHeadline>;

const SubHeadingMega = () => <SubHeading size="mega">Test</SubHeading>;
const SubHeadingKilo = () => <SubHeading size="kilo">Test</SubHeading>;

const BodyGiga = () => <Body size="giga">Body 1</Body>;
const BodyMega = () => <Body size="mega">Body 1</Body>;
const BodyKilo = () => <Body size="kilo">Body 2</Body>;

const TextGiga = () => <Text size="giga">Body 1</Text>;
const TextMega = () => <Text size="mega">Body 1</Text>;
const TextKilo = () => <Text size="kilo">Body 2</Text>;

const ListGiga = () => <List size="giga">Body 1</List>;
const ListMega = () => <List size="mega">Body 1</List>;
const ListKilo = () => <List size="kilo">Body 2</List>;

const AnchorGiga = () => <Anchor size="giga">Body 1</Anchor>;
const AnchorMega = () => <Anchor size="mega">Body 1</Anchor>;
const AnchorKilo = () => <Anchor size="kilo">Body 2</Anchor>;

const RedHeadline = styled(Headline)`
  color: red;
`;

const StyledComponent = () => <RedHeadline size="exa" />;
