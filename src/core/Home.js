import React, {useState, useEffect} from "react";
import {getProducts} from "./apiCore";
import Carousel from 'react-bootstrap/Carousel'
import Ftr from "./Ftr";
import ShopListCard from "./ShopListCard";
import ProductSearch from "./ProductSearch";
import Image from 'react-bootstrap/Image'

//images for carousel
import image1 from '../images/image5.jpg';
import image2 from '../images/image3.jpg';
import image3 from '../images/image4.jpg';

//Mui stuff
import CircularProgress from "@material-ui/core/CircularProgress";
import CategoryCard from "./CategoryCard";
import MenuLogoV1 from "../assets/Logos/Logo_Email-v1.png";
import {Link} from "react-router-dom";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showView, setShowView] = useState(false);

    const fontColor = () => {
        return {color: '#000000', fontSize: 15}
    };

    const hover = () => {
        return {color: '#ff9900', fontSize: 15}
    };

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
                    <div className="row" style={{background: '#fefefe'}}>
                        <div className="col-lg-3 m-5">
                            <Image src={MenuLogoV1} fluid/>
                        </div>
                        <div className="col-lg-5 text-center mt-lg-5">
                            <div className="row people mt-lg-4">
                                <div className="col-md-4 col-lg-3 item">
                                    <Link to="/product/category/5e6cd92b0befdd2d4caa420cx">
                                        <h5 style={fontColor()} className="title text-uppercase">Business Casual</h5>
                                    </Link>
                                </div>
                                <div className="col-md-4 col-lg-3 item">
                                    <Link to="/product/category/5e65d07cec753b45bc5021f4">
                                        <h5 style={fontColor()} className="title text-uppercase">Gents Casual</h5>
                                    </Link>
                                </div>
                                <div className="col-md-4 col-lg-3 item">
                                    <Link to="/product/category/5e65d07cec753b45bc5021f4">
                                        <h5 style={fontColor()} className="title text-uppercase">Ladies Casual </h5>
                                    </Link>
                                </div>
                                <div className="col-md-4 col-lg-3 item">
                                    <Link to="/product/category/5e65d07cec753b45bc5021f4">
                                        <h5 style={fontColor()} className="title text-uppercase">Ladies Fashion</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 container-fluid">
                            <ProductSearch/>
                        </div>
                    </div>
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
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://ikon.lk/wp-content/uploads/2020/01/3-01.jpg"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://www.fashionbug.lk/wp-content/uploads/2019/10/Fbug_Web_compressed.jpg"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://gdetail.image-gmkt.com/296/306/833306296/2017/9/effe5977-bc4d-4cba-9d04-ab8267eae451.gif"
                                    alt="Fourth slide"
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
