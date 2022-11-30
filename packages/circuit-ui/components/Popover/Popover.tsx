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

import { css, useTheme } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';
import {
  FC,
  Fragment,
  Ref,
  useEffect,
  useMemo,
  useRef,
  KeyboardEvent,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import useLatest from 'use-latest';
import usePrevious from 'use-previous';
import {
  useFloating,
  flip,
  offset as offsetMiddleware,
  Placement,
} from '@floating-ui/react-dom';
import isPropValid from '@emotion/is-prop-valid';
import { IconProps } from '@sumup/icons';
import { useClickTrigger } from '@sumup/collector';

import { ClickEvent } from '../../types/events';
import { EmotionAsPropType } from '../../types/prop-types';
import styled, { StyleProps } from '../../styles/styled';
import { listItem, shadow, typography } from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { useClickEvent, TrackingProps } from '../../hooks/useClickEvent';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useFocusList } from '../../hooks/useFocusList';
import { isArrowDown, isArrowUp } from '../../util/key-codes';
import { useComponents } from '../ComponentsContext';
import Portal from '../Portal';
import Hr from '../Hr';
import { useStackContext } from '../StackContext';
import { isFunction } from '../../util/type-check';

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
  icon?: FC<IconProps>;
  /**
   * Destructive variant, changes the color of label and icon from blue to red to signal to the user that the action
   * is irreversible or otherwise dangerous. Interactive states are the same for destructive variant.
   */
  destructive?: boolean;
  /**
   * Disabled variant. Visually and functionally disable the button.
   */
  disabled?: boolean;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * The ref to the HTML DOM element
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: Ref<any>;
}

type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type PopoverItemProps = BaseProps & LinkElProps & ButtonElProps;
type PopoverItemWrapperProps = LinkElProps & ButtonElProps;

const itemWrapperStyles = () => css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const PopoverItemWrapper = styled('button', {
  shouldForwardProp: isPropValid,
})<PopoverItemWrapperProps>(listItem, itemWrapperStyles, typography('one'));

const iconStyles = (theme: Theme) => css`
  margin-right: ${theme.spacings.kilo};
`;

export const PopoverItem = ({
  children,
  icon: Icon,
  onClick,
  tracking,
  ...props
}: PopoverItemProps): JSX.Element => {
  const { Link } = useComponents();

  const handleClick = useClickEvent(onClick, tracking, 'popover-item');

  return (
    <PopoverItemWrapper
      as={props.href ? (Link as EmotionAsPropType) : 'button'}
      onClick={handleClick}
      role="menuitem"
      {...props}
    >
      {Icon && <Icon css={iconStyles} size="24" />}
      {children}
    </PopoverItemWrapper>
  );
};

const TriggerElement = styled.div`
  display: inline-block;
`;

const menuBaseStyles = ({ theme }: StyleProps) => css`
  padding: ${theme.spacings.byte} 0px;
  border: 1px solid ${theme.colors.n200};
  box-sizing: border-box;
  border-radius: ${theme.borderRadius.byte};
  background-color: ${theme.colors.white};
  visibility: hidden;
  opacity: 0;

  ${theme.mq.untilKilo} {
    opacity: 1;
    transform: translateY(100%);
    transition: transform ${theme.transitions.default},
      visibility ${theme.transitions.default};
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

type OpenProps = { isOpen: boolean };

const menuOpenStyles = ({ theme, isOpen }: StyleProps & OpenProps) =>
  isOpen &&
  css`
    opacity: 1;
    visibility: inherit;

    ${theme.mq.untilKilo} {
      transform: translateY(0);
    }
  `;

const PopoverMenu = styled('div')<OpenProps>(
  shadow,
  menuBaseStyles,
  menuOpenStyles,
);

const dividerStyles = (theme: Theme) => css`
  margin: ${theme.spacings.byte} ${theme.spacings.mega};
  width: calc(100% - ${theme.spacings.mega}*2);
`;

const overlayStyles = ({ theme }: StyleProps) => css`
  ${theme.mq.untilKilo} {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${theme.colors.overlay};
    visibility: hidden;
    opacity: 0;
    transition: opacity ${theme.transitions.default},
      visibility ${theme.transitions.default};
  }
`;

const overlayOpenStyles = ({ theme, isOpen }: StyleProps & OpenProps) =>
  isOpen &&
  css`
    ${theme.mq.untilKilo} {
      visibility: inherit;
      opacity: 1;
    }
  `;

const Overlay = styled.div<OpenProps>(overlayStyles, overlayOpenStyles);

const floatingStyles = ({ isOpen }: OpenProps) => css`
  pointer-events: ${isOpen ? 'all' : 'none'};
`;

const FloatingElement = styled.div<OpenProps>(floatingStyles);

type Divider = { type: 'divider' };
type Action = PopoverItemProps | Divider;

function isDivider(action: Action): action is Divider {
  return 'type' in action && action.type === 'divider';
}

type OnToggle = (open: boolean | ((prevOpen: boolean) => boolean)) => void;

export interface PopoverProps {
  /**
   * Determines whether the Popover is open or closed.
   */
  isOpen: boolean;
  /**
   * Function that is called when toggles the Popover.
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
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

type TriggerKey = 'ArrowUp' | 'ArrowDown';

export const Popover = ({
  isOpen = false,
  onToggle,
  actions,
  placement = 'bottom',
  fallbackPlacements = ['top', 'right', 'left'],
  component: Component,
  tracking,
  offset,
  ...props
}: PopoverProps): JSX.Element | null => {
  const theme = useTheme();
  const zIndex = useStackContext();
  const triggerKey = useRef<TriggerKey | null>(null);
  const menuEl = useRef<HTMLDivElement>(null);
  const triggerId = useMemo(() => uniqueId('trigger_'), []);
  const menuId = useMemo(() => uniqueId('popover_'), []);

  const sendEvent = useClickTrigger();

  const { x, y, reference, floating, strategy, refs, update } =
    useFloating<HTMLElement>({
      placement,
      strategy: 'fixed',
      middleware: offset
        ? [offsetMiddleware(offset), flip({ fallbackPlacements })]
        : [flip({ fallbackPlacements })],
    });

  // This is a performance optimization to prevent event listeners from being
  // re-attached on every render.
  const floatingRef = useLatest(refs.floating.current);

  const focusProps = useFocusList();
  const prevOpen = usePrevious(isOpen);

  const isMobile = window.matchMedia(`${theme.breakpoints.untilKilo}`).matches;

  const mobileStyles = {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    width: 'auto',
    zIndex: zIndex || theme.zIndex.popover,
  } as const;

  const handleToggle: OnToggle = (state) => {
    onToggle((prev) => {
      const next = isFunction(state) ? state(prev) : state;

      if (tracking && tracking.label) {
        sendEvent({
          component: 'popover',
          ...tracking,
          label: `${tracking.label}|${next ? 'open' : 'close'}`,
        });
      }

      return next;
    });
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
      <TriggerElement ref={reference}>
        <Component
          id={triggerId}
          aria-haspopup={true}
          aria-controls={menuId}
          aria-expanded={isOpen}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
        />
      </TriggerElement>
      <Portal>
        <Overlay
          isOpen={isOpen}
          style={{ zIndex: zIndex || theme.zIndex.popover }}
        />
        <FloatingElement
          {...props}
          ref={floating}
          isOpen={isOpen}
          style={
            isMobile
              ? mobileStyles
              : {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  zIndex: zIndex || theme.zIndex.popover,
                }
          }
        >
          <PopoverMenu
            id={menuId}
            ref={menuEl}
            isOpen={isOpen}
            aria-labelledby={triggerId}
            role="menu"
          >
            {actions.map((action, index) =>
              isDivider(action) ? (
                <Hr css={dividerStyles} key={index} />
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
          </PopoverMenu>
        </FloatingElement>
      </Portal>
    </Fragment>
  );
};
