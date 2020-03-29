import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import ShowImage from "./ShowImage";
import {addItem, updateItem} from "./CartHelper";
import {updateUserCart} from "./apiCore";
import {isAuthenticate} from "../auth";

const Card = ({
                  product,
                  showViewBtn = true,
                  cartUpdate = false,
                  removeProductCart = false,
                  setRun = f => f,
                  run = undefined
              }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showBtn = showViewBtn => {
        return (
            showViewBtn && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2">View Product</button>
                </Link>
            )
        );
    };

    const addToCart = () => {
        const { token, user } = isAuthenticate();

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

    const makeRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart"/>
        }
    };

    const showAddToCartBtn = (cartUpdate, quantity) => {
        return !cartUpdate && quantity > 0 && <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>;
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
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    };

    const showCartUpdate = cartUpdate => {
        return cartUpdate &&
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleCountChange(product._id)} />
            </div>
    };

    return (
        <div className="col-auto mb-3">
            <div className="card">
                <div className="card-header alert-primary">{product.name}</div>
                <div className="card-body">
                    {makeRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p className="lead mt-2 font-weight-bold">{product.description}</p>
                    <p className="black-9">{product.currency} {parseFloat(product.price).toFixed(2)}</p>
                    <p className="black-8">
                        Category: {product.category && product.category.name} </p>

                    {showStock(product.quantity)}
                    <br/>
                    {showBtn(showViewBtn)}
                    {showAddToCartBtn(cartUpdate, product.quantity)}
                    {showCartUpdate(cartUpdate)}
                </div>
            </div>
        </div>
    )
};

export default Card;
