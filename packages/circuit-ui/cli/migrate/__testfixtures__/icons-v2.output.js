import styled from '@emotion/styled';
import { Like, Refer, Zap, Spinner, Close } from '@sumup/icons';

/**
 * Icon sizes
 */

const ComponentWithClose = () => (
  <>
    <Close size="16" />
    <Close size="24" />
  </>
);

/**
 * Renamed icons (codemodded)
 */

const ComponentWithHeart = () => <Like />;
const ComponentWithGift = () => <Refer />; // Verify the console warning for product-specific icons

const RedHeart = styled(Like)`
  color: red;
`;

/**
 * Removed icons (print error)
 */

const ComponentWithZap = () => <Zap />;
const ComponentWithSpinner = () => <Spinner />; // Verify the custom console error
