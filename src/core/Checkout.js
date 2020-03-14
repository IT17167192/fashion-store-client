import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getProducts} from "./apiCore";
import Card from "./Card";
import {Link} from "react-router-dom";
import {isAuthenticate} from "../auth";

const Checkout = ({products}) => {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return (parseFloat(currentValue) + parseFloat(nextValue.count) * parseFloat(nextValue.price)).toFixed(2);
        }, 0)
    };

    const showCheckout = () => {
        return isAuthenticate() ? (
            <button className="btn btn-success">Checkout</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to Checkout</button>
            </Link>
        )
    };

    return <div>
        <h2>Total: ${getTotal()}</h2>

        {showCheckout()}
    </div>
};

export default Checkout;