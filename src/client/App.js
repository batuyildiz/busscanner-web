import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './assets/scss/style.scss';
import './assets/images/favicon.ico';
import './assets/css/main.min.css';
import './assets/css/plugins.min.css';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#ff214f' },
    secondary: { main: '#50ecef' },
  },
});

function App({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default App;
