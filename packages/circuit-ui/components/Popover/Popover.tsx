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
import {
  useState,
  FC,
  HTMLProps,
  ReactNode,
  SVGProps,
  MouseEvent,
} from 'react';
import { Dispatch as TrackingProps } from '@sumup/collector';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';

import styled, { StyleProps } from '../../styles/styled';
import { listItem } from '../../styles/style-mixins';
import { useComponents } from '../ComponentsContext';
import useClickHandler from '../../hooks/use-click-handler';
import Hr from '../Hr';

export interface BaseProps {
  children: ReactNode;
  /**
   * Display an icon in addition to the label.
   */
  icon: FC<SVGProps<SVGSVGElement>>;
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
  width: 100%;
`;

const PopoverItemWrapper = styled('button')<PopoverItemWrapperProps>(
  listItem,
  itemWrapperStyles,
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
}: PopoverItemProps) => {
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
  align-items: flex-start;
  padding: ${theme.spacings.byte};
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
  border-radius: ${theme.spacings.byte};

  ::before {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
`;

const PopoverWrapper = styled('div')(wrapperStyles);

type Divider = { type: 'divider' };
type Action = PopoverItemProps | Divider;

function isDivider(action: Action): action is Divider {
  return 'type' in action && action.type === 'divider';
}

export interface PopoverProps {
  isOpen: boolean;
  actions: [];
  referenceElement: HTMLElement | null;
  placement: Placement;
  handleClose: () => any;
}

export const Popover = ({
  isOpen,
  handleClose,
  actions,
  referenceElement,
  placement = 'bottom',
  ...props
}: PopoverProps) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <PopoverWrapper
      {...props}
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
    >
      {actions.map((action, index) =>
        isDivider(action) ? <Hr /> : <PopoverItem key={index} {...action} />,
      )}
    </PopoverWrapper>
  );
};
