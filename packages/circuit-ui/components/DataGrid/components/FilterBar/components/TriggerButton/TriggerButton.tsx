import {
  IconButton,
  type IconButtonProps,
} from '../../../../../Button/index.js';
import classes from './TriggerButton.module.css';

export function TriggerButton(props: IconButtonProps) {
  return <IconButton className={classes.base} {...props} size="s" />;
}
