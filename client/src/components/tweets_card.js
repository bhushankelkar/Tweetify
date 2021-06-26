import React, { Component} from 'react';
import { Card } from 'react-bootstrap';
import './sidebar.css'
export default class TweetsCard extends Component{

  constructor(props){
    super(props)



  this.state = {
    data:this.props.tweets,

    }
    

  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.tweets });  
  
  }



         
render() {
            let listItems = this.state.data.map((d) => <li>{d}</li>);
            return (

                <Card id="scroller" style={{background:'rgb(25, 32, 37)',color:'white',height:400}} >
            <Card.Body>
    < Card.Title>Common tweets</Card.Title>
    {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
 
    <Card.Text >
    <ol>
        {listItems}
      </ol>
    </Card.Text>
    
  
  </Card.Body>
</Card>


            );


         }

}