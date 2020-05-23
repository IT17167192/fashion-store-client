import React, {useEffect, useState, Fragment} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import {Link} from "react-router-dom";
import "mdbreact/dist/css/mdb.css";
import { confirmAlert } from 'react-confirm-alert';
import {createCategory, deleteSingleProduct} from "./ApiAdmin";
import {MDBContainer, MDBAlert} from 'mdbreact';
import {MDBDataTable} from 'mdbreact';
// import {getAllCategories} from "../core/apiCore";
import {MDBBtn} from "mdbreact";
import Card from "../core/Card";
import FooterPage from "../core/Footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getAllCategories, deleteSingleCategory} from "./ApiAdmin";
import Ftr from "../core/Ftr";

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

    const remove = categoryId =>
    {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this Category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        deleteSingleCategory(categoryId, user._id, token). then(data => {
                            if(data.error){
                                console.log(data.error)
                            } else {
                                fetchCategories()
                            }
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };
    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <div>
        <Layout title="Manage Categories" description="Update and delete Categories">
            <Link to="/admin/dashboard">
                <MDBBtn color="mdb-color">
                    Back to Dashboard
                </MDBBtn>
            </Link>
            <div className="row ml-4 mr-4 mb-5">
                <div className="col-12 table-responsive">
                    <h2 className="text-center"> Total of {categories.length} Categories </h2>
                    <hr/>
                    <table id="categoryTable" className="table table-hover text-center" >
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">Category Id</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Date Created</th>
                            <th scope="col">Date Last Updated</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map((category, item) => (
                            <tr key={category._id}>
                                <th scope="row">{category._id}</th>
                                <td><strong>{category.name}</strong></td>
                                <td><strong>{category.createdAt}</strong></td>
                                <td><strong>{category.updatedAt}</strong></td>
                                <td>
                                    <Link to={`/admin/category/update/${category._id}`}>
                                        <button className="btn btn-sm btn-warning"  >
                                            Update Category
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => remove(category._id)} className="btn btn-sm btn-danger">
                                        Delete Category
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>

            {/*<h2 className="mb-4">Manage Categories</h2>*/}
            {/*<div className="row">*/}
            {/*    <div className="col-12">*/}
            {/*        <h2 className="text-center"> Total of {categories.length} Categories </h2>*/}
            {/*        <ul className="list-group">*/}
            {/*            {categories.map((category, item) => (*/}
            {/*                <li*/}
            {/*                    key={item}*/}
            {/*                    className="list-group-item d-flex justify-content-between align-items-center">*/}
            {/*                    <div className="container">*/}
            {/*                        <div className="row">*/}
            {/*                            <div className="col-sm">*/}
            {/*                                <strong>{category.name}</strong>*/}
            {/*                            </div>*/}
            {/*                            <div className="col-sm">*/}
            {/*                                <Link to={`/admin/category/update/${category._id}`}>*/}
            {/*                                    <button className="badge badge-warning badge-pill "  >*/}
            {/*                                        Update Category*/}
            {/*                                    </button>*/}
            {/*                                </Link>*/}
            {/*                            </div>*/}
            {/*                            <div className="col-sm">*/}
            {/*                                <button onClick={() => remove(category._id)} className="badge badge-danger badge-pill">*/}
            {/*                                    Delete Category*/}
            {/*                                </button>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </li>*/}

            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Layout>
        <Ftr/>
        </div>

    );

};


export default ManageCategories;

