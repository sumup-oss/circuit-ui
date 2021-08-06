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

import { css } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';
import {
  FC,
  Fragment,
  HTMLProps,
  Ref,
  SVGProps,
  useEffect,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
} from 'react';
import useLatest from 'use-latest';
import usePrevious from 'use-previous';
import { Dispatch as TrackingProps } from '@sumup/collector';
import { usePopper } from 'react-popper';
import { Placement, State, Modifier } from '@popperjs/core';
import { useTheme } from 'emotion-theming';

import { ClickEvent } from '../../types/events';
import styled, { StyleProps } from '../../styles/styled';
import { listItem, shadow, typography } from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { useClickEvent } from '../../hooks/useClickEvent';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useFocusList } from '../../hooks/useFocusList';
import { isArrowDown, isArrowUp } from '../../util/key-codes';
import { useComponents } from '../ComponentsContext';
import Portal from '../Portal';
import Hr from '../Hr';
import { useStackContext } from '../StackContext';

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
   * Display an icon in addition to the label.
   */
  icon?: FC<SVGProps<SVGSVGElement>>;
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
  ref?: Ref<any>;
}

type LinkElProps = Omit<
  HTMLProps<HTMLAnchorElement>,
  'size' | 'type' | 'onClick'
>;
type ButtonElProps = Omit<
  HTMLProps<HTMLButtonElement>,
  'size' | 'type' | 'onClick'
>;

export type PopoverItemProps = BaseProps & LinkElProps & ButtonElProps;
type PopoverItemWrapperProps = LinkElProps & ButtonElProps;

const itemWrapperStyles = () => css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const PopoverItemWrapper = styled('button')<PopoverItemWrapperProps>(
  listItem,
  itemWrapperStyles,
  typography('one'),
);

const iconStyles = (theme: Theme) => css`
  margin-right: ${theme.spacings.byte};
`;

export const PopoverItem = ({
  children,
  icon: Icon,
  onClick,
  tracking,
  ...props
}: PopoverItemProps): JSX.Element => {
  const components = useComponents();

  // Need to typecast here because the styled component types restrict the
  // `as` prop to a string. It's safe to ignore that constraint here.
  const Link = (components.Link as unknown) as string;

  const handleClick = useClickEvent(onClick, tracking, 'popover-item');

  return (
    <PopoverItemWrapper
      as={props.href ? Link : 'button'}
      onClick={handleClick}
      role="menuitem"
      {...props}
    >
      {Icon && <Icon css={iconStyles} />}
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

  ${theme.mq.untilKilo} {
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
    visibility: visible;

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
    pointer-events: none;
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
      visibility: visible;
      opacity: 1;
    }
  `;

const Overlay = styled.div<OpenProps>(overlayStyles, overlayOpenStyles);

const popperStyles = ({ isOpen }: OpenProps) => css`
  pointer-events: ${isOpen ? 'all' : 'none'};
`;

const Popper = styled.div<OpenProps>(popperStyles);

type Divider = { type: 'divider' };
type Action = PopoverItemProps | Divider;

function isDivider(action: Action): action is Divider {
  return 'type' in action && action.type === 'divider';
}

export interface PopoverProps {
  /**
   * Determines whether the Popover is open or closed.
   */
  isOpen: boolean;
  /**
   * Function that is called when toggles the Popover.
   */
  onToggle: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
  /**
   * An array of PopoverItem or Divider.
   */
  actions: Action[];
  /**
   * One of the accepted placement values. Defaults to bottom.
   */
  placement?: Placement;
  /**
   * The placements to fallback to when there is not enough space for the
   * Popover. Defaults to ['top', 'right', 'left'].
   */
  fallbackPlacements?: Placement[];
  /**
   * Modifiers are plugins for Popper.js to modify its default behavior.
   * [Read the docs](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers?: Partial<Modifier<string, Record<string, unknown>>>[];
  /**
   * The element that toggles the Popover when clicked.
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

export const Popover = ({
  isOpen = false,
  onToggle,
  actions,
  placement = 'bottom',
  fallbackPlacements = ['top', 'right', 'left'],
  component: Component,
  modifiers = [],
  ...props
}: PopoverProps): JSX.Element | null => {
  const theme = useTheme<Theme>();
  const zIndex = useStackContext();
  const triggerKey = useRef<TriggerKey | null>(null);
  const triggerEl = useRef<HTMLDivElement>(null);
  const menuEl = useRef<HTMLDivElement>(null);
  const triggerId = useMemo(() => uniqueId('trigger_'), []);
  const menuId = useMemo(() => uniqueId('popover_'), []);

  // Popper custom modifier to apply bottom sheet for mobile.
  // The window.matchMedia() is a useful API for this, it allows you to change the styles based on a condition.
  // useMemo hook is used in order to prevent the render loop, more https://popper.js.org/react-popper/v2/faq/#why-i-get-render-loop-whenever-i-put-a-function-inside-the-popper-configuration
  const mobilePosition: Modifier<'mobilePosition', { state: State }> = useMemo(
    () => ({
      name: 'mobilePosition',
      enabled: true,
      phase: 'write',
      fn({ state }) {
        if (window.matchMedia(`${theme.breakpoints.untilKilo}`).matches) {
          // eslint-disable-next-line no-param-reassign
          state.styles.popper = {
            width: '100%',
            left: '0px',
            right: '0px',
            bottom: '0px',
            position: 'fixed',
            zIndex: (zIndex || theme.zIndex.popover).toString(),
          };
        } else {
          // eslint-disable-next-line no-param-reassign
          state.styles.popper.width = 'auto';
          // eslint-disable-next-line no-param-reassign
          state.styles.popper.zIndex = (
            zIndex || theme.zIndex.popover
          ).toString();
        }
      },
    }),
    [theme, zIndex],
  );

  // The flip modifier is used if the popper has placement set to bottom, but there isn't enough space to position the popper in that direction.
  // By default, it will change the popper placement to top. More at https://popper.js.org/docs/v2/modifiers/flip/
  const flip = {
    name: 'flip',
    options: {
      fallbackPlacements,
    },
  };

  // Note: the usePopper hook intentionally takes the DOM node, not refs, in order to be able to update when the nodes change.
  // A callback ref is used here to permit this behaviour, and useState is an appropriate way to implement this.
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(triggerEl.current, popperElement, {
    placement,
    modifiers: [mobilePosition, flip, ...modifiers],
  });

  // This is a performance optimization to prevent event listeners from being
  // re-attached on every render.
  const popperRef = useLatest(popperElement);

  useEscapeKey(() => onToggle(false), isOpen);
  useClickOutside(popperRef, () => onToggle(false), isOpen);

  const prevOpen = usePrevious(isOpen);

  useEffect(() => {
    // Focus the first or last element after opening
    if (!prevOpen && isOpen) {
      const element = (triggerKey.current && triggerKey.current === 'ArrowUp'
        ? menuEl.current && menuEl.current.lastElementChild
        : menuEl.current && menuEl.current.firstElementChild) as HTMLElement;
      if (element) {
        element.focus();
      }
    }

    // Focus the trigger button after closing
    if (prevOpen && !isOpen) {
      const triggerButton = (triggerEl.current &&
        triggerEl.current.firstElementChild) as HTMLElement;
      triggerButton.focus();
    }

    triggerKey.current = null;
  }, [isOpen, prevOpen]);

  const focusProps = useFocusList();

  const handleTriggerClick = (event: ClickEvent) => {
    // This prevents the event from bubbling which would trigger the
    // useClickOutside above and would prevent the popover from closing.
    event.stopPropagation();
    onToggle((prev) => !prev);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (isArrowDown(event)) {
      triggerKey.current = 'ArrowDown';
      onToggle(true);
    }
    if (isArrowUp(event)) {
      triggerKey.current = 'ArrowUp';
      onToggle((prev) => !prev);
    }
  };

  return (
    <Fragment>
      <TriggerElement ref={triggerEl}>
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
        <Popper
          {...props}
          ref={setPopperElement}
          isOpen={isOpen}
          style={styles.popper}
          {...attributes.popper}
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
                <PopoverItem key={index} {...action} {...focusProps} />
              ),
            )}
          </PopoverMenu>
        </Popper>
      </Portal>
    </Fragment>
  );
};
