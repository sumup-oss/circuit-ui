import type { SideNavigationProps } from '../../types.js';
import { useCallback, useState } from 'react';
import classes from './MobileNavigation.module.css';
import { NavigationContent } from '../NavigationContent/NavigationContent.js';
import { clsx } from '../../../../styles/clsx.js';
import { Dialog } from '../../../Dialog/Dialog.js';
import { sharedClasses } from '../../../../styles/shared.js';

export const MobileNavigation = ({
  onClose,
  isOpen,
  closeButtonLabel,
  label,
  className,
  ...props
}: SideNavigationProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleDialogCloseEnd = useCallback(() => {
    setIsClosing(false);
    onClose?.();
  }, [onClose]);

  const handleDialogCloseStart = useCallback(() => {
    setIsClosing(true);
  }, []);
  return (
    <Dialog
      aria-label={label}
      open={isOpen}
      closeButtonLabel={closeButtonLabel}
      isModal
      className={clsx(
        classes.base,
        isClosing
          ? sharedClasses.animationSlideLeftOut
          : sharedClasses.animationSlideLeftIn,
        className,
      )}
      onCloseStart={handleDialogCloseStart}
      onCloseEnd={handleDialogCloseEnd}
      animationDuration={120} /* .12s */
    >
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <NavigationContent
            {...props}
            onClose={onClose}
            skipNavigationHref={undefined}
            suffix="mobile"
          />
        </div>
      </div>
    </Dialog>
  );
};
