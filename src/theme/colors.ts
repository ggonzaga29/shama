import chroma from "chroma-js";

export const lightBaseColors = {
  black: "#1C1C1C",
  white: "#FFFFFF",
};

// Light Theme
export const light = {
  black: {
    "100": chroma(lightBaseColors.black).darken(1).hex(),
    "80": chroma(lightBaseColors.black).darken(0.8).hex(),
    "40": chroma(lightBaseColors.black).darken(0.4).hex(),
    "20": chroma(lightBaseColors.black).darken(0.2).hex(),
    "10": chroma(lightBaseColors.black).darken(0.1).hex(),
    "5": chroma(lightBaseColors.black).darken(0.05).hex(),
  },
  white: {
    "100": chroma(lightBaseColors.white).darken(1).hex(),
    "80": chroma(lightBaseColors.white).darken(0.8).hex(),
    "40": chroma(lightBaseColors.white).darken(0.4).hex(),
    "20": chroma(lightBaseColors.white).darken(0.2).hex(),
    "10": chroma(lightBaseColors.white).darken(0.1).hex(),
    "5": chroma(lightBaseColors.white).darken(0.05).hex(),
  },
  primary: {
    brand: "#1C1C1C",
    blue: "#E3F5FF",
    purple: "#E5ECF6",
    "purple-50": chroma("#E5ECF6").alpha(0.5).hex(),
    light: "#F7F9FB",
    background: "#FFFFFF",
  },
  secondary: {
    indigo: "#95A4FC",
    purple: "C6C7F8",
    cyan: "A8C5DA",
    blue: "B1E3FF",
    green: "A1E3CB",
    mint: "BAEDBD",
    yellow: "FFE999",
    orange: "FFCB83",
    red: "FF4747",
  },
};
