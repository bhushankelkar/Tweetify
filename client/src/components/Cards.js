import React from 'react'
import CardItem from './CardItem'
import './Card.css'
import { Card,Button } from 'react-bootstrap';
import basic from '../images/basic.png';
import client from '../images/img12.png';
function Cards() {
  function gotoservice(){
    window.location.href="http://localhost:3000/service1"
  }
    return (
<div className='cards'>
            
  <Card  bsPrefix ="card1 card"  bg='dark' text='light'  border="light" style={{ width: '18rem' }}>
  <Card.Img variant="top" src={basic} />
  <Card.Body>
    <Card.Title>BASIC</Card.Title>
    <Card.Text>
      This is the basic analysis of text with keywords,places and other filters.
    </Card.Text>
    <Button variant="primary" onClick={gotoservice}>Explore</Button>
  </Card.Body>
</Card>

<Card bsPrefix="card2 card" text="light" bg="dark"  border="secondary" style={{ width: '18rem' }}>
  <Card.Img variant="top" src={client} />
  <Card.Body>
    <Card.Title>PRO</Card.Title>
    <Card.Text>
      This is our advanced feature for our customers with detailed analysis and comparisons.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>

        </div>
    )
}

export default Cards
