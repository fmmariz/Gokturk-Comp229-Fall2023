import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../core/HomeLanding'
import Signin from '../user/Signin'
import NavigationBar from './components/NavigationBar'
import Signup from '../user/SignUp';
import UserList from '../user/UserList';
import ProductList from '../product/ProductList';

// // import { Router } from 'express'


const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/landing' component={Home} />

        <Route exact path='/listusers' component={UserList}/>
        <Route exact path='/listproducts' component={ProductList}/>

        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />

      </Switch>
      </>
  )
}

export default MainRouter
