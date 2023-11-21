import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../core/HomeLanding'
import Login from '../user/Login'
import Hello from './components/Hello'

// // import { Router } from 'express'


const MainRouter = () => {
  return (
    <div>
      <Hello/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />

      </Switch>
    </div>
  )
}

export default MainRouter
