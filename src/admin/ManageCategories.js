import React, {useEffect, useState, Fragment} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import {Link} from "react-router-dom";
import "mdbreact/dist/css/mdb.css";
import {createCategory} from "./ApiAdmin";
import {MDBContainer, MDBAlert} from 'mdbreact';
import {MDBDataTable} from 'mdbreact';
// import {getAllCategories} from "../core/apiCore";
import {MDBBtn} from "mdbreact";
import Card from "../core/Card";
import FooterPage from "../core/Footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getAllCategories, deleteSingleCategory} from "./ApiAdmin";

const ManageCategories = () => {

    const [categories, setAllCategories] = useState([]);

    const {user, token} = isAuthenticate();

    const  fetchCategories = () => {
        getAllCategories().then (data => {
            if(data.error){
                console.log(data.error)
            }
            else
                setAllCategories(data)
        })
    };

    const remove = categoryId =>{
        deleteSingleCategory(categoryId, user._id, token). then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                fetchCategories()
            }
        })
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <Layout title="Manage Categories" description="Update and delete Categories">
            <h2 className="mb-4">Manage Categories</h2>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center"> Total of {categories.length} Categories </h2>
                    <ul className="list-group">
                        {categories.map((category, item) => (
                            <li
                                key={item}
                                className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{category.name}</strong>
                                <Link to={`/admin/category/update/${category._id}`}>
                                <span className="badge badge-warning badge-pill "  >
                                    Update Product
                                </span>
                                </Link>

                                <span onClick={() => remove(category._id)} className="badge badge-danger badge-pill">
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

export default ManageCategories;