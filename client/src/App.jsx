import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const App = () => {
  React.useEffect(() => {

    // Clean up server-side injected JSS styles
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const theme = createTheme({
    palette: {

      secondary: {
        main: 'rgb(210,141,13)'

      }
    }
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </Router>
  );
};


// Wrap the App component with the hot module loader
//export default hot(module)(App);
export default App;


