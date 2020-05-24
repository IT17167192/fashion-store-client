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
import {getSingleCategory, updateSingleCategory} from "./ApiAdmin";
import Ftr from "../core/Ftr";

const UpdateCategory = ({match}) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loader, setLoader] = useState(false);
    const [categories, setCategories] = useState([]);
    const [errorCat, setErrorCat] = useState(false);

    const init = (categoryId) => {
        getSingleCategory(categoryId).then(data => {
            if(data.error){
                setErrorCat(data.error);
                console.error(errorCat);
            } else {
                setName(data.name);
            }
        })
    };
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
        init(match.params.categoryId);
        console.log(match.params.categoryId)
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
        updateSingleCategory(match.params.categoryId, user._id, token, {name})
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
                    <strong>category is Updated successfully!</strong>
                </div>
            );
        }
    };

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

    const updateCategoryForm = () => (
        <div className="col-md-8 col-sm-8 col-lg-8 container-fluid">
            <form onSubmit={submit}>
                <div className="form-group">
                    <label className="text-muted">Category Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus
                           required/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary"
                            disabled={loader}>{loader ? 'Loading...' : 'Update Category'}</button>
                </div>
            </form>
        </div>
    );

    return (
        <div>
        <Layout back={true} backText="Back to Manage Category" to="/admin/categories" title="Update category" description={`Welcome back ${user.name}, Update Category now`}
                className="container-fluid">
            {showSuccessMsg()}
            {showErrorMsg()}
            {updateCategoryForm()}
            <hr/>
            {categoryTable()}
        </Layout>
        <Ftr/>
        </div>
    );
};

export default UpdateCategory;
