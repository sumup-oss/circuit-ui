/**
 * Copyright 2019, SumUp Ltd.
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

import * as sharedPropTypes from './util/shared-prop-types';

// Typography
export { default as Headline } from './components/Headline';
export type { HeadlineProps } from './components/Headline';
export { default as Title } from './components/Title';
export type { TitleProps } from './components/Title';
export { default as SubHeadline } from './components/SubHeadline';
export type { SubHeadlineProps } from './components/SubHeadline';
export { default as Body } from './components/Body';
export type { BodyProps } from './components/Body';
export { default as BodyLarge } from './components/BodyLarge';
export type { BodyLargeProps } from './components/BodyLarge';
export { default as Anchor } from './components/Anchor';
export type { AnchorProps } from './components/Anchor';
export { default as List } from './components/List';
export type { ListProps } from './components/List';

// Forms
export {
  RangePicker,
  RangePickerController,
  SingleDayPicker,
  CalendarConstants,
} from './components/Calendar';
export { default as CalendarTag } from './components/CalendarTag';
export { default as CalendarTagTwoStep } from './components/CalendarTagTwoStep';
export { default as Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';
export { default as Input } from './components/Input';
export type { InputProps, InputElement } from './components/Input';
export { default as RadioButton } from './components/RadioButton';
export type { RadioButtonProps } from './components/RadioButton';
export { default as RadioButtonGroup } from './components/RadioButtonGroup';
export type { RadioButtonGroupProps } from './components/RadioButtonGroup';
export { default as SearchInput } from './components/SearchInput';
export type { SearchInputProps } from './components/SearchInput';
export { default as DateInput } from './components/DateInput';
export type { DateInputProps } from './components/DateInput';
export { default as Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';
export { default as TextArea } from './components/TextArea';
export type { TextAreaProps } from './components/TextArea';
export { default as CurrencyInput } from './components/CurrencyInput';
export type { CurrencyInputProps } from './components/CurrencyInput';
export { default as ImageInput } from './components/ImageInput';
export type { ImageInputProps } from './components/ImageInput';

// Actions
export { default as Button } from './components/Button';
export type { ButtonProps } from './components/Button';
export { default as ButtonGroup } from './components/ButtonGroup';
export type { ButtonGroupProps } from './components/ButtonGroup';
export { default as CloseButton } from './components/CloseButton';
export type { CloseButtonProps } from './components/CloseButton';
export { default as IconButton } from './components/IconButton';
export type { IconButtonProps } from './components/IconButton';
export { default as Toggle } from './components/Toggle';
export type { ToggleProps } from './components/Toggle';
export { default as Selector } from './components/Selector';
export type { SelectorProps } from './components/Selector';
export { default as SelectorGroup } from './components/SelectorGroup';
export type { SelectorGroupProps } from './components/SelectorGroup';
export type { ClickEvent } from './types/events';

// Notifications
export { default as NotificationBanner } from './components/NotificationBanner';
export type { NotificationBannerProps } from './components/NotificationBanner';
export { default as NotificationFullscreen } from './components/NotificationFullscreen';
export type { NotificationFullscreenProps } from './components/NotificationFullscreen';
export { useNotificationToast } from './components/NotificationToast';
export type { NotificationToastProps } from './components/NotificationToast';
export { ToastProvider } from './components/ToastContext';
export type { ToastProviderProps } from './components/ToastContext';
export { default as NotificationInline } from './components/NotificationInline';
export type { NotificationInlineProps } from './components/NotificationInline';

// Layout
export { Grid, Row, Col } from './components/Grid';
export type { ColProps } from './components/Grid';
export { default as InlineElements } from './components/InlineElements';
export type { InlineElementsProps } from './components/InlineElements';

// Navigation
export { default as Hamburger } from './components/Hamburger';
export type { HamburgerProps } from './components/Hamburger';
export { default as Header } from './components/Header';
export type { HeaderProps } from './components/Header';
export { default as Pagination } from './components/Pagination';
export type { PaginationProps } from './components/Pagination';
export {
  TopNavigation,
  TOP_NAVIGATION_HEIGHT,
} from './components/TopNavigation';
export type { TopNavigationProps } from './components/TopNavigation';
export { SideNavigation } from './components/SideNavigation';
export type {
  SideNavigationProps,
  PrimaryLinkProps,
  SecondaryGroupProps,
  SecondaryLinkProps,
} from './components/SideNavigation';
export { Tabs, TabList, TabPanel, Tab } from './components/Tabs';
export { default as Sidebar } from './components/Sidebar';
export {
  SidebarContextProvider,
  SidebarContextConsumer,
} from './components/Sidebar';

// Misc
export { default as Spinner } from './components/Spinner';
export type { SpinnerProps } from './components/Spinner';
export { default as Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';
export { default as Card, CardHeader, CardFooter } from './components/Card';
export type {
  CardProps,
  CardHeaderProps,
  CardFooterProps,
} from './components/Card';
export { default as Hr } from './components/Hr';
export { default as Image } from './components/Image';
export type { ImageProps } from './components/Image';
export { default as ProgressBar } from './components/ProgressBar';
export type { ProgressBarProps } from './components/ProgressBar';
export { default as Tag } from './components/Tag';
export type { TagProps } from './components/Tag';
export { default as Popover } from './components/Popover';
export type { PopoverProps, PopoverItemProps } from './components/Popover';
export { default as Tooltip } from './components/Tooltip';
export type { TooltipProps } from './components/Tooltip';
export { default as BaseStyles } from './components/BaseStyles';
export { ModalProvider } from './components/ModalContext';
export type { ModalProviderProps } from './components/ModalContext';
export { useModal } from './components/Modal';
export type { ModalProps } from './components/Modal';
export { useNotificationModal } from './components/NotificationModal';
export type { NotificationModalProps } from './components/NotificationModal';
export { default as ListItem } from './components/ListItem';
export type { ListItemProps } from './components/ListItem';
export { default as ListItemGroup } from './components/ListItemGroup';
export type { ListItemGroupProps } from './components/ListItemGroup';
export {
  SidePanelProvider,
  useSidePanel,
  SIDE_PANEL_WIDTH,
} from './components/SidePanel';
export type {
  SidePanelProviderProps,
  SidePanelHookProps,
} from './components/SidePanel';

export { default as Table } from './components/Table';
export type {
  TableProps,
  TableSortDirection,
  TableSortByValue,
  TableHeaderCell,
  TableRowCell,
  TableCell,
  TableRow,
} from './components/Table';

export { default as Step, useStep } from './components/Step';
export type { StepProps, StepOptions } from './components/Step';
export { default as AspectRatio } from './components/AspectRatio';
export { default as Carousel, CarouselComposer } from './components/Carousel';
export { default as Avatar } from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

export {
  ComponentsContext,
  useComponents,
} from './components/ComponentsContext';
export type { ComponentsContextType } from './components/ComponentsContext';

export {
  cx,
  spacing,
  shadow,
  disableVisually,
  hideVisually,
  focusOutline,
  focusVisible,
  clearfix,
  hideScrollbar,
  inputOutline,
  typography,
  center,
} from './styles/style-mixins';

export { sharedPropTypes };
export { uniqueId } from './util/id';

// Hooks
export { useClickOutside } from './hooks/useClickOutside';
export { useEscapeKey } from './hooks/useEscapeKey';
export { useFocusList } from './hooks/useFocusList';
export { useCollapsible } from './hooks/useCollapsible';

// Experimental
export { DatePicker } from './components/DatePicker';
export type { DatePickerProps } from './components/DatePicker';
