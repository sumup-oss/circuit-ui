import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';

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
  if (!children) {
    return null;
  }
  const markdownOptions = { overrides, forceBlock, forceInline };
  const transformedMarkdown = transformer(children);
  const html = compiler(transformedMarkdown, markdownOptions);
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
