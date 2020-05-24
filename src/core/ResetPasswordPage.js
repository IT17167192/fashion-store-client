import React, {useState} from "react";
import '../assets/reset_password_assets/assets/bootstrap/css/bootstrap.min.css';
import '../assets/reset_password_assets/assets/css/Newsletter-Subscription-Form.css';
import '../assets/reset_password_assets/assets/css/styles.css';
import FtrMin from "./FtrMin";
import {resetPasswordByLink} from "../core/apiCore";
import {confirmAlert} from "react-confirm-alert";
import {Redirect} from "react-router-dom";
import {isAuthenticate} from "../auth";

const ResetPasswordPage = ({match}) => {
    const [newPassword, setNewPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const tokenId = match.params.tokenId;
        const obj = {
            newPassword: newPassword,
            resetLink: tokenId
        }

        resetPasswordByLink(obj)
            .then(response => {
                if(response.error){
                    console.log(response.error);
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

                    setRedirect(true);
                }
            })
    }

    const handleChange = (event) => {
        let value = event.target.value;
        setNewPassword(value);
    }

    const redirectUser = () => {
        if (redirect) {
            return <Redirect to="/signin"/>
        }
    };

    return (
        <div>
            <div className="newsletter-subscribe mb-5">
                <div className="container">
                    <div className="intro">
                        <h2 className="text-center">Reset Your Password</h2>
                    </div>
                    <form className="form-inline">
                        <div className="form-group">
                            <input className="form-control" type="password" name="password"
                                   placeholder="New Passowrd" value={newPassword} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <FtrMin/>
            {redirectUser()}
        </div>
    );
};

export default ResetPasswordPage;
