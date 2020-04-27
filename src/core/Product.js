import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getProduct, updateUserCart, updateUserWishlist} from "./apiCore";
import ShowSingleImage from "./ShowSingleImage";
import {isAuthenticate} from "../auth";
import {addItem} from "./CartHelper";
import {Redirect} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import {faCcVisa, faCcMastercard, faCcAmex, faCcPaypal} from '@fortawesome/free-brands-svg-icons';
import CircularProgress from "@material-ui/core/CircularProgress";
import {addItemtoWishlist} from "./WishlistHelper";
import RateComponent from "./Rate";
import CommentComponent from "./CommentComponent";
import Ftr from "./Ftr";

const Product = props => {

    const [product, setProduct] = useState({});
    const [comments, setComments] = useState(null);
    const [loadingComments, setLoadingComments] = useState(true);
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [redirectWish, setRedirectWish] = useState(false);


    const singleProduct = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setLoading(false);
                setProduct(data);
                setComments(data.comments);
                comments ? setLoadingComments(false) : setLoadingComments(false);
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

    const addToWishlist = () => {
        const {token, user} = isAuthenticate();

        if (user != null) {
            updateUserWishlist(user._id, token, {product}).then(data => {
                if (data.error) {
                    console.log(data.error);
                }
            });
        }

        addItemtoWishlist(product, () => {
            setRedirectWish(true);
        })
    };

    const makeWishlistRedirect = redirectWish => {
        if (redirectWish) {
            return <Redirect to="/wishlist"/>
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

    return ( loading ? <CircularProgress size={100} style={{marginTop: "20%", marginLeft: "48%"}}/> :
            <div>
                <Layout title={product.name} description={product.description} className="container-fluid">
                    {makeCartRedirect(redirect)}
                    {makeWishlistRedirect(redirectWish)}
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

                                <h6 className="text-black-50">Note: Product colour may slightly vary depending on your
                                    monitor settings.</h6>

                                <div className="mt-5">
                                    <h5 className="font-weight-bolder">Rate Now</h5>
                                    <h1><RateComponent product={product}/></h1>
                                </div>
                                <div>
                                    <h5 className="mt-4">Availability</h5>
                                    {showStock(product.quantity)}
                                </div>
                                <div className="row mt-5">
                                    {showAddToCartBtn(product.quantity)}
                                    <button onClick={addToWishlist} className="btn btn-orange text-white mt-2 mb-2">Add to Wish
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
                        <div className="row mt-5 mb-5 container-fluid">
                            <div className="col-lg-12">
                                {
                                    !loadingComments ? <CommentComponent comments={comments} product={product}/> : ''
                                }
                            </div>
                        </div>
                    </div>
                </Layout>
                <Ftr/>
            </div>

    );
};

export default Product;
