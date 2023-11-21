import React from 'react'
import { hydrate } from 'react-dom';
 import App from './App'
// import Home from '../core/HomeLanding'

hydrate(<App/>, document.getElementById("root"))
