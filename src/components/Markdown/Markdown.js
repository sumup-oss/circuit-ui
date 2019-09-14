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
import { compiler } from 'markdown-to-jsx';

import deprecate from '../../util/deprecate';

/**
 * Markdown component to parse and render GFM to JSX.
 */
const Markdown = ({
  children,
  overrides,
  forceBlock,
  forceInline,
  transformer
}) => {
  deprecate('Markdown has been deprecated.');

  const options = { overrides, forceBlock, forceInline };
  const transformedMarkdown = transformer(children);
  const html = compiler(transformedMarkdown, options);
  return html;
};

Markdown.propTypes = {
  /**
   * The GitHub flavoured markdown content to be parsed and rendered.
   */
  children: PropTypes.string,
  /**
   * A function to transform/clean the markdown string before it is parsed.
   * Receives the markdown string as first argument and should return a string.
   */
  transformer: PropTypes.func,
  /**
   * Override an HTML tag with a React component, e.g. `a` -> `<Link />`
   * The React component is passed all HTML attributes as props.
   * See https://github.com/probablyup/markdown-to-jsx for documentation.
   */
  overrides: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /**
   * Treat all markdown strings as "block" elements.
   * See https://github.com/probablyup/markdown-to-jsx for documentation.
   */
  forceBlock: PropTypes.bool,
  /**
   * Treat all markdown strings as "inline" elements.
   * See https://github.com/probablyup/markdown-to-jsx for documentation.
   */
  forceInline: PropTypes.bool
};

Markdown.defaultProps = {
  children: '',
  transformer: md => md,
  overrides: {},
  forceBlock: false,
  forceInline: false
};

/**
 * @component
 */
export default Markdown;
