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

import PropTypes from 'prop-types';

// TODO: figure out if we can still get these props in react-docgen
//       when they are imported and merged into a component's
//       propTypes.

export const eitherOrPropType = (
  firstProp,
  secondProp,
  propType,
  isRequired = false,
) => (props, propName, componentName) => {
  const hasFirstProp = props[firstProp];
  const hasSecondProp = props[secondProp];
  /* eslint-disable max-len */
  if (hasFirstProp && hasSecondProp) {
    return new Error(
      `You can provide either '${firstProp}' or '${secondProp}' to '${componentName}' but not both.`,
    );
  }
  if (isRequired && !hasFirstProp && !hasSecondProp) {
    return new Error(
      `You must provide either '${firstProp}' or '${secondProp}' to '${componentName}' (but not both).`,
    );
  }
  /* eslint-enable max-len */

  return PropTypes.checkPropTypes(
    { [propName]: propType },
    props,
    propName,
    componentName,
  );
};

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

export const childrenRenderPropType = PropTypes.func;

export const componentsPropType = PropTypes.shape({
  Link: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
});

export const positionPropType = PropTypes.oneOf([
  'top',
  'bottom',
  'left',
  'right',
]);

export const alignPropType = PropTypes.oneOf(['start', 'end', 'center']);
