import React from 'react';
import data from './data';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss'
import { Button } from '@mui/material';

function Slider() {
    return <Carousel variant='dark'>
        <Carousel.Item interval={1000}>
            <img
                className="d-block w-100"
                src={data[0].image}
                alt="First slide"
            />
            <Carousel.Caption>
                <div className='cap'>Fresh Season Arrivals</div>
                <p>SPRING-SUMMER '22</p>
                {/* <Button variant="primary">SHOP NOW</Button> */}
                <Button variant='contained' color='primary'>
                    SHOP NOW
                </Button>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
            <img
                className="d-block w-100"
                src={data[1].image}
                alt="Second slide"
            />
            <Carousel.Caption>
                <div className='cap'>Flash Deal</div>
                <p>Premium Brands</p>
                <Button variant='contained' color="primary">SHOP NOW</Button>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={data[3].image}
                alt="Third slide"
            />
            <Carousel.Caption>
                <div className='cap'>Styles in your budget</div>
                <p>Starting at <span>₹399</span> </p>
                <Button variant='contained' color="primary">SHOP NOW</Button>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
}

export default Slider;
