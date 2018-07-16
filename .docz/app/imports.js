export const imports = {
  'docs/fonts.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-fonts" */ 'docs/fonts.mdx'),
  'src/components/Button/Button.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-button-button" */ 'src/components/Button/Button.mdx'),
}
