import React from 'react'
import {useState} from 'react'
import {Carousel} from 'react-bootstrap'
import './Testimonials.css'
import imgtest from '../images/imtest.png';
function Testimonials() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    return (
        <>
        <div className="carousel__container">
            <Carousel>
  <Carousel.Item >
    {<img
      className="carousel__image"
      src={imgtest}
      alt="First slide"
      width="200px"
      height="100px"
      
      
      
    /> }
    <i className="fas fa-user-circle"></i>
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item  >
    {/* <img
      className="carousel__item"
      
      alt="Second slide"
      
    /> */}
<i class="fas fa-user-circle fa-lg"></i>
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item >
    {/* <img
      className="carousel__image"
      
      alt="Third slide"
      
    /> */}
<i class="fas fa-user-circle"></i>
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
            
        </div>
        </>
    )
}

export default Testimonials


      

  
