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

import { reduce, isFunction, isEmpty, isObject } from 'lodash/fp';

function transformStyleFactory(props) {
  return style => {
    const styleRules = isFunction(style) ? style(props) : style;

    if (!isObject(style) || isEmpty(style)) {
      return null;
    }
    // Emotion native complains about the 'label' rule.
    const { label, ...rest } = styleRules;
    return rest;
  };
}

// eslint-disable-next-line import/prefer-default-export
export function cx(styles, theme, props = {}) {
  const transformStyle = transformStyleFactory({ ...props, theme });
  const customStyleRules = transformStyle(props.style);
  const coreStyles = reduce(
    (allStyles, style) => {
      const styleRules = transformStyle(style);
      if (styleRules) {
        allStyles.push(styleRules);
      }
      return allStyles;
    },
    [],
    styles
  );

  if (customStyleRules) {
    coreStyles.push(customStyleRules);
  }

  return coreStyles;
}
