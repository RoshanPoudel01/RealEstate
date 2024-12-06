import { css, Global } from "@emotion/react";

const globalStyles = () => {
  return (
    <Global
      styles={() => css`
        @font-face {
          font-family: "Mulish";
          font-style: normal;
          font-weight: regular;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          font-family: "Mulish";
          scroll-behavior: smooth;
          background: #fff;
        }
        body {
          -moz-osx-font-smoothing: grayscale;
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          padding-top: 0px;
          margin: 0px;
          font-family: "Mulish";
        }
        * {
          box-sizing: border-box;
          &:before,
          &:after {
            box-sizing: border-box;
          }
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        ul,
        li,
        h6,
        p,
        img,
        figure {
          margin: 0px;
          padding: 0px;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          box-shadow: 0 0 0 30px white inset !important;
          z-index: 0;
        }
      `}
    />
  );
};

export { globalStyles };
