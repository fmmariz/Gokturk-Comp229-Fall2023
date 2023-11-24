import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';

const App = () => {
  React.useEffect(() => {
    
    // Clean up server-side injected JSS styles
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return ( 
    <Router>
       <MainRouter />
    </Router>
  );
};


// Wrap the App component with the hot module loader
 //export default hot(module)(App);
export default App;


