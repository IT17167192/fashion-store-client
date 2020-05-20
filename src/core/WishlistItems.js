import React, {useState} from "react";
import ShowWishlistImage from "./ShowWishlistImage";
import {updateWishlistItem, removeItem} from "./WishlistHelper";
import {removeWishlistItem} from "./apiCore";
import {isAuthenticate} from "../auth";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from "react-router-dom";

const WishlistItems = ({
                           product,
                           wishlistUpdate = false,
                           removeProductWishlist = false,
                           setRun = f => f,
                           run = undefined
                       }) => {

    const [count, setCount] = useState(product.count);
    const [isChecked, setIsChecked] = useState(product.isChecked);

    const selectWishlistItem = productId => event => {
        setRun(!run);
        setIsChecked(!isChecked);
        updateWishlistItem(productId, count, !isChecked)
    };

    const removeFromWishlist = () => {
        const {token, user} = isAuthenticate();

        if (user != null) {
            removeWishlistItem(user._id, token, product).then(data => {
                if (data.error) {
                    console.log(data.error);
                }
            });
        }

        removeItem(product._id);
    };

    const showRemoveBtn = removeProductWishlist => {
        return (removeProductWishlist &&
            <button
                onClick={() => {
                    removeFromWishlist();
                    setRun(!run);
                }}
                className="btn btn-sm btn-outline-orange">
                Remove
            </button>);
    };

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-warning badge-pill">Out of Stock</span>
        );
    };

    const showRemaining = (quantity) => {
        return quantity > 0 ? (
            <h6 className="text-black-50">{quantity} Left</h6>
        ) : (
            ''
        );
    };

    //function to get discount
    const getDiscountedTotal = () => {
        return (product.price - (product.price * (product.discount) / 100)).toFixed(2);
    };

    return (
        <div className="mb-3">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-2 mr-5">
                            <div className="row">
                                <div className="col-lg-5 mt-2 ml-3 text-center">
                                    <Link to={`/product/${product._id}`}>
                                        <ShowWishlistImage item={product} url="product"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12 ml-3 mt-3">
                            <div className="col-lg-12">
                                <Link className="lead mt-2 font-weight-bold text-dark"
                                      to={`/product/${product._id}`}>{product.name}</Link>
                            </div>

                            <div className="col-lg-12">
                                <p className="mt-4 text-black-50"
                                   style={{marginBottom: '0px'}}>{product.description}</p>
                            </div>
                            <div className="col-lg-12">
                                <p className="text-black-50">Category: {product.category ? product.category.name : 'Other'}</p>
                            </div>
                        </div>

                        <div className="col-lg-2 mt-5 text-center">
                            <div className="col-lg-12">
                                {showStock(product.quantity)}
                            </div>
                            <div className="col-lg-12 mt-1">
                                {showRemaining(product.quantity)}
                            </div>
                        </div>

                        <div className="col-lg-3 mt-5 text-right">
                            <div className="col-lg-12">
                                <p className="lead font-weight-normal"
                                   style={{fontSize: 22}}>{product.currency} {getDiscountedTotal()}</p>
                            </div>
                            <div className="col-lg-12 mt-1">
                                <p className="lead font-weight-normal text-black-50"
                                   style={{
                                       fontSize: 15,
                                       textDecoration: 'line-through'
                                   }}>{product.currency} {parseFloat(product.price).toFixed(2)}</p>
                            </div>
                            <div className="col-lg-12 mt-4">
                                {showRemoveBtn(removeProductWishlist)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WishlistItems;
