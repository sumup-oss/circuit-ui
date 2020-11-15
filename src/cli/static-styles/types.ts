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

import { ComponentType } from 'react';
import {
  ComponentDoc,
  Props,
  PropItem,
  PropItemType,
  // We're only importing types, which get stripped once transpiled.
  // eslint-disable-next-line import/no-extraneous-dependencies
} from 'react-docgen-typescript';
import { Theme } from '@sumup/design-tokens';
import { SerializedStyles } from '@emotion/core';

export type { ComponentDoc, Props, PropItem };

export type Options = {
  theme: 'light';
  components: string[];
  global: boolean;
  customProperties: boolean;
  pretty: boolean;
  filePath: string;
};

export type ComponentWithDocGen = ComponentType & {
  __docgenInfo: ComponentDoc;
};

export type Variation = any;

export type PropTypes = {
  [name: string]: Variation[] | ((propType: PropItemType) => Variation[]);
};

export type ComponentConfig = {
  name: string;
  component: ComponentType<any>;
  props?: { [name: string]: Variation[] };
};

export type Config = {
  components: ComponentConfig[];
  themes: {
    [name: string]: Theme;
  };
};

export type InsertFactory = (
  componentName: string,
) => (
  selector: string,
  serialized: SerializedStyles,
  sheet: StyleSheet,
  shouldCache: boolean,
) => void;
