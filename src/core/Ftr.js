import React, {useState} from "react";
import '../assets/footer_assets/bootstrap/css/bootstrap.min.css';
import '../assets/footer_assets/fonts/font-awesome.min.css';
import '../assets/footer_assets/css/styles.css';
import {confirmAlert} from "react-confirm-alert";
import {newsletterSignUp} from "../auth";
import CircularProgress from "@material-ui/core/CircularProgress"; // Import css
import FooterLogo from '../assets/Logos/Logo_Footer-v2.png';

const Ftr = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        let value = event.target.value;
        console.log(value);
        setEmail(value);
    }

    const subscribe = (event) => {
        event.preventDefault();
        setLoading(true);
        console.log(email);
        if (email) {
            newsletterSignUp(email).then(data => {
                if (data.error) {
                    console.log(data.error);
                }else{
                    setEmail('');
                    setLoading(false);
                    confirmAlert({
                        title: 'Thank you for subscribing us!',
                        buttons: [
                            {
                                label: 'OK',
                            }
                        ]
                    });
                }
            });
        }else{
            confirmAlert({
                title: 'Email is required!',
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
            setLoading(false);
        }
    }

    return (
        <footer className="bg-dark text-white border-top border-info">
            <div className="container text-center text-sm-left position-relative py-5">
                <div className="row">
                    <div className="col-sm-12 col-md-4 text-center text-md-left pb-4">
                        <h3 className="text-info pb-2">About Us</h3>
                        <ul className="list-unstyled d-inline-block d-sm-block">
                            {/*<li className="mb-2"><a className="text-light" href="#">Expers cum eodem</a></li>*/}
                            {/*<li className="mb-2"><a className="text-light" href="#">Vulgasset ut solent</a></li>*/}
                            {/*<li className="mb-2"><a className="text-light" href="#">Sensim fame petivere</a></li>*/}
                            {/*<li className="mb-2"><a className="text-light" href="#">Minimumque</a></li>*/}
                            <p className="mb-2" className="text-light"> Here at Quarantine Fashion Store We provide you with the best of the best.
                                Make your dream wardrobe a reality by shopping with us.</p>
                            <p className="mb-2" className="text-light"> With everything at the tip of your fingers, shopping has never been easier.</p>
                        </ul>
                    </div>
                    <div className="col-sm-12 col-md-4 text-center text-md-left pb-4">
                        <h3 className="text-info pb-2 text-center"> Quick Links</h3>
                        <ul className="list-unstyled d-inline-block d-sm-block text-center">
                            <li className="mb-2"><a className="text-light" href="/">Home</a></li>
                            <li className="mb-2"><a className="text-light" href="/user/dashboard">Dashboard</a></li>
                            <li className="mb-2"><a className="text-light" href="/shop">Shop</a></li>
                            <li className="mb-2"><a className="text-light" href="/cart">Cart</a></li>
                            <li className="mb-2"><a className="text-light" href="/wishlist">Wishlist</a></li>

                        </ul>
                    </div>
                    <div className="col-sm-12 col-md-4 text-center text-md-left pb-4">
                        <h3 className="text-info pb-2 text-right">Contact Us</h3>
                        <ul className="list-unstyled d-inline-block d-sm-block text-right">
                            <p className="mb-1"><i className="fa fa-phone fa-fw"></i>&nbsp;+94 75 5172 666</p>
                            <p className="mb-1"><i className="fa fa-envelope fa-fw"></i>&nbsp;<a className="text-light"
                                                                                                 href="mailto:contact@company.com">quarantinefashionstore@google.com</a>
                            </p>
                            <br></br>
                            <div><a className="text-light " href="#"><i
                                className="fa fa-instagram fa-2x"></i></a><a className="text-light mx-2 mx-lg-0 ml-lg-3"
                                                                             href="#"><i
                                className="fa fa-twitter fa-2x"></i></a><a className="text-light mx-2 mx-lg-0 ml-lg-3"
                                                                           href="#"><i
                                className="fa fa-facebook-square fa-2x"></i></a>
                                <a
                                    className="text-light mx-2 mx-lg-0 ml-lg-3" href="#"><i
                                    className="fa fa-snapchat-ghost fa-2x"></i></a>
                            </div>
                        </ul>
                    </div>
                    {/*<div className="col-sm-6 col-md-3">*/}
                    {/*    <h3 className="text-info pb-2 border-bottom border-info">Lorem Ipsum</h3>*/}
                    {/*    <ul className="list-unstyled d-inline-block d-sm-block">*/}
                    {/*        <li className="mb-2"><a className="text-light" href="#">Minimumque</a></li>*/}
                    {/*        <li className="mb-2"><a className="text-light" href="#">Sensim fame petivere</a></li>*/}
                    {/*        <li className="mb-2"><a className="text-light" href="#">Vulgasset ut solent</a></li>*/}
                    {/*        <li className="mb-2"><a className="text-light" href="#">Expers cum eodem</a></li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
                <div className="text-center position-absolute w-100 mt-4"><a href="#top"><span
                    className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-dark"></i><i
                    className="fa fa-angle-up fa-stack-1x text-white"></i></span></a></div>
            </div>
            <div className="pt-5 pb-4 bg-info text-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4 text-center text-md-left pb-4">
                            <h2 className="mb-3 "><img src={FooterLogo}/></h2>
                            <p className="mb-1"><i className="fa fa-map-marker fa-fw"></i>&nbsp;Royal Road - Tamarin -
                                Mauritius</p>
                            <p className="mb-1"><i className="fa fa-phone fa-fw"></i>&nbsp;+94 75 5172 666</p>
                            <p className="mb-1"><i className="fa fa-envelope fa-fw"></i>&nbsp;<a className="text-dark"
                                                                                                 href="mailto:contact@company.com">quarantinefashionstore@google.com</a>
                            </p>
                        </div>
                        <div className="col-md-6 col-lg-4 text-center text-md-left pb-4">
                            <p className="my-3 text-center">The Quarantine Fashion Store offers a wide range of clothes and accessories for everyone.
                                Our vision is to provide our valued customers with quality products at an affordable price. </p>
                        </div>
                        <div className="col-lg-4 text-center text-lg-right pb-4">
                            <h3 className="mb-0">Follow us</h3>
                            <p className="mb-2">Subscribe to our newsletter</p>
                            <form className="d-flex justify-content-center justify-content-lg-end">
                                <div className="form-group w-75">
                                    <div className="input-group"><input className="form-control mt-2" type="text" required=""
                                                                        placeholder="Your email"
                                                                        onChange={handleChange}
                                                                        value={email ? email : ''}
                                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$"
                                                                        inputMode="email" />
                                        <div className="input-group-append">
                                            <button className="btn btn-dark" onClick={subscribe} type="submit">{loading ? <CircularProgress size={15} /> : 'Go!'}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div><a className="text-dark mx-2 mx-lg-0 ml-lg-3" href="#"><i
                                className="fa fa-instagram fa-2x"></i></a><a className="text-dark mx-2 mx-lg-0 ml-lg-3"
                                                                             href="#"><i
                                className="fa fa-twitter fa-2x"></i></a><a className="text-dark mx-2 mx-lg-0 ml-lg-3"
                                                                           href="#"><i
                                className="fa fa-facebook-square fa-2x"></i></a>
                                <a
                                    className="text-dark mx-2 mx-lg-0 ml-lg-3" href="#"><i
                                    className="fa fa-snapchat-ghost fa-2x"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-lg-left py-2 small bg-dark text-info font-italic">
                <div className="container">
                    <p className="m-0">© 2020 Quarantine Fashion Store ~ All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Ftr;
