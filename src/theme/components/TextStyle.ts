import { defineTextStyles } from "@chakra-ui/react";

export const textStyles = defineTextStyles({
  heading: {
    value: {
      fontSize: {
        base: "20px",
        sm: "24px",
        md: "30px",
        lg: "36px",
      },
      fontWeight: 400,
      fontFamily: "Poppins",
      lineHeight: "normal",
    },
  },
  body: {
    value: {
      fontSize: {
        base: "15px",
        md: "17px",
      },
      fontWeight: 400,
      fontFamily: "poppins",
      lineHeight: "normal",
    },
  },
  caption: {
    value: {
      fontSize: { base: "14px", sm: "16px", md: "18px" },
      fontFamily: "poppins",
      lineHeight: "normal",
      fontWeight: 500,
    },
  },
});
