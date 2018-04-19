import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
import { css } from 'react-emotion';

export const mapThemeToReactDates = theme => ({
  reactDates: {
    ...DefaultTheme.reactDates,
    color: {
      ...DefaultTheme.reactDates.color,
      selected: {
        ...DefaultTheme.reactDates.color.selected,
        backgroundColor: theme.p300
      },
      highlighted: {
        backgroundColor: theme.b100,
        backgroundColor_active: theme.n100,
        backgroundColor_hover: theme.n100,
        color: theme.b100,
        color_active: theme.b300,
        color_hover: theme.b500
      }
    }
  }
});

export const reactWithStylesEmotionInterface = {
  create: styleHash => styleHash,
  resolve(styleHash) {
    return { className: css(styleHash) };
  }
};
