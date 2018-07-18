export const imports = {
  'docs/content/resources.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-resources" */ 'docs/content/resources.mdx'),
  'docs/content/whats-new.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-whats-new" */ 'docs/content/whats-new.mdx'),
  'docs/content/components/Button.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-components-button" */ 'docs/content/components/Button.mdx'),
  'docs/content/getting-started/developers.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-getting-started-developers" */ 'docs/content/getting-started/developers.mdx'),
  'docs/content/getting-started/faq.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-getting-started-faq" */ 'docs/content/getting-started/faq.mdx'),
  'docs/content/getting-started/how-to-document.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-getting-started-how-to-document" */ 'docs/content/getting-started/how-to-document.mdx'),
  'docs/content/guidelines/accessibility.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-guidelines-accessibility" */ 'docs/content/guidelines/accessibility.mdx'),
  'docs/content/guidelines/fonts.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-guidelines-fonts" */ 'docs/content/guidelines/fonts.mdx'),
  'docs/content/guidelines/media-queries.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-guidelines-media-queries" */ 'docs/content/guidelines/media-queries.mdx'),
  'docs/content/styles/colors.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-styles-colors" */ 'docs/content/styles/colors.mdx'),
  'docs/content/styles/grid.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-styles-grid" */ 'docs/content/styles/grid.mdx'),
  'docs/content/styles/spacing.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-styles-spacing" */ 'docs/content/styles/spacing.mdx'),
  'docs/content/styles/theming.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-styles-theming" */ 'docs/content/styles/theming.mdx'),
  'docs/content/styles/typography.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-content-styles-typography" */ 'docs/content/styles/typography.mdx'),
}
