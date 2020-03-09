import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Layout from './core/Layout';
import Home from './core/Home';
import Signup from "./user/Signup";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/layout" exact component={Layout} />
                <Route path="/signup" exact component={Signup} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;
