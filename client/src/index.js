import React from "react";
import ReactDOM from "react-dom";
import { Paper } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "fontsource-roboto";

import "./index.css";
import App from "./App";
import { store } from "./reducer";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <Paper style={{ height: "95vh" }}>
          <App />
        </Paper>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
