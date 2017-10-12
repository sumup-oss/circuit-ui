module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  ignoreFiles: ['app/**/brand-styles/**'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['local']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['include']
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreAtRules: ['composes']
      }
    ]
  }
};
