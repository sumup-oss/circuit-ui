import styled from '@emotion/styled';
import {
  Like, // Prevent line wrapping
  Refer,
  Zap,
  Spinner,
  Close,
  Help,
} from '@sumup/icons';

/**
 * Renamed icon sizes
 */

const ComponentWithCross = () => (
  <>
    <Close size="16" />
    <Close size="24" />
  </>
);

/**
 * Renamed icons
 */

const ComponentWithHeart = () => <Like />;
const ComponentWithGift = () => <Refer />; // Verify the console warning for product-specific icons

const RedHeart = styled(Like)`
  color: red;
`;

/**
 * Removed icons
 */

const ComponentWithZap = () => <Zap />;
const ComponentWithSpinner = () => <Spinner />; // Verify the custom console error

/**
 * Changed default size
 */

const ComponentWithHelp = () => (
  <>
    <Help size="24" />
    <Help size="16" />
    <Help size="16" />
  </>
);
