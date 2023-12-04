import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../core/HomeLanding'
import NavigationBar from './components/NavigationBar'
import SignUp from '../user/SignUp';
import SignIn from '../auth/SignIn';
import UserList from '../user/UserList';
import ProductsList from '../product/ProductList';
import AddProduct from '../product/AddProduct';
import ReroutingRoutes from '../auth/ReroutingRoutes';
import Profile from '../user/Profile';
import EditProfile from '../user/EditProfile';
import DeleteUser from '../user/DeleteUser';
import OtherUserProfile from '../user/OtherUserProfile';
import auth from '../auth/auth-helper';
import EditProduct from '../product/EditProduct';

function MainRouter(props){



  return (
<>

    <Switch>
      <Route exact path='/' component={Home} />

      <ReroutingRoutes currentStatus={props.currentStatus} changeLogStatus={props.changeLogStatus} exact path='/listusers' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={UserList} />
      <ReroutingRoutes currentStatus={props.currentStatus} changeLogStatus={props.changeLogStatus} exact path='/listproducts' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={ProductsList} />
      <ReroutingRoutes currentStatus={props.currentStatus} changeLogStatus={props.changeLogStatus} exact path='/addProduct' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={AddProduct} />
      <ReroutingRoutes currentStatus={props.currentStatus} changeLogStatus={props.changeLogStatus} exact path='/editProduct/:id' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={EditProduct} />
      <ReroutingRoutes currentStatus={props.currentStatus} changeLogStatus={props.changeLogStatus} exact path='/profile' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={Profile} />
      <ReroutingRoutes currentStatus={props.currentStatus} changeLogStatus={props.changeLogStatus} exact path='/editprofile' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={EditProfile} />
      <ReroutingRoutes currentStatus={props.currentStatus} changeLogStatus={props.changeLogStatus} exact path='/deleteaccount' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={DeleteUser} />
      <ReroutingRoutes currentStatus={props.currentStatus} changeLogStatus={props.changeLogStatus} exact path="/users/:id" accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={OtherUserProfile} />

      <ReroutingRoutes currentStatus={props.currentStatus} changeLogStatus={props.changeLogStatus} exact path='/signin' accessibleIfLoggedIn={true} pathToReroute={'/'} component={SignIn} />
      <ReroutingRoutes currentStatus={props.currentStatus} changeLogStatus={props.changeLogStatus} exact path='/signup' accessibleIfLoggedIn={true} pathToReroute={'/'} component={SignUp} />

    </Switch>
  </>
  )
};

export default MainRouter
