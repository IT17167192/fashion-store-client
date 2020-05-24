import React, {useState, useEffect} from "react";
import ShopListCard from "./ShopListCard";
import Ftr from "./Ftr";
import Layout from "./Layout";
import {search} from "./apiCore";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../images/image5.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image4.jpg";
import CategoryCard from "./CategoryCard";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProductBySearch = ({match}) => {
    const [products, setProducts] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [errorCategory, setErrorCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showView, setShowView] = useState(false);

    const loadProducts = (searchText, categoryId) => {
        console.log(searchText + " and " + categoryId);
        if (searchText){
            search({search: searchText || undefined, category: categoryId})
                .then(res => {
                    if (res.error){
                        console.log(res.error);
                    }else {
                        console.log(res.data);
                        console.log(res);
                        setLoading(false);
                        setProducts(res);
                        setShowView(true);
                    }
                })
        }
    };

    useEffect(() => {
        setLoading(true);
        setSearchData(match.params.searchData);
        loadProducts(match.params.searchData, match.params.categoryId);
    }, []);

    const appendView = () => {
        if (showView) {
            return (
                <div>
                    <div className="shopping-grid">
                        <div className="container">
                            <h3 className="font-weight-bold" align="center">PRODUCTS BY SEARCH</h3>
                            <div className="row">
                                {products.map((product, i) => (
                                    <div key={i} className="col-md-6 col-lg-3 col-xs-3 col-sm-6 mb-3">
                                        <ShopListCard product={product} cartUpdate={true}/>
                                    </div>
                                ))}
                                {products.length === 0 ? <div className="col-12 mt-5 mb-5 text-center
                                    alert alert-info alert-dismissible fade show" role="alert">
                                    <strong>No products related to the search!</strong>
                                </div> : ''}
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
        <Layout title="Search results" description={typeof searchData !== 'undefined' ? `Products related to ${searchData}` : 'Products related to'} className="container-fluid">
            {appendView()}
        </Layout>
    );
};

export default ProductBySearch;
