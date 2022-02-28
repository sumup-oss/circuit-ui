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

import {
  Transform,
  JSCodeshift,
  Collection,
  JSXAttribute,
  StringLiteral,
  JSXIdentifier,
} from 'jscodeshift';

import { findImportsByPath, findStyledComponentNames } from './utils';

// [old icon name, new icon name, product name (optional)]
const RENAMED_ICONS = [
  ['AddItem', 'AddItems', 'Item Catalog'],
  ['AddItemFilled', 'AddItems', 'Item Catalog'],
  ['AddPerson', 'AddEmployees', 'Employees'],
  ['AddPersonFilled', 'AddEmployees', 'Employees'],
  ['BatteryCharging', 'Battery'],
  ['Bin', 'Delete'],
  ['Calculator', 'FeeCalculator', 'Fee Calculator'],
  ['CalculatorFilled', 'FeeCalculator', 'Fee Calculator'],
  ['Card', 'SumUpCard', 'SumUp Card'],
  ['CardReader', 'CardReaderAir', 'Air Card Reader'],
  ['CashAtm', 'Atm'],
  ['Check', 'Checkmark'],
  ['CircleCheckmark', 'Confirm'],
  ['CircleCheckmarkFilled', 'Confirm'],
  ['CircleCross', 'Alert'],
  ['CircleCrossFilled', 'Alert'],
  ['CircleHelp', 'Help'],
  ['CircleHelpFilled', 'Help'],
  ['CircleInfo', 'Info'],
  ['CircleInfoFilled', 'Info'],
  ['CircleMore', 'More'],
  ['CirclePlus', 'Plus'],
  ['CircleWarning', 'Notify'],
  ['CircleWarningFilled', 'Notify'],
  ['Clock', 'Time'],
  ['CloudDownload', 'DownloadCloud'],
  ['Cross', 'Close'],
  ['Dashboard', 'Reports', 'Reports'],
  ['DashboardFilled', 'Reports', 'Reports'],
  ['Fallback', 'Tipping', 'Tipping'],
  ['FileZip', 'ZipFile'],
  ['Gift', 'Refer', 'Referrals'],
  ['GiftFilled', 'Refer', 'Referrals'],
  ['Hamburger', 'HamburgerMenu'],
  ['Heart', 'Like'],
  ['House', 'Home'],
  ['HouseFilled', 'Home'],
  ['LiveChatFilled', 'LiveChat', 'Support'],
  ['Lock', 'SecurePayments', 'Secure Payments'],
  ['LogOut', 'Logout'],
  ['Mail', 'EmailChat', 'Support'],
  ['PaperPlane', 'Send'],
  ['PenStroke', 'Edit'],
  ['Person', 'Profile', 'Profile'],
  ['PersonFilled', 'Profile', 'Profile'],
  ['SettingsFilled', 'Settings'],
  ['ShoppingBag', 'Shop', 'Shop'],
  ['ShoppingCart', 'Checkout', 'Checkout'],
  ['ShoppingCartFilled', 'Checkout', 'Checkout'],
  ['Store', 'OnlineStore', 'Online Store'],
  ['StoreFilled', 'OnlineStore', 'Online Store'],
  ['SupportFilled', 'Support', 'Support'],
  ['Terminal', 'VirtualTerminal', 'Virtual Terminal'],
  ['TerminalFilled', 'VirtualTerminal', 'Virtual Terminal'],
  ['Transactions', 'Sales', 'Sales'],
  ['TransactionsFilled', 'Sales', 'Sales'],
  ['Wallet', 'Payouts', 'Payouts'],
  ['WalletFilled', 'Payouts', 'Payouts'],
];

// [old icon name, custom error message (optional)]
const REMOVED_ICONS = [
  [
    'Calendar',
    'The icon is being redesigned and will be released in an upcoming minor version.',
  ],
  ['FilterFunnel'],
  ['Folder'],
  [
    'Globe',
    'The icon is being redesigned and will be released in an upcoming minor version.',
  ],
  [
    'Rename',
    'Use the "Edit" icon instead, and use an accessible label for "Rename".',
  ],
  ['SelectCollapse', 'Use the Chevron icons instead.'],
  ['SelectExpand', 'Use the Chevron icons instead.'],
  ['Spinner', 'Use the Spinner component from "@sumup/circuit-ui" instead.'],
  [
    'Table',
    'The icon is being redesigned and will be released in an upcoming minor version.',
  ],
  ['ThumbDown'],
  ['ThumbUp'],
  ['Zap'],
];

const SMALL_ICONS = [
  'ArrowLeft',
  'ArrowRight',
  'ChevronDown',
  'ChevronLeft',
  'ChevronRight',
  'ChevronUp',
  'Close',
  'Delete',
  'Edit',
  'Minus',
  'Pause',
  'Play',
  'Plus',
  'Search',
  'Checkmark',
  'Alert',
  'Confirm',
  'Help',
  'Info',
  'Notify',
];

const LARGE_ONLY_LEGACY_ICONS = [
  'AddItems',
  'AddEmployees',
  'More',
  'Logout',
  'LiveChat',
  'EmailChat',
  'Support',
  'AmericanExpress',
  'ApplePay',
  'BancoEstado',
  'Bitcoin',
  'Dankort',
  'DinersClub',
  'Discover',
  'Ec',
  'Elo',
  'Elv',
  'GooglePay',
  'Hiper',
  'Hipercard',
  'Jcb',
  'Maestro',
  'Mastercard',
  'RedCompra',
  'SamsungPay',
  'UnionPay',
  'VisaElectron',
  'Visa',
  'Vpay',
  'Wifi',
  'FeeCalculator',
  'CardReaderAir',
  'Laptop',
  'Nfc',
  'VirtualTerminal',
  'Archive',
  'DownloadCloud',
  'History',
  'Payouts',
  'Company',
  'CardUnknown',
  'Atm',
  'Cash',
  'CashStack',
  'Tipping',
  'Sales',
  'Image',
  'Barcode',
  'Battery',
  'BrowserSecure',
  'Time',
  'Reports',
  'Refer',
  'Like',
  'Home',
  'SecurePayments',
  'Package',
  'Send',
  'Profile',
  'Secure',
  'Settings',
  'Shop',
  'Checkout',
  'SimCard',
  'OnlineStore',
  'Truck',
  'Zap',
  'Messenger',
  'Facebook',
  'Instagram',
  'Linkedin',
  'Pinterest',
  'Twitter',
  'Youtube',
  'SumUpLogo',
];

function handleIconSizeRenamed(j: JSCodeshift, root: Collection): void {
  const imports = findImportsByPath(j, root, '@sumup/icons');

  if (imports.length < 1) {
    return;
  }

  const components = imports.reduce<string[]>((acc, cur) => {
    const localName = cur.local;
    const styledComponents = findStyledComponentNames(j, root, localName);
    return [...acc, localName, ...styledComponents];
  }, []);

  components.forEach((component) => {
    const jsxElement = root.findJSXElements(component);
    // The babel and TypeScript parsers use different node types.
    ['Literal', 'StringLiteral'].forEach((type) => {
      jsxElement
        .find(j.JSXAttribute, {
          name: {
            type: 'JSXIdentifier',
            name: 'size',
          },
          value: {
            type,
            value: 'small',
          },
        })
        .replaceWith(() =>
          j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('16')),
        );
      jsxElement
        .find(j.JSXAttribute, {
          name: {
            type: 'JSXIdentifier',
            name: 'size',
          },
          value: {
            type,
            value: 'large',
          },
        })
        .replaceWith(() =>
          j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('24')),
        );
    });
  });
}

function handleIconRenamed(
  j: JSCodeshift,
  root: Collection,
  filePath: string,
  oldIconName: string,
  newIconName: string,
  productName?: string,
): void {
  const imports = findImportsByPath(j, root, '@sumup/icons');

  const legacyIconImport = imports.find((i) => i.name === oldIconName);

  if (!legacyIconImport) {
    return;
  }

  if (productName) {
    console.log(
      [
        `The "${oldIconName}" icon has been renamed to "${newIconName}",`,
        `and should only be used in the context of the ${productName}`,
        'product/feature.',
        'If you have doubts about your use of the icon, file an issue or',
        'contact the Design System team.',
        `\nin ${filePath}`,
      ].join(' '),
    );
  }

  root
    .find(j.Identifier)
    .filter((nodePath) => {
      const isLegacyIconName = nodePath.node.name === oldIconName;
      return isLegacyIconName;
    })
    .replaceWith(j.identifier(newIconName));
}

function handleIconRemoved(
  j: JSCodeshift,
  root: Collection,
  filePath: string,
  oldIconName: string,
  customMessage?: string,
): void {
  const imports = findImportsByPath(j, root, '@sumup/icons');

  const legacyIconImport = imports.find((i) => i.name === oldIconName);

  if (legacyIconImport) {
    const defaultMessage =
      'Copy it locally to finish the migration, and request a new icon from the Design System team.';
    console.log(
      [
        `The "${oldIconName}" icon has been removed.`,
        customMessage || defaultMessage,
        `\nin ${filePath}`,
      ].join(' '),
    );
  }
}

function handleIconDefaultSize(
  j: JSCodeshift,
  root: Collection,
  filePath: string,
): void {
  const imports = findImportsByPath(j, root, '@sumup/icons');

  if (!imports.length) {
    return;
  }

  imports
    .filter(
      (i) =>
        i.local !== 'Checkmark' && // 16px only, so the default would still be 16
        !i.local.startsWith('Flag') && // idem
        !REMOVED_ICONS.map((icon) => icon[0]).includes(i.local) && // These icons were removed
        !LARGE_ONLY_LEGACY_ICONS.includes(i.local), // These icons were only 24px in v1, so the default was already 24
    )
    .forEach((i) => {
      root
        .findJSXElements(i.local)
        .filter((jsxElement) => {
          const hasSmallIcon = SMALL_ICONS.includes(i.local);
          const attributes = jsxElement.node.openingElement
            .attributes as JSXAttribute[];
          const sizeAttribute = attributes.find((a) => a.name.name === 'size');
          const hasSize16 =
            (sizeAttribute?.value as StringLiteral)?.value === '16';
          const hasImplicitSize16 = !sizeAttribute;

          if (hasImplicitSize16 && hasSmallIcon) {
            return true; // we will add the new size
          }

          const actionMessage = [
            'Verify your page with the 24px icon size, and request a new 16px size',
            'from the Design System team if needed.',
            `\nin ${filePath}`,
          ];

          if (hasSize16 && !hasSmallIcon) {
            console.log(
              [
                `The 16px size of the "${i.local}" icon has been removed.`,
                ...actionMessage,
              ].join(' '),
            );
          }
          if (hasImplicitSize16 && !hasSmallIcon) {
            console.log(
              [
                `The default size of the "${i.local}" icon changed from 16px to 24px.`,
                ...actionMessage,
              ].join(' '),
            );
          }
          return false;
        })
        .replaceWith(({ node }) => {
          const attributes = node.openingElement.attributes || [];
          return j.jsxElement(
            j.jsxOpeningElement(
              j.jsxIdentifier((node.openingElement.name as JSXIdentifier).name),
              attributes.concat(
                j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('16')),
              ),
              node.openingElement.selfClosing,
            ),
            node.closingElement,
            node.children,
          );
        });
    });
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  const filePath = file.path;

  REMOVED_ICONS.forEach(([oldIconName, customMessage]) => {
    handleIconRemoved(j, root, filePath, oldIconName, customMessage);
  });

  RENAMED_ICONS.forEach(([oldIconName, newIconName, productName]) => {
    handleIconRenamed(j, root, filePath, oldIconName, newIconName, productName);
  });

  handleIconSizeRenamed(j, root);

  handleIconDefaultSize(j, root, filePath);

  return root.toSource();
};

export default transform;
