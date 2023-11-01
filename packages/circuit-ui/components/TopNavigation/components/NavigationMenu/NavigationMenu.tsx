import { ButtonHTMLAttributes, useEffect, useState } from "react";
import Popover, { PopoverProps } from '../../../Popover/index.js';
import sharedClasses from '../../../../styles/shared.js';
import { ChevronDown, IconComponentType } from "@sumup/icons";
import { Skeleton } from '../../../Skeleton/index.js';
import Body from '../../../Body/index.js';
import { clsx } from "../../../../styles/clsx.js";

import classes from './NavigationMenu.module.css';

interface NavigationMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Display an icon in addition to the text to help to identify the link.
   * On narrow viewports, only the icon is displayed.
   */
  icon: IconComponentType;
  /**
   * A description of the button which opens the profile menu.
   */
  label: string;
  /**
   * Text of the button which opens the menu.
   */
  title: string;
  /**
   * Optional complementary text of the button which opens the menu.
   */
  subtitle?: string;
}

const NavigationMenuButton = ({ icon: Icon, title, subtitle, label, className, ...props }: NavigationMenuButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(classes.profile, sharedClasses.navigationItem, className)}
      type="button"
      aria-label={label}
      title={label}
    >
      <Skeleton circle>
        <Icon role="presentation" size="24"/>
      </Skeleton>
      <div className={classes.details}>
        <Skeleton className={classes.truncate}>
          <Body size="two" variant="highlight">
            {title}
          </Body>
        </Skeleton>
        {subtitle && (
          <Skeleton className={classes.truncate}>
            <Body size="two">{subtitle}</Body>
          </Skeleton>
        )}
      </div>
      <ChevronDown size="16" className={classes.chevron} />
    </button>
  );
}

export interface NavigationMenuProps extends NavigationMenuButtonProps {
  /**
   * A collection of actions to be rendered in the profile menu.
   * Same API as the Popover actions.
   */
  actions: PopoverProps['actions'];
  /**
   * Function that is called when opening and closing the ProfileMenu.
   */
  onToggle?: (isOpen: boolean) => void;
};

export const NavigationMenu = ({
  icon,
  label,
  title,
  subtitle,
  actions,
  onToggle,
}: NavigationMenuProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const offset = { mainAxis: 8, crossAxis: -16 };

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [onToggle, isOpen]);

  return (
    <Popover
      isOpen={isOpen}
      onToggle={setOpen}
      component={(popoverProps) => (
        <NavigationMenuButton icon={icon} label={label} title={title} subtitle={subtitle} {...popoverProps}/>
      )}
      actions={actions}
      placement="bottom-end"
      offset={offset}
    />
  );
}

