import React, {useEffect, useState} from "react";
import {getBraintreeClientToken, processPayment, removeCartItem} from "./apiCore";
import {emptyCart, showSelectedCart} from "./CartHelper";
import {Link} from "react-router-dom";
import {isAuthenticate} from "../auth";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({products}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticate() && isAuthenticate().user._id;
    const token = isAuthenticate() && isAuthenticate().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({...data, error: data.error});
            } else {
                setData({clientToken: data.clientToken});
            }
        })
    };

    useEffect(() => {
        getToken(userId, token)
    }, []);

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return (nextValue.isChecked ? (parseFloat(currentValue) + parseFloat(nextValue.count) * parseFloat(nextValue.price)).toFixed(2) : (parseFloat(currentValue)).toFixed(2));
        }, 0)
    };

    const showCheckout = () => {
        return isAuthenticate() ? (
            <div>
                <button className="btn btn-block btn-light" onClick={() => showOnlinePay()}>Online Payment</button>
                <button className="btn btn-block btn-light">Cash On Delivery</button>
            </div>
            // <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary col-sm-12">Sign in to Checkout</button>
            </Link>
        )
    };

    const buy = () => {
        setData({loading: true});
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                // console.log(data)
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethod'
                // and also total to be charged
                // console.log('send nonce and total to process: ', nonce, getTotal(products))
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        // console.log(response)
                        setData({...data, success: response.success});

                        const { token, user } = isAuthenticate();
                        const items = showSelectedCart();   //get selected items

                        //remove paid products from db one by one
                        for (let i = 0; i < items.length; ++i) {
                            removeCartItem(user._id, token, items[i]).then(data => {
                                if (data.error) {
                                    console.log(data.error);
                                }
                            });
                        }

                        //delete paid products from local storage
                        emptyCart(() => {
                            console.log('payment success and empty cart');
                            setData({loading: false})

                            // in case page does not reload by itself uncomment the below
                            // window.location.reload();
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({loading: false});
                    })
            })
            .catch(error => {
                // console.log('dropin error: ', error)
                setData({...data, error: error.message})
            })
    };

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ""})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: "vault"
                        }
                    }} onInstance={instance => data.instance = instance} />
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                </div>
            ) : null}
        </div>
    );

    const showOnlinePay = () => (
        <div>
            {showDropIn()}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{display: success ? "" : "none"}}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading => loading && <h2>Loading...</h2>;

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
                <div className="col-sm-5 mb-3">
                    <h5>Total: </h5>
                </div>
                <div className="col-sm-7 text-right">
                    <h5>${getTotal()}</h5>
                </div>
            </div>

            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showCheckout()}

        </div>
    )
};

export default Checkout;
