import React, {Fragment, useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import {updateUserState, getAllUsers, resetPassword} from "./ApiAdmin";
import {confirmAlert} from "react-confirm-alert";
import Ftr from "../core/Ftr";
import {Link} from "react-router-dom";
import {MDBBtn} from "mdbreact";
import Pagination from "./Pagination";

const ManageAdminUser = () => {
    const [users, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    //get Current item
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const getCurrentItem = users.slice(indexOfFirst, indexOfLast);

    const {user, token} = isAuthenticate();

    const fetchUsers = () => {
        getAllUsers().then(data => {
            if (data.error) {
                console.log(data.error)
            } else
                setAllUsers(data)
        })
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const [roles] = useState([
        {roleName: "Admin", roleId: "1"}, {roleName: "Store Manager", roleId: "2"}
    ]);

    const onClickResetPassword = userId => {
        resetPassword(userId, token, user._id)
            .then(data => {
                if (data.error) {
                    console.log("error");
                } else {
                    confirmAlert({
                        title: 'Password has reset. Email sent successfully!',
                        buttons: [
                            {
                                label: 'OK',
                            }
                        ]
                    });
                }
            })
    };

    const changeState = data => {
        updateUserState(user._id, data, token). then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                fetchUsers()
            }
        })
    };

    const manageUser = () => (
        <div className="row ml-4 mr-4 mb-5">
            <div className="col-12 table-responsive">
                <hr/>
                <table className="table table-hover text-center">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">User Id</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Change</th>
                        <th scope="col">Password</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getCurrentItem.map((user, item) => (
                        <tr key={user._id}>
                            <th scope="row">{user._id}</th>
                            <td><strong>{user.name}</strong></td>
                            <td><strong>{user.email}</strong></td>
                            <td>{user.state === '1' ? <span className="badge badge-primary">Active</span> :
                                <span className="badge badge-warning badge-pill">Inactive</span>}</td>
                            <td>
                                {user.state !== '1' ?
                                    <button onClick={() => {changeState({_id: user._id, state: '1'})}} className="btn btn-sm btn-success">
                                        Set Active
                                    </button> :
                                    <button onClick={() => {changeState({_id: user._id, state: '0'})}} className="btn btn-sm btn-danger">
                                        Set Inactive
                                    </button>}
                            </td>
                            <td>
                                <button onClick={() => {onClickResetPassword(user._id)}} className="btn btn-sm btn-dark">
                                    Reset Password
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
                <Pagination itemsPerPage={itemsPerPage} totalItems={users.length} currentPage={currentPage} paginate={paginate}/>
            </div>
        </div>
    );

    return (
        <div>
        <Layout back={true} backText="Back to dashboard" to="/admin/dashboard" title="Manage Users" description={`Welcome back ${user.name}, Manage Users Now!`}
                className="container-fluid">
            <hr/>
            {manageUser()}
            <hr/>
        </Layout>
        <Ftr/>
        </div>
    );
};

export default ManageAdminUser;
