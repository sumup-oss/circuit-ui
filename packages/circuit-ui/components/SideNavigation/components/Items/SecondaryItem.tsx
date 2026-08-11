import type { NavigationItem } from '../../types.js';
import { ExternalLink } from '@sumup-oss/icons';

import { type ElementType, useCallback, useId } from 'react';
import classes from './Items.module.css';
import { Skeleton } from '../../../Skeleton/index.js';
import { useComponents } from '../../../ComponentsContext/index.js';
import { idx } from '../../../../util/idx.js';
import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import { Body } from '../../../Body/index.js';
import type { ClickEvent } from '../../../../types/events.js';

type SecondaryItemProps = NavigationItem & {
  isLoading?: boolean;
  /**
   * allows closing the modal navigation when clicking on a primary item on mobile
   */
  onClose?: () => void;
};
export const SecondaryItem = (props: SecondaryItemProps) => {
  const {
    label,
    isActive,
    externalLabel,
    isLoading,
    className,
    onClick,
    onClose,
    'aria-describedby': descriptionId,
    ...rest
  } = props;
  const { Link } = useComponents();
  const externalLabelId = useId();
  const descriptionIds = idx(externalLabel && externalLabelId, descriptionId);
  const Element = props.href ? (Link as ElementType<any>) : 'button';

  const isExternalLink = rest.target === '_blank' || props.rel === 'external';

  const onItemClick = useCallback(
    (event: ClickEvent) => {
      onClick?.(event);
      onClose?.();
    },
    [onClick, onClose],
  );

  return (
    <li>
      <Element
        {...rest}
        className={clsx(classes.base, utilClasses.focusVisibleInset, className)}
        aria-describedby={descriptionIds}
        aria-current={isActive ? 'page' : undefined}
        onClick={onItemClick}
      >
        <Skeleton style={{ height: 'var(--cui-body-s-line-height)' }}>
          <Body
            as="span"
            size="s"
            weight={isActive ? 'bold' : 'regular'}
            className={classes.label}
          >
            {label}
          </Body>
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
      </Element>
    </li>
  );
};
