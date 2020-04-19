import React, {useState} from "react";

const FilterCheckbox = ({categories}) => {
    const [checked, setChecked] = useState([]);

    const handleCheck = (category) => () => {
        //return -1 if false
        //check whether id is exist in checked array
        const currentCategoryId = checked.indexOf(category._id);
        const allCategoryIds = [...checked];
        if(currentCategoryId !== -1){
            allCategoryIds.push(category._id);
        }else{
            //unchecking checkbox
            //remove using the category id returned to currentCategoryId
            allCategoryIds.splice(currentCategoryId, 1);
        }

        //after the logic set new list
        setChecked(allCategoryIds);
    };

    return categories.map((category, index) => (
            <li className="list-unstyled" key={index}>
                <input onChange={handleCheck(category)} value={checked.indexOf(category._id === -1)}  type="checkbox" className="form-check-input"/>
                <label className="form-check-label">{category.name}</label>
            </li>
    ));
};

export default FilterCheckbox;
