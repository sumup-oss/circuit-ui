const { platform } = navigator || {};

const isIos = !!platform && /iPad|iPhone|iPod/.test(platform);

export default isIos;
