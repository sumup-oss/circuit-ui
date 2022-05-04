import styled from '@emotion/styled';
import { ListItem, Badge } from '@sumup/circuit-ui';
import { SumUpCard } from '@sumup/icons';

const WithCustomComponents = () => (
  <ListItem
    label="MasterCard •••• 4494"
    leadingComponent={SumUpCard}
    trailingComponent={<Badge variant="promo">Promo</Badge>}
  />
);

const WithLabelAndDetails = () => (
  <ListItem
    label="MasterCard •••• 4494"
    trailingLabel="12 €"
    trailingDetails="VAT included"
  />
);

const StyledListItem = styled(ListItem)`
  margin-bottom: ${(p) => p.theme.spacings.giga};
`;

const StyledComponent = () => (
  <StyledListItem
    label="MasterCard •••• 4494"
    leadingComponent={SumUpCard}
    trailingComponent={<Badge variant="promo">Promo</Badge>}
  />
);
