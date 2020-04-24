import React, {useState} from "react";
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import {isAuthenticate} from "../auth";
import {addRating} from "./apiCore";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import CircularProgress from "@material-ui/core/CircularProgress"; // Import css

const RateComponent = (props) => {

    const [enableRating, setEnableRating] = useState(true);
    const getAverageRating = (rating) => {
        if(rating){
            const votedCount = rating.length;
            let rateSum = 0;
            rating.forEach(rate => {
                rateSum += rate;
            });
            return Math.ceil(rateSum / votedCount);
        }
    }

    const onRateClicked = (rate) => {
        setEnableRating(false);
        const {token, user} = isAuthenticate();
        if (user != null) {
            addRating(user._id, token, props.product._id, rate.rating).then(data => {
                if (data.error) {
                    console.log(data.error);
                }else{
                    setEnableRating(true);
                    confirmAlertMessage();
                }
            });
        }
    }

    const confirmAlertMessage = () => {
        confirmAlert({
            title: 'Thank For Your Support!',
            message: 'Successfully Submitted Your Rating',
            buttons: [
                {
                    label: 'Close',
                }
            ]
        });
    };

    return(
        <div>
            <Rater total={5} interactive={enableRating} rating={getAverageRating(props.product.rating) ? getAverageRating(props.product.rating) : 1} onRate={onRateClicked}/>
            {!enableRating ? <CircularProgress className="ml-4" size={30}/> : ''}
        </div>
    );
};

export default RateComponent;

