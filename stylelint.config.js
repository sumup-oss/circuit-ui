module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  ignoreFiles: ['src/brand-styles/**'],
  rules: {
    'number-leading-zero': 'never',
    'max-nesting-depth': 3,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['local']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['include', 'mixin']
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes']
      }
    ]
  }
};
