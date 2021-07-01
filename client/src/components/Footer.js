import React from 'react'
import {Button} from './Button'
import './Footer.css'

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    
    <MDBFooter className="page-footer font-small  footer-color footer-position" style={{'background-color': '#212529'}}>
      <br></br>
      <br></br>
      <br></br>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
          
         
   
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="3">
            <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
              Links
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!">Contact us</a>
              </li>
              <li>
                <a href="#!">Blog</a>
              </li>
              <li>
                <a href="#!">Demo</a>
              </li>
              <li>
                <a href="#!"></a>
              </li>
            </ul>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="3">
            <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
              Links
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!">beproject@gmail.com</a>
              </li>
              <li>
                <a href="#!">7083247533</a>
              </li>
              <li>
                <a href="#!">@tweetify</a>
              </li>
              
            </ul>
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
      <hr />
      <div className="text-center">
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-fb mx-1" src="https://google.com">
              <i className="fab fa-facebook-f"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-tw mx-1">
              <i className="fab fa-twitter"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-gplus mx-1">
              <i className="fab fa-google-plus"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-li mx-1">
              <i className="fab fa-linkedin-in"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-dribbble mx-1">
              <i className="fab fa-dribbble"> </i>
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> Tweetify </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;