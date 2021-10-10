import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button'
import './Footer.css';

const Footer = () => {
  return ( 
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Sifter Community to keep up on all things Decentralized
        </p>
        <p className="footer-subscription-text">
          Unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input type="emial" name='email' placeholder='Your Email' className="footer-input" />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to='/'>How It Works</Link>
            <Link to='/'>Our Team</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Headquarters</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Inspired by</h2>
            <Link to='/'>Aaron Schwartz</Link>
            <Link to='/'>Edward Snowden</Link>
            <Link to='/'>Whitney Webb</Link>
            <Link to='/'>Project Veritas</Link>
            <Link to='/'>The Highwire</Link>
          </div>
          <div className="footer-link-items">
            <h2>Decentralized Social Media</h2>
            <Link to='/'>Odysee</Link>
            <Link to='/'>Minds</Link>
            <Link to='/'>Peepeth</Link>
            <Link to='/'>Steemit</Link>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <small className='website-rights'>Sifter the Crypto App @ 2021</small>
        </div>
      </section>
   </div>
   );
}
 
export default Footer
