import React, {useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import { Link } from "react-router-dom";
import "mdbreact/dist/css/mdb.css";

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //get user and info from local storage
    const {user, token} = isAuthenticate();

    const handleChange = (event) => {
        let value = event.target.value;
        setError(false);
        setName(value);
    };

    const submit = (event) => {
        event.preventDefault();
        setError(false);
        setSuccess(false);
        //create category
        //use api request

    };

    const newCategoryForm = () => (
        <div className="col-md-8 col-sm-8 col-lg-8 container-fluid">
            <form onSubmit={submit}>
                <div className="form-group">
                    <label className="text-muted">Category Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Create Category</button>
                </div>
            </form>
        </div>
    );

    return (
        <Layout title="Add new category" description={`Welcome back ${name}!, Add a new category now!`} className="container-fluid">
            <div className="row">
                {newCategoryForm()}
            </div>
        </Layout>
    );
};

export default AddCategory;