import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import FooterPage from "./Footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getAllCategories, getProductByFilters} from "./apiCore";
import FilterCheckbox from "./FilterCheckbox";
import CardLayout from "./CardLayout";

const ShopPage = () => {

    const [pageFilters, setPageFilters] = useState({
        filters: {category : [], price : []}
    });

    const [limitTo, setLimitTo] = useState(6);
    const [skip, setSkip] = useState(0);
    const [loadedSize, setLoadedSize] = useState(0);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [errorProducts, setErrorProducts] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [showViewProducts, setShowViewProducts] = useState(false);

    const [categories, setCategories] = useState([]);
    const [errorCategories, setErrorCategories] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [showViewCategories, setShowViewCategories] = useState(false);

    const loadFilteredProducts = (filters) => {
        getProductByFilters(skip, limitTo, filters).then(data => {
            setLoadingProducts(false);
            if (data.error) {
                setErrorProducts(data.error);
            } else {
                setFilteredProducts(data.data);
                setShowViewProducts(true);
                setLoadedSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
      let toSkip = skip + limitTo;
        getProductByFilters(toSkip, limitTo, pageFilters.filters).then(data => {
            setLoadingProducts(false);
            if (data.error) {
                setErrorProducts(data.error);
            } else {
                setFilteredProducts([...filteredProducts, ...data.data]);
                setShowViewProducts(true);
                setLoadedSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            loadedSize > 0 && loadedSize >= limitTo && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
            )
        );
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
        setLoadingProducts(true);
        loadFilteredProducts([]);
        loadCategories();
    }, []);

    const handleFilters = (filters, filterBy) => {
        const allFilters = {...pageFilters};
        allFilters.filters[filterBy] = filters;
        loadFilteredProducts(pageFilters.filters);
        setPageFilters(allFilters);
    };

    const appendView = () => {
        return (
            <div>
                <div className="row container-fluid">
                    <div
                        className="text-left col-sm-12 col-md-12 col-lg-2 col-xl-2 mb-5">

                        {
                            showViewCategories ?
                                <div>
                                    <div className="card">
                                        <div className="card-header" >Filter by category</div>
                                        <div className="card-body">
                                            <ul>
                                                <FilterCheckbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')}/>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                : <div className="text-center text-sm-center
                                                  text-md-center text-lg-left text-xl-left">
                                    <CircularProgress size={30}/>
                                  </div>
                        }
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-10 col-xl-10">
                        {
                            showViewProducts ?
                                <div>
                                    <div className="row">
                                        {
                                            filteredProducts.map((product, i) => (
                                                <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                                                    <CardLayout product={product}/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div> :
                                <div className="container-fluid text-center">
                                    <CircularProgress size={80}/>
                                </div>
                        }
                        {loadMoreButton()}
                    </div>
                </div>

                {showViewProducts && showViewCategories ? <FooterPage/> : ''}
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
