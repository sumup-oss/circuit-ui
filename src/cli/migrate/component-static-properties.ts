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

import { Transform, JSCodeshift, Collection } from 'jscodeshift';
import { toLower } from 'lodash/fp';

import { findLocalNames, findProperty } from './utils';

const components = [
  {
    componentName: 'Badge',
    properties: ['NEUTRAL', 'PRIMARY', 'SUCCESS', 'WARNING', 'DANGER']
  },
  {
    componentName: 'Blockquote',
    properties: ['KILO', 'MEGA', 'GIGA']
  },
  {
    componentName: 'Button',
    properties: ['KILO', 'MEGA', 'GIGA']
  },
  {
    componentName: 'ButtonGroup',
    properties: ['LEFT', 'CENTER', 'RIGHT']
  },
  {
    componentName: 'Card',
    properties: ['SINGLE', 'DOUBLE', 'TRIPLE', 'MEGA', 'GIGA']
  },
  {
    componentName: 'CardList.Item',
    properties: ['KILO', 'MEGA', 'GIGA']
  },
  {
    componentName: 'ListView.Item',
    properties: ['KILO', 'MEGA', 'GIGA']
  },
  {
    componentName: 'Heading',
    properties: ['KILO', 'MEGA', 'GIGA', 'TERA', 'PETA', 'EXA', 'ZETTA']
  },
  {
    componentName: 'InlineNotification',
    properties: ['DANGER', 'SUCCESS', 'WARNING', 'MEGA', 'GIGA']
  },
  {
    componentName: 'InlineMessage',
    properties: ['DANGER', 'SUCCESS', 'WARNING', 'MEGA', 'GIGA']
  },
  {
    componentName: 'Input',
    properties: ['LEFT', 'RIGHT']
  },
  {
    componentName: 'TextArea',
    properties: ['LEFT', 'RIGHT']
  },
  {
    componentName: 'List',
    properties: ['KILO', 'MEGA', 'GIGA']
  },
  {
    componentName: 'MessageIcon',
    properties: ['SUCCESS', 'ERROR', 'WARNING']
  },
  {
    componentName: 'ModalFooter',
    properties: ['LEFT', 'RIGHT']
  },
  {
    componentName: 'CardFooter',
    properties: ['LEFT', 'RIGHT']
  },
  {
    componentName: 'NotificationIcon',
    properties: ['SUCCESS', 'ERROR', 'WARNING']
  },
  {
    componentName: 'Popover',
    properties: ['TOP', 'BOTTOM', 'LEFT', 'RIGHT', 'START', 'END', 'CENTER']
  },
  {
    componentName: 'ProgressBar',
    properties: ['KILO', 'MEGA', 'GIGA']
  },
  {
    componentName: 'SubHeading',
    properties: ['KILO', 'MEGA']
  },
  {
    componentName: 'TableHeader',
    properties: ['LEFT', 'RIGHT', 'CENTER', 'COL', 'ROW']
  },
  {
    componentName: 'TableCell',
    properties: ['LEFT', 'RIGHT', 'CENTER']
  },
  {
    componentName: 'Text',
    properties: ['KILO', 'MEGA', 'GIGA']
  },
  {
    componentName: 'Tooltip',
    properties: ['CENTER', 'TOP', 'RIGHT', 'BOTTOM', 'LEFT']
  }
];

function transformFactory(
  j: JSCodeshift,
  root: Collection,
  componentName: string,
  properties: string[]
): void {
  const localNames = findLocalNames(j, root, componentName);

  if (!localNames) {
    return;
  }

  localNames.forEach(localName => {
    properties.forEach(property => {
      findProperty(j, root, `${localName}.${property}`).replaceWith(
        j.stringLiteral(toLower(property))
      );
    });
  });
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  components.forEach(({ componentName, properties }) => {
    transformFactory(j, root, componentName, properties);
  });

  return root.toSource({ quote: 'single' });
};

export default transform;
