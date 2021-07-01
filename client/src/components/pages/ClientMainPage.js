// import './App.css';
import ClientSideBar from '../ClientSidebar'
import Bars from '../stackedbar'
import PosCloud from '../pos_cloud' 
import Line from '../line'
// import NeuCloud from '../neu_cloud'
// import NegCloud from '../neg_cloud'
import '../ClientSidebar.css'
import { Container,Row,Col,Card } from 'react-bootstrap';
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
                            <Col xs={12} sm={12} md={5} lg={4} >      
                              
                                                      <Card
                                     
                                      
                                      text="light"
                                      style={{ width: '18rem',marginTop:'1rem',background:"#346751" }}
                                      className="mb-2"
                                    >
                                      
                                      <Card.Body>
                                        <h1>{this.state._count.positive}</h1>
                                        <Card.Text>
                                          Positive Tweets
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                            </Col>
                            <Col xs={12} sm={12} md={5} lg={4} >     
                              
                                                      <Card
                                      
                                      
                                      text="light"
                                      style={{ width: '18rem',marginTop:'1rem',marginRight:'5rem',background:"#719FB0" }}
                                      className="mb-2"
                                    >
                                      
                                      <Card.Body>
                                      <h1>{this.state._count.neutral}</h1>
                                        <Card.Text>
                                          Neutral Tweets
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                            </Col>
                            <Col xs={12} sm={12} md={5} lg={4} >      
                              
                                                      <Card
                                     
                                      
                                      text="light"
                                      style={{ width: '18rem',marginTop:'1rem',background:"#F05454" }}
                                      className="mb-2"
                                    >
                                      
                                      <Card.Body>
                                      <h1>{this.state._count.negative}</h1>
                                        <Card.Text>
                                          Negative Tweets
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                            </Col>
                          </Row>
                            
        <Row>
        
                           
        
        <Col xs={12} sm={12} lg={6} style={{height:'430px',paddingTop:10,paddingLeft:0,paddingRight:0,paddingBottom:10,'overflow':'hidden'}}>
        <PosCloud freq={this.state._count.freq_array}></PosCloud>
        </Col>
        <Col xs={12} sm={12} lg={6} style={{height:'400px'}}>
        <Bars hashtag={this.state._count.hashtag}></Bars></Col>
        </Row>
        
        <Row>
        <Col xs={12} sm={12} lg={12} style={{height:'250px',paddingTop:10,paddingLeft:0,paddingRight:0,paddingBottom:20}}>
          
          <Line line_daily={this.state._count.line_daily}></Line>
        </Col>
        
        </Row>
        
        <Row>
          
          {  Object.entries(this.state._count.keyword).map(([key,value]) =>
            <Col  xs={12} sm={12} md={12} lg={5} style={{ height: '250px',width:'700px',margin:'10px',color:"#fff",paddingBottom:20}}>{key}
            <KeyDough key= {key} value={value}>{key}</KeyDough>
          </Col> 
          )}
            
        </Row>              
                              
        
          
        

        
    </Col>
  </Row>
</Container>
  );
}

}



