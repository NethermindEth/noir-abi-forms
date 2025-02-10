export interface Theme {
  spacing: {
    inputPadding: string;
    containerPadding: string;
    gap: string;
    smallGap: string;
  };

  colors: {
    bg: {
      primary: string;
      secondary: string;
      input: string;
      hover: string;
    };
    border: {
      default: string;
      focus: string;
      hover: string;
    };
    text: {
      primary: string;
      secondary: string;
      placeholder: string;
      accent: string;
      error: string;
      warning: string;
    };
  };

  typography: {
    font: {
      mono: string;
      base: string;
      medium: string;
    };
  };

  components: {
    functionContainer: string;
    function: {
      parameter: string;
    };
    input: string;
    badge: {
      base: string;
      variants: {
        public: string;
        private: string;
        internal: string;
        static: string;
        initializer: string;
      };
    };
    button: {
      base: string;
      primary: string;
      danger: string;
      outline: string;
    };
    array: {
      container: string;
      item: string;
    };
    struct: {
      container: string;
      field: string;
    };
    toggle: {
      base: string;
      active: string;
      knob: string;
    };
    error: {
      container: string;
    };
    result: {
      container: string;
    };
  };

  effects: {
    transition: string;
    hover: string;
    focus: string;
  };
}

export const defaultTheme: Theme = {
  spacing: {
    inputPadding: "p-3",
    containerPadding: "p-4",
    gap: "gap-4",
    smallGap: "gap-2",
  },

  colors: {
    bg: {
      primary: "bg-gray-900",
      secondary: "bg-gray-800/50",
      input: "bg-gray-800",
      hover: "hover:bg-gray-700/50",
    },
    border: {
      default: "border-gray-700",
      focus: "focus:border-purple-500",
      hover: "hover:border-gray-600",
    },
    text: {
      primary: "text-white",
      secondary: "text-gray-300",
      placeholder: "placeholder-gray-400",
      accent: "text-purple-400",
      error: "text-red-400",
      warning: "text-amber-400",
    },
  },

  typography: {
    font: {
      mono: "font-mono",
      base: "text-sm",
      medium: "font-medium",
    },
  },

  components: {
    function: {
      parameter:
        "space-y-3 p-2 border border-gray-700 hover:border-gray-600 rounded-md transition-colors",
    },
    functionContainer: [
      "rounded-lg bg-gray-900/50",
      "p-4",
      "border border-gray-700",
      "space-y-3",
    ].join(" "),
    input: [
      "block w-full rounded-md",
      "border-gray-600 bg-gray-800",
      "text-white placeholder-gray-400",
      "focus:border-purple-500 focus:ring-purple-500",
      "sm:text-sm font-mono",
    ].join(" "),

    badge: {
      base: "px-2 py-0.5 text-xs rounded-md font-medium font-mono",
      variants: {
        public: "bg-emerald-900/50 text-emerald-400",
        private: "bg-red-900/50 text-red-400",
        internal: "bg-amber-900/50 text-amber-400",
        static: "bg-blue-900/50 text-blue-400",
        initializer: "bg-purple-900/50 text-purple-400",
      },
    },

    button: {
      base: "font-mono",
      primary: "bg-purple-600 hover:bg-purple-700 text-white",
      danger: "bg-red-600 hover:bg-red-700 text-white",
      outline: "border-gray-600 hover:bg-gray-700 hover:text-white",
    },

    array: {
      container: "rounded-lg bg-gray-800/50 border border-gray-700",
      item: "border border-gray-700 hover:border-gray-600 rounded-md transition-colors",
    },

    struct: {
      container: "rounded-lg bg-gray-800/50 border border-gray-700",
      field:
        "border border-gray-700 hover:border-gray-600 rounded-md transition-colors",
    },

    toggle: {
      base: "w-11 h-6 bg-gray-700",
      active: "peer-checked:bg-purple-500",
      knob: "after:bg-white after:border-gray-300",
    },

    error: {
      container: "bg-red-500/10 p-4 rounded-lg",
    },

    result: {
      container: [
        "mt-4 p-4",
        "bg-gray-800/50",
        "border border-gray-700",
        "rounded-lg",
        "font-mono text-sm",
        "overflow-x-auto whitespace-pre text-left",
        "shadow-inner",
        "hover:border-gray-600 transition-colors",
      ].join(" "),
    },
  },

  effects: {
    transition: "transition-all duration-200",
    hover: "hover:opacity-100",
    focus: "focus:ring-2 focus:ring-purple-500 focus:outline-none",
  },
};

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
