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

const ManageProducts = () => {

return (
    <Layout title="Manage Products" description="Perform Create Read Update Delete functions on Products">
        <h2 className="mb-4">Manage Products</h2>
        <div className="row">
            <div>...</div>
        </div>
    </Layout>
);
};

export default ManageProducts;