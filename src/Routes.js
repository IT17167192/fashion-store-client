import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Layout from './core/Layout';
import Home from './core/Home';
import ShopPage from './core/Shop';
import Signup from "./user/Signup";
import Menu from './core/Menu';
import Signin from "./user/Signin";
import Product from "./core/Product";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import StoreManagerRote from "./auth/StoreManagerRoute"
import AdminDashboard from "./user/AdminDashboard";
import Cart from "./core/Cart";
import AddCategory from "./admin/AddCategory";
import Profile from "./user/Profile";
import AddProduct from "./admin/AddProduct";
import AddAdminUser from "./admin/AddAdminUser";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Wishlist from "./core/Wishlist";


const Routes = () => {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={ShopPage} />
                <Route path="/layout" exact component={Layout} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/product/:productId" exact component={Product} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <StoreManagerRote
                    path="/admin/dashboard" exact component={AdminDashboard} />
                <StoreManagerRote
                    path="/create/category" exact component={AddCategory} />
                <StoreManagerRote
                    path="/create/product" exact component={AddProduct} />
                <AdminRoute
                    path="/create/user" exact component={AddAdminUser} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/wishlist" exact component={Wishlist} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute
                    path="/admin/products" exact component={ManageProducts} />
                <AdminRoute
                    path="/admin/product/update/:productId" exact component={UpdateProduct} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;
