import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import {addAdminUser} from "./ApiAdmin";

const AddAdminUser = () => {
    const {user, token} = isAuthenticate();
    const [roles] = useState([
        {roleName: "Admin", roleId: "1"}, {roleName: "Store Manager", roleId: "2"}
    ]);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        role: 1,
        error: false,
        createdUser: false,
        showSuccess: false,
        formData: ''
    });

    const {
        name,
        email,
        password,
        role,
        error,
        createdUser,
        showSuccess,
        formData
    } = userDetails;

    useEffect(() => {
        setUserDetails({...userDetails, formData: new FormData()})
    }, []);

    const handleOnChange = (name) => (event) => {
        const value = event.target.value;
        formData.set(name, value);
        setUserDetails({...userDetails, [name]: value});
    };

    const valueChangeHandler = (event) => {
        console.log(event.target.value);
        formData.set("role", parseInt(event.target.value));
        setUserDetails({...userDetails, "role": parseInt(event.target.value)});
    };

    const showErrorMsg = () => {
        if(error){
            return(
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{error}</strong>
                </div>
            );
        }
    };

    const showSuccessMsg = () => {
        if(showSuccess){
            return(
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>New user is created successfully!</strong>
                </div>
            );
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setUserDetails({...userDetails});
        addAdminUser(user._id, token,{name, email, password, role})
            .then(data => {
                if (data.error) {
                    setUserDetails({...userDetails, error: data.error, showSuccess: false});
                } else {
                    setUserDetails({...userDetails, name: '', email: '', password: '', role: '1', error: false, showSuccess: true, createUser: data.name})
                }
            })
    };

    const newUser = () => (
        <div className="col-md-8 col-sm-8 col-lg-8 container-fluid">
            {showErrorMsg()}
            {showSuccessMsg()}
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" value={name} onChange={handleOnChange('name')} className="form-control" autoFocus required/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" value={email} onChange={handleOnChange('email')} className="form-control" autoFocus required/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" value={password} onChange={handleOnChange('password')} className="form-control" autoFocus
                           required/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Role</label>
                    <select onChange={(e) => valueChangeHandler(e)} className="form-control">
                        {roles.map((role, index) => (
                            <option value={role.roleId} key={index}>{role.roleName}</option>
                        ))}
                    </select>
                </div>


                <div className="form-group">
                    <button className="btn btn-primary" onClick={onSubmit}>Create User</button>
                </div>
            </form>
        </div>
    );

    return (
        <Layout title="Add new user" description={`Welcome back ${user.name}, Add a new user now!`}
                className="container-fluid">
            {newUser()}
            <hr/>
        </Layout>
    );
};

export default AddAdminUser;
