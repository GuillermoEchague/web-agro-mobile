import React, {useState,useEffect } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/image2vector3.svg';


function Footer() {


  const [date , setDate] = useState();

    const getYear = () =>  setDate(new Date().getFullYear())


    useEffect(() => {
        getYear();
    }, [])


    return (

      <div className='footer-container'>
       
        <div className='footer-links'>
          <div className='footer-link-wrapper'>
            <div className='footer-link-items'>
              <h2>About Us</h2>
              <Link to='/sign-up'>How it works</Link>
              <Link to='/'>Terms of Service</Link>
            </div>
            <div className='footer-link-items'>
              <h2>Contact Us</h2>
              <Link to='/'>Contact</Link>
              <Link to='/'>Support</Link>
              
            </div>
          </div>
          <div className='footer-link-wrapper'>
           
            <div className='footer-link-items'>
              <h2>Social Media</h2>
              <Link to='/'>Facebook</Link>
              <Link to='/'>Youtube</Link>
            </div>
          </div>
        </div>
        <section className='social-media'>
          <div className='social-media-wrap'>
            <div className='footer-logo'>
              <Link to='/' className='social-logo'>
                <img src={logo} alt='logo'/> AgroVisionIA
              </Link>
            </div>
            <small className='website-rights'>&copy; AgroVisionIA  - {date} </small>
            
            <div className='social-icons'>
              <Link
                className='social-icon-link facebook'
                to='/'
                target='_blank'
                aria-label='Facebook'
              >
                <i className='fab fa-facebook-f' />
              </Link>
              
              <Link
                className='social-icon-link youtube'
                to='/'
                target='_blank'
                aria-label='Youtube'
              >
                <i className='fab fa-youtube' />
              </Link>
              
              <Link
                className='social-icon-link linkedin'
                to='/'
                target='_blank'
                aria-label='LinkedIn'
              >
                <i className='fab fa-linkedin' />
              </Link>
          <a href="https://icons8.com/icon/lp5jaDtOlhcl/cloud-lighting">Cloud Lighting icon by Icons8</a>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default Footer;