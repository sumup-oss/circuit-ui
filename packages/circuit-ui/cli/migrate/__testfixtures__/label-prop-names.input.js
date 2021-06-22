import styled from '@emotion/styled';
import { Card, CardHeader, Hamburger, Tag, Toggle } from '@sumup/circuit-ui';

const RedHamburger = styled(Hamburger)`
  color: red;
`;

const Component = (
  <Card>
    <CardHeader labelCloseButton="Close">A strange component</CardHeader>
    <Hamburger labelActive="Active" labelInActive="Inactive" />
    <RedHamburger labelActive="Active" labelInActive="Inactive" />
    <Tag labelRemoveButton="Remove" />
    <Toggle labelChecked="Checked" labelUnchecked="Unchecked" />
  </Card>
);
