import type { StateScreenConfig } from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import classes from './StateScreen.module.css';
import { Compact } from '../../../Compact/index.js';
import { Button } from '../../../Button/index.js';
import { Illustration } from '@sumup-oss/illustrations';

export const StateScreen = ({
  type,
  isMobile,
  title,
  description,
  action,
  customScreen,
  illustration,
  isLoading,
}: StateScreenConfig & {
  type: 'empty' | 'no-results';
  isMobile: boolean;
  isLoading?: boolean;
}) =>
  customScreen ? (
    <div aria-busy={isLoading} inert={isLoading}>
      {customScreen}
    </div>
  ) : (
    <div
      className={clsx(
        utilClasses.center,
        classes.base,
        !isMobile && classes.radius,
        isLoading && classes.loading,
      )}
      aria-busy={isLoading}
      inert={isLoading}
    >
      <Illustration
        name={
          illustration ?? (type === 'empty' ? 'empty-state-1' : 'empty-state-3')
        }
      />
      <div className={classes.content}>
        <p className={classes.title}>{title}</p>
        {description && <Compact size="s">{description}</Compact>}
        {action && <Button {...action} />}
      </div>
    </div>
  );
