import { IconButton, type IconButtonProps } from '../../../Button/index.js';
import classes from './RowActionButton.module.css';

export const RowActionButton = ({
  icon,
  children,
  ...props
}: Omit<IconButtonProps, 'size' | 'variant'>) => (
  <IconButton
    className={classes.base}
    size="s"
    variant="tertiary"
    icon={icon}
    {...props}
  >
    {children}
  </IconButton>
);
