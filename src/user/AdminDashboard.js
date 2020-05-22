import React from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import { Link } from "react-router-dom";
import Ftr from "../core/Ftr";

const AdminDashboard = () => {

    const {user : {_id, name, email, role}} = isAuthenticate();
    const style = {
        color: 'white'
    };

    const adminLinks = () => {
        return (
            <div className="col-md-3 mb-4">
                <div className="card">
                    <div className="card-header" >{parseInt(isAuthenticate().user.role) === 1 ? "Admin Links" : "Store Manager Links"}</div>
                    <div className="card-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link className="nav-link" to="/create/category">Create Category</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="nav-link" to="/create/product">Create Product</Link>
                            </li>
                            {(parseInt(isAuthenticate().user.role) === 1) && (
                                <li className="list-group-item">
                                    <Link className="nav-link" to="/create/user">Create Admin User</Link>
                                </li>
                            )}
                            <li className="list-group-item">
                                <Link className="nav-link" to="/admin/categories">Manage Categories</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="nav-link" to="/admin/products">Manage Products</Link>
                            </li>

                            {(parseInt(isAuthenticate().user.role) === 1) && (
                                <li className="list-group-item">
                                    <Link className="nav-link" to="/manage/user">Manage Admin Users</Link>
                                </li>
                            )}
                            <li className="list-group-item">
                                <Link className="nav-link" to="/admin/orders">View Orders</Link>
                            </li>
                            {/*{(parseInt(isAuthenticate().user.role) === 1) && (*/}
                            {/*    <li className="list-group-item">*/}
                            {/*        <Link className="nav-link" to="/admin/users">Manage Users</Link>*/}
                            {/*    </li>*/}
                            {/*)}*/}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="col-md-9 mb-4">
                <div className="card">
                    <div className="card-header bg-primary" style={style} >User Information</div>
                    <div className="card-body alert-primary">
                        <ul className="list-group">
                            <li className="list-group-item">
                                Name : {name}
                            </li>
                            <li className="list-group-item">
                                Email : {email}
                            </li>
                            <li className="list-group-item">
                                Role : {role === "1" ? 'Admin' : 'Registered User'}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div>
            <Layout title="Dashboard" description={`Welcome back ${name}!`} className="container-fluid">
                <div className="row">
                    {adminLinks()}
                    {adminInfo()}
                </div>
            </Layout>
            <Ftr/>
        </div>
    );
};

export default AdminDashboard;
