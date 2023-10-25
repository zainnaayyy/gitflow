import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        // Dark Version
        grey: {
          80: "#292e32",
          90: "#ced4da",
          100: "#e0e0e0",
          110: "#2a2f34",
          200: "#c2c2c2", // Sidebar menu Color
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
          1000: "#373A3E",
          1001: "#ffffff",
          1002: "#597c99",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1a1d21",
          450: "#24292d",
          500: "#1a1d21",
          600: "#101624",
          700: "#0c101b",
          710: "#212529",
          800: "#080b12",
          900: "#040509",
          1000: "#394047",
          1100: "#1b1d21",
        },
        greenAccent: {
          90: "#38574c",
          100: "#dbf5ee",
          110: "#6ad467",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          // 500: "#4cceac", // ORI
          500: "#2e7c67",
          600: "#3da58a",
          610: "#53da7d",
          700: "#2e7c67",
          710: "#22302b",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          90: "#534930",
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          // 500: "#db4f4a",  ORI
          500: "#832f2c",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          90: "#597c99",
          100: "#e1e2fe",
          // 110: "#5ea3cb",  // orig
          // 110: "#008ffb",
          110: "#418bb4",
          200: "#c3c6fd",
          210: "#ced4da",
          300: "#a4a9fc",
          310: "#5ea3cb",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
        contentCard: {
          100: "#6ada7d",
          200: "#58caea",
          300: "#5ea3cb",
          400: "#f8b84b",
          500: "#878a99",
          600: "#597c99",
          700: "#878a99",
          800: "#212529",
          900: "#2a2f34",
        },
        headerCard: {
          100: "#2a2f34",
          200: "#ffffff",
          300: "#ffffff",
        },
        pagination: {
          100: "#ffffff",
        },
        dialogCard: {
          100: "#2a2f34",
        },
        tooltip: {
          100: "#252b32",
        },
        contentSideBar: {
          100: "#89929b",
          200: "#f4f4f4",
          300: "#ced4da",
          400: "#5ea3cb",
          500: "#878aa9",
          600: "#495057",
          700: "#878a99",
          800: "#ffffff",
          900: "#222",
        },
        button: {
          // 100: "#3e9efa",
          100: "#008fff",
          200: "#0e8e5f", // Verde
        },
        profile: {
          // 100: "#418bb4", // blue 1
          100: "#3e9efa", // blue 1
          200: "#4fc1ff", // blue 2
          300: "#9cdcfe", // blue 3
          400: "#008fff", // blue 4
          500: "#dcdcaa", // yellow
          600: "#da70d6", // pink
          700: "#f04d4c", // red
          800: "#74c991", //green
        },
        icons: {
          100: "#00ca4e", // Green
          110: "#75FF33", // Green Light
          200: "#ffbd44", // yellow
          300: "#ff605c", // red
          400: "#008fff", // blue (info)
        },
        gradient: {
          100: "linear-gradient(180deg, #FF6B6B, #FF4D4D)", // Red light
          110: "linear-gradient(180deg, #FF0000, #8B0000)", // Red strong

          200: "linear-gradient(180deg, #FFA500, #FFB766)", // Orange light
          210: "linear-gradient(180deg, #FFA500, #FF8C00)", // Orange strong

          400: "linear-gradient(180deg, #00ca4e, #33d35e)", // Green light
          410: "linear-gradient(180deg, #00FF00, #006400)", // Green strong

          500: "linear-gradient(180deg, #3c9dfa, #5892f3)", // Blue light
          510: "linear-gradient(180deg, #0000FF, #00008B)", // Blue strong

          600: "linear-gradient(180deg, #4B0082, #191970)", // Indigo
          700: "linear-gradient(180deg, #EE82EE, #9400D3)", //
        },
      }
    : {
        // Light Version
        grey: {
          80: "#ffffff",
          90: "#ced4da",
          100: "#141414",
          110: "#75afd0",
          200: "#495057", // Sidebar menu Color
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
          1000: "#aeb4b7",
          1001: "#495057",
          1002: "#889694",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          450: "#ebebf2",
          // 450: "#49A9F7", // Soft Blue
          // 450: "#151529", // Strong Blue
          // 450: "#137abd ", // Old Blue
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          710: "#ffffff",
          800: "#a1a4ab",
          900: "#d0d1d5",
          1000: "#f2f2f7",
          1100: "#f2f2f7",
        },
        greenAccent: {
          90: "#95f8a7",
          100: "#0f2922",
          110: "#2b7529",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          610: "#6ada84",
          700: "#94e2cd",
          710: "#e3eee5",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          90: "#f6c977",
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          90: "#a4b0bf",
          100: "#151632",
          // 110: "#13577e", // ORI
          110: "#008ffb",

          200: "#2a2d64",
          210: "#212529",
          300: "#3e4396",
          310: "#b6bfc5",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
        contentCard: {
          100: "#56ce6e",
          200: "#6edfff",
          300: "#56b3ce",
          400: "#ffbc6e",
          500: "#878aa9",
          600: "#495057",
          700: "#878a99",
          800: "#ffffff",
          // 900: "#137abd",
          900: "#e7e7e7", // testing
        },
        headerCard: {
          100: "#ebebf2",
          200: "#495057",
          300: "#757575",
        },
        pagination: {
          100: "#495057",
        },
        dialogCard: {
          100: "#f2f2f7",
        },
        tooltip: {
          100: "#FFF",
        },
        contentSideBar: {
          100: "#495057",
          200: "#",
          300: "#ffffff",
          400: "#3e9efa",
          500: "#878aa9",
          600: "#495057",
          700: "#878a99",
          800: "#ffffff",
          900: "#6e7071",
        },
        button: {
          // 100: "#3e9efa",
          100: "#008fff",
          200: "#0e8e5f", // Verde
        },
        profile: {
          // 100: "#169fff", // blue 1
          100: "#3e9efa", // blue 1
          200: "#4fc1ff", // blue 2
          300: "#9cdcfe", // blue 3
          400: "#008fff", // blue 4
          500: "#dcdcaa", // yellow
          600: "#da70d6", // pink
          700: "#f04d4c", // red
          800: "#74c991", //green
        },
        icons: {
          100: "#00ca4e", // Green (create)
          200: "#ffbd44", // yellow (update)
          300: "#ff605c", // red (delete)
          400: "#008fff", // blue (info)
        },
        gradient: {
          100: "linear-gradient(180deg, #FF6B6B, #FF4D4D)", // Red light
          110: "linear-gradient(180deg, #FF0000, #8B0000)", // Red strong

          200: "linear-gradient(180deg, #FFA500, #FFB766)", // Orange light
          210: "linear-gradient(180deg, #FFA500, #FF8C00)", // Orange strong

          400: "linear-gradient(180deg, #00ca4e, #33d35e)", // Green light
          410: "linear-gradient(180deg, #00FF00, #006400)", // Green strong

          500: "linear-gradient(180deg, #3c9dfa, #5892f3)", // Blue light
          510: "linear-gradient(180deg, #0000FF, #00008B)", // Blue strong

          600: "linear-gradient(180deg, #4B0082, #191970)", // Indigo
          700: "linear-gradient(180deg, #EE82EE, #9400D3)", //
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#f2f2f7",
            },
          }),
    },
    typography: {
      fontFamily: ["Hanken Grotesk", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Hanken Grotesk", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Hanken Grotesk", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Hanken Grotesk", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Hanken Grotesk", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Hanken Grotesk", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Hanken Grotesk", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
