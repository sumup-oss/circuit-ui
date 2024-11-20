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

import './styles/reset.css';
import './styles/base.css';

export { utilClasses } from './styles/utility.js';
export { clsx } from './styles/clsx.js';

// Typography
export { Headline } from './components/Headline/index.js';
export type { HeadlineProps } from './components/Headline/index.js';
export { Display } from './components/Display/index.js';
export type { DisplayProps } from './components/Display/index.js';
export { Title } from './components/Title/index.js';
export type { TitleProps } from './components/Title/index.js';
export { SubHeadline } from './components/SubHeadline/index.js';
export type { SubHeadlineProps } from './components/SubHeadline/index.js';
export { Body } from './components/Body/index.js';
export type { BodyProps } from './components/Body/index.js';
export { BodyLarge } from './components/BodyLarge/index.js';
export type { BodyLargeProps } from './components/BodyLarge/index.js';
export { Compact } from './components/Compact/index.js';
export type { CompactProps } from './components/Compact/index.js';
export { Numeral } from './components/Numeral/index.js';
export type { NumeralProps } from './components/Numeral/index.js';
export { Anchor } from './components/Anchor/index.js';
export type { AnchorProps } from './components/Anchor/index.js';
export { List } from './components/List/index.js';
export type { ListProps } from './components/List/index.js';

// Forms
export { Checkbox } from './components/Checkbox/index.js';
export type { CheckboxProps } from './components/Checkbox/index.js';
export { CheckboxGroup } from './components/CheckboxGroup/index.js';
export type { CheckboxGroupProps } from './components/CheckboxGroup/index.js';
export { Input } from './components/Input/index.js';
export type { InputProps, InputElement } from './components/Input/index.js';
export type { RadioButtonProps } from './components/RadioButton/index.js';
export { RadioButtonGroup } from './components/RadioButtonGroup/index.js';
export type { RadioButtonGroupProps } from './components/RadioButtonGroup/index.js';
export { SearchInput } from './components/SearchInput/index.js';
export type { SearchInputProps } from './components/SearchInput/index.js';
export { DateInput } from './components/DateInput/index.js';
export type { DateInputProps } from './components/DateInput/index.js';
export { Select } from './components/Select/index.js';
export type { SelectProps, SelectOption } from './components/Select/index.js';
export { TextArea } from './components/TextArea/index.js';
export type { TextAreaProps } from './components/TextArea/index.js';
export { CurrencyInput } from './components/CurrencyInput/index.js';
export type { CurrencyInputProps } from './components/CurrencyInput/index.js';
export { PercentageInput } from './components/PercentageInput/index.js';
export type { PercentageInputProps } from './components/PercentageInput/index.js';
export { ImageInput } from './components/ImageInput/index.js';
export type { ImageInputProps } from './components/ImageInput/index.js';
export { Calendar } from './components/Calendar/index.js';
export type { CalendarProps } from './components/Calendar/index.js';
export { updatePlainDateRange } from './util/date.js';
export type { PlainDateRange } from './util/date.js';
export { PhoneNumberInput } from './components/PhoneNumberInput/index.js';
export type { PhoneNumberInputProps } from './components/PhoneNumberInput/index.js';
export { ColorInput } from './components/ColorInput/index.js';
export type { ColorInputProps } from './components/ColorInput/index.js';

// Actions
export { Button } from './components/Button/index.js';
export type { ButtonProps } from './components/Button/index.js';
export { ButtonGroup } from './components/ButtonGroup/index.js';
export type { ButtonGroupProps } from './components/ButtonGroup/index.js';
export { CloseButton } from './components/CloseButton/index.js';
export type { CloseButtonProps } from './components/CloseButton/index.js';
export { IconButton } from './components/Button/index.js';
export type { IconButtonProps } from './components/Button/index.js';
export { Toggle } from './components/Toggle/index.js';
export type { ToggleProps } from './components/Toggle/index.js';
export type { SelectorProps } from './components/Selector/index.js';
export { SelectorGroup } from './components/SelectorGroup/index.js';
export type { SelectorGroupProps } from './components/SelectorGroup/index.js';
export type { ClickEvent } from './types/events.js';

// Notifications
export { NotificationBanner } from './components/NotificationBanner/index.js';
export type { NotificationBannerProps } from './components/NotificationBanner/index.js';
export { NotificationFullscreen } from './components/NotificationFullscreen/index.js';
export type { NotificationFullscreenProps } from './components/NotificationFullscreen/index.js';
export { useNotificationToast } from './components/NotificationToast/index.js';
export type { NotificationToastProps } from './components/NotificationToast/index.js';
export { ToastProvider } from './components/ToastContext/index.js';
export type { ToastProviderProps } from './components/ToastContext/index.js';
export { NotificationInline } from './components/NotificationInline/index.js';
export type { NotificationInlineProps } from './components/NotificationInline/index.js';

// Navigation
export { Hamburger } from './components/Hamburger/index.js';
export type { HamburgerProps } from './components/Hamburger/index.js';
export { Pagination } from './components/Pagination/index.js';
export type { PaginationProps } from './components/Pagination/index.js';
export {
  TopNavigation,
  TOP_NAVIGATION_HEIGHT,
} from './components/TopNavigation/index.js';
export type { TopNavigationProps } from './components/TopNavigation/index.js';
export { SideNavigation } from './components/SideNavigation/index.js';
export type {
  SideNavigationProps,
  PrimaryLinkProps,
  SecondaryGroupProps,
  SecondaryLinkProps,
} from './components/SideNavigation/index.js';
export { Tabs, TabList, TabPanel, Tab } from './components/Tabs/index.js';
export type {
  TabsProps,
  TabListProps,
  TabPanelProps,
  TabProps,
} from './components/Tabs/index.js';

// Miscellaneous
export { Spinner } from './components/Spinner/index.js';
export type { SpinnerProps } from './components/Spinner/index.js';
export { Badge } from './components/Badge/index.js';
export type { BadgeProps } from './components/Badge/index.js';
export {
  Card,
  CardHeader,
  CardFooter,
} from './components/Card/index.js';
export type {
  CardProps,
  CardHeaderProps,
  CardFooterProps,
} from './components/Card/index.js';
export { Hr } from './components/Hr/index.js';
export { Image } from './components/Image/index.js';
export type { ImageProps } from './components/Image/index.js';
export { ProgressBar } from './components/ProgressBar/index.js';
export type { ProgressBarProps } from './components/ProgressBar/index.js';
export { Tag } from './components/Tag/index.js';
export type { TagProps } from './components/Tag/index.js';
export { Popover } from './components/Popover/index.js';
export type {
  PopoverProps,
  PopoverItemProps,
} from './components/Popover/index.js';
export { ModalProvider } from './components/ModalContext/index.js';
export type { ModalProviderProps } from './components/ModalContext/index.js';
export { useModal } from './components/Modal/index.js';
export type { ModalProps } from './components/Modal/index.js';
export { useNotificationModal } from './components/NotificationModal/index.js';
export type { NotificationModalProps } from './components/NotificationModal/index.js';
export { ListItem } from './components/ListItem/index.js';
export type { ListItemProps } from './components/ListItem/index.js';
export { ListItemGroup } from './components/ListItemGroup/index.js';
export type { ListItemGroupProps } from './components/ListItemGroup/index.js';
export {
  SidePanelProvider,
  useSidePanel,
  SIDE_PANEL_WIDTH,
} from './components/SidePanel/index.js';
export type {
  SidePanelProviderProps,
  SidePanelHookProps,
} from './components/SidePanel/index.js';

export { Table } from './components/Table/index.js';
export type {
  TableProps,
  TableSortDirection,
  TableSortByValue,
  TableHeaderCell,
  TableRowCell,
  TableCell,
  TableRow,
} from './components/Table/index.js';

export { Step, useStep } from './components/Step/index.js';
export type { StepProps, StepOptions } from './components/Step/index.js';
export { AspectRatio } from './components/AspectRatio/index.js';
export type { AspectRatioProps } from './components/AspectRatio/index.js';
export {
  Carousel,
  CarouselComposer,
} from './components/Carousel/index.js';
export type { CarouselProps } from './components/Carousel/index.js';
export { Avatar } from './components/Avatar/index.js';
export type { AvatarProps } from './components/Avatar/index.js';

export {
  ComponentsContext,
  useComponents,
} from './components/ComponentsContext/index.js';
export type { ComponentsContextType } from './components/ComponentsContext/index.js';
export {
  Tooltip,
  type TooltipProps,
  type TooltipReferenceProps,
} from './components/Tooltip/index.js';
export {
  Toggletip,
  type ToggletipProps,
} from './components/Toggletip/index.js';

// Hooks
export { useClickOutside } from './hooks/useClickOutside/index.js';
export { useEscapeKey } from './hooks/useEscapeKey/index.js';
export { useFocusList } from './hooks/useFocusList/index.js';
export { useCollapsible } from './hooks/useCollapsible/index.js';
export { useSwipe } from './hooks/useSwipe/index.js';
export { useMedia } from './hooks/useMedia/index.js';
