const isIos = (() => {
  // For SSR compatibility
  if (typeof window === 'undefined') {
    return undefined;
  }
  const { platform } = window.navigator || {};
  return !!platform && /iPad|iPhone|iPod/.test(platform);
})();

export default isIos;
