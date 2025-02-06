import React from "react";

const Footer = () => {
  return (
    <section className="footer-navigation bg-dark py-5">
      <div className="container">
        <div className="row text-white">
          <div className="col-md-3">
            <div className="footer-sub-division">
              <div className="footer-heading">
                <h4>Support</h4>
              </div>
              <div className="footer-content">
                <ul>
                  <li style={{listStyle:'none'}} >11th Main Street, Dhaka, DH 1515, California.</li>
                  <li style={{listStyle:'none'}} >exclusive@gmail.com</li>
                  <li style={{listStyle:'none'}}>+88015-88888-9999</li>
                  
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="footer-sub-division">
              <div className="footer-heading">
                <h4>Account</h4>
              </div>
              <div className="footer-content">
                <ul>
                  <li style={{listStyle:'none'}}>My Account</li>
                  <li style={{listStyle:'none'}}>Login/Register</li>
                  <li style={{listStyle:'none'}} >Cart</li>
                  <li style={{listStyle:'none'}} >Wishlist</li>
                  <li style={{listStyle:'none'}} >Shop</li>
                
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="footer-sub-division">
              <div className="footer-heading">
                <h4>Quick Links</h4>
              </div>
              <div className="footer-content">
                <ul>
                  <li style={{listStyle:'none'}}>Privacy Policy</li>
                  <li style={{listStyle:'none'}}>Terms Of Use</li>
                  <li style={{listStyle:'none'}}>FAQ</li>
                  <li style={{listStyle:'none'}}>Contact</li>
                
                </ul>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </section>
  );
};

export default Footer;
