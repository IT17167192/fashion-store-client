import React from "react";
import '../assets/footer_assets/bootstrap/css/bootstrap.min.css';
import '../assets/footer_assets/fonts/font-awesome.min.css';
import '../assets/footer_assets/css/styles.css';

const Ftr = () => {
    return (
        <footer className="bg-dark text-white border-top border-info">
            <div className="container text-center text-sm-left position-relative py-5">
                <div className="row">
                    <div className="col-sm-6 col-md-3">
                        <h3 className="text-info pb-2 border-bottom border-info">Lorem Ipsum</h3>
                        <ul className="list-unstyled d-inline-block d-sm-block">
                            <li className="mb-2"><a className="text-light" href="#">Expers cum eodem</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Sensim fame petivere</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Minimumque</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Vulgasset ut solent</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <h3 className="text-info pb-2 border-bottom border-info">Lorem Ipsum</h3>
                        <ul className="list-unstyled d-inline-block d-sm-block">
                            <li className="mb-2"><a className="text-light" href="#">Expers cum eodem</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Vulgasset ut solent</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Sensim fame petivere</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Minimumque</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <h3 className="text-info pb-2 border-bottom border-info">Lorem Ipsum</h3>
                        <ul className="list-unstyled d-inline-block d-sm-block">
                            <li className="mb-2"><a className="text-light" href="#">Expers cum eodem</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Minimumque</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Sensim fame petivere</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Vulgasset ut solent</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <h3 className="text-info pb-2 border-bottom border-info">Lorem Ipsum</h3>
                        <ul className="list-unstyled d-inline-block d-sm-block">
                            <li className="mb-2"><a className="text-light" href="#">Minimumque</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Sensim fame petivere</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Vulgasset ut solent</a></li>
                            <li className="mb-2"><a className="text-light" href="#">Expers cum eodem</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center position-absolute w-100 mt-4"><a href="#top"><span
                    className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-dark"></i><i
                    className="fa fa-angle-up fa-stack-1x text-white"></i></span></a></div>
            </div>
            <div className="pt-5 pb-4 bg-info text-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4 text-center text-md-left pb-4">
                            <h2 className="mb-3"><i className="fa fa-diamond"></i>&nbsp;Company</h2>
                            <p className="mb-1"><i className="fa fa-map-marker fa-fw"></i>&nbsp;Royal Road - Tamarin -
                                Mauritius</p>
                            <p className="mb-1"><i className="fa fa-phone fa-fw"></i>&nbsp;+230 12 34 56 78</p>
                            <p className="mb-1"><i className="fa fa-envelope fa-fw"></i>&nbsp;<a className="text-dark"
                                                                                                 href="mailto:contact@company.com">contact@company.com</a>
                            </p>
                        </div>
                        <div className="col-md-6 col-lg-4 text-center text-md-left pb-4">
                            <p className="my-3">Post quorum necem nihilo lenius ferociens Gallus ut leo cadaveribus
                                pastus multa huius modi scrutabatur. quae singula narrare non refert, me professione
                                modum, quod evitandum est, excedamus.</p>
                        </div>
                        <div className="col-lg-4 text-center text-lg-right pb-4">
                            <h3 className="mb-0">Follow us</h3>
                            <p className="mb-2">Subscribe to our newsletter</p>
                            <form className="d-flex justify-content-center justify-content-lg-end">
                                <div className="form-group w-75">
                                    <div className="input-group"><input className="form-control" type="text" required=""
                                                                        placeholder="Your email"
                                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$"
                                                                        inputMode="email" />
                                        <div className="input-group-append">
                                            <button className="btn btn-dark" type="submit">Go!</button>
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
                    <p className="m-0">© 2018 Company ~ All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Ftr;
