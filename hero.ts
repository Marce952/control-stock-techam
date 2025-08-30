// hero.ts
import { heroui } from "@heroui/react";

export default heroui({
  themes: {
    light: {
      colors: {
        primary: "#8906e6",   // Azul
      },
    },
    dark: {
      colors: {
        primary: "#3B82F6",
        secondary: "#A855F7",
        success: "#4ADE80",
        warning: "#FACC15",
        danger: "#F87171",
      },
    },
  },
});
