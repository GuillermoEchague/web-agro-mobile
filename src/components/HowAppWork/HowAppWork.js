import React from 'react'
import "./HowAppWork.css"
import { Row, Col, Card } from 'react-bootstrap';



export default function HowAppWork() {
    return (
        <Row className="how-my-app-work">
            <Col lg={16} className="how-my-app-work__title">
                <h2>¿Cómo funciona esta APP?</h2>
                <h3>Esta APP cuenta con arquitectura Serverless y multiplataforma, activa las 24 horas del día los 365 días del año.</h3>
            </Col>
            <Col lg={4}/>
            <Col lg={16}>
            <Row xs={1} md={2} className="how-my-app-work">
                <Col>
                    <Card className="ant-card-body">
                        <img src="https://img.icons8.com/ultraviolet/80/000000/cloud.png" alt="cloud"/>
                        <Card.Body>
                            <Card.Title>Servicios en la Nube</Card.Title>
                            <Card.Text>
                            Ponen los servicios ofrecidos a disposición de los usuarios a través de Internet. 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col>
                    <Card className="ant-card-body">
                    <img src="https://img.icons8.com/ultraviolet/80/000000/key.png" alt="key"/>
                        <Card.Body>
                            <Card.Title>Acceso 24/7</Card.Title>
                            <Card.Text>
                                Accede a los servicios en cualquier momento, desde cualquier lugar sin importar día y hora.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col>
                    <Card className="ant-card-body">
                    <img src="https://img.icons8.com/ultraviolet/80/000000/low-price.png" alt="low-price"/>
                        <Card.Body>
                            <Card.Title>Precios Bajos</Card.Title>
                            <Card.Text>
                                Obtén el servicio que necesitas un período de forma gratuita y luego contrata el plan que más te acomode.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="ant-card-body">
                    <img src="https://img.icons8.com/ultraviolet/80/000000/map-marker.png" alt="map-marker"/>
                        <Card.Body>
                            <Card.Title>Desde Cualquier Lugar</Card.Title>
                            <Card.Text>
                                Puedes acceder a este servicio desde cualquier lugar donde tengas un teléfono y/o computador con acceso a internet.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
        </Row>
            </Col>
            <Col lg={4}/>
        </Row>
    )
}




