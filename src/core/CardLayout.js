import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import CardLayoutImage from "./CardLayoutImage";
import {addItem, updateItem} from "./CartHelper";
import {updateUserCart} from "./apiCore";
import {isAuthenticate} from "../auth";
import '../assets/card_assets_2/bootstrap/css/bootstrap.min.css';
import '../assets/card_assets_2/fonts/font-awesome.min.css';
import '../assets/card_assets_2/css/Bootstrap-4---Photo-Gallery.css';
import '../assets/card_assets_2/css/styles.css';

const CardLayout = ({
                  product,
                  showViewBtn = true,
                  cartUpdate = false
              }) => {

    const [redirect, setRedirect] = useState(false);

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

    const makeRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart"/>
        }
    };

    const showAddToCartBtn = (cartUpdate, quantity) => {
        return !cartUpdate && quantity > 0 &&
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>;
    };

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <div className="badge badge-primary px-3 rounded-pill font-weight-normal">In Stock</div>
        ) : (
            <span className="badge badge-warning px-3 rounded-pill font-weight-normal text-white">Out of Stock</span>
        );
    };

    return (
        <div className="bg-white rounded shadow-sm border-secondary">
            {makeRedirect(redirect)}
            <Link to={`/product/${product._id}`} className="mr-2">
                <CardLayoutImage item={product} url="product"/>
            </Link>
            <div className="p-4">
                <h5>
                    <Link to={`/product/${product._id}`} className="mr-2">
                        <a href="javascript : ;" className="text-dark">{product.name}</a>
                    </Link>
                </h5>
                <p className="small text-muted mb-0"> Category: {product.category && product.category.name} </p>
                <ul className="list-inline small">
                    <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                    <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                    <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                    <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                    <li className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                </ul>
                <div className="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
                    <p className="small mb-0"><i className="fa fa-picture-o mr-2"></i><span
                        className="font-weight-bold">{product.currency} {parseFloat(product.price).toFixed(2)}</span></p>
                    {showStock(product.quantity)}
                </div>
            </div>
        </div>
    )
};

export default CardLayout;
