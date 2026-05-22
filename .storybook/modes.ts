const themes = {
  dark: {
    theme: 'dark',
  },
  light: {
    theme: 'light',
  },
  consumer: {
    theme: 'consumer',
  },
};

const viewports = {
  smallMobile: {
    viewport: 'smallMobile',
  },
  largeMobile: {
    viewport: 'largeMobile',
  },
  tablet: {
    viewport: 'tablet',
  },
  desktop: {
    viewport: 'desktop',
  },
};

export const modes = {
  ...themes,
  ...viewports,
};
