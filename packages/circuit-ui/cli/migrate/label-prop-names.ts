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

import { renameJSXAttribute, findLocalNames } from './utils';

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const propsMapping = [
    {
      componentName: 'CardHeader',
      fromName: 'labelCloseButton',
      toName: 'closeButtonLabel',
    },
    {
      componentName: 'Hamburger',
      fromName: 'labelActive',
      toName: 'activeLabel',
    },
    {
      componentName: 'Hamburger',
      fromName: 'labelInActive',
      toName: 'inactiveLabel',
    },
    {
      componentName: 'Tag',
      fromName: 'labelRemoveButton',
      toName: 'removeButtonLabel',
    },
    {
      componentName: 'Toggle',
      fromName: 'labelChecked',
      toName: 'checkedLabel',
    },
    {
      componentName: 'Toggle',
      fromName: 'labelUnchecked',
      toName: 'uncheckedLabel',
    },
  ];

  propsMapping.forEach(({ componentName, fromName, toName }) => {
    const components = findLocalNames(j, root, componentName);

    if (!components) {
      return;
    }

    components.forEach((component) => {
      renameJSXAttribute(j, root, component, fromName, toName);
    });
  });

  return root.toSource();
};

export default transform;
