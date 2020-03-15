import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Layout from './core/Layout';
import Home from './core/Home';
import Signup from "./user/Signup";
import Menu from './core/Menu';
import Signin from "./user/Signin";
import Product from "./core/Product";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import Cart from "./core/Cart";
import AddCategory from "./admin/addCategory";
import Profile from "./user/Profile";

const Routes = () => {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/layout" exact component={Layout} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/product/:productId" exact component={Product} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute
                    path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute
                    path="/create/category" exact component={AddCategory} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;
