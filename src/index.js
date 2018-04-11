import {
  // Utils for CardNumberInput
  parseCardNumber,
  isValidCardNumber,
  isAcceptedCardScheme,
  normalizeCardNumber,
  detectCardScheme,
  // Utils for ExpiryDateInput
  parseExpiryDate,
  isFutureDate,
  isCompleteMonth,
  isCompleteYear,
  normalizeExpiryDate,
  // Utils for SecurityCodeInput
  parseSecurityCode,
  isValidSecurityCode,
  // Misc
  schemes as ALL_CARD_SCHEMES
} from './components/CreditCardDetails';

const cardNumberUtils = {
  isValidCardNumber,
  isAcceptedCardScheme,
  parseCardNumber,
  normalizeCardNumber,
  detectCardScheme
};

const expiryDateUtils = {
  parseExpiryDate,
  isFutureDate,
  isCompleteMonth,
  isCompleteYear,
  normalizeExpiryDate,
  detectCardScheme
};

const securityCodeUtils = {
  parseSecurityCode,
  isValidSecurityCode,
  detectCardScheme
};

// Typography
export { default as Heading } from './components/Heading';
export { default as List } from './components/List';
// export { default as Markdown } from './components/Markdown';
export { default as SubHeading } from './components/SubHeading';
export { default as Text } from './components/Text';

// Forms
export { default as Checkbox } from './components/Checkbox';
export { default as CheckboxGroup } from './components/CheckboxGroup';
export { default as Label } from './components/Label';
export { default as Input } from './components/Input';
export { default as RadioButton } from './components/RadioButton';
export { default as RadioButtonGroup } from './components/RadioButtonGroup';
export { default as SearchInput } from './components/SearchInput';
export { default as Select } from './components/Select';
export { default as TextArea } from './components/TextArea';

// Actions
export {
  default as Button,
  MessageIcon,
  MessageButton
} from './components/Button';

export { default as ButtonGroup } from './components/ButtonGroup';
export { default as CloseButton } from './components/CloseButton';
export { default as SvgButton } from './components/SvgButton';
export { default as Toggle } from './components/Toggle';

// Notifications
export { default as Message } from './components/Message';
export { default as NotificationBanner } from './components/NotificationBanner';
export { default as NotificationList } from './components/NotificationList';

// Misc
export { default as Badge } from './components/Badge';
export { default as Card, CardHeader, CardFooter } from './components/Card';
export { default as Image } from './components/Image';
export { default as LoadingBar } from './components/LoadingBar';
export { default as Tag } from './components/Tag';
export { default as Tooltip } from './components/Tooltip';
export { default as Modal, ModalProvider } from './components/Modal';
export { default as Picture } from './components/Picture';
export {
  default as CreditCardDetails,
  CardNumberInput,
  cardSchemeIcons,
  NameOnCardInput,
  SecurityCodeInput,
  ExpiryDateInput
} from './components/CreditCardDetails';
export {
  cardNumberUtils,
  expiryDateUtils,
  securityCodeUtils,
  ALL_CARD_SCHEMES
};
// Helpers
export { default as State } from './components/State';
