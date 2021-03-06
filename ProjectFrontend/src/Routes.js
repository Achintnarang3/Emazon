import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from "./core/Home"
import SignUp from './user/Signup';
import Signin from './user/Signin';
import AdminDashBoard from './user/AdminDashBoard';
import Profile from './user/Profile';
import UserDashBoard from './user/UserDashBoard';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import Cart from './core/Cart';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct'
import ManageProduct from './admin/ManageProducts';
import   UpdateProduct  from './admin/UpdateProduct';



function Router()
{
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
        </Switch>
        <Switch>
        <Route path="/SignUp" exact component={SignUp}/>
        </Switch>
        <Switch>
        <Route path="/Cart" exact component={Cart}/>
        </Switch>
        <Switch>
        <Route path="/SignIn" exact component={Signin}/>
        </Switch>
        <Switch>
          <PrivateRoute path="/UserDashBoard" component={UserDashBoard}/>
            </Switch>
        <Switch>
          <AdminRoute path="/AdminDashBoard" component={AdminDashBoard}/>
        </Switch>
         <Switch>
          <AdminRoute path="/admin/create/category" component={AddCategory}/>
        </Switch>
         <Switch>
          <AdminRoute path="/admin/products" component={ManageProduct}/>
        </Switch>
          <Switch>
          <AdminRoute path="/admin/create/product" component={AddProduct}/>
        </Switch>
         <Switch>
          <AdminRoute path="/admin/product/update/:productId" component={ UpdateProduct}/>
        </Switch>

       

      </BrowserRouter>
     
    )
}

export default Router