import React, { Component} from 'react';
import './sidebar.css'
import { Row,Col,Card,Button,Form,Spinner} from 'react-bootstrap';
import axios from "axios";
export default class SideBar extends Component{
  constructor(props){

  super(props)
  
  this.state={
    data:"india",
    loading:true,
    counts:{  'positive':10,
    'negative':10,
    'neutral':10,
    'tweets':'',
    
  },
  
  } 
  this.onTrigger=this.onTrigger.bind(this)
  this.onSearch=this.onSearch.bind(this)

}
async onTrigger(event) {
    this.setState({loading:true})
    event.preventDefault();
    await axios.get('http://localhost:8000/predict/',{params:{text:this.state.data}}).then((response) => {
    this.setState({counts:response.data})
    console.log("counts",this.state.counts.tweets)  
    this.props.parentCallback(this.state.counts);

      
        
    }).catch(function (error) {
        console.log(error);
    });
    this.setState({loading:false})


}

onSearch(e){
  this.setState({data:e.target.value})
}

componentDidMount(){
  
  this.setState({loading:true})
  axios.get('http://localhost:8000/predict/',{params:{text:this.state.data}}).then((response) => {
  this.setState({counts:response.data})
   
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
<Form onSubmit= {this.onTrigger}>
  <Form.Group controlId="formKeyword" className="forms">
    <Form.Label>Keyword</Form.Label>
    <Form.Control type="text" placeholder="Default value:india"  onChange={this.onSearch}/>
    <Form.Text className="text-muted">
      We'll generate a detailed report of tweets containing the keyword
    </Form.Text>
  </Form.Group>
  <hr class='hrr'/>
  <Form.Group controlId="formLocation" className="forms">
    <Form.Label>Location</Form.Label>
   

  
  
   <div className="forms-check">
    <Form.Check  type="checkbox" label="All"  defaultChecked/>
    <Form.Check type="checkbox" label="India" />
    <Form.Check type="checkbox" label="USA" />
    <Form.Check type="checkbox" label="UK" />
    </div>
  </Form.Group>

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