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
    pro2_name:"redmi battery",
    days : 1,
    date : new Date(),
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
  this.onSearch=this.onSearch.bind(this)
  this.productsub=this.productsub.bind(this)
  this.dateSelect=this.dateSelect.bind(this)
}
async onTrigger(event) {
      
  event.preventDefault();
  var checkb = document.getElementById("check");
  var chks = checkb.getElementsByTagName("INPUT");
  var selected = new Array();
// Loop and push the checked CheckBox value in Array.
 for (var i = 0; i < chks.length; i++) {
    if (chks[i].checked) {
        selected.push(chks[i].value);
    }
  }
  var datetoday = new Date();
  console.log("Todays date",datetoday)
  console.log("Selected date",this.state.date)
  var Difference_In_Time = datetoday.getTime() - (this.state.date).getTime();
 
// To calculate the no. of days between two dates
  this.state.days = Difference_In_Time / (1000 * 3600 * 24);
  console.log("No of days",this.state.days);
  this.setState({loading:true})
  event.preventDefault();
  var keywords = selected.join(' ')
  this.state.data=window.location.search.split('name=')[1] + " " +keywords
   var entered_pro = this.state.pro2_name + " " +keywords
    console.log("Entered pro",entered_pro)
    await axios.get('http://localhost:8000/predictcompare/',{params:{text:this.state.data,text1:entered_pro,days:this.state.days}}).then((response) => {
    this.setState({counts:response.data})
    console.log("counts",this.state.counts)    
    this.props.parentCallback(this.state.counts);

      
        
    }).catch(function (error) {
        console.log(error);
    });
    this.setState({loading:false})


}

dateSelect(e){
  var parts = e.target.value.split('/');
  
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
// January - 0, February - 1, etc.
  var date = new Date(parts[2], parts[1] - 1, parts[0]);
  console.log("Date in func",date)
  this.setState({date:date})
}

onSearch(e){
  this.setState({data:e.target.value})
}

productsub(e){
  this.setState({pro2_name:e.target.value})
}

componentDidMount(){
  
  this.setState({loading:true})
  axios.get('http://localhost:8000/predictcompare/',{params:{text:this.state.data,text1:this.state.pro2_name,days:this.state.days}}).then((response) => {
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

        function getDay(daysub)
        {
            var days=daysub; // Days you want to subtract
            var date = new Date();
            var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
            var day =last.getDate();
            var month=last.getMonth()+1;
            var year=last.getFullYear();
            return (day+"/"+month+"/"+year);
        }
        return (
           
        <div className="    text-white  sidebar ">
   <div className="emp"></div>
   <Row>
<Col >
<Form onSubmit= {this.onTrigger}>
  
    <Form.Group controlId="formBasicText" bsPrefix="form__element">
    <Form.Label>Enter product</Form.Label>
    <Form.Control type="text"  placeholder="Enter product to compare" onChange={this.productsub} />
    
    </Form.Group>
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

  <Form.Group controlId="formKeyword" className="forms">
    <Form.Label></Form.Label>
    <Form.Control as="select" value="date" placeholder="Choose date" onChange={this.dateSelect}>
      <option>Choose date..</option>
      <option>{getDay(1)}</option>
      <option>{getDay(2)}</option>
      <option>{getDay(3)}</option>
      <option>{getDay(4)}</option>
      <option>{getDay(5)}</option>
      <option>{getDay(6)}</option>
      <option>{getDay(7)}</option>
      
    </Form.Control>
    <Form.Text className="text-muted">
      We'll generate a detailed report of tweets containing the product
    </Form.Text>
  </Form.Group>

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