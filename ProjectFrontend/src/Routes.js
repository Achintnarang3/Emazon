import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from "./core/Home"
import SignUp from './user/Signup';
import Signin from './user/Signin';

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
            <Route path="/SignIn" exact component={Signin}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Router