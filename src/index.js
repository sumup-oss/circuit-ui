import * as themes from './themes';
import * as numbers from './util/numbers';
import * as currency from './util/currency';

// FIXME: these exports don't work unless we introduce a babel
//        transform. This is future ES syntax.

// Typography
export { default as Heading } from './components/Heading';
export { default as SubHeading } from './components/SubHeading';
export { default as Text } from './components/Text';

// Forms
export { default as FormLabel } from './components/FormLabel';
export { default as Input } from './components/Input';
export { default as SearchInput } from './components/SearchInput';
export { default as PasswordInput } from './components/PasswordInput';
export { default as TextArea } from './components/TextArea';

// Actions
export { default as Button } from './components/Button';
export { default as SvgButton } from './components/SvgButton';
export { default as Toggle } from './components/Toggle';

// Misc
export { default as Price } from './components/Price';

export { themes, numbers, currency };
