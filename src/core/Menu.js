import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticate} from "../auth";
import {totalItems} from "./CartHelper";


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#ff9900'};
    } else {
        return {color: '#ffffff'};
    }
};

const Menu = ({history}) => (

    <nav className="navbar navbar-expand-lg navbar-dark primary-color">
        <Link className="navbar-brand" to="/">Fashion Store</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basicExampleNav">

            <ul className="navbar-nav mr-auto">
                {isAuthenticate() && (parseInt(isAuthenticate().user.role) === 0 || parseInt(isAuthenticate().user.role) === 1 || parseInt(isAuthenticate().user.role) === 2) && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/user/dashboard')}
                              to="/user/dashboard">{parseInt(isAuthenticate().user.role) === 0 ? "Dashboard" : "User Dashboard"}</Link>
                    </li>
                )}

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/cart')}
                          to="/cart">Cart
                        <sup><small className="cart-badge"> {totalItems()}</small></sup>
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav">
                {isAuthenticate() && (parseInt(isAuthenticate().user.role) === 1 || parseInt(isAuthenticate().user.role) === 2) && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/admin/dashboard')}
                              to="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                )}
                {!isAuthenticate() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticate() && (
                    <div>
                        <li className="nav-item">
                        <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}}
                              onClick={() => signout(() => {
                                  history.push('/');
                              })}>Signout</span>
                        </li>
                    </div>
                )}
            </ul>

        </div>

    </nav>
);

export default withRouter(Menu);
