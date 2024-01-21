import { createTheme } from "@mui/material/styles";

export const THEME = createTheme({
  typography: {
    fontFamily: "Epilogue, sans-serif;",

    h1: {
      fontFamily: "Epilogue, sans-serif;",
      fontWeight: 700
    },
    h2: {
      fontFamily: "Epilogue, sans-serif;",
      fontWeight: 700
    },
    h3: {
      fontFamily: "Epilogue, sans-serif;",
      fontWeight: 700
    },
    h4: {
      fontFamily: "Epilogue, sans-serif;",
      fontWeight: 700
    },
    h5: {
      fontFamily: "Epilogue, sans-serif;",
      fontWeight: 700
    },
    h6: {
      fontFamily: "Epilogue, sans-serif;",
      fontWeight: 700
    },
    button: {
      textTransform: "capitalize",
    },
  },

  palette: {
    primary: {
      light: "#5e29aa",
      main: "#873bf4",
      dark: "#9f62f6",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#000",
    },
    success: {
      main: "#1dbf17",
    },
    warning: {
      light: "#ef0f0f",
      main: "#c20a12",
    },
    text: {
      primary: "#121212",
    },
  },

  components: {},
});
