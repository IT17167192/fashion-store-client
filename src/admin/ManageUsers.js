// import React, {useEffect, useState, Fragment} from "react";
// import Layout from "../core/Layout";
// import {isAuthenticate} from "../auth";
// import {Link} from "react-router-dom";
// import "mdbreact/dist/css/mdb.css";
// import {createCategory} from "./ApiAdmin";
// import {MDBContainer, MDBAlert} from 'mdbreact';
// import {MDBDataTable} from 'mdbreact';
// import {getAllCategories} from "../core/apiCore";
// import {MDBBtn} from "mdbreact";
// import Card from "../core/Card";
// import FooterPage from "../core/Footer";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import {getAllUsers, deleteSingleUser} from "./ApiAdmin";
//
// const ManageUsers = () => {
//
//     const [users, setAllUsers] = useState([]);
//
//     const {user, token} = isAuthenticate();
//
//     const  fetchUsers = () => {
//         getAllUsers().then (data => {
//             if(data.error){
//                 console.log("data.error")
//             }
//             else
//                 setAllUsers(data)
//         })
//     };
//
//     const remove = userId =>{
//         deleteSingleUser(userId, user._id, token). then(data => {
//             if(data.error){
//                 console.log(data.error)
//             } else {
//                 fetchUsers()
//             }
//         })
//     };
//     useEffect(() => {
//         fetchUsers();
//     }, []);
//     return (
//         <Layout title="Manage Users" description="Update and delete Users">
//             <h2 className="mb-4">Manage Users</h2>
//             <div className="row">
//                 <div className="col-12">
//                     <h2 className="text-center"> Total of {users.length} Users </h2>
//                     <ul className="list-group">
//                         {users.map((user, item) => (
//                             <li
//                                 key={item}
//                                 className="list-group-item d-flex justify-content-between align-items-center">
//                                 <strong>{user.name}</strong>
//                                 <Link to={`/admin/user/update/${user._id}`}>
//                                 <span className="badge badge-warning badge-pill "  >
//                                     Update User
//                                 </span>
//                                 </Link>
//
//                                 <span onClick={() => remove(user._id)} className="badge badge-danger badge-pill">
//                                     Delete User
//                                 </span>
//
//                             </li>
//
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </Layout>
//     );
// };
//
// export default ManageUsers;