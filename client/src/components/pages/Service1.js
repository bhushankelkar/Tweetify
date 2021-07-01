// import './App.css';
import SideBar from '../sidebar'
import Dough from '../doughnut'
import Bars from '../bar'
import TweetsCard from '../tweets_card'
import PosCloud from '../pos_cloud'
// import NeuCloud from '../neu_cloud'
// import NegCloud from '../neg_cloud'
import '../sidebar.css'
import './Service1.css'
import { Container,Row,Col,Button } from 'react-bootstrap';
import React, { Component} from 'react';

export default class App extends Component{
  
    constructor(props){
      super(props);
      this.state = {
          data: "india",
        
          _count:{
            'positive':100,
            'negative':100,
            'neutral':100,
            'tweets':['\nPlease wait..'],
            'freq_array':[{"text":"Welcome ","value":10}],
            
          }
      }
      this.handleCallback=this.handleCallback.bind(this)
  }


handleCallback = (childData) =>{
  this.setState({isLoading: true})
    this.setState({_count: childData})
   
    
    // console.log(this.state._count,"yo")
}


render (){

    return(
<Container fluid className="bgdark">
  
<Row>
                    <Col xs={5} sm={4} md={3} id="sidebar-wrapper" >      
                      <SideBar parentCallback = {this.handleCallback} />
                      
                    </Col>
                   
                    <Col  xs={7} sm={8} md={9}>
                  
                       <Row    >
                    
                         <Col xs={12} sm={8} md={3} style={{ height: '250px',paddingTop: 10,paddingLeft:0,paddingRight:0}}><span style={{color:'white'}}></span><Dough counts= {this.state._count} /></Col>
                         <Col xs={12} sm={12} md={9} style={{height: '300px', paddingTop: 10,paddingLeft:10}}><span style={{color:'white'}}></span><Bars counts= {this.state._count} /></Col>
                       </Row>
                       
                       <Row >
                        <Col xs={12} sm={12} md={3}   style={{paddingLeft:0}}><TweetsCard tweets={this.state._count.tweets}/></Col>
                      
                        <Col  bsPrefix = "col cloud" xs={12} sm={12} md={9} style={{height: '10%',marginTop:50,paddingBottom:5}} ><PosCloud freq={this.state._count.freq_array} /></Col>
                        
                       
                       
                       </Row>
                    </Col> 
                </Row>
   

</Container>
  );
}

}
