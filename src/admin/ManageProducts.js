import React, {useEffect, useState, Fragment} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import {Link} from "react-router-dom";
import "mdbreact/dist/css/mdb.css";
import {createCategory} from "./ApiAdmin";
import {MDBContainer, MDBAlert} from 'mdbreact';
import {MDBDataTable} from 'mdbreact';
import {getAllCategories} from "../core/apiCore";
import {MDBBtn} from "mdbreact";
import Card from "../core/Card";
import FooterPage from "../core/Footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getAllProducts, deleteSingleProduct} from "./ApiAdmin";

const ManageProducts = () => {

    const [products, setAllProducts] = useState([]);

    const {user, token} = isAuthenticate();

    const  fetchProducts = () => {
        getAllProducts().then (data => {
            if(data.error){
                console.log(data.error)
             }
            else
                setAllProducts(data)
        })
    };

    const remove = productId =>{
        deleteSingleProduct(productId, user._id, token). then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                fetchProducts()
            }
        })
    };
    useEffect(() => {
        fetchProducts();
    }, []);
return (
    <Layout title="Manage Products" description="Perform Create Read Update Delete functions on Products">
        <h2 className="mb-4">Manage Products</h2>
        <div className="row">
            <div className="col-12">
                <h2 className="text-center"> Total of {products.length} Products </h2>
                <ul className="list-group">
                    {products.map((product, item) => (
                        <li
                            key={item}
                            className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>{product.name}</strong>
                            <Link to={`/admin/product/update/${product._id}`}>
                                <span className="badge badge-warning badge-pill "  >
                                    Update Product
                                </span>
                            </Link>

                            <span onClick={() => remove(product._id)} className="badge badge-danger badge-pill">
                                    Delete Product
                                </span>

                        </li>

                    ))}
                </ul>
            </div>
        </div>
    </Layout>
);
};

export default ManageProducts;