import React from "react";
import Image from "react-bootstrap/Image";
import MenuLogoV1 from "../assets/Logos/Logo_Email-v1.png";
import {Link} from "react-router-dom";
import ProductSearch from "./ProductSearch";
import '../assets/navbar_hover/style.css';


const NavBar = () => {

    const fontColor = () => {
        return {color: '#000000', fontSize: 15}
    };

    return (
        <div className="row" style={{background: '#fefefe'}}>
            <div className="col-lg-3 m-5">
                <Image src={MenuLogoV1} fluid/>
            </div>
            <div className="col-lg-5 text-center mt-lg-5">
                <div className="row people mt-lg-4">
                    <div className="col-md-4 col-lg-3 item">
                        <Link to="/product/category/5e6cd92b0befdd2d4caa420c">
                            <h5 style={fontColor()} className="title text-uppercase">Business Casual</h5>
                        </Link>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                        <Link to="/product/category/5ecaa059be7b48235c6a131f">
                            <h5 style={fontColor()} className="title text-uppercase">Gents Casual</h5>
                        </Link>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                        <Link to="/product/category/5ecaa08abe7b48235c6a1320">
                            <h5 style={fontColor()} className="title text-uppercase">Ladies Casual </h5>
                        </Link>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                        <Link to="/product/category/5ecaa0bbbe7b48235c6a1321">
                            <h5 style={fontColor()} className="title text-uppercase">Ladies Fashion</h5>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 container-fluid">
                <ProductSearch/>
            </div>

        </div>
    )
};

export default NavBar;
