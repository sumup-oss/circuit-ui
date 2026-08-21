import classes from './NavigationContent.module.css';
import type { SideNavigationProps } from '../../types.js';
import { PrimaryItem } from '../Items/PrimaryItem.js';
import { Skeleton, SkeletonContainer } from '../../../Skeleton/index.js';
import { useFocusList } from '../../../../hooks/useFocusList/index.js';
import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import { SkipLink } from '../../../SkipLink/SkipLink.js';
import { Compact } from '../../../Compact/Compact.js';

export const NavigationContent = ({
  skipNavigationHref,
  skipNavigationLabel,
  onClose,
  groups,
  logo,
  isLoading,
  className,
  suffix,
  ...props
}: Omit<SideNavigationProps, 'isOpen' | 'closeButtonLabel' | 'label'> & {
  // to ensure unique ids between mobile and desktop navigation
  // because the elements still are present in the DOM even when the navigation modal is technically closed
  suffix?: string;
}) => {
  const focusProps = useFocusList();

  return (
    <SkeletonContainer isLoading={Boolean(isLoading)}>
      <div
        className={clsx(classes.base, utilClasses.hideScrollbar, className)}
        {...props}
      >
        {skipNavigationHref && skipNavigationLabel && (
          <SkipLink href={skipNavigationHref}>{skipNavigationLabel}</SkipLink>
        )}
        <div className={classes.logo}>{logo}</div>
        <div className={classes.sections}>
          {groups.map(({ label, hideLabel, items, id }) => (
            <nav key={id} aria-labelledby={`nav-label-${id}-${suffix}`}>
              <div className={classes.label}>
                <Skeleton
                  className={clsx(hideLabel && utilClasses.hideVisually)}
                >
                  <Compact
                    as="h2"
                    id={`nav-label-${id}-${suffix}`}
                    size="s"
                    color="subtle"
                  >
                    {label}
                  </Compact>
                </Skeleton>
              </div>
              <ul className={classes.list}>
                {items.map((item) => (
                  <PrimaryItem
                    key={item.label}
                    isLoading={isLoading}
                    className={classes['primary-item']}
                    onClose={onClose}
                    {...item}
                    {...focusProps}
                  />
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </SkeletonContainer>
  );
};
