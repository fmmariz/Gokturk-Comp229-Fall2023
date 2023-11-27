import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../core/HomeLanding'
import NavigationBar from './components/NavigationBar'
import Signup from '../user/SignUp';
import SignIn from '../auth/SignIn';
import UserList from '../user/UserList';
import ProductList from '../product/ProductList';
import ReroutingRoutes from '../auth/ReroutingRoutes';
import Profile from '../user/Profile';
import EditProfile from '../user/EditProfile';
import DeleteUser from '../user/DeleteUser';

const MainRouter = () => (
  <>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/landing' component={Home} />

      <ReroutingRoutes exact path='/listusers' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={UserList} />
      <ReroutingRoutes exact path='/listproducts' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={ProductList} />
      <ReroutingRoutes exact path='/profile' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={Profile} />
      <ReroutingRoutes exact path='/editprofile' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={EditProfile} />
      <ReroutingRoutes exact path='/deleteaccount' accessibleIfLoggedIn={false} pathToReroute={'/signin'} component={DeleteUser} />

      <ReroutingRoutes exact path='/signin' accessibleIfLoggedIn={true} pathToReroute={'/landing'} component={SignIn} />
      <ReroutingRoutes exact path='/signup' accessibleIfLoggedIn={true} pathToReroute={'/landing'} component={Signup} />

    </Switch>
  </>
)

export default MainRouter
