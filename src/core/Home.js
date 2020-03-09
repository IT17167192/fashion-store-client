import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import Card from "./Card";
import {getProducts} from "./apiCore";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadProducts = () => {
        getProducts('quantity').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        })
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout title="Home Page" description="Fashion Store">

        <h2 className="mb-4">Products</h2>
        {products.map((product, i) => (
            <Card key={i} product={product}/>
        ))}

    </Layout>
    );
};

export default Home;
