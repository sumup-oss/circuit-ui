export const imports = {
  'docs/content/components/Button.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-components-button" */ 'docs/content/components/Button.mdx'),
  'docs/content/getting-started/developers.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-getting-started-developers" */ 'docs/content/getting-started/developers.mdx'),
  'docs/content/guidelines/fonts.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-guidelines-fonts" */ 'docs/content/guidelines/fonts.mdx'),
}
