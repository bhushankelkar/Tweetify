import React, { Component} from 'react';
import './ClientSidebar.css'
import { Row,Col,Card,Button,Form,Spinner} from 'react-bootstrap';
import axios from "axios";
export default class ClientSideBar extends Component{
  constructor(props){

  super(props)
  
  this.state={
    data:"india",
    loading:true,
    counts:{  'positive':10,
    'negative':10,
    'neutral':10,
    'tweets':'',
    'hashtag':{},
    'line_daily':{},
    'keyword':{},
    'company1_sentiment':{},
    'company2_sentiment':{},
    'company1_line':{},
    'company2_line':{},
    'company1_key':{},
    'company2_key':{},
    
  },
  
  } 
  this.onTrigger=this.onTrigger.bind(this)
  this.handleInputChange = this.handleInputChange.bind(this);

}
async onTrigger(event) {
  
    
    this.setState({loading:true})
    event.preventDefault();
    this.state.data = window.location.search.split('name=')[1] +" " + this.state.data  
    console.log("battery",this.state.data)    
    await axios.get('http://localhost:8000/predict/',{params:{text:this.state.data}}).then((response) => {
    this.setState({counts:response.data})
    console.log("counts",this.state.counts)    
    this.props.parentCallback(this.state.counts);

      
        
    }).catch(function (error) {
        console.log(error);
    });
    this.setState({loading:false})


}

handleInputChange(event) {
  const target = event.target;
  console.log("form value",target.value) 
   if(this.state.data === "india")
    this.state.data =  target.value
    else 
    this.state.data = this.state.data + " " + target.value
}

componentDidMount(){
  
  this.setState({loading:true})
  axios.get('http://localhost:8000/predict/',{params:{text:this.state.data}}).then((response) => {
  this.setState({counts:response.data})
  // console.log(this.state.counts.hashtag);
  this.props.parentCallback(this.state.counts);
  this.setState({loading:false})
  
      
  }).catch(function (error) {
      console.log(error);
  });
  // console.log(event.target.value)
}
    render(){
        return (
           
        <div className="    text-white  sidebar ">
   <div className="emp"></div>
   <Row>
<Col >
<Form onSubmit= {this.onTrigger} >
<Form.Group controlId="formKeyword" className="forms">
    <Form.Label>Keywords:</Form.Label>
   

  
  
   <div className="forms-check">
   
    <Form.Check type="checkbox" label="Battery" value="battery" onChange={this.handleInputChange} />
    <Form.Check type="checkbox" label="Screen" value="screen" onChange={this.handleInputChange}/>
    <Form.Check type="checkbox" label="Memory" value="memory" onChange={this.handleInputChange}/>
    <Form.Check type="checkbox" label="Heat" value="heat" onChange={this.handleInputChange}/>
    <Form.Check type="checkbox" label="Cost" value="cost" onChange={this.handleInputChange}/>
    </div>
  </Form.Group>
  <hr class='hrr'/>
 

  <div className="forms-check">
 {this.state.loading ?<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
  </Spinner> :  
  <div>
  <Button
  className="formbutton" variant="primary"  type = "submit" value = "Submit">Search</Button>
  <Button  className="formbutton" variant="primary" >Detailed report</Button>
  </div>
  } 
</div>
</Form>


</Col>
</Row>
<Row>
<Col >




</Col>
</Row>
          
                </div>
         
            );
    }



}