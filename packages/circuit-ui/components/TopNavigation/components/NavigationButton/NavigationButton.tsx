import classes from './NavigationButton.module.css';
import {
  IconButton,
  type IconButtonProps,
  legacyButtonSizeMap,
} from '../../../Button/index.js';
import { clsx } from '../../../../styles/clsx.js';
import { forwardRef } from 'react';

export interface NavigationButtonProps
  extends Omit<IconButtonProps, 'variant' | 'children'> {
  isActive?: boolean;
  label: string;
  /**
   * A valid path or URL to the link target.
   */
  href?: string;
}
export const NavigationButton = forwardRef<any, NavigationButtonProps>(
  (
    { className, icon: Icon, label, isActive, size: sizeProp = 'm', ...props },
    ref,
  ) => {
    const size = legacyButtonSizeMap[sizeProp] || sizeProp;

    return (
      <IconButton
        ref={ref}
        variant="tertiary"
        icon={Icon}
        type="button"
        aria-current={isActive ? 'page' : undefined}
        size={size}
        className={clsx(classes.base, classes[size], className)}
        {...props}
      >
        {label}
      </IconButton>
    );
  },
);
