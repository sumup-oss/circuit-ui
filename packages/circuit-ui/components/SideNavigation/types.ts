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

import type {
  MouseEvent,
  KeyboardEvent,
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';
import type { IconComponentType } from '@sumup-oss/icons';

export interface NavigationItem
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  isActive?: boolean;
  externalLabel?: string;
}

type WithSecondaryItems = {
  /** Nested secondary navigation items */
  readonly secondaryItems: readonly NavigationItem[];
  readonly href?: never;
};

type WithLink = {
  readonly secondaryItems?: never;
  /** Link destination for primary navigation */
  readonly href: string;
};

export type PrimaryNavigationItem = Omit<NavigationItem, 'href'> & {
  icon: IconComponentType;
  activeIcon: IconComponentType;
} & (WithSecondaryItems | WithLink);

export interface NavigationGroup {
  label: string;
  hideLabel?: boolean;
  id: string;
  items: PrimaryNavigationItem[];
}

export interface SideNavigationProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the navigation data is loading.
   */
  isLoading?: boolean;
  /**
   * Text label for the navigation modal.
   * Important for accessibility.
   */
  label: string;
  /**
   * Whether the modal navigation is open.
   */
  isOpen: boolean;
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  closeButtonLabel?: string;
  /**
   * Callback function invoked when the modal closes.
   */
  onClose?: () => void;
  /**
   * Hash link to the page's main content to enable keyboard and screen reader
   * users to skip over the navigation links. Required to comply with
   * [WCAG 2.1 SC 2.4.1](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)
   */
  skipNavigationHref?: string;
  /**
   * label for the skip navigation link.
   */
  skipNavigationLabel?: string;
  /**
   * Collections of links to be displayed as navigation.
   * Each group should have a label and a unique id.
   * If you have only one group and wish to omit the label, use `hideLabel: true`
   */
  groups: NavigationGroup[];
  /**
   * An optional logo to display in the navigation.
   */
  logo?: ReactNode;
}
