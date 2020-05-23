import React from "react";
import Ftr from "./Ftr";
import '../assets/about_us_assets/bootstrap/css/bootstrap.min.css';
import '../assets/about_us_assets/fonts/font-awesome.min.css';
import '../assets/about_us_assets/css/styles.css';
import '../assets/about_us_assets/css/Team-Boxed.css'
import yp from '../assets/about_us_assets/img/yp.jpg';
import img1 from '../assets/about_us_assets/img/1.jpg';
import ug from '../assets/about_us_assets/img/ug.png';
import kasun from '../assets/about_us_assets/img/kasun.jpg';

const AboutUs = () => {
    return (
      <div>
          <div className="team-boxed">
              <div className="container">
                  <div className="intro">
                      <h2 className="text-center">Team - Quarantine Squad</h2>
                      <p className="text-center">Application Framework Assignment</p>
                  </div>
                  <div className="row people">
                      <div className="col-md-6 col-lg-3 col-sm-12 item">
                          <div className="box"><img className="rounded-circle" src={yp} />
                              <h3 className="name">Yugma<br/> Fernando</h3>
                              <p className="title">IT17167192</p>
                              <p className="description">Group Leader</p>
                          </div>
                      </div>
                      <div className="col-md-6 col-lg-3 col-sm-12 item">
                          <div className="box"><img className="rounded-circle" src={ug} />
                              <h3 className="name">Upeksha Galappaththi</h3>
                              <p className="title">IT17165730</p>
                              <p className="description">Group Member</p>
                          </div>
                      </div>
                      <div className="col-md-6 col-lg-3 col-sm-12 item">
                          <div className="box"><img className="rounded-circle" src={kasun} />
                              <h3 className="name">Kasun Gunasekara</h3>
                              <p className="title">IT17186698</p>
                              <p className="description">Group Member</p>
                          </div>
                      </div>
                      <div className="col-md-6 col-lg-3 col-sm-12 item">
                          <div className="box"><img className="rounded-circle" src={img1} />
                              <h3 className="name">Chamith Weligepola</h3>
                              <p className="title">IT17164368</p>
                              <p className="description">Group Member</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <Ftr/>
      </div>
    );
}

export default AboutUs;
