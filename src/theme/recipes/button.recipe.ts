const buttonStyle = {
  width: "max-content",
  transition: "transform 0.15s ease-out, background 0.15s ease-out",
  _active: {
    transform: "scale(0.99)",
  },
  fontWeight: 500,
};

export const buttonRecipes = {
  variants: {
    variant: {
      primary: {
        ...buttonStyle,
        bg: "primary.500",
        borderRadius: "50px",
        _hover: {
          bg: "primary.600",
        },
        color: "white",
      },
      outline: {
        ...buttonStyle,
        border: "2px solid",
      },
      solid: {
        ...buttonStyle,
      },
      subtle: {
        ...buttonStyle,
      },
      surface: {
        ...buttonStyle,
      },
      ghost: {
        boxShadow: "none",
        _active: {
          transform: "scale(0.99)",
        },
      },
    },
  },
  base: {
    colorPalette: "primary",
  },
};
