import '../src/index.css';
import React from 'react';
import type { Preview, StoryFn, StoryContext } from '@storybook/react';
import { ThemeProvider } from '../src/context/ThemeContext';
import { defaultTheme, cyberpunkTheme, retroTheme } from '../src/styles';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'cyberpunk',
          value: '#0f172a',
        },
        {
          name: 'retro',
          value: '#451a03',
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default' },
          { value: 'cyberpunk', title: 'Cyberpunk' },
          { value: 'retro', title: 'Retro' },
        ],
      },
    },
  },
  decorators: [
    (Story: StoryFn, context: StoryContext) => {
      const themeMap = {
        default: defaultTheme,
        cyberpunk: cyberpunkTheme,
        retro: retroTheme,
      };
      
      const currentTheme = themeMap[context.globals.theme as keyof typeof themeMap] || defaultTheme;

      return (
        <ThemeProvider theme={currentTheme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview; 