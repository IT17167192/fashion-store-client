import React from "react";
import '../assets/category_card_assets/bootstrap/css/bootstrap.min.css';
import '../assets/category_card_assets/fonts/font-awesome.min.css';
import '../assets/category_card_assets/css/styles.css';
import '../assets/category_card_assets/css/Team-Grid.css';
import backgroundI1 from '../assets/category_card_assets/img/1.jpg';
import backgroundI2 from '../assets/category_card_assets/img/2.jpg';
import backgroundI3 from '../assets/category_card_assets/img/3.jpg';
import backgroundI4 from '../assets/category_card_assets/img/4.jpg';

const CategoryCard = () => {
    return (
            <div className="row people">
                <div className="col-md-4 col-lg-3 item">
                    <div className="box" style={{backgroundImage: `url(${backgroundI1})`}}>
                        <div className="cover">
                            <h3 className="name"></h3>
                            <p className="title">Casual fashion</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-3 item">
                    <div className="box" style={{backgroundImage: `url(${backgroundI2})`}}>
                        <div className="cover">
                            <p className="title">Gothik Style </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-3 item">
                    <div className="box" style={{backgroundImage: `url(${backgroundI3})`}}>
                        <div className="cover">
                           <p className="title">Stylist Formal</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-3 item">
                    <div className="box" style={{backgroundImage: `url(${backgroundI4})`}}>
                        <div className="cover">
                            <p className="title">Ladies Fashion</p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default CategoryCard;
