import React from "react";
import ReactDOM from "react-dom";
import { Paper } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "fontsource-roboto";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./reducer";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <Paper style={{ height: "95vh" }}>
          <App />
        </Paper>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
