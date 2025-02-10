import { Theme, createTheme } from "./theme";

export const cyberpunkTheme = createTheme({
  colors: {
    bg: {
      primary: "bg-slate-900",
      secondary: "bg-slate-800/50",
      input: "bg-slate-800",
      hover: "hover:bg-slate-700/50",
    },
    border: {
      default: "border-cyan-900",
      focus: "focus:border-cyan-400",
      hover: "hover:border-cyan-700",
    },
    text: {
      primary: "text-cyan-50",
      secondary: "text-cyan-300",
      placeholder: "placeholder-cyan-700",
      accent: "text-cyan-400",
      error: "text-rose-400",
      warning: "text-amber-400",
    },
  },

  components: {
    function: {
      parameter:
        "space-y-3 p-2 border-2 border-cyan-900/50 rounded-none hover:border-cyan-700/50 transition-colors",
    },
    functionContainer: [
      "rounded-lg bg-slate-900/90 p-4",
      "border border-cyan-900/50",
      "shadow-lg shadow-cyan-900/20",
    ].join(" "),

    input: [
      "block w-full rounded-md",
      "border-cyan-900 bg-slate-800",
      "text-cyan-50 placeholder-cyan-700",
      "focus:border-cyan-400 focus:ring-cyan-400",
      "sm:text-sm font-mono",
      "shadow-inner shadow-cyan-900/20",
    ].join(" "),

    badge: {
      base: [
        "px-2 py-0.5 text-xs rounded-md font-medium font-mono",
        "shadow-sm shadow-cyan-900/20",
        "border border-cyan-900/50",
      ].join(" "),
      variants: {
        public: "bg-emerald-900/30 text-emerald-300 border-emerald-700/50",
        private: "bg-rose-900/30 text-rose-300 border-rose-700/50",
        internal: "bg-amber-900/30 text-amber-300 border-amber-700/50",
        static: "bg-blue-900/30 text-blue-300 border-blue-700/50",
        initializer: "bg-violet-900/30 text-violet-300 border-violet-700/50",
      },
    },

    button: {
      base: [
        "font-mono shadow-lg shadow-cyan-900/20",
        "border border-cyan-900/50",
        "transition-all duration-200",
      ].join(" "),
      primary: [
        "bg-cyan-900/80 text-cyan-100",
        "hover:bg-cyan-800/80 hover:shadow-cyan-900/40",
        "active:bg-cyan-950",
      ].join(" "),
      danger: [
        "bg-rose-900/80 text-rose-100",
        "hover:bg-rose-800/80 hover:shadow-rose-900/40",
        "active:bg-rose-950",
      ].join(" "),
      outline: [
        "border-cyan-800 text-cyan-100",
        "hover:bg-cyan-900/50 hover:text-cyan-50",
        "active:bg-cyan-950",
      ].join(" "),
    },

    array: {
      container: [
        "rounded-lg bg-slate-800/50 border border-cyan-900/50",
        "shadow-lg shadow-cyan-900/20",
      ].join(" "),
      item: [
        "border border-cyan-900/50 rounded-md",
        "hover:border-cyan-700/50 transition-colors",
        "shadow-sm shadow-cyan-900/20",
      ].join(" "),
    },

    struct: {
      container: [
        "rounded-lg bg-slate-800/50 border border-cyan-900/50",
        "shadow-lg shadow-cyan-900/20",
      ].join(" "),
      field: [
        "border border-cyan-900/50 rounded-md",
        "hover:border-cyan-700/50 transition-colors",
        "shadow-sm shadow-cyan-900/20",
      ].join(" "),
    },

    toggle: {
      base: "w-11 h-6 bg-slate-700 shadow-inner shadow-cyan-900/20",
      active: "peer-checked:bg-cyan-700",
      knob: "after:bg-cyan-100 after:border-cyan-300",
    },
  },

  effects: {
    transition: "transition-all duration-200",
    hover: "hover:opacity-100",
    focus: "focus:ring-2 focus:ring-cyan-500/50 focus:outline-none",
  },
}) as Theme;

export const retroTheme = createTheme({
  colors: {
    bg: {
      primary: "bg-amber-950",
      secondary: "bg-amber-900/50",
      input: "bg-amber-900",
      hover: "hover:bg-amber-800/50",
    },
    border: {
      default: "border-amber-800",
      focus: "focus:border-amber-500",
      hover: "hover:border-amber-700",
    },
    text: {
      primary: "text-amber-100",
      secondary: "text-amber-300",
      placeholder: "placeholder-amber-700",
      accent: "text-amber-500",
      error: "text-red-500",
      warning: "text-yellow-500",
    },
  },

  components: {
    function: {
      parameter:
        "space-y-3 p-2 border-2 border-amber-800 rounded-none hover:border-amber-700 transition-colors",
    },
    functionContainer: [
      "rounded-none bg-amber-950/90 p-4",
      "border-2 border-amber-800",
    ].join(" "),

    input: [
      "block w-full rounded-none",
      "border-2 border-amber-800 bg-amber-900",
      "text-amber-100 placeholder-amber-700",
      "focus:border-amber-500 focus:ring-amber-500",
      "sm:text-sm font-mono",
    ].join(" "),

    badge: {
      base: "px-2 py-0.5 text-xs rounded-none font-medium font-mono border-2",
      variants: {
        public: "bg-green-900/50 text-green-400 border-green-800",
        private: "bg-red-900/50 text-red-400 border-red-800",
        internal: "bg-yellow-900/50 text-yellow-400 border-yellow-800",
        static: "bg-blue-900/50 text-blue-400 border-blue-800",
        initializer: "bg-purple-900/50 text-purple-400 border-purple-800",
      },
    },

    button: {
      base: "font-mono border-2",
      primary: [
        "bg-amber-900 text-amber-100 border-amber-700",
        "hover:bg-amber-800 hover:border-amber-600",
      ].join(" "),
      danger: [
        "bg-red-900 text-red-100 border-red-700",
        "hover:bg-red-800 hover:border-red-600",
      ].join(" "),
      outline: [
        "border-amber-700 text-amber-100",
        "hover:bg-amber-900/50 hover:text-amber-50",
      ].join(" "),
    },

    array: {
      container: "rounded-none bg-amber-900/50 border-2 border-amber-800",
      item: "border-2 border-amber-800 rounded-none hover:border-amber-700 transition-colors",
    },

    struct: {
      container: "rounded-none bg-amber-900/50 border-2 border-amber-800",
      field:
        "border-2 border-amber-800 rounded-none hover:border-amber-700 transition-colors",
    },

    toggle: {
      base: "w-11 h-6 bg-amber-800",
      active: "peer-checked:bg-amber-600",
      knob: "after:bg-amber-200 after:border-amber-400",
    },
  },

  effects: {
    transition: "transition-all duration-200",
    hover: "hover:opacity-100",
    focus: "focus:ring-2 focus:ring-amber-500/50 focus:outline-none",
  },
}) as Theme;
