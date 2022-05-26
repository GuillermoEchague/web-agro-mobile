import React from 'react'
import Footer from '../../components/Footer/Footer'
import HerosSection from '../../components/HeroSection/HerosSection';
// import ServicioSection from '../../components/servicios/ServicioSection'
import {serviceObjOne,serviceObjTwo} from './Data';


const servicios = () => {
    return (
        <>
        <HerosSection {...serviceObjOne}/>
        <HerosSection {...serviceObjTwo}/>
        
            <Footer />
            

        </>
    )
}

export default servicios
