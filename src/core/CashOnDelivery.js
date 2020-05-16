import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody} from 'mdbreact';
import {getAddress} from "./apiCore";
import {isAuthenticate} from "../auth";

const CashOnDelivery = () => {

    const [values, setValues] = useState({
        address1: '',
        address2: '',
        town: '',
        postal_code: '',
        mobile: '',
        error: '',
        redirect: false
    });

    useEffect(() => {
        const {token, user} = isAuthenticate();
        getAddress(user._id, token).then(data => {
            setValues(data);
        });
    }, []);

    const {address1, address2, town, postal_code, mobile, error, redirect} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
    };

    const showError = () => (
        <div className="alert alert-danger text-center" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirect) {
            return <Redirect to="/admin/dashboard"/>
        }
    };

    // const signInForm = () => (
    //
    //     <div className="container d-flex mt-5 justify-content-center">
    //         <div className="col-sm-5">
    //             <h3 className="text-center mt-4 font-weight-bolder">Sign in</h3>
    //             <div className="card card-body mt-5">
    //                 <form>
    //                     <div className="form-group">
    //                         <label className="text-muted">Email</label>
    //                         <input type="email" onChange={handleChange('email')} className="form-control"
    //                                value={email}/>
    //                     </div>
    //
    //                     <div className="form-group">
    //                         <label className="text-muted">Password</label>
    //                         <input type="password" onChange={handleChange('password')} className="form-control"
    //                                value={password}/>
    //                     </div>
    //                     {showError()}
    //                     <button className="btn btn-primary w-100"
    //                             onClick={clickSubmit}>Sign
    //                         in
    //                     </button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <form>
                                <p className="h4 text-center py-4">Shipping Address</p>
                                <div className="grey-text">
                                    <MDBInput
                                        label="Address Line 1"
                                        icon="envelope"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={handleChange('address1')}
                                        value={address1}
                                    />
                                    <MDBInput
                                        label="Address Line 2"
                                        icon="envelope"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={handleChange('address2')}
                                        value={address2}
                                    />
                                    <MDBInput
                                        label="City"
                                        icon="building"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={handleChange('town')}
                                        value={town}
                                    />
                                    <MDBInput
                                        label="Postal Code"
                                        icon="location-arrow"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={handleChange('postal_code')}
                                        value={postal_code}
                                    />
                                    <MDBInput
                                        label="Mobile No"
                                        icon="phone"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={handleChange('mobile')}
                                        value={mobile}
                                    />
                                </div>
                                <div className="text-center py-4 mt-3">
                                    <MDBBtn color="cyan" type="submit" onClick={clickSubmit}>
                                        Place Order
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
};

export default CashOnDelivery;
