import React from "react";
import {Link} from 'react-router-dom';
import ShowImage from "./ShowImage";

const Card = ({product}) => {
    return (
        <div className="col-md-4 col-auto mb-3">
            <div className="cart">
                <div className="card-header alert-primary">{product.name}</div>
                <div className="card-body">
                    <ShowImage item={product} url="product"/>
                    <p>{product.description}</p>
                    <p>{product.currency} {product.price}</p>
                    
                    <Link to="/">
                        <button className="btn btn-outline-primary mt-2 mb-2 mr-1">View Product</button>
                    </Link>
                    <button className="btn btn-outline-warning mt-2 mb-2 ml-1">Add to Cart</button>
                </div>
            </div>
        </div>
    )
};

export default Card;
