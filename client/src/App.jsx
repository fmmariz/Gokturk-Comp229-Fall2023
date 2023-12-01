import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import auth from '../auth/auth-helper';
import NavigationBar from './components/NavigationBar';

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

  const [loggedIn, setLoggedIn] = useState(auth.isAuthenticated)
  const changeLogStatus = (bool) => {
    console.log("CHANGING STATE")
    console.log(loggedIn)
    console.log("Requesting to change status to " + bool)
    if (bool) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    console.log(loggedIn)
  };

  useEffect(() => {
    console.log("epic", loggedIn)
  }, [loggedIn])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <NavigationBar key={loggedIn} currentStatus={loggedIn} changeLogStatus={changeLogStatus} />
        <MainRouter currentStatus={loggedIn} changeLogStatus={changeLogStatus} />
      </ThemeProvider>
    </Router>
  );
};


// Wrap the App component with the hot module loader
//export default hot(module)(App);
export default App;


