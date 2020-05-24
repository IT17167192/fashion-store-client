import React, {useState, useEffect} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from '@material-ui/core/TextField';
import {getAllCategories} from "./apiCore";
import Button from '@material-ui/core/Button';
import {Link, Redirect} from 'react-router-dom';

const ProductSearch = () => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('All');
    const [searchData, setSearchData] = useState('');

    const handleCategoryChange = (value) => {
        const categoryId = value._id;
        setCategoryId(categoryId);
    }

    const searchDataOnChange = (event) => {
        let value = event.target.value;
        console.log(value);
        setSearchData(value);
    }

    const  fetchCategories = () => {
        getAllCategories().then (data => {
            if(data.error){
                console.log(data.error)
            }
            else
                setCategories(data)
        })
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="card col-8 container mt-5">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 col-sm-12">
                        <div className="form-group">
                            <Autocomplete
                                onChange={(event, value) => handleCategoryChange(value)}
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={categories.map((option) => option)}
                                getOptionLabel={ options => (options.name)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Category"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-7 col-xl-7 col-sm-12">
                        <TextField
                            label="Search Product"
                            margin="normal"
                            variant="outlined"
                            placeholder="Search products"
                            fullWidth
                            onChange={searchDataOnChange}
                            value={searchData}
                        />
                    </div>
                    <div className="col-md-12 col-lg-2 col-xl-2 col-sm-12 mt-4">
                        <Link to={`/product/search/${searchData === '' ? 'All' : searchData }/${categoryId}`}>
                            <Button  variant="outlined" size="large">Search</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSearch;
