import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import Card from "./Card";
import {getProducts} from "./apiCore";

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('quantity').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        })
    };

    useEffect(() => {
        loadProductsBySell();
    }, []);

    return (
        <Layout title="Home Page" description="Fashion Store">

        {/*<h2 className="mb-4">Best Sellers</h2>*/}
        {/*{productsBySell.map((product, i) => (*/}
        {/*    <Card key={i} product={product}/>*/}
        {/*))}*/}

            {JSON.stringify(productsBySell)}

    </Layout>
    );
};

export default Home;
