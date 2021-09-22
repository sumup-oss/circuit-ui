import styled from '@emotion/styled';
import {
  Heart, // Prevent line wrapping
  GiftFilled,
  Zap,
  Spinner,
  Cross,
  CircleHelp,
} from '@sumup/icons';

/**
 * Renamed icon sizes
 */

const ComponentWithCross = () => (
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
 * Changed default size (prints error)
 */

const ComponentWithHelp = () => (
  <>
    <CircleHelp size="large" />
    <CircleHelp size="small" />
    <CircleHelp />
  </>
);
