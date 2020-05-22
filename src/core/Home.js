import React, {useState, useEffect} from "react";
import {getProducts} from "./apiCore";
import Carousel from 'react-bootstrap/Carousel'
import Ftr from "./Ftr";
import ShopListCard from "./ShopListCard";

//images for carousel
import image1 from '../images/image5.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image4.jpg';

//Mui stuff
import CircularProgress from "@material-ui/core/CircularProgress";
import CategoryCard from "./CategoryCard";

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
        if (showView) {
            return (
                <div>
                    <div className="mb-5">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={image1}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={image2}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={image3}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div style={{marginTop: "100px"}} className="team-grid">
                        <div className="container">
                            <h2 className="font-weight-bold" align="center">SHOP BY CATEGORIES</h2>
                            <CategoryCard/>
                        </div>
                    </div>
                    <div className="shopping-grid">
                        <div className="container">
                            <h3 className="font-weight-bold" align="center">LATEST PRODUCTS</h3>
                                <div className="row">
                                    {products.map((product, i) => (
                                        <div key={i} className="col-md-6 col-lg-3 col-xs-3 col-sm-6 mb-3">
                                            <ShopListCard product={product} cartUpdate={true}/>
                                        </div>
                                    ))}
                                </div>

                        </div>
                    </div>
                    <Ftr/>
                </div>
            );
        } else {
            return (
                <div className="container-fluid text-center mt-5">
                    <CircularProgress size={80}/>
                </div>
            );
        }
    };

    return (
        <div>
            {appendView()}
        </div>
    );
};

export default Home;
