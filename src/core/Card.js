import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import ShowImage from "./ShowImage";
import {addItem} from "./CartHelper";

const Card = ({product, showViewBtn = true}) => {

    const [redirect, setRedirect] = useState(false);
    const style = {
        "font-weight": "bold"
    }
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
        addItem(product, () => {
            setRedirect(true);
        })
    };

    const makeRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    };

    const showAddToCartBtn = () => {
        return (<button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>);
    };

    const showStock = (qunatity) => {
        return qunatity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-warning badge-pill">Out of Stock</span>
        );
    };

    return (
        <div className="col-auto mb-3">
            <div className="card">
                <div className="card-header alert-primary">{product.name}</div>
                <div className="card-body">
                    {makeRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p className="lead mt-2" style={style}>{product.description}</p>
                    <p className="black-9">{product.currency} {parseFloat(product.price).toFixed(2)}</p>
                    <p className="black-8">
                        Category: {product.category && product.category.name} </p>

                    {showStock(product.quantity)}
                    <br/>
                    {showBtn(showViewBtn)}
                    {showAddToCartBtn()}
                </div>
            </div>
        </div>
    )
};

export default Card;
