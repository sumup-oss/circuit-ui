/**
 * Copyright 2020, SumUp Ltd.
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

import { Transform, ASTPath, CallExpression } from 'jscodeshift';

import { findImportsByPath } from './utils';

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const imports = findImportsByPath(j, root, '@sumup/circuit-ui');
  const utilImport = imports.find((i) => i.name === 'currencyUtils');

  const intlSpecifiers = [];

  if (!utilImport) {
    return;
  }

  const formatCurrency = root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: {
        name: utilImport.local,
      },
      property: {
        name: 'formatCurrency',
      },
    },
  });

  const formatAmountForLocale = root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: {
        name: utilImport.local,
      },
      property: {
        name: 'formatAmountForLocale',
      },
    },
  });

  const circuitImport = root.find(j.ImportDeclaration, {
    source: {
      value: '@sumup/circuit-ui',
    },
  });

  if (formatCurrency.length) {
    const name = 'formatCurrency';
    const identifier = j.identifier(name);
    const importSpecifier = j.importSpecifier(identifier);

    formatCurrency.replaceWith(replaceFormatFunction(name));

    intlSpecifiers.push(importSpecifier);
  }

  if (formatAmountForLocale.length) {
    const name = 'format';
    const identifier = j.identifier(name);
    const importSpecifier = j.importSpecifier(identifier);

    formatAmountForLocale.replaceWith(replaceFormatFunction(name));

    intlSpecifiers.push(importSpecifier);
  }

  const intlImport = j.importDeclaration(
    intlSpecifiers,
    j.literal('@sumup/intl'),
  );

  if (imports.length === 1) {
    circuitImport.replaceWith(intlImport);
  } else {
    circuitImport.forEach((importNodePath) => {
      j(importNodePath)
        .find(j.ImportSpecifier)
        .forEach((importSpecifierNodePath) => {
          if (importSpecifierNodePath.node.imported.name === 'currencyUtils') {
            j(importSpecifierNodePath).remove();
          }
        });
    });
    circuitImport.insertAfter(intlImport);
  }

  return root.toSource({ quote: 'single', reuseWhitespace: false });
};

function replaceFormatFunction(callee: string) {
  return (nodePath: ASTPath<CallExpression>) => {
    /* eslint-disable no-param-reassign, @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    nodePath.value.arguments = reorderArguments(nodePath.value.arguments);
    // @ts-ignore
    nodePath.value.callee = callee;
    /* eslint-enable no-param-reassign, @typescript-eslint/ban-ts-comment */

    return nodePath.node;
  };
}

function reorderArguments(args = []) {
  const [value, locale, currency] = args;

  return [value, currency, locale];
}

export default transform;
