import React from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import { Link } from "react-router-dom";
import Ftr from "../core/Ftr";

const Dashboard = () => {

    const {user : {_id, name, email, role}} = isAuthenticate();
    const style = {
        color: 'white'
    };

    const userLinks = () => {
        return (
            <div className="col-md-3 mb-4">
                <div className="card">
                    <div className="card-header" >User Links</div>
                    <div className="card-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link className="nav-link" to="/cart">My Cart</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const userInfo = () => {
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

    const purchaseHistory = () => {
        return (
            <div className="col-md-12">
                <div className="card mb-5">
                    <div className="card-header bg-warning">Purchase History</div>
                    <div className="card-body alert-warning">
                        <ul className="list-group">
                            <li className="list-group-item">History coming from database</li>
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
                    {userLinks()}
                    {userInfo()}
                </div>
                <div className="row">
                    {purchaseHistory()}
                </div>
            </Layout>
            <Ftr/>
        </div>
    );
};

export default Dashboard;
