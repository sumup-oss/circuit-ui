import type { SideNavigationProps } from './types.js';
import { DesktopNavigation } from './components/DesktopNavigation/DesktopNavigation.js';
import { MobileNavigation } from './components/MobileNavigation/MobileNavigation.js';

export const SideNavigation = (props: SideNavigationProps) => {
  const { onClose, isOpen, closeButtonLabel, ...rest } = props;
  return (
    <>
      <DesktopNavigation {...rest} />
      <MobileNavigation
        onClose={onClose}
        isOpen={isOpen}
        closeButtonLabel={closeButtonLabel}
        {...rest}
      />
    </>
  );
};
