// import './App.css';
import ClientSideBar from '../ClientSidebar'
import Dough from '../doughnut'
import Bars from '../stackedbar'
import TweetsCard from '../tweets_card'
import PosCloud from '../pos_cloud' 
import ReactSpeedometer from '../gaugechart'
import Line from '../line'
// import NeuCloud from '../neu_cloud'
// import NegCloud from '../neg_cloud'
import '../ClientSidebar.css'
import { Container,Row,Col,Button,Card } from 'react-bootstrap';
import React, { Component} from 'react';
import KeyDough from '../keyworddoughnut'

export default class ClientMainPage extends Component{
  
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
            'hashtag':{},
            'line_daily':{},
            'keyword':{},
            
          }
      }
      this.handleCallback=this.handleCallback.bind(this)
  }


handleCallback = (childData) =>{
  this.setState({isLoading: true})
  this.setState({_count: childData})
   
   
}


render (){
  
    return(
<Container fluid className="bgdark">
  
<Row>
                  <Col xs={4} sm={3} lg={3} id="sidebar-wrapper" >      
                      <ClientSideBar parentCallback = {this.handleCallback} />
                      
                    </Col>
                    <Col xs={8} sm={9} lg={9}>
                            <Row>
                            <Col xs={4} sm={3} lg={4} >      
                              
                                                      <Card
                                      bg="dark"
                                      
                                      text="light"
                                      style={{ width: '18rem',marginTop:'1rem' }}
                                      className="mb-2"
                                    >
                                      
                                      <Card.Body>
                                        <Card.Title>{this.state._count.positive}</Card.Title>
                                        <Card.Text>
                                          Some quick example text to build on the card title and make up the bulk
                                          of the card's content.
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                            </Col>
                            <Col xs={4} sm={3} lg={4} >      
                              
                                                      <Card
                                      bg="dark"
                                      
                                      text="light"
                                      style={{ width: '18rem',marginTop:'1rem' }}
                                      className="mb-2"
                                    >
                                      
                                      <Card.Body>
                                        <Card.Title> </Card.Title>
                                        <Card.Text>
                                          Some quick example text to build on the card title and make up the bulk
                                          of the card's content.
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                            </Col>
                            <Col xs={4} sm={3} lg={4} >      
                              
                                                      <Card
                                      bg="dark"
                                      
                                      text="light"
                                      style={{ width: '18rem',marginTop:'1rem' }}
                                      className="mb-2"
                                    >
                                      
                                      <Card.Body>
                                        <Card.Title>{this.state._count.negative}</Card.Title>
                                        <Card.Text>
                                          Some quick example text to build on the card title and make up the bulk
                                          of the card's content.
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                            </Col>
                          </Row>
                            
                          <Row>
        <Col xs={12} sm={12} lg={6} style={{height:'400px'}}>Hashtag analysis
        <Bars hashtag={this.state._count.hashtag}></Bars>
                           
        </Col>
        <Col xs={12} sm={12} lg={6} style={{height:'400px'}}>Worcloud
        <PosCloud freq={this.state._count.freq_array}></PosCloud>
        </Col>
        </Row>
        
        <Row>
        <Col xs={4} sm={3} lg={12} style={{height:'250px',margin:'10px'}}>
          <p>Keyword based doughnut charts/bar charts</p>
          <Line line_daily={this.state._count.line_daily}></Line>
        </Col>
        
        </Row>
        
        <Row>
          
          {  Object.entries(this.state._count.keyword).map(([key,value],i) =>
            <Col  xs={4} sm={3} lg={5} style={{ height: '250px',width:'700px',margin:'10px'}}>{key}
            <KeyDough key= {key} value={value}></KeyDough>
          </Col> 
          )}
            
        </Row>           
                              
        
          
        

        <Row>Our analysis,dial charts</Row>
    </Col>
  </Row>
</Container>
  );
}

}



