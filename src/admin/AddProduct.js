import React, {useEffect, useState, Fragment} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import { Link } from "react-router-dom";
import "mdbreact/dist/css/mdb.css";
import {createProduct} from "./ApiAdmin";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import AutoCompleteCategories from "../autocomplete/AutoCompleteCategories";

const AddProduct = () => {
    const {user, token} = isAuthenticate();
    const [productValues, setProductValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        currency: '',
        quantity: '',
        takeInMethod: '',
        image: '',
        loading: false,
        discount: '',
        error: '',
        createdProduct: '',
        redirectToProfile: '',
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        currency,
        quantity,
        takeInMethod,
        loading,
        discount,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = productValues;

    const handleOnChange = (value) => {};

    const newPostForm = () => (
        <div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12" lg="12" sm="12">
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupFileAddon01">
                                          Post Image
                                        </span>
                                        </div>
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                onChange={handleOnChange('image')}
                                                className="custom-file-input"
                                                name="image"
                                                accept="image/*"
                                            />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                Browse an image
                                            </label>
                                        </div>
                                    </div>
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        onChange={handleOnChange('name')}
                                        className="form-control"
                                        value={name}
                                    />
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Product Description
                                    </label>
                                    <textarea
                                        type="text"
                                        onChange={handleOnChange('description')}
                                        className="form-control"
                                        value={description}
                                    />
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        onChange={handleOnChange('price')}
                                        className="form-control"
                                        value={price}
                                    />
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Select Category
                                    </label>
                                    <AutoCompleteCategories/>
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        onChange={handleOnChange('quantity')}
                                        className="form-control"
                                        value={quantity}
                                    />
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Discount
                                    </label>
                                    <input
                                        type="number"
                                        onChange={handleOnChange('discount')}
                                        className="form-control"
                                        value={discount}
                                    />
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Currency
                                    </label>
                                    <select
                                        onChange={handleOnChange('currency')}
                                        className="form-control"
                                    >
                                        <option value="Rs">Rs</option>
                                        <option value="$">$</option>
                                    </select>
                                    <br/>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Take in method
                                    </label>
                                    <select
                                        onChange={handleOnChange('takeInMethod')}
                                        className="form-control"
                                    >
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn className="btn btn-blue" type="submit">
                                            Create Product
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>

    );

    return (
        <Layout title="Add new product" description={`Welcome back ${user.name}, Add a new product now!`} className="container-fluid">
            {newPostForm()}
            <hr/>

        </Layout>
    );
};

export default AddProduct;