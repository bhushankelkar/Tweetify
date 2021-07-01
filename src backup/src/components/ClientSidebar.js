import React, { Component} from 'react';
import './ClientSidebar.css'
import { Row,Col,Card,Button,Form,Spinner} from 'react-bootstrap';
import axios from "axios";
export default class ClientSideBar extends Component{
  constructor(props){

  super(props)
  
  this.state={
    checked: false,
    data:"india mobile",
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
  
}
async onTrigger(event) {
    var checkb = document.getElementById("check");
    var chks = checkb.getElementsByTagName("INPUT");
    var selected = new Array();
  // Loop and push the checked CheckBox value in Array.
   for (var i = 0; i < chks.length; i++) {
      if (chks[i].checked) {
          selected.push(chks[i].value);
      }
    }
    console.log("Selected",selected);
    this.setState({loading:true})
    event.preventDefault();
    var keywords = selected.join(' ')
    this.state.data=window.location.search.split('name=')[1] + " " +keywords
      
    await axios.get('http://localhost:8000/predictview/',{params:{text:this.state.data}}).then((response) => {
    this.setState({counts:response.data})
    console.log("counts",this.state.counts)    
    this.props.parentCallback(this.state.counts);

      
        
    }).catch(function (error) {
        console.log(error);
    });
    
    this.setState({loading:false})
    this.setState({data : window.location.search.split('name=')[1]})

}



componentDidMount(){
  
  this.setState({loading:true})
  axios.get('http://localhost:8000/predictview/',{params:{text:this.state.data}}).then((response) => {
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
   

  
  
   <div className="forms-check" id="check">
   
    <input type="checkbox" id="bat" label="Battery" value="battery"   />
    <label for="Battery"> Battery</label><br></br>
    <input type="checkbox" id="sc" label="Screen" value="screen"  />
    <label for="Screen"> Screen</label><br></br>
    <input type="checkbox"id="mem" label="Memory" value="memory"  />
    <label for="Memory"> Memory</label><br></br>
    <input type="checkbox"id="heat" label="Heat" value="heat"  />
    <label for="Heat"> Heat</label><br></br>
    <input type="checkbox" id="cos" label="Cost" value="cost"  />
    <label for="Cost"> Cost</label><br></br>
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