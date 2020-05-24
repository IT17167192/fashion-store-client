import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import { Link, Redirect } from "react-router-dom";
import {read, update, updateUser} from "./apiUser";
import {forgotPassword, resetPasswordByLink} from "../core/apiCore";
import {confirmAlert} from "react-confirm-alert";
import CircularProgress from "@material-ui/core/CircularProgress";

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const [resetPasswordLoad, setResetPasswordLoad] = useState(false);

    const {token} = isAuthenticate();
    const {name, email, password, error, success} = values;

    const init = (userId) => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({...values, error: true})
            } else {
                setValues({...values, name: data.name, email: data.email})
            }
        });
    };

    useEffect(() => {
        init(match.params.userId)
    }, []);

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password}).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                updateUser(data, () => {
                    setValues({...values, name: data.name, email: data.email, success: true})
                })
            }
        })
    };

    const redirectUser = (success) => {
        if (success) {
            return <Redirect to="/" />
        }
    };

    const resetPassword = (event) => {
        event.preventDefault();
        setResetPasswordLoad(true);
        if(email === ''){
            confirmAlert({
                title: 'Please add an email!',
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
            setResetPasswordLoad(false);
        }else{
            const emailObj = {
                email: email
            }

            forgotPassword(emailObj)
                .then(response => {
                    if(response.error){
                        console.log(error);
                        if(!error){
                            confirmAlert({
                                title: 'User not found!',
                                buttons: [
                                    {
                                        label: 'OK',
                                    }
                                ]
                            });
                        }
                        setResetPasswordLoad(false);
                    }else{
                        console.log(response);
                        confirmAlert({
                            title: response.message,
                            buttons: [
                                {
                                    label: 'OK',
                                }
                            ]
                        });
                        setResetPasswordLoad(false);
                    }
                });
        }
    };

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
            </div>

            <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
            <br/>
            <div className="form-group">
                <label className="text-muted">Click to reset password <button className="btn btn-primary" onClick={resetPassword}>{resetPasswordLoad ?
                    <CircularProgress size={20}/> : 'RESET PASSWORD'}</button></label>
            </div>
        </form>
    );

    return (
        <Layout
            title="Profile"
            description="Update Profile"
            className="container-fluid"
            >

            {profileUpdate(name, email, password)}
            {redirectUser(success)}

        </Layout>
    )
};

export default Profile;
