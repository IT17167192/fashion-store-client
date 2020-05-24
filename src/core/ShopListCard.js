import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import ShopListImage from "./ShopListImage";
import {addItem, updateItem} from "./CartHelper";
import {updateUserCart, updateUserWishlist} from "./apiCore";
import {isAuthenticate} from "../auth";
import '../assets/shop_card_assets/bootstrap/css/bootstrap.min.css';
import '../assets/shop_card_assets/css/Roboto.css';
import '../assets/shop_card_assets/fonts/font-awesome.min.css';
import '../assets/shop_card_assets/css/Shopping-Grid.css';
import '../assets/shop_card_assets/css/styles.css';
import {addItemtoWishlist} from "./WishlistHelper";
import ShowCartImage from "./ShowCartImage";

const ShopListCard = ({
                          product,
                          showViewBtn = true,
                          cartUpdate = false
                      }) => {

    const [redirect, setRedirect] = useState(false);
    const [redirectWish, setRedirectWish] = useState(false);

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

    const showRating = (rating) => {
        if (rating.length > 0) {
            const votedCount = rating.length;
            let rateSum = 0;
            rating.forEach(rate => {
                rateSum += rate;
            });
            const averageRating = Math.ceil(rateSum / votedCount);
            let startArray = [];
            for (let i = 0; i < averageRating; i++)
                startArray.push(<li key={i} className="fa fa-star fa-lg"></li>);
            for (let i = averageRating; i < 5; i++)
                startArray.push(<li key={i} className="fa fa-star-o fa-lg"></li>);
            return (
                <div>
                    <ul className="rating">
                        {startArray} {'  '} <span className="page-item">({votedCount} {votedCount > 1 ? 'reviews' : 'review'})</span>
                    </ul>
                </div>
            );
        } else {
            return (
                <ul className="rating">
                    <li key={1} className="fa fa-star-o fa-lg"></li>
                    <li key={2} className="fa fa-star-o fa-lg"></li>
                    <li key={3} className="fa fa-star-o fa-lg"></li>
                    <li key={4} className="fa fa-star-o fa-lg"></li>
                    <li key={5} className="fa fa-star-o fa-lg"></li>
                </ul>
            );
        }
    };

    const calculateDiscountedPrice = (product) => {
        let price = product.price;
        if (product.currency === '$') {
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

    const showCartBtn = (quantity) => {
        return quantity > 0 ? (
            <li><a href="" onClick={addToCart} className="fa fa-shopping-cart"> </a></li>
        ) : (
            ''
        );
    };

    const showWishListBtn = () => {
        return isAuthenticate() ? (
            <li>
                <a href="" onClick={addToWishlist} className="fa fa-heart"> </a>
            </li>
        ) : (
            ''
        );
    };

    return (
        <div className="product-grid7">
            <div className="product-image7">
                {makeRedirect(redirect)}
                {makeWishlistRedirect(redirectWish)}
                <Link to={`/product/${product._id}`}>
                    <ShopListImage item={product} url="product"/>
                </Link>
                <ul className="social">
                    {makeRedirect(redirect)}
                    <Link to={`/product/${product._id}`}>
                        <li><a href="" className="fa fa-search"></a></li>
                    </Link>
                    {showWishListBtn()}
                    {showCartBtn(product.quantity)}
                </ul>
                {showStock(product.quantity)}
            </div>
            <div className="product-content">
                <Link to={`/product/${product._id}`} className="mr-2">
                    <span style={{'fontSize': 'x-large'}} className="title"><a href="javascript : ;">{product.name.length > 20 ? product.name.slice(0, 18) + ' ..' : product.name}</a></span>
                </Link>
                <br/>
                <Link to={`/product/${product._id}`} className="mr-2">
                    <span className="title"><a
                        href="javascript : ;">Category: {product.category && product.category.name}</a></span>
                </Link>
                {showRating(product.rating)}
                <div
                    className="price">{product.discount > 0 ? product.currency + ' ' + calculateDiscountedPrice(product) : product.currency + ' ' + parseFloat(product.price).toFixed(2)}
                    <span
                        style={{"color": "red"}}>{product.discount > 0 ? product.currency + ' ' + parseFloat(product.price).toFixed(2) : ''}</span>
                </div>
            </div>
        </div>
    )
};

export default ShopListCard;
