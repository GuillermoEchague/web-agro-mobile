import React from 'react';
//import '../../assets/';
import {ButtonHeader} from '../Button/ButtonHeader';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src="/videos/home.mp4" autoPlay loop muted/>
            <h2>Explore una nueva solución</h2>
            <div className="line"></div>
            <h1>I.A. EN LA AGRICULTURA CHILENA</h1>
            <div className="hero-btns">
                <ButtonHeader className='btns' buttonStyle='btn--primary'
          buttonSize='btn--large'>Learn More</ButtonHeader>
            </div>
        </div>
    )
}

export default HeroSection
