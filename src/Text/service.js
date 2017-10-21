export function sizesToConfig(sizes, size) {
  return sizes.reduce((memo, sizeName) => (
    { ...memo, [`type-${sizeName}`]: size === sizeName }
  ), {});
}
