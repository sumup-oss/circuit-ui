const colorSchemes = {
  dark: {
    colorScheme: 'dark',
  },
  light: {
    colorScheme: 'light',
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
  ...colorSchemes,
  ...viewports,
};
