import styled from '@emotion/styled';
import {
  Heart, // Prevent line wrapping
  GiftFilled,
  Zap,
  Spinner,
  Cross,
  ShoppingCart,
} from '@sumup/icons';

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
 * Removed icons (prints error)
 */

const ComponentWithZap = () => <Zap />;
const ComponentWithSpinner = () => <Spinner />; // Verify the custom console error

/**
 * Removed icon size (prints error)
 */

const ComponentWithShoppingCart = () => (
  <>
    <ShoppingCart size="large" />
    <ShoppingCart size="small" />
    <ShoppingCart />
  </>
);
