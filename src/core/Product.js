import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import Card from "./Card";
import {getProducts, getProduct} from "./apiCore";

const Product = props => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    const singleProduct = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        })
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        singleProduct(productId);
    }, []);

    return (
        <Layout title={product.name} description={product.description} className="container-fluid">

            <div className="row">
                {product && product.description && <Card product={product} showViewBtn={false}>

                </Card>}
            </div>

        </Layout>
    );
};

export default Product;
