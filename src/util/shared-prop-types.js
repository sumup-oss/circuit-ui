import PropTypes from 'prop-types';
import { TOP, BOTTOM, LEFT, RIGHT, START, END, CENTER } from './constants';

// TODO: figure out if we can still get these props in react-docgen
//       when they are imported and merged into a component's
//       propTypes.

export const eitherOrPropType = (
  firstProp,
  secondProp,
  propType,
  isRequired = false
) => (props, propName, componentName) => {
  const hasFirstProp = props[firstProp];
  const hasSecondProp = props[secondProp];
  /* eslint-disable max-len */
  if (hasFirstProp && hasSecondProp) {
    return new Error(
      `You can provide either '${firstProp}' or '${secondProp}' to '${componentName}' but not both.`
    );
  }
  if (isRequired && !hasFirstProp && !hasSecondProp) {
    return new Error(
      `You must provide either '${firstProp}' or '${secondProp}' to '${componentName}' (but not both).`
    );
  }
  /* eslint-enable max-len */

  return PropTypes.checkPropTypes(
    { propName: propType },
    props,
    propName,
    componentName
  );
};

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]);

export const childrenRenderPropType = PropTypes.func;

const typePropType = PropTypes.shape({
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string
}).isRequired;

export const themePropType = PropTypes.shape({
  colors: PropTypes.shape({
    white: PropTypes.string.isRequired,
    black: PropTypes.string.isRequired,
    // Neutrals
    n100: PropTypes.string.isRequired,
    n300: PropTypes.string.isRequired,
    n500: PropTypes.string.isRequired,
    n700: PropTypes.string.isRequired,
    n900: PropTypes.string.isRequired,
    // Blues
    b100: PropTypes.string.isRequired,
    b300: PropTypes.string.isRequired,
    b500: PropTypes.string.isRequired,
    b700: PropTypes.string.isRequired,
    b900: PropTypes.string.isRequired,
    // Greens
    g100: PropTypes.string.isRequired,
    g300: PropTypes.string.isRequired,
    g500: PropTypes.string.isRequired,
    g700: PropTypes.string.isRequired,
    g900: PropTypes.string.isRequired,
    // Yellows
    y100: PropTypes.string.isRequired,
    y300: PropTypes.string.isRequired,
    y500: PropTypes.string.isRequired,
    y700: PropTypes.string.isRequired,
    y900: PropTypes.string.isRequired,
    // Reds
    r100: PropTypes.string.isRequired,
    r300: PropTypes.string.isRequired,
    r500: PropTypes.string.isRequired,
    r700: PropTypes.string.isRequired,
    r900: PropTypes.string.isRequired,
    // Primary
    p100: PropTypes.string.isRequired,
    p300: PropTypes.string.isRequired,
    p500: PropTypes.string.isRequired,
    p700: PropTypes.string.isRequired,
    p900: PropTypes.string.isRequired,
    // Misc
    shadow: PropTypes.string.isRequired,
    bodyBg: PropTypes.string.isRequired,
    bodyColor: PropTypes.string.isRequired
  }).isRequired,
  spacings: PropTypes.shape({
    bit: PropTypes.string.isRequired,
    byte: PropTypes.string.isRequired,
    kilo: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired,
    giga: PropTypes.string.isRequired,
    tera: PropTypes.string.isRequired,
    peta: PropTypes.string.isRequired,
    exa: PropTypes.string.isRequired,
    zetta: PropTypes.string.isRequired
  }).isRequired,
  iconSizes: PropTypes.shape({
    kilo: PropTypes.string.isRequired,
    mega: PropTypes.string.isRequired
  }),
  borderRadius: PropTypes.shape({
    kilo: PropTypes.string,
    mega: PropTypes.string,
    giga: PropTypes.string
  }).isRequired,
  typography: PropTypes.shape({
    headings: PropTypes.shape({
      kilo: typePropType,
      mega: typePropType,
      giga: typePropType,
      tera: typePropType,
      peta: typePropType,
      exa: typePropType,
      zetta: typePropType
    }).isRequired,
    subHeadings: PropTypes.shape({
      kilo: typePropType,
      mega: typePropType
    }).isRequired,
    text: PropTypes.shape({
      kilo: typePropType,
      mega: typePropType,
      giga: typePropType
    }).isRequired
  }),
  fontStack: PropTypes.shape({
    default: PropTypes.string,
    mono: PropTypes.string
  }),
  fontWeight: PropTypes.shape({
    regular: PropTypes.string.isRequired,
    bold: PropTypes.string.isRequired
  }).isRequired
});

export const localePropType = isRequired => (
  props,
  propName,
  componentName
) => {
  if (isRequired && (!props[propName] || !props[propName].length)) {
    return new Error(
      `Prop \`${propName}\` is marked as required in \`${componentName}\`,` +
        `but received \`${props[propName]}\`.`
    );
  }

  if (!/[a-z]{2}-[A-Z]{2}/.test(props[propName])) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to` +
        ` \`${componentName}\`. Validation failed.`
    );
  }

  return null;
};

export const positionPropType = PropTypes.oneOf([TOP, BOTTOM, LEFT, RIGHT]);
export const alignPropType = PropTypes.oneOf([START, END, CENTER]);
