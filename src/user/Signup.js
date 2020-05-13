import React, {useState} from "react";
import Layout from "../core/Layout";
import {signup} from "../auth";
import Recaptcha from 'react-recaptcha';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const [recaptchaVerfied, setRecaptchaVerified] = useState(false);
    let [recaptchaKey, setRecaptchaKey] = useState(0);

    const {name, email, password, success, error} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        if(recaptchaVerfied){
            signup({name, email, password})
                .then(data => {
                    if (data.error) {
                        setValues({...values, error: data.error, success: false});
                    } else {
                        const key = ++recaptchaKey;
                        console.log(recaptchaKey);
                        setRecaptchaKey(key);
                        setValues({...values, name: '', email: '', password: '', error: '', success: true});
                    }
                });
        }else{
            setValues({...values, error: "Please verify ReCaptcha!", success: false})
        }

    };

    const showError = () => (
        <div className="alert alert-danger text-center" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New User Added Successfully
        </div>
    );

    const signUpForm = () => (
        <div className="container d-flex mt-5 justify-content-center">
            <div className="col-sm-5">
                <h3 className="text-center mt-4 font-weight-bolder">Sign up</h3>
                <div className="card card-body mt-5">
                    <form>
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input type="text" onChange={handleChange('name')} className="form-control" value={name}/>
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input type="email" onChange={handleChange('email')} className="form-control"
                                   value={email}/>
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            <input type="password" onChange={handleChange('password')} className="form-control"
                                   value={password}/>
                        </div>

                        <Recaptcha
                            key={recaptchaKey}
                            sitekey="6LcZZPUUAAAAAIlxCF98ooQ_SCWA5yOvXwjd1q8S"
                            render="explicit"
                            verifyCallback={verifyCallback}
                            onloadCallback={recaptchaLoaded()}
                        />

                        <br/>
                        {showSuccess()}
                        {showError()}
                        <button className="btn btn-primary w-100" onClick={clickSubmit}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
    //when in the production, change domain name "localhost" to actual domain name
    // Site key - 6LcZZPUUAAAAAIlxCF98ooQ_SCWA5yOvXwjd1q8S
    // secret key - 6LcZZPUUAAAAAGk8BYDGhx7-Kf5wyHjzPF49cqad
    const recaptchaLoaded = () => {
        console.log("recaptcha successfully loaded!");
    }

    const verifyCallback = (response) => {
        if(response){
            setRecaptchaVerified(true);
            setValues({...values, error: '', success: false})
        }
    }

    return (
        <div>
            {signUpForm()}
        </div>
    )
};

export default Signup;
