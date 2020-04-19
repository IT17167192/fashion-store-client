import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import Card from "./Card";
import {getProducts} from "./apiCore";
import FooterPage from "./Footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getAllCategories} from "./apiCore";
import FilterCheckbox from "./FilterCheckbox";
import { MDBListGroup, MDBContainer } from "mdbreact";



const ShopPage = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errorProducts, setErrorProducts] = useState(false);
    const [errorCategories, setErrorCategories] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [showViewProducts, setShowViewProducts] = useState(false);
    const [showViewCategories, setShowViewCategories] = useState(false);

    const loadProducts = () => {
        getProducts('quantity').then(data => {
            setLoadingProducts(false);
            if (data.error) {
                setErrorProducts(data.error);
            } else {
                setProducts(data);
                setShowViewCategories(true);
            }
        })
    };

    const loadCategories = () => {
        getAllCategories().then(data => {
            setLoadingCategories(false);
            if (data.error) {
                setErrorCategories(data.error);
            } else {
                setCategories(data);
                setShowViewCategories(true);
            }
        })
    };

    useEffect(() => {
        setLoadingCategories(true);
        loadCategories();
    }, []);

    const appendView = () => {
        return (
            <div>
                <div className="row container-fluid">
                    <div
                        className="text-center text-sm-center
                         text-md-center text-lg-left text-xl-left col-sm-12 col-md-12 col-lg-4 col-xl-4">

                        {
                            showViewCategories ?
                                <div>
                                    <h4>Filter by category</h4>
                                    <ul>
                                        <FilterCheckbox categories={categories}/>
                                    </ul>
                                </div>
                                : <div className="text-center text-sm-center
                                                  text-md-center text-lg-left text-xl-left">
                                    <CircularProgress size={30}/>
                                  </div>
                        }
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8">
                        Right side Side bar
                    </div>
                </div>

                <FooterPage/>
            </div>
        );
    }

    return (
        <Layout title="Shopping Page" description="Search and find all products">
            {appendView()}
        </Layout>
    );
}

export default ShopPage;
