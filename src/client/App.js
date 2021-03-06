import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './assets/scss/style.scss';
import './assets/images/favicon.ico';
import './assets/css/main.min.css';
import './assets/css/plugins.min.css';
import './assets/images/bg.jpg';
import CookieConsent from './components/cookieConsent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ff214f' },
    secondary: { main: '#50ecef' },
  },
});

toast.configure();

function App({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
      <CookieConsent />
    </MuiThemeProvider>
  );
}

export default App;
