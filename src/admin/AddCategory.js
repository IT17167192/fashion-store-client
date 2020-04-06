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

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loader, setLoader] = useState(false);
    const [categories, setCategories] = useState([]);
    const [errorCat, setErrorCat] = useState(false);

    const loadCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setErrorCat(data.error);
                console.error(errorCat);
            } else {
                setCategories(data);
            }
        })
    };

    useEffect(() => {
        loadCategories();
    }, []);

    //get user and info from local storage
    const {user, token} = isAuthenticate();

    const handleChange = (event) => {
        let value = event.target.value;
        setError(false);
        setName(value);
    };

    const submit = (event) => {
        event.preventDefault();
        setLoader(true);
        setError(false);
        setSuccess(false);
        //create category
        //use api request
        createCategory(user._id, token, {name})
            .then(data => {
                setLoader(false);
                setName('');
                if (data.error) {
                    setError(true);
                    setSuccess(false);
                } else {
                    setError(false);
                    setSuccess(true);
                    loadCategories();
                }
            })

    };

    const showSuccessMsg = () => {
        if (success) {
            return (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>New category is created successfully!</strong>
                </div>
            );
        }
    };

    const backButton = () => {
        return (
            <Fragment>
                <MDBBtn href="/admin/dashboard" color="mdb-color">
                    Back to Dashboard
                </MDBBtn>
            </Fragment>
        );
    }


    const categoryTable = () => {
        if (categories.length > 0) {
            const data = {
                columns: [
                    {
                        label: 'ID',
                        field: '_id',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Name',
                        field: 'name',
                        sort: 'asc',
                        width: 270
                    },
                    {
                        label: 'Created At',
                        field: 'createdAt',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Updated At',
                        field: 'updatedAt',
                        sort: 'asc',
                        width: 100
                    }
                ], rows: categories
            };

            return (
                <div className="container-fluid col-md-12 col-lg-12 col-sm-12">
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        responsive
                        data={data}
                    />
                </div>
            );

        } else {
            return null;
        }
    };

    const showErrorMsg = () => {
        if (error) {
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Name</strong> should be unique!
                </div>
            );
        }
    };

    const newCategoryForm = () => (
        <div className="col-md-8 col-sm-8 col-lg-8 container-fluid">
            <form onSubmit={submit}>
                <div className="form-group">
                    <label className="text-muted">Category Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus
                           required/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary"
                            disabled={loader}>{loader ? 'Loading...' : 'Create Category'}</button>
                </div>
            </form>
        </div>
    );

    return (
        <Layout title="Add new category" description={`Welcome back ${user.name}, Add a new category now!`}
                className="container-fluid">
            {showSuccessMsg()}
            {showErrorMsg()}
            {newCategoryForm()}
            <hr/>
            {backButton()}
            {categoryTable()}
        </Layout>
    );
};

export default AddCategory;
