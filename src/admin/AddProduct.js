import React, {useEffect, useState, Fragment} from "react";
import Layout from "../core/Layout";
import {isAuthenticate} from "../auth";
import { Link } from "react-router-dom";
import "mdbreact/dist/css/mdb.css";
import {createProduct} from "./ApiAdmin";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBAlert } from 'mdbreact';
import AutoCompleteCategories from "../autocomplete/AutoCompleteCategories";

const AddProduct = () => {
    const {user, token} = isAuthenticate();
    const [productValues, setProductValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        currency: 'Rs',
        quantity: '',
        takeInMethod: 'false',
        image: '',
        loading: false,
        discount: '0.00',
        error: false,
        createdProduct: false,
        showSuccess: false,
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
        showSuccess,
        redirectToProfile,
        formData
    } = productValues;

    useEffect(() => {
        setProductValues({...productValues, formData: new FormData()})
    }, []);

    const handleOnChange = (name) => (event) =>{
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setProductValues({...productValues, [name]: value});
    };

    const onCategoryChangeHandler = (categoryId) => {
        formData.set("category", categoryId);
        setProductValues({...productValues, "category": categoryId});
    };

    const submit = (event) => {
        event.preventDefault();
        setProductValues({...productValues, error: '', loading: true});

        if(!takeInMethod){
            setProductValues({...productValues, takeInMethod: 'false'});
        }

        if(!currency){
            setProductValues({...productValues, currency: 'Rs'});
        }

        createProduct(user._id, token, formData)
            .then(data=> {
                if(data.error){
                    setProductValues({...productValues, error: data.error, showSuccess: false});
                }else{
                    setProductValues({
                        ...productValues,
                        name: '',
                        description: '',
                        image: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        discount: '',
                        currency: '',
                        error: false,
                        showSuccess: true,
                        createProduct: data.name
                    })
                }
            })

    };

    const showErrorMsg = () => {
        if(error){
            return(
                <MDBContainer>
                    <MDBAlert color="danger" dismiss>
                        <strong>{error}</strong>
                    </MDBAlert>
                </MDBContainer>
            );
        }
    };

    const showSuccessMsg = () => {
        if(showSuccess){
            return(
                <MDBContainer>
                    <MDBAlert color="success" dismiss>
                        <strong>New product is created successfully!</strong>
                    </MDBAlert>
                </MDBContainer>
            );
        }
    };

    const newPostForm = () => (
        <div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12" lg="12" sm="12">
                        {showErrorMsg()}
                        {showSuccessMsg()}
                        <MDBCard>
                            <MDBCardBody>
                                <form onSubmit={submit}>
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
                                        Select Category
                                    </label>
                                    <AutoCompleteCategories onSelect={onCategoryChangeHandler} />
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
                                        Currency
                                    </label>
                                    <select
                                        onChange={handleOnChange('currency')}
                                        className="form-control"
                                    >
                                        <option value="select">Select currency</option>
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
                                        <option value="select">Select a method</option>
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