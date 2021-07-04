// import './App.css';
import CompareSidebar from '../CompareSidebar'
import Bars from '../stackedbar'
import Line from '../line'
// import NeuCloud from '../neu_cloud'
// import NegCloud from '../neg_cloud'
import '../ClientSidebar.css'
import { Container,Row,Col } from 'react-bootstrap';
import React, { Component} from 'react';
import CompareDough from '../comparedoughnut'

export default class ClientComparison extends Component{
  
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
            'company1_sentiment':{},
            'company2_sentiment':{},
            'company1_line':{},
            'company2_line':{},
            'company1_key':{},
            'company2_key':{},
            'pro1': "Product 1",
            'pro2': "Product 2",
            
            // 'line_company':{},
            // 'company1_keyword':{},
            // 'company2_keyword':{},

            
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
                  <Col xs={5} sm={5} lg={2} id="sidebar-wrapper" >      
                      <CompareSidebar parentCallback = {this.handleCallback} />
                      
                    </Col>
                    
                    <Col xs={7} sm={7} lg={10}>
                    <Row>
                    
                    <Col xs={12} sm={12} md={6} style={{ paddingTop: 10,paddingLeft:0,paddingRight:0,'text-align':'center'}}><span style={{color:'white',}}>{this.state._count.pro1}</span></Col>
                    <Col xs={12} sm={12} md={6} style={{ paddingTop: 10,paddingLeft:10,paddingRight:0,'text-align':'center'}}><span style={{color:'white'}}>{this.state._count.pro2}</span></Col>
                  </Row>

                    <Row>
                    
                    <Col xs={12} sm={12} lg={6} style={{ height: '250px',paddingTop: 10,paddingLeft:0,paddingRight:0}}><span style={{color:'white'}}></span><CompareDough counts= {this.state._count.company1_sentiment} /></Col>
                    <Col xs={12} sm={12} lg={6} style={{height: '250px', paddingTop: 10,paddingLeft:10,paddingRight:0}}><span style={{color:'white'}}></span><CompareDough counts= {this.state._count.company2_sentiment} /></Col>
                  </Row>

                  <Row>
                    
                    <Col xs={12} sm={12} md={6} style={{ height: '250px',paddingTop: 10,paddingLeft:0,paddingRight:0}}><span style={{color:'white'}}></span><Line line_daily= {this.state._count.company1_line} /></Col>
                    <Col xs={12} sm={12} md={6} style={{height: '250px', paddingTop: 10,paddingLeft:10,paddingRight:0}}><span style={{color:'white'}}></span><Line line_daily= {this.state._count.company2_line} /></Col>
                  </Row>

        <Row style={{paddingBottom:20}}>
        <Col xs={12} sm={12} lg={6} style={{height:'250px',paddingTop: 10,paddingLeft:0,paddingRight:0}}>
        <Bars hashtag={this.state._count.company1_key}></Bars>
                           
        </Col>
          <Col xs={12} sm={12} lg={6} style={{height:'250px',marginBottom:10,paddingTop: 10,paddingLeft:10,paddingRight:0}}>
        <Bars hashtag={this.state._count.company2_key}></Bars>
                           
        </Col> 
        
        </Row>   



                  

                    </Col>
                            
                            
  </Row>
</Container>
  );
}

}



