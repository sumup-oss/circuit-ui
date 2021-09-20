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

import { Transform, JSCodeshift, Collection } from 'jscodeshift';

import { findImportsByPath, findStyledComponentNames } from './utils';

const RENAMED_ICONS = [
  ['AddItem', 'AddItems', 'Item Catalog'],
  ['AddItemFilled', 'AddItems', 'Item Catalog'],
  ['AddPerson', 'AddEmployees', 'Employees'],
  ['AddPersonFilled', 'AddEmployees', 'Employees'],
  ['BatteryCharging', 'Battery'],
  ['Calculator', 'FeeCalculator', 'Fee Calculator'],
  ['Card', 'SumUpCard', 'SumUp Card'],
  ['CashAtm', 'Atm'],
  ['CircleCheckmark', 'Confirm'],
  ['CircleCheckmarkFilled', 'Confirm'],
  ['CircleCross', 'Alert'],
  ['CircleCrossFilled', 'Alert'],
  ['CircleHelp', 'Help'],
  ['CircleHelpFilled', 'Help'],
  ['CircleInfo', 'Info'],
  ['CircleInfoFilled', 'Info'],
  ['CircleMore', 'More'],
  ['CircleWarning', 'Notify'],
  ['CircleWarningFilled', 'Notify'],
  ['Clock', 'Time'],
  ['CloudDownload', 'DownloadCloud'],
  ['Cross', 'Close'],
  ['Dashboard', 'Reports', 'Reports'],
  ['DashboardFilled', 'Reports', 'Reports'],
  ['Fallback', 'Tipping', 'Tipping'],
  ['FileZip', 'ZipFile'],
  ['GiftFilled', 'Refer', 'Referrals'],
  ['Hamburger', 'HamburgerMenu'],
  ['Heart', 'Like'],
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

const REMOVED_SMALL_ICON = [
  ['CirclePlus', 'Add'],
  'Download',
  'Link',
  'Pause',
  'Play',
  'Refresh',
  'Search',
  'Share',
  'ArrowUp',
  'ArrowDown',
  'File',
  ['FileZip', 'ZipFile'],
  'Bank',
  ['Card', 'SumUpCard'],
  'Receipt',
  'Location',
  ['ShoppingCart', 'Checkout'],
  'More',
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
  oldIconName: string,
  newIconName: string,
  productName?: string,
): void {
  const imports = findImportsByPath(j, root, '@sumup/icons');

  const componentImport = imports.find((i) => i.name === oldIconName);

  if (!componentImport) {
    return;
  }

  root
    .find(j.Identifier)
    .filter((nodePath) => {
      const hasLegacyIconName = nodePath.node.name === oldIconName;
      if (hasLegacyIconName && productName) {
        console.warn(
          [
            `The "${oldIconName}" icon has been renamed to "${newIconName}",`,
            `and should only be used in the context of the ${productName}`,
            `product/feature from now on.`,
            `If you have doubts about your use of the icon, contact #design-system.`,
          ].join(' '),
        );
      }
      return hasLegacyIconName;
    })
    .replaceWith(j.identifier(newIconName));
}

function handleIconRemoved(
  j: JSCodeshift,
  root: Collection,
  oldIconName: string,
  customMessage?: string,
): void {
  const imports = findImportsByPath(j, root, '@sumup/icons');

  const componentImport = imports.find((i) => i.name === oldIconName);

  if (!componentImport) {
    return;
  }

  root.find(j.Identifier).filter((nodePath) => {
    const hasLegacyIconName = nodePath.node.name === oldIconName;
    if (hasLegacyIconName) {
      const defaultMessage =
        'Copy it locally to finish the migration, and request a new icon for your use case in #design-system.';
      console.error(
        [
          `The "${oldIconName}" icon has been removed.`,
          customMessage || defaultMessage,
        ].join(' '),
      );
    }
    return false;
  });
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  handleIconSizeRenamed(j, root);

  RENAMED_ICONS.forEach(([oldIconName, newIconName, productName]) => {
    handleIconRenamed(j, root, oldIconName, newIconName, productName);
  });

  REMOVED_ICONS.forEach(([oldIconName, customMessage]) => {
    handleIconRemoved(j, root, oldIconName, customMessage);
  });

  // TODO iterate through REMOVED_SMALL_ICON and warn if the size was "small" or undefined
  console.log(REMOVED_SMALL_ICON);

  return root.toSource();
};

export default transform;
