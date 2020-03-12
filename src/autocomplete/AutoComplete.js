import React, { Component } from "react";
import {getAllCategories} from "../core/apiCore";

class AutoComplete extends Component {

    constructor(props) {
        super(props);
        this.items = [
          "A", "B", "C"
        ];
    }
    state = {
        categories: getAllCategories()
    };

    render() {
        const style = {
            "margin-top": "50px",
        }

        return (

            <div>
                <input type="text" className="input-group-text"/>
                <ul>
                </ul>
            </div>
        );
    }
}

export default AutoComplete;
