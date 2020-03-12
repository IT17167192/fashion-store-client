import React from "react";
import {Link} from 'react-router-dom';
import ShowImage from "./ShowImage";

const Card = ({product, showViewBtn = true}) => {
    const showBtn = showViewBtn => {
        return showViewBtn && (<button className="btn btn-outline-primary mt-2 mb-2 mr-1">View Product</button>);
    };

    return (
        <div className="cart">
            <div className="card-header alert-primary">{product.name}</div>
            <div className="card-body">
                <ShowImage item={product} url="product"/>
                <p>{product.description}</p>
                <p>{product.currency} {product.price}</p>

                <Link to={`/product/${product._id}`}>
                    {showBtn(showViewBtn)}
                </Link>
                <button className="btn btn-outline-warning mt-2 mb-2 ml-1">Add to Cart</button>
            </div>
        </div>
    )
};

export default Card;
