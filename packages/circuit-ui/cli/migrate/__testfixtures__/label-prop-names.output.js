import styled from '@emotion/styled';
import { Card, CardHeader, Hamburger, Tag, Toggle } from '@sumup/circuit-ui';

const RedHamburger = styled(Hamburger)`
  color: red;
`;

const Component = (
  <Card>
    <CardHeader closeButtonLabel="Close">A strange component</CardHeader>
    <Hamburger activeLabel="Active" inactiveLabel="Inactive" />
    <RedHamburger activeLabel="Active" inactiveLabel="Inactive" />
    <Tag removeButtonLabel="Remove" />
    <Toggle checkedLabel="Checked" uncheckedLabel="Unchecked" />
  </Card>
);
