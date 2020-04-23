import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getProduct, updateUserCart} from "./apiCore";
import ShowSingleImage from "./ShowSingleImage";
import {isAuthenticate} from "../auth";
import {addItem} from "./CartHelper";
import {Redirect} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import {faCcVisa, faCcMastercard, faCcAmex, faCcPaypal} from '@fortawesome/free-brands-svg-icons';

const Product = props => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const singleProduct = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        })
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        singleProduct(productId);
    }, []);

    const addToCart = () => {
        const {token, user} = isAuthenticate();

        if (user != null) {
            updateUserCart(user._id, token, {product}).then(data => {
                if (data.error) {
                    console.log(data.error);
                }
            });
        }

        addItem(product, () => {
            setRedirect(true);
        })
    };

    const makeCartRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart"/>
        }
    };

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-warning badge-pill">Out of Stock</span>
        );
    };

    const showAddToCartBtn = (quantity) => {
        return quantity > 0 &&
            <button onClick={addToCart} className="btn bg-dark text-white mt-2 mb-2">Add to Cart</button>;
    };

    return (
        <Layout title={product.name} description={product.description} className="container-fluid">
            {makeCartRedirect(redirect)}
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 mt-5">
                        <ShowSingleImage item={product} url="product"/>
                    </div>
                    <div className="col-lg-6 mt-5 ml-5">
                        <h3 className="text-uppercase">{product.name}</h3>

                        <h3 className="red-text mt-3 mr-3 font-weight-bolder">{product.currency} {parseFloat(product.price).toFixed(2)}</h3>

                        <div className="mt-5">
                            <h5 className="font-weight-bolder">Product Description</h5>
                            <h5 className="text-black-50">{product.description}</h5>
                        </div>

                        <h6 className="text-black-50 mt-4">Note: Product colour may slightly vary depending on your
                            monitor settings.</h6>

                        <div>
                            <h5 className="mt-5">Availability</h5>
                            {showStock(product.quantity)}
                        </div>
                        <div className="row mt-5">
                            {showAddToCartBtn(product.quantity)}
                            <button onClick={addToCart} className="btn btn-orange text-white mt-2 mb-2">Add to Wish
                                List
                            </button>
                        </div>

                        <div className="row mt-3">
                            <p className="ml-1">Payments: </p>
                            <div>
                                <FontAwesomeIcon className="ml-2 mr-1" icon={faMoneyBill}/>
                                <FontAwesomeIcon className="mr-1" icon={faCcVisa}/>
                                <FontAwesomeIcon className="mr-1" icon={faCcMastercard}/>
                                <FontAwesomeIcon className="mr-1" icon={faCcAmex}/>
                                <FontAwesomeIcon icon={faCcPaypal}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Product;
