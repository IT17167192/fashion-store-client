import React, {useState, useEffect} from "react";
import {getAllCategories} from "../core/apiCore";
import "./AutoComplete.css"

const AutoCompleteCategories = () => {
    const [categories, setCategories] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [textValue, setTextValue] = useState([]);
    const [errorCat, setErrorCat] = useState(false);

    const loadCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setErrorCat(data.error);
                console.error(errorCat);
            } else {
                setCategories(data);
            }
        })
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const onChangeHandler = (event) => {
        const value = event.target.value;
        let filteredCategories = [];

        if(value.length > 0){
            const regExp = new RegExp(`^${value}`, 'i');
            filteredCategories = categories.sort().filter(category => regExp.test(category.name));
        }
        setSuggestions(filteredCategories);
        setTextValue(value);
    }

    const renderSuggestions = () => {
        const suggestionState = suggestions;
        if(suggestionState.length === 0){
            return null;
        }

        return (
            <ul>
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => valueChangeHandler(suggestion.name)}>
                        {suggestion.name}
                    </li>
                ))}
            </ul>
        )
    }

    const valueChangeHandler = (value) => {
        setTextValue(value);
        setSuggestions([]);
    }

    return (
       <div className="AutoComplete">
           <input type="text" onChange={onChangeHandler} value={textValue}/>
           {renderSuggestions()}
       </div>
    );

};

export default AutoCompleteCategories;