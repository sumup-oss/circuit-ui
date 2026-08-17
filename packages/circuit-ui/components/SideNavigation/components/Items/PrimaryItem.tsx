import type { PrimaryNavigationItem } from '../../types.js';
import { type ElementType, useCallback, useId } from 'react';

import { ChevronDown, ExternalLink } from '@sumup-oss/icons';
import classes from './Items.module.css';
import { SecondaryItem } from './SecondaryItem.js';
import { Skeleton } from '../../../Skeleton/index.js';
import { useFocusList } from '../../../../hooks/useFocusList/index.js';
import { useComponents } from '../../../ComponentsContext/index.js';
import { useCollapsible } from '../../../../hooks/useCollapsible/index.js';
import { idx } from '../../../../util/idx.js';
import type { ClickEvent } from '../../../../types/events.js';
import { Body } from '../../../Body/index.js';
import { utilClasses } from '../../../../styles/utility.js';
import { clsx } from '../../../../styles/clsx.js';

type PrimaryItemProps = PrimaryNavigationItem & {
  /**
   * allows closing the modal navigation when clicking on a primary item on mobile
   */
  onClose?: () => void;
  isLoading?: boolean;
};
export const PrimaryItem = ({
  label,
  onClick: onClickProp,
  isActive,
  externalLabel,
  className,
  'aria-describedby': descriptionId,
  isLoading,
  secondaryItems,
  icon,
  activeIcon,
  onClose,
  ...props
}: PrimaryItemProps) => {
  const { Link } = useComponents();
  const externalLabelId = useId();
  const { isOpen, getButtonProps, getContentProps } =
    useCollapsible<HTMLUListElement>({ initialOpen: isActive, duration: 300 });
  const descriptionIds = idx(externalLabel && externalLabelId, descriptionId);
  const Element = props.href ? Link : ('button' as ElementType<any>);
  const Icon = (isActive && activeIcon) || icon;

  const isExternalLink = props.target === '_blank' || props.rel === 'external';
  const hasAccordion = secondaryItems && secondaryItems.length > 0;
  const focusProps = useFocusList();

  const onClick = useCallback(
    (e: ClickEvent) => {
      onClickProp?.(e);
      if (!hasAccordion) {
        onClose?.();
      }
    },
    [onClickProp, onClose, hasAccordion],
  );
  return (
    <li>
      <Element
        {...props}
        {...(hasAccordion ? getButtonProps({ onClick }) : { onClick })}
        className={clsx(classes.base, utilClasses.focusVisibleInset, className)}
        aria-describedby={descriptionIds}
        aria-current={isActive ? 'page' : undefined}
      >
        <Skeleton>
          <div className={classes['label-container']}>
            <Icon className={classes.icon} aria-hidden="true" size="24" />
            <Body
              as="span"
              size="s"
              weight={isActive ? 'bold' : 'regular'}
              className={classes.label}
            >
              {label}
            </Body>
          </div>
        </Skeleton>

        {!isLoading && isExternalLink && (
          <ExternalLink
            size="16"
            className={classes.external}
            aria-hidden="true"
          />
        )}

        {!isLoading && isExternalLink && externalLabel && (
          <span id={externalLabelId} className={utilClasses.hideVisually}>
            {externalLabel}
          </span>
        )}

        {!isLoading && hasAccordion && (
          <ChevronDown
            size="16"
            className={clsx(classes.chevron, isOpen && classes['chevron-up'])}
            aria-hidden="true"
          />
        )}
      </Element>
      {hasAccordion && (
        <ul {...getContentProps()} className={classes.list}>
          {secondaryItems.map((item) => (
            <SecondaryItem
              key={item.label}
              isLoading={isLoading}
              {...item}
              {...focusProps}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
