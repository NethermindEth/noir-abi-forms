import { Theme, defaultTheme } from "./theme";
import { cyberpunkTheme, retroTheme } from "./alternativeTheme";

export type { Theme };
export { defaultTheme, cyberpunkTheme, retroTheme };

// Helper function to merge custom theme with default theme
export function createTheme(customTheme: Partial<Theme>): Theme {
  return {
    ...defaultTheme,
    ...customTheme,
    colors: {
      ...defaultTheme.colors,
      ...customTheme.colors,
    },
    components: {
      ...defaultTheme.components,
      ...customTheme.components,
    },
  };
}
