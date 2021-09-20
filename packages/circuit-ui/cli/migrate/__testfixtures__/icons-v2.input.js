import styled from '@emotion/styled';
import { Heart, GiftFilled, Zap, Spinner, Cross } from '@sumup/icons';

/**
 * Icon sizes
 */

const ComponentWithClose = () => (
  <>
    <Cross size="small" />
    <Cross size="large" />
  </>
);

/**
 * Renamed icons (codemodded)
 */

const ComponentWithHeart = () => <Heart />;
const ComponentWithGift = () => <GiftFilled />; // Verify the console warning for product-specific icons

const RedHeart = styled(Heart)`
  color: red;
`;

/**
 * Removed icons (print error)
 */

const ComponentWithZap = () => <Zap />;
const ComponentWithSpinner = () => <Spinner />; // Verify the custom console error
