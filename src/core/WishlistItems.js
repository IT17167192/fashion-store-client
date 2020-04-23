import React, {useState} from "react";
import {Link} from 'react-router-dom';
import ShowWishlistImage from "./ShowWishlistImage";
import {updateWishlistItem, removeItem} from "./WishlistHelper";
import {removeWishlistItem} from "./apiCore";
import {isAuthenticate} from "../auth";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

    const handleCountChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateWishlistItem(productId, event.target.value, isChecked)
        }
    };

    const showWishlistUpdate = wishlistUpdate => {
        return wishlistUpdate &&
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Qty</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleCountChange(product._id)}/>
            </div>
    };

    return (
        <div className="mb-3">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-2 mr-5">
                            <div className="row">


                                <FormControlLabel className="col-sm-1"
                                                  control={
                                                      <Checkbox
                                                          checked={isChecked}
                                                          onChange={selectWishlistItem(product._id)}
                                                          name="checkedB"
                                                          style ={{
                                                              color: "#ff9408",
                                                          }}
                                                      />
                                                  }
                                />

                                <div className="col-sm-5 text-center mt-2">
                                    <ShowWishlistImage item={product} url="product"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-9">
                            <div className="col-sm-12 row">
                                <div className="col-sm-6">
                                    <p className="lead mt-2 font-weight-bold"
                                       style={{marginBottom: '0px'}}>{product.name}</p>
                                </div>
                            </div>
                            <div className="col-sm-12 row">
                                <div className="col-sm-6">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p className="mt-4 text-black-50"
                                               style={{marginBottom: '0px'}}>{product.description}</p>
                                        </div>
                                        <div className="col-sm-12">
                                            <p className="text-black-50">Category: {product.category ? product.category.name : 'Other'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    {showWishlistUpdate(wishlistUpdate)}
                                </div>
                                <div className="col-sm-3 text-right">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p className="lead font-weight-normal"
                                               style={{fontSize: 22}}>{product.currency}{parseFloat(product.price * count).toFixed(2)}</p>
                                        </div>
                                        <div className="col-sm-12">
                                            <p className="lead font-weight-normal text-black-50" style={{fontSize: 15}}>item: {product.currency}{parseFloat(product.price).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 row">
                                <div className="col-sm-6">
                                    {showStock(product.quantity)}
                                </div>
                                <div className="col-sm-6 text-right">
                                    {showRemoveBtn(removeProductWishlist)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WishlistItems;
