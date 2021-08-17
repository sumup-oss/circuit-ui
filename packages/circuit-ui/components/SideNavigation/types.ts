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

import { HTMLProps, FC, MouseEvent, KeyboardEvent } from 'react';
import { Dispatch as TrackingProps } from '@sumup/collector';
import { IconProps } from '@sumup/icons';

import { BadgeProps } from '../Badge';

export interface PrimaryLinkProps extends HTMLProps<HTMLAnchorElement> {
  /**
   * Display an icon in addition to the text to help to identify the link.
   * On narrow viewports, only the icon is displayed.
   */
  icon: FC<IconProps>;
  /**
   * Short label to describe the target of the link.
   */
  label: string;
  /**
   * Function that's called when the link is clicked.
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * Whether the link is the currently active page.
   */
  isActive?: boolean;
  /**
   * Whether the link is the currently active page.
   */
  isExternal?: boolean;
  /**
   * Whether to show a small circular badge to indicate that a nested secondary
   * link has a badge.
   */
  badge?: boolean;
  /**
   * A collection of secondary groups with nested secondary navigation links.
   */
  secondaryGroups?: SecondaryGroupProps[];
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

export interface SecondaryGroupProps {
  /**
   * A label that is displayed above the secondary navigation. Only optional
   * for the first group.
   */
  label?: string;
  /**
   * A collection of secondary navigation links.
   */
  secondaryLinks: SecondaryLinkProps[];
  /**
   * An optional label that is added to the element tree when clicking a nested
   * secondary navigation link.
   */
  trackingLabel?: string;
}

export interface SecondaryLinkProps {
  /**
   * Short label to describe the target of the link.
   */
  label: string;
  /**
   * A valid path or URL to the link target.
   */
  href: string;
  /**
   * Function that's called when the link is clicked.
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * Whether the link is the currently active page.
   */
  isActive?: boolean;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * An optional badge to highlight the secondary link, e.g. to promote
   * a new link or to indicate new content.
   */
  badge?: BadgeProps;
}
