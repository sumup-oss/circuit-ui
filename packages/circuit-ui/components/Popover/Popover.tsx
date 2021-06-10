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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';
import React, {
  useState,
  FC,
  HTMLProps,
  ReactNode,
  SVGProps,
  MouseEvent,
  Fragment,
  useMemo,
  RefObject,
} from 'react';
import { useClickAway, useLatest } from 'react-use';
import { Dispatch as TrackingProps } from '@sumup/collector';
import { usePopper } from 'react-popper';
import { Placement, State, Modifier } from '@popperjs/core';
import { useTheme } from 'emotion-theming';

import styled, { StyleProps } from '../../styles/styled';
import { listItem, textMega } from '../../styles/style-mixins';
import { useComponents } from '../ComponentsContext';
import useClickHandler from '../../hooks/use-click-handler';
import Hr from '../Hr';

export interface BaseProps {
  children: ReactNode;
  /**
   * Display an icon in addition to the label.
   */
  icon?: FC<SVGProps<SVGSVGElement>>;

  destructive?: boolean;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * The ref to the html dom element, it can be a button an anchor or a span, typed as any for now because of complex js manipulation with styled components
   */
  ref?: React.Ref<HTMLButtonElement & HTMLAnchorElement>;
}

type LinkElProps = Omit<HTMLProps<HTMLAnchorElement>, 'size' | 'type'>;
type ButtonElProps = Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type'>;

export type PopoverItemProps = BaseProps & LinkElProps & ButtonElProps;
type PopoverItemWrapperProps = LinkElProps & ButtonElProps;

const itemWrapperStyles = () => css`
  label: popover-item;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const PopoverItemWrapper = styled('button')<PopoverItemWrapperProps>(
  listItem,
  itemWrapperStyles,
  textMega,
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

  const handleClick = useClickHandler<MouseEvent<any>>(
    onClick,
    tracking,
    'popover-item',
  );

  return (
    <PopoverItemWrapper
      as={props.href ? Link : 'button'}
      onClick={handleClick}
      {...props}
    >
      {Icon && <Icon css={iconStyles} />}
      {children}
    </PopoverItemWrapper>
  );
};

const wrapperStyles = ({ theme }: StyleProps) => css`
  label: popover;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding: ${theme.spacings.byte} 0px;
  border: 1px solid ${theme.colors.n200};
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: ${theme.colors.white};

  ${theme.mq.untilKilo} {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const PopoverWrapper = styled('div')(wrapperStyles);

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
    }
  `,
);

type Divider = { type: 'divider' };
type Action = PopoverItemProps | Divider;

function isDivider(action: Action): action is Divider {
  return 'type' in action && action.type === 'divider';
}

export interface PopoverProps {
  isOpen: boolean;
  actions: Action[];
  referenceElement: RefObject<HTMLElement>;
  placement?: Placement;
  onClose: (event: Event) => void;
}

export const Popover = ({
  isOpen,
  onClose,
  actions,
  referenceElement,
  placement = 'bottom',
  ...props
}: PopoverProps): JSX.Element | null => {
  const theme: Theme = useTheme();

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
  // Note: the usePopper hook intentionally takes the DOM node, not refs, in order to be able to update when the nodes change.
  // A callback ref is used here to permit this behaviour, and useState is an appropriate way to implement this.
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement,
    {
      placement,
      modifiers: [
        mobilePosition,
        // The flip modifier is used if the popper has placement set to bottom, but there isn't enough space to position the popper in that direction.
        // By default, it will change the popper placement to top. As soon as enough space is detected, the placement will be reverted to the originally defined (or preferred) one.
        // You can also define fallback placements by providing a list of placements to try. When no space is available on the preferred placement, the modifier will test the ones provided in the list, and use the first useful one.
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top', 'right', 'left'],
          },
        },
      ],
    },
  );

  // This is a performance optimization to prevent event listeners from being
  // re-attached on every render.
  const popperRef = useLatest(popperElement);

  useClickAway(popperRef, (event) => {
    // The reference element has its own click handler to toggle the popover.
    if (
      !referenceElement.current ||
      referenceElement.current.contains(event.target as Node)
    ) {
      return;
    }
    onClose(event);
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Fragment>
      <Overlay />
      <PopoverWrapper
        {...props}
        ref={setPopperElement}
        style={styles.popper}
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
  );
};
