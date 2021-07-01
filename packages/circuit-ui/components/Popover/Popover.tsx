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
  useState,
  FC,
  HTMLProps,
  SVGProps,
  MouseEvent,
  KeyboardEvent,
  Fragment,
  useMemo,
  Ref,
  useRef,
  useEffect,
} from 'react';
import { useClickAway, useLatest } from 'react-use';
import { Dispatch as TrackingProps } from '@sumup/collector';
import { usePopper } from 'react-popper';
import { Placement, State, Modifier } from '@popperjs/core';
import { useTheme } from 'emotion-theming';

import styled, { StyleProps } from '../../styles/styled';
import { listItem, shadow, typography } from '../../styles/style-mixins';
import { isEscape } from '../../util/key-codes';
import { useComponents } from '../ComponentsContext';
import { useClickHandler } from '../../hooks/useClickHandler';
import Hr from '../Hr';
import { uniqueId } from '../../util/id';

export interface BaseProps {
  /**
   * The Popover item label.
   */
  children: string;
  /**
   * Function that's called when the item is clicked.
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
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
   * The ref to the HTML DOM element, can be a button or an anchor.
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
  label: popover-item;
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
  label: popover__icon;
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

  // Need to typecast here because the PopoverItemWrapper expects a button-like
  // component for its `as` prop. It's safe to ignore that constraint here.
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const Link = components.Link as any;

  const handleClick = useClickHandler<MouseEvent | KeyboardEvent>(
    onClick,
    tracking,
    'popover-item',
  );

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

const wrapperStyles = ({ theme }: StyleProps) => css`
  label: popover;
  padding: ${theme.spacings.byte} 0px;
  border: 1px solid ${theme.colors.n200};
  box-sizing: border-box;
  border-radius: ${theme.borderRadius.byte};
  background-color: ${theme.colors.white};

  ${theme.mq.untilKilo} {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const PopoverWrapper = styled('div')(wrapperStyles, shadow);

const dividerStyles = (theme: Theme) => css`
  margin: ${theme.spacings.byte} ${theme.spacings.mega};
  width: calc(100% - ${theme.spacings.mega}*2);
`;

const Overlay = styled.div(
  ({ theme }: StyleProps) => css`
    ${theme.mq.untilKilo} {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: ${theme.colors.overlay};
      pointer-events: none;
    }
  `,
);

type Divider = { type: 'divider' };
type Action = PopoverItemProps | Divider;

function isDivider(action: Action): action is Divider {
  return 'type' in action && action.type === 'divider';
}

export interface PopoverProps {
  /**
   * Determines whether the Popover is opened or closed.
   */
  isOpen: boolean;
  /**
   * Function that is called when toggles the Popover.
   */
  toggleOpen: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
  /**
   * An array of PopoverItem or Divider.
   */
  actions: Action[];
  /**
   * One of the accepted placement values. Defaults to bottom.
   */
  placement?: Placement;
  /**
   * The placements to fallback to when there is not enough space for the Popover. Defaults to ['top', 'right', 'left'].
   */
  fallbackPlacements?: Placement[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  modifiers?: Modifier<string, object>[];
  /**
   * The element that toggles the Popover when clicked.
   */
  component: (props: {
    'onClick': (event: MouseEvent | KeyboardEvent) => void;
    'id': string;
    'aria-haspopup': boolean;
    'aria-controls': string;
    'aria-expanded': boolean;
  }) => JSX.Element;
}

export const Popover = ({
  isOpen = false,
  toggleOpen,
  actions,
  placement = 'bottom',
  fallbackPlacements = ['top', 'right', 'left'],
  component: Component,
  modifiers = [],
  ...props
}: PopoverProps): JSX.Element | null => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme<Theme>();
  const id = uniqueId('popover_');
  const triggerId = uniqueId('trigger_');

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
          };
        } else {
          // eslint-disable-next-line no-param-reassign
          state.styles.popper.width = 'auto';
        }
      },
    }),
    [theme],
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
  const { styles, attributes } = usePopper(triggerRef.current, popperElement, {
    placement,
    modifiers: [mobilePosition, flip, ...modifiers],
  });

  // This is a performance optimization to prevent event listeners from being
  // re-attached on every render.
  const popperRef = useLatest(popperElement);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const handleEscapePress = (event: Event) => {
      if (isEscape(event)) {
        toggleOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapePress);
    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [isOpen, toggleOpen]);

  useClickAway(popperRef, (event) => {
    // The reference element has its own click handler to toggle the popover.
    if (
      !triggerRef.current ||
      triggerRef.current.contains(event.target as Node)
    ) {
      return;
    }
    toggleOpen(false);
  });

  return (
    <Fragment>
      <div ref={triggerRef}>
        <Component
          id={triggerId}
          aria-haspopup={true}
          aria-controls={id}
          aria-expanded={isOpen}
          onClick={() => toggleOpen((prev) => !prev)}
        />
      </div>
      {isOpen && (
        <Fragment>
          <Overlay />
          <PopoverWrapper
            id={id}
            {...props}
            ref={setPopperElement}
            style={styles.popper}
            aria-labelledby={triggerId}
            role="menu"
            {...attributes.popper}
          >
            {actions.map((action, index) =>
              isDivider(action) ? (
                <Hr css={dividerStyles} key={index} />
              ) : (
                <PopoverItem key={index} {...action} />
              ),
            )}
          </PopoverWrapper>
        </Fragment>
      )}
    </Fragment>
  );
};
