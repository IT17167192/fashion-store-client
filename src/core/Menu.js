import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticate} from "../auth";
import {totalItems} from "./CartHelper";
import{totalWishlistItems} from "./WishlistHelper";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faShoppingCart,
    faUserCircle,
    faSignOutAlt,
    faUsersCog,
    faSignInAlt,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons'

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
                              to="/user/dashboard">Dashboard</Link>
                    </li>
                )}

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Store</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/wishlist')}
                          to="/wishlist">Wishlist
                        <sup><small className="wishlist-badge badge-warning"> {totalWishlistItems()}</small></sup>
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav">
                <li className="nav-item mr-1">
                    <Link className="nav-link" style={isActive(history, '/cart')}
                          to="/cart"><FontAwesomeIcon size={"lg"} icon={faShoppingCart}/>
                        <sup><small className="cart-badge badge-warning"> {totalItems()}</small></sup>
                    </Link>
                </li>

                {!isAuthenticate() && (
                    <div className="mr-3">
                        <li className="nav-item dropdown" style={{cursor: 'pointer', color: '#7a7a7a'}}>
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink"
                               style={{cursor: 'pointer', color: '#7a7a7a'}}
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon size={"lg"} icon={faUserCircle}/>
                                Sign in | Join
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Fragment>
                                    <li className="dropdown-item">
                                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                                            <FontAwesomeIcon size={"lg"} icon={faSignInAlt}/> {'  '} Sign in
                                        </Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                                            <FontAwesomeIcon size={"lg"} icon={faUserPlus}/> {'  '} Sign up
                                        </Link>
                                    </li>
                                </Fragment>
                            </div>
                        </li>
                    </div>
                )}


                {isAuthenticate() && (
                    <div className="mr-3">
                        <li className="nav-item dropdown" style={{cursor: 'pointer', color: '#7a7a7a'}}>
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink"
                               style={{cursor: 'pointer', color: '#7a7a7a'}}
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon size={"lg"} icon={faUserCircle}/>
                                {' '} Hi! {isAuthenticate().user.name}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {isAuthenticate() && (parseInt(isAuthenticate().user.role) === 1 || parseInt(isAuthenticate().user.role) === 2) && (
                                    <div>
                                        <span className="dropdown-item">
                                            <Link className="nav-link" style={isActive(history, '/admin/dashboard')}
                                                  to="/admin/dashboard"><FontAwesomeIcon size={"lg"} icon={faUsersCog}/>
                                                  {' '} Admin Panel</Link>
                                        </span>
                                        <div className="dropdown-divider"></div>
                                    </div>
                                )}
                                <span className="dropdown-item" style={{cursor: 'pointer', color: '#7a7a7a'}}
                                      onClick={() => signout(() => {
                                          history.push('/');
                                      })}> <FontAwesomeIcon size={"sm"} icon={faSignOutAlt}/> {' '} Sign out</span>
                            </div>
                        </li>
                    </div>
                )}
            </ul>

        </div>

    </nav>
);

export default withRouter(Menu);
