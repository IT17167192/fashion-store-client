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
            <button className="btn btn-success col-sm-12">Checkout</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary col-sm-12">Sign in to Checkout</button>
            </Link>
        )
    };

    return (
        <div>
            <div className="row">
                <div className="col-sm-5">
                    <h6>Subtotal: </h6>
                </div>
                <div className="col-sm-7 text-right">
                    ${getTotal()}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-5">
                    <h5>Total: </h5>
                </div>
                <div className="col-sm-7 text-right">
                    <h5>${getTotal()}</h5>
                </div>
            </div>

            {showCheckout()}

        </div>
    )
};

export default Checkout;
