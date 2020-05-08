import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticate} from "../auth";
import {totalItems} from "./CartHelper";
import{totalWishlistItems} from "./WishlistHelper";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#ff9900'};
    } else {
        return {color: '#7a7a7a'};
    }
};

const Menu = ({history}) => (

    <nav className="navbar navbar-expand-lg navbar-dark rgba-grey-slight mb-2">
        <Link className="navbar-brand text-dark font-weight-bolder" to="/">Fashion Store</Link>
        <button className="navbar-toggler btn-orange" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basicExampleNav">

            <ul className="navbar-nav mr-auto">
                {isAuthenticate() && (parseInt(isAuthenticate().user.role) === 0 || parseInt(isAuthenticate().user.role) === 1 || parseInt(isAuthenticate().user.role) === 2) && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/user/dashboard')}
                              to="/user/dashboard">{parseInt(isAuthenticate().user.role) === 0 ? "DASHBOARD" : "USER DASHBOARD"}</Link>
                    </li>
                )}

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">HOME</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">STORE</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/wishlist')}
                          to="/wishlist">WISHLIST
                        <sup><small className="wishlist-badge badge-warning"> {totalWishlistItems()}</small></sup>
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav">
                <li className="nav-item mr-5">
                    <Link className="nav-link" style={isActive(history, '/cart')}
                          to="/cart"><FontAwesomeIcon className="mr-1" size={"lg"} icon={faShoppingCart}/>
                        <sup><small className="cart-badge badge-warning"> {totalItems()}</small></sup>
                    </Link>
                </li>

                {isAuthenticate() && (parseInt(isAuthenticate().user.role) === 1 || parseInt(isAuthenticate().user.role) === 2) && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/admin/dashboard')}
                              to="/admin/dashboard">ADMIN DASHBOARD</Link>
                    </li>
                )}
                {!isAuthenticate() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">SIGN IN</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">SIGN UP</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticate() && (
                    <div>
                        <li className="nav-item">
                        <span className="nav-link" style={{cursor: 'pointer', color: '#7a7a7a'}}
                              onClick={() => signout(() => {
                                  history.push('/');
                              })}>SIGN OUT</span>
                        </li>
                    </div>
                )}
            </ul>

        </div>

    </nav>
);

export default withRouter(Menu);
