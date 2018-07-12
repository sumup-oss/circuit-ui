export const imports = {
  'src/components/Button/Button.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-button-button" */ 'src/components/Button/Button.mdx'),
}
