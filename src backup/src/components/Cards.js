import React from 'react'
import CardItem from './CardItem'
import './Card.css'
import { Card,Button } from 'react-bootstrap';
import basic from '../images/BASIC.gif';
import client from '../images/CLIENT.gif';
import { Link } from 'react-router-dom';
function Cards() {
    return (
<div className='cards'>
            
  <Card  bsPrefix ="card1 card"   text='light'  border="light" style={{ width: '18rem',background:'#000' }}>
  <Card.Img variant="top" src={basic} />
  <Card.Body>
    <Link to="/service1">
    <Button variant="primary">Explore</Button></Link>
  </Card.Body>
</Card>

<Card bsPrefix="card2 card" text="light"   border="secondary" style={{ width: '18rem',background:'#000'}}>
  <Card.Img variant="top" src={client} />
  <Card.Body>
    
  <Link to="/login">
    <Button variant="primary">Explore</Button></Link>
  </Card.Body>
</Card>

        </div>
    )
}

export default Cards
