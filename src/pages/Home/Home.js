import React from 'react'
import Cards from '../../components/Card/Cards'
// import Footer from '../../components/Footer/Footer'
import HeroSection from '../../components/Hero/HeroSection'
import HowAppWork from '../../components/HowAppWork'

const Home = () => {
    return (
        <>
            <HeroSection/>
            <Cards/>
            <HowAppWork/>
            {/* <Footer/> */}
        </>
    )
}

export default Home
