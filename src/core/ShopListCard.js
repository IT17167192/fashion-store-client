import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import ShopListImage from "./ShopListImage";
import {addItem, updateItem} from "./CartHelper";
import {updateUserCart} from "./apiCore";
import {isAuthenticate} from "../auth";
import '../assets/shop_card_assets/bootstrap/css/bootstrap.min.css';
import '../assets/shop_card_assets/css/Roboto.css';
import '../assets/shop_card_assets/fonts/font-awesome.min.css';
import '../assets/shop_card_assets/css/Shopping-Grid.css';
import '../assets/shop_card_assets/css/styles.css';

const ShopListCard = ({
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

    const calculateDiscountedPrice = (product) => {
        let price = product.price;
        if(product.currency === '$'){
            price = product.price * 180;
        }
        return product.currency === '$' ? parseFloat((price - ((price * product.discount) / 100)) / 180).toFixed(2) : parseFloat(price - ((price * product.discount) / 100)).toFixed(2);
    };

    const makeRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart"/>
        }
    };

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="product-new-label primary-color">In Stock</span>
        ) : (
            <span className="product-new-label warning-color">Out of Stock</span>
        );
    };

    return (
        <div className="product-grid7">
            <div className="product-image7">
                {makeRedirect(redirect)}
                <Link to={`/product/${product._id}`} className="mr-2">
                    <ShopListImage item={product} url="product"/>
                </Link>
                <ul className="social">
                    {makeRedirect(redirect)}
                    <Link to={`/product/${product._id}`}>
                        <li><a href="" className="fa fa-search"></a></li>
                    </Link>
                    <li>
                        <a href="javascript : ;" className="fa fa-shopping-bag"></a>
                    </li>
                    <li><a href=""  onClick={addToCart} className="fa fa-shopping-cart"></a></li>
                </ul>
                {showStock(product.quantity)}
            </div>
            <div className="product-content">
                <Link to={`/product/${product._id}`} className="mr-2">
                    <span style={{'fontSize' : 'x-large'}} className="title"><a href="javascript : ;">{product.name}</a></span>
                </Link>
                <br/>
                <Link to={`/product/${product._id}`} className="mr-2">
                    <span className="title"><a href="javascript : ;">Category: {product.category && product.category.name}</a></span>
                </Link>
                <ul className="rating">
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star"></li>
                </ul>
                <div className="price">{product.discount > 0 ? product.currency + ' ' + calculateDiscountedPrice(product) : product.currency + ' ' + parseFloat(product.price).toFixed(2)}
                    <span>{product.discount > 0 ? product.currency + ' ' +  parseFloat(product.price).toFixed(2) : ''}</span>
                    {console.log(product)}
                </div>
            </div>
        </div>
    )
};

export default ShopListCard;