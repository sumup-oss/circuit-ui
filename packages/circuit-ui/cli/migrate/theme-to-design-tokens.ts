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

import { Transform } from 'jscodeshift';

import { findImportsByPath } from './utils';

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const imports = findImportsByPath(j, root, '@sumup/circuit-ui');

  const themeImport = imports.find((i) => i.name === 'theme');

  if (!themeImport) {
    return;
  }

  ['circuit', 'standard'].forEach((themeName) => {
    root
      .find(j.MemberExpression, {
        object: {
          name: themeImport.local,
        },
        property: {
          name: themeName,
        },
      })
      .replaceWith(j.identifier('light'));
  });
  const circuitImport = root.find(j.ImportDeclaration, {
    source: {
      value: '@sumup/circuit-ui',
    },
  });

  const designTokensImport = j.importDeclaration(
    [j.importSpecifier(j.identifier('light'))],
    j.literal('@sumup/design-tokens'),
  );

  if (imports.length === 1) {
    circuitImport.replaceWith(designTokensImport);
  } else {
    circuitImport.forEach((importNodePath) => {
      j(importNodePath)
        .find(j.ImportSpecifier)
        .forEach((importSpecifierNodePath) => {
          if (importSpecifierNodePath.node.imported.name === 'theme') {
            j(importSpecifierNodePath).remove();
          }
        });
    });
    circuitImport.insertAfter(designTokensImport);
  }

  return root.toSource({ quote: 'single', reuseWhitespace: false });
};

export default transform;
