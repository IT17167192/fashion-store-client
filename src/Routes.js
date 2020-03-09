import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Layout from './core/Layout';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/layout" exact component={Layout} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;
