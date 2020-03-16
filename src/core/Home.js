import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import Card from "./Card";
import {getProducts} from "./apiCore";
import FooterPage from "./Footer";

//Mui stuff
import CircularProgress from "@material-ui/core/CircularProgress";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showView, setShowView] = useState(false);

    const loadProducts = () => {
        getProducts('quantity').then(data => {
            setLoading(false);
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
                setShowView(true);
            }
        })
    };

    useEffect(() => {
        setLoading(true);
        loadProducts();
    }, []);

    const appendView = () => {
            if(showView){
                return (
                    <div>
                        <h2 className="mb-4 container-fluid">Products</h2>

                        <div className="row">
                            {products.map((product, i) => (
                                <div key={i} className="col-md-6 col-lg-4 col-sm-6 mb-3">
                                    <Card product={product}/>
                                </div>
                            ))}
                        </div>

                        <FooterPage/>
                    </div>
                );
            }else {
                return (
                    <div className="container-fluid text-center">
                        <CircularProgress size={120}/>
                    </div>
                );
            }
    }

    return (
            <Layout title="Home Page" description="Fashion Store">
                {appendView()}
            </Layout>
    );
};

export default Home;
