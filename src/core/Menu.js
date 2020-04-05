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
    <div>
        <ul className="nav nav-tabs bg-primary container-fluid col-auto">

            {isAuthenticate() && (parseInt(isAuthenticate().user.role) === 1 || parseInt(isAuthenticate().user.role) === 2) && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/admin/dashboard')}
                          to="/admin/dashboard">Dashboard</Link>
                </li>
            )}

            {isAuthenticate() && parseInt(isAuthenticate().user.role) === 0 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/user/dashboard')}
                          to="/user/dashboard">Dashboard</Link>
                </li>
            )}

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </li>

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


            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/cart')}
                      to="/cart">Cart
                    <sup><small className="cart-badge"> {totalItems()}</small></sup>
                </Link>
            </li>


        </ul>
    </div>
);

export default withRouter(Menu);
