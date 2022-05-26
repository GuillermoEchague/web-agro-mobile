import React from 'react'
import CardItem from './CardItem';
import './Cards.css';


const Cards = () => {
    return (
        <div className='cards'>
            <h1>Nuestros Productos</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                        src='images/ai3.jpg'
                        text='Explore una solución que utiliza I.A en el Agro'
                        label='Inteligencia Artificial'
                        path='/services'                  
                        />
                        <CardItem
                        src='images/movil3.jpg'
                        text='Aplicación Móvil para detección de Enfermedades'
                        label='Android'
                        path='/services'                  
                        />

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
