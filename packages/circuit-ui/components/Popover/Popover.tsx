/**
 * Copyright 2021, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Fragment,
  useEffect,
  useId,
  useRef,
  KeyboardEvent,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import {
  useFloating,
  flip,
  offset as offsetMiddleware,
  type Placement,
  size,
  type SizeOptions,
} from '@floating-ui/react-dom';
import type { IconComponentType } from '@sumup/icons';

import { ClickEvent } from '../../types/events.js';
import { EmotionAsPropType } from '../../types/prop-types.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import { useClickOutside } from '../../hooks/useClickOutside/index.js';
import { useFocusList } from '../../hooks/useFocusList/index.js';
import { isArrowDown, isArrowUp } from '../../util/key-codes.js';
import { useComponents } from '../ComponentsContext/index.js';
import Portal from '../Portal/index.js';
import Hr from '../Hr/index.js';
import { useStackContext } from '../StackContext/index.js';
import { isFunction } from '../../util/type-check.js';
import { useLatest } from '../../hooks/useLatest/index.js';
import { usePrevious } from '../../hooks/usePrevious/index.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { clsx } from '../../styles/clsx.js';
import sharedClasses from '../../styles/shared.js';

import classes from './Popover.module.css';

export interface BaseProps {
  /**
   * The Popover item label.
   */
  children: string;
  /**
   * Function that's called when the item is clicked.
   */
  onClick?: (event: ClickEvent) => void;
  /**
   * Display an icon in addition to the label. Designed for 24px icons from `@sumup/icons`.
   */
  icon?: IconComponentType;
  /**
   * Destructive variant, changes the color of label and icon from blue to red to signal to the user that the action
   * is irreversible or otherwise dangerous. Interactive states are the same for destructive variant.
   */
  destructive?: boolean;
  /**
   * Disabled variant. Visually and functionally disable the button.
   */
  disabled?: boolean;
}

type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type PopoverItemProps = BaseProps & LinkElProps & ButtonElProps;

export const PopoverItem = ({
  children,
  icon: Icon,
  destructive,
  className,
  ...props
}: PopoverItemProps): JSX.Element => {
  const { Link } = useComponents();

  const Element = props.href ? (Link as EmotionAsPropType) : 'button';

  return (
    <Element
      role="menuitem"
      className={clsx(
        classes.item,
        sharedClasses.listItem,
        destructive && sharedClasses.listItemDestructive,
        className,
      )}
      {...props}
    >
      {Icon && <Icon className={classes.icon} size="24" />}
      {children}
    </Element>
  );
};

type Divider = { type: 'divider' };
type Action = PopoverItemProps | Divider;

function isDivider(action: Action): action is Divider {
  return 'type' in action && action.type === 'divider';
}

type OnToggle = (open: boolean | ((prevOpen: boolean) => boolean)) => void;

export interface PopoverProps {
  /**
   * The class name to add to the Popover wrapper element.
   */
  className?: string;
  /**
   * Determines whether the Popover is open or closed.
   */
  isOpen: boolean;
  /**
   * Function that is called when opening and closing the Popover.
   */
  onToggle: OnToggle;
  /**
   * An array of PopoverItem or Divider.
   */
  actions: Action[];
  /**
   * One of the accepted placement values. Defaults to `bottom`.
   */
  placement?: Placement;
  /**
   * The placements to fallback to when there is not enough space for the
   * Popover. Defaults to `['top', 'right', 'left']`.
   */
  fallbackPlacements?: Placement[];
  /**
   * Displaces the floating element from its `placement` along specified axes.
   *
   * Pass a number to move the floating element on the main axis, away from (if
   * positive) or towards (if negative) the reference element. Pass an object
   * to displace the floating element on both the main and cross axes.
   */
  offset?: number | { mainAxis?: number; crossAxis?: number };
  /**
   * The component that toggles the Popover when clicked. Also referred to as
   * reference element.
   */
  component: (props: {
    'onClick': (event: ClickEvent) => void;
    'onKeyDown': (event: KeyboardEvent) => void;
    'id': string;
    'aria-haspopup': boolean;
    'aria-controls': string;
    'aria-expanded': boolean;
  }) => JSX.Element;
}

type TriggerKey = 'ArrowUp' | 'ArrowDown';

const sizeOptions: SizeOptions = {
  apply({ availableHeight, elements }) {
    elements.floating.style.setProperty(
      '--popover-max-height',
      `${availableHeight}px`,
    );
  },
};

export const Popover = ({
  isOpen = false,
  onToggle,
  actions,
  placement = 'bottom',
  fallbackPlacements = ['top', 'right', 'left'],
  component: Component,
  offset,
  className,
  ...props
}: PopoverProps): JSX.Element | null => {
  const zIndex = useStackContext();
  const triggerKey = useRef<TriggerKey | null>(null);
  const menuEl = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const menuId = useId();

  const { x, y, strategy, refs, update } = useFloating<HTMLElement>({
    placement,
    strategy: 'fixed',
    middleware: offset
      ? [
          offsetMiddleware(offset),
          flip({ fallbackPlacements }),
          size(sizeOptions),
        ]
      : [flip({ fallbackPlacements }), size(sizeOptions)],
  });

  // This is a performance optimization to prevent event listeners from being
  // re-attached on every render.
  const floatingRef = useLatest(refs.floating.current);

  const focusProps = useFocusList();
  const prevOpen = usePrevious(isOpen);

  const isMobile = useMedia('(max-width: 479px)');

  const mobileStyles = {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    width: 'auto',
    zIndex: zIndex || 'var(--cui-z-index-popover)',
  } as const;

  const handleToggle: OnToggle = (state) => {
    onToggle((prev) => (isFunction(state) ? state(prev) : state));
  };

  const handleTriggerClick = (event: ClickEvent) => {
    // This prevents the event from bubbling which would trigger the
    // useClickOutside above and would prevent the popover from closing.
    event.stopPropagation();
    handleToggle((prev) => !prev);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (isArrowDown(event)) {
      triggerKey.current = 'ArrowDown';
      handleToggle(true);
    }
    if (isArrowUp(event)) {
      triggerKey.current = 'ArrowUp';
      handleToggle((prev) => !prev);
    }
  };

  const handlePopoverItemClick = (
    event: ClickEvent,
    onClick: BaseProps['onClick'],
  ) => {
    if (onClick) {
      onClick(event);
    }
    handleToggle(false);
  };

  useEscapeKey(() => handleToggle(false), isOpen);
  useClickOutside(floatingRef, () => handleToggle(false), isOpen);

  useEffect(() => {
    /**
     * When we support `ResizeObserver` (https://caniuse.com/resizeobserver),
     * we can look into using Floating UI's `autoUpdate` (but we can't use
     * `whileElementInMounted` because our implementation hides the floating
     * element using CSS instead of using conditional rendering.
     * See https://floating-ui.com/docs/react-dom#updating
     */
    if (isOpen) {
      update();
      window.addEventListener('resize', update);
      window.addEventListener('scroll', update);
    } else {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    }

    // Focus the first or last element after opening
    if (!prevOpen && isOpen) {
      const element = (
        triggerKey.current && triggerKey.current === 'ArrowUp'
          ? menuEl.current && menuEl.current.lastElementChild
          : menuEl.current && menuEl.current.firstElementChild
      ) as HTMLElement;
      if (element) {
        element.focus();
      }
    }

    // Focus the trigger button after closing
    if (prevOpen && !isOpen) {
      const triggerButton = (refs.reference.current &&
        refs.reference.current.firstElementChild) as HTMLElement;
      triggerButton.focus();
    }

    triggerKey.current = null;

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [isOpen, prevOpen, refs.reference, update]);

  return (
    <Fragment>
      <div className={classes.trigger} ref={refs.setReference}>
        <Component
          id={triggerId}
          aria-haspopup={true}
          aria-controls={menuId}
          aria-expanded={isOpen}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
        />
      </div>
      <Portal>
        <div
          className={clsx(classes.overlay, isOpen && classes.open)}
          // @ts-expect-error z-index can be a string
          style={{ zIndex: zIndex || 'var(--cui-z-index-popover)' }}
        />
        <div
          {...props}
          ref={refs.setFloating}
          className={clsx(classes.wrapper, isOpen && classes.open, className)}
          // @ts-expect-error z-index can be a string
          style={
            isMobile
              ? mobileStyles
              : {
                  position: strategy,
                  top: y,
                  left: x,
                  zIndex: zIndex || 'var(--cui-z-index-popover)',
                }
          }
        >
          <div
            id={menuId}
            ref={menuEl}
            aria-labelledby={triggerId}
            role="menu"
            className={clsx(classes.menu, isOpen && classes.open)}
          >
            {actions.map((action, index) =>
              isDivider(action) ? (
                <Hr
                  className={classes.divider}
                  aria-hidden="true"
                  key={index}
                />
              ) : (
                <PopoverItem
                  key={index}
                  {...action}
                  {...focusProps}
                  onClick={(event) =>
                    handlePopoverItemClick(event, action.onClick)
                  }
                />
              ),
            )}
          </div>
        </div>
      </Portal>
    </Fragment>
  );
};
