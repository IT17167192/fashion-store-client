import React, {useState} from "react";
import Layout from "../core/Layout";
import {Link, Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticate} from "../auth";
import {getCartProductId} from "../core/CartHelper";
import {updateUserCart} from "../core/apiCore";

const Signin = () => {

    const [values, setValues] = useState({
        email: 'mails4kasunn@gmail.com',
        password: '123456',
        error: '',
        loading: false,
        redirect: false
    });

    const {email, password, loading, error, redirect} = values;
    const { user } = isAuthenticate();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});

        signin({email, password})
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                    authenticate(data, () => {
                            setValues({...values, redirect: true})
                        }
                    );
                    // updateUserCart('5e6d2d3aef0ca51d38c58578', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhNTc5M2QxY2JlYzMwZmMwMmZhYjUiLCJpYXQiOjE1ODQyMDEwMjN9.6ph27SWcp98bs29rvB51xer6OYTEysxP9ScKjqaLSWs', JSON.parse(JSON.stringify(getCartProductId())));
                    // console.log(JSON.parse(JSON.stringify(getCartProductId())));
                }
            })
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-info">
            <h2>Loading...</h2>
        </div>)
    );

    const redirectUser = () => {
        if (redirect) {
            if(user && user.role === "1"){
                return <Redirect to="/admin/dashboard"/>
            }else {
                return <Redirect to="/user/dashboard"/>
            }
        }

        if(isAuthenticate()){
            return <Redirect to="/"/>
        }
    };

    const signInForm = () => (
        <div className="mb-5 container col-auto">
            <form>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" onChange={handleChange('email')} className="form-control" value={email}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" onChange={handleChange('password')} className="form-control"
                           value={password}/>
                </div>

                <button className="btn btn-primary" disabled={values.loading} onClick={clickSubmit}>Submit</button>
            </form>
        </div>
    );

    return (
        <Layout title="Signin"
                description="Fashion Store"
                className="container-fluid col-md-8 mb-5">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )
};

export default Signin;
