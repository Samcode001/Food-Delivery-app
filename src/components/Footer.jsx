import React from 'react'
import '../components/styles/Footer.css';

const Footer = () => {
  return (
    <>
    <div className="primary-footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-logo">
                    <span>F<span style={{color:"#06c167"}}>OO</span>DIEE</span>
                </div>
                <div className="footer-navigation">
                    <ul role='list'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Carrers</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="copyright-section">
                    <button className='btn btn-invert footer-btn'>Get Started</button>
                    <span>2023 Copyright © FOODIEE. All Rights Reserved</span>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer