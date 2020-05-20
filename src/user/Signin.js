import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {Link, Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticate} from "../auth";
import {addItem, getCartProductId, showCart} from "../core/CartHelper";
import {updateUserCart} from "../core/apiCore";
import {read} from "./apiUser";

const Signin = () => {

    const [values, setValues] = useState({
        email: 'mails444@gmail.com',
        password: '1234kasun',
        error: '',
        loading: false,
        redirect: false
    });

    const [productId, setProductId] = useState({
        product: '',
        errorP: ''
    });

    const [items, setItems] = useState([]); //state for cart items
    const {email, password, loading, error, redirect} = values;
    const {user} = isAuthenticate();


    useEffect(() => {
        //set cart items to state
        setItems(showCart());
    }, []);

    //function to add db items to local storage
    const addToCart = (product) => {
        addItem(product, () => {
            return <Redirect to="/cart"/>;  //redirect to cart
        })
    };

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
        setProductId({...productId, errorP: false, product: JSON.parse(JSON.stringify(getCartProductId()))});
    };

    //method to set cart items to db
    const setProduct = (product) => {
        const {token, user} = isAuthenticate(); //get logged user details

        //set items in the local storage to database
        updateUserCart(user._id, token, {product}).then(data => {
            if (data.error) {
                console.log(data.error);
            }
        })
    };

    //function to set db products to local storage
    const setDbProductsToCart = () => {
        const {token, user} = isAuthenticate();

        //get cart items from db
        read(user._id, token).then(data => {
            if (data.error) {
            } else {
                //get db items one by one and add to local storage
                for (let i = 0; i < (data.product).length; i++) {
                    addToCart((data.product)[i]);
                }
            }
        });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});

        signin({email, password})
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                    authenticate(data, () => {
                            setValues({...values, redirect: true})
                        }
                    );

                    //get cart items one by one and add to db
                    if (items.length > 0) {
                        for (let i = 0; i < items.length; i++) {
                            setProduct(items[i]);
                        }
                    }

                    setDbProductsToCart();  //set db items to cart
                }
            })
    };

    const showError = () => (
        <div className="alert alert-danger text-center" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-info">
            <h2>Loading...</h2>
        </div>)
    );

    const redirectUser = () => {
        if (redirect) {
            if (user && user.role === "1") {
                return <Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="/user/dashboard"/>
            }
        }

        if (isAuthenticate()) {
            return <Redirect to="/"/>
        }
    };

    const signInForm = () => (

        <div className="container d-flex mt-5 justify-content-center">
            <div className="col-sm-5">
                <h3 className="text-center mt-4 font-weight-bolder">Sign in</h3>
                <div className="card card-body mt-5">
                    <form>
                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input type="email" onChange={handleChange('email')} className="form-control"
                                   value={email}/>
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            <input type="password" onChange={handleChange('password')} className="form-control"
                                   value={password}/>
                        </div>
                        {showLoading()}
                        {showError()}
                        <button className="btn btn-primary w-100" disabled={values.loading}
                                onClick={clickSubmit}>Sign
                            in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {signInForm()}
            {redirectUser()}
        </div>
    )
};

export default Signin;
