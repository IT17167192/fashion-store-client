import React, {useState} from "react";
import Layout from "../core/Layout";
import {Link, Redirect} from "react-router-dom";
import {signin, authenticate} from "../auth";

const Signin = () => {

    const [values, setValues] = useState({
        email: 'mails4kasun@gmail.comm',
        password: '123456',
        error: '',
        loading: false,
        redirect: false
    });

    const {email, password, loading, error, redirect} = values;

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
                    )
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
