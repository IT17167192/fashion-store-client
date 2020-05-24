import React, {useState, useEffect} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from '@material-ui/core/TextField';
import {getAllCategories} from "./apiCore";
import Button from '@material-ui/core/Button';
import {Link, Redirect} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

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

    const fetchCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else
                setCategories(data)
        })
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="row d-flex justify-content-center">
            <div className="input-group col-md-12 col-lg-10 col-xl-10 col-sm-12 m-5">
                <div className="col-md-12 col-lg-5 col-xl-5 col-sm-3 pr-1 pl-1">
                    <Autocomplete
                        onChange={(event, value) => handleCategoryChange(value)}
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={categories.map((option) => option)}
                        getOptionLabel={options => (options.name)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Category"
                                margin="normal"
                                variant="outlined"
                                InputProps={{...params.InputProps, type: 'search'}}
                            />
                        )}
                    />
                </div>
                <div className="col-md-12 col-lg-7 col-xl-7 col-sm-9 pl-1 pr-1">
                    <TextField
                        label="Search"
                        margin="normal"
                        variant="outlined"
                        placeholder="Search"
                        fullWidth
                        onChange={searchDataOnChange}
                        value={searchData}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <a
                                        href={`/product/search/${searchData === '' ? 'All' : searchData}/${categoryId}`}>
                                        <IconButton>
                                            <SearchIcon/>
                                        </IconButton>
                                    </a>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductSearch;
