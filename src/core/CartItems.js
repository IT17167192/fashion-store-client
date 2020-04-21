import React, {useState} from "react";
import {Link} from 'react-router-dom';
import ShowCartImage from "./ShowCartImage";
import {updateItem, removeItem} from "./CartHelper";
import {removeCartItem} from "./apiCore";
import {isAuthenticate} from "../auth";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CartItems = ({
                       product,
                       showViewBtn = true,
                       cartUpdate = false,
                       removeProductCart = false,
                       setRun = f => f,
                       run = undefined
                   }) => {

    const [count, setCount] = useState(product.count);
    const [isChecked, setIsChecked] = useState(product.isChecked);

    const showBtn = showViewBtn => {
        return (
            showViewBtn && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2">View Product</button>
                </Link>
            )
        );
    };

    const selectItem = productId => event => {
        setRun(!run);
        setIsChecked(!isChecked);
        updateItem(productId, count, !isChecked)
    };

    const removeFromCart = () => {
        const {token, user} = isAuthenticate();

        if (user != null) {
            removeCartItem(user._id, token, product).then(data => {
                if (data.error) {
                    console.log(data.error);
                }
            });
        }

        removeItem(product._id);
    };

    const showRemoveBtn = removeProductCart => {
        return (removeProductCart &&
            <button
                onClick={() => {
                    removeFromCart();
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
            updateItem(productId, event.target.value, isChecked)
        }
    };

    const showCartUpdate = cartUpdate => {
        return cartUpdate &&
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
                                            defaultChecked={isChecked}
                                            onChange={selectItem(product._id)}
                                            name="checkedB"
                                            style ={{
                                                color: "#ff9408",
                                            }}
                                        />
                                    }
                                />

                                <div className="col-sm-5 text-center mt-2">
                                    <ShowCartImage item={product} url="product"/>
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
                                    {showCartUpdate(cartUpdate)}
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
                                    {showRemoveBtn(removeProductCart)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CartItems;
