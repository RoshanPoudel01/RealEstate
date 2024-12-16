import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { ColorStyles } from "./ColorStyle";
import { textStyles } from "./components/TextStyle";
import { buttonRecipes } from "./recipes/button.recipe";

const config = defineConfig({
  globalCss: {
    "html, body": {
      lineHeight: "normal",
    },
  },

  theme: {
    tokens: {
      fonts: {
        body: { value: "Inter" },
      },

      colors: ColorStyles,
    },
    semanticTokens: {
      colors: {
        primary: {
          solid: { value: "{colors.primary.500}" },
          contrast: { value: "white" },
          fg: { value: "{colors.primary.700}" },
          muted: { value: "{colors.primary.100}" },

          subtle: { value: "{colors.gray.100}" },
          emphasized: { value: "{colors.primary.900}" },
          focusRing: { value: "{colors.primary.500}" },
        },
      },
    },
    recipes: {
      button: buttonRecipes,
    },
    textStyles: textStyles,
  },
});

export const system = createSystem(defaultConfig, config);
