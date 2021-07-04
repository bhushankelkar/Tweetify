import React,{ Component } from 'react'
import {Form,Button, Jumbotron} from 'react-bootstrap'
import '../../App.css';
import '../ClientDashboard.css';
import axios from "axios"
export default class AddProduct extends Component{
  constructor(props){

    super(props)
    
    this.state={
      data:[],
      c:null,
      categories: [  
        {id: 1, value: "All"},  
        {id: 2, value: "Battery"},  
        {id: 3, value: "Screen"},  
        {id: 4, value: "Memory"},
        {id: 2, value: "Heat"},  
        {id: 3, value: "Cost"},  
         
      ],  
      productName:null,
      checkedItems: new Map()  
      
    }
    this.handlename = this.handlename.bind(this); 
    this.handleChange = this.handleChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);  
  
  
  } 
  handleChange(event) {  
    var isChecked = event.target.checked;  
    var item = event.target.value;  
       
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));  
}  
handlename(event) {  
    
  var item = event.target.value;  
     
  this.setState({productName:item} );  
}  
handleSubmit(event) {  
  event.preventDefault(); 
  var t=Number(window.location.search.split('c=')[1])
  this.state.c=t
  console.log(this.state);  
  axios.post("http://localhost:8000/added/",{params:{c:Number(this.state.c),proName:this.state.productName,keywords:this.state.checkedItems}})
  .then((res)=>console.log(res.data)).then((res)=>window.location.href ="http://localhost:3000/dashboard/?c="+this.state.c)
   
}  
componentDidMount(){
  
  
  this.state.c=Number(window.location.search.split('c=')[1])
  console.log("printurl",this.state.c)
  // axios.get("http://localhost:8000/login",{params:{id:Number(this.state.c)}}).then((res)=>this.setState({data:res.data}))
 
  // var c=window.location.search.split('c=')[1]
  // console.log("printurl",c)
  // axios.get("http://localhost:8000/login",{params:{id:c}}).then((res)=>this.setState({data:res.data}))

}
renderFullnames() { return this.state.data.map((name) => { return (<div>{name} <button>view</button> <button>compare</button> </div>); }) }

render() {  
  // return (  
  

  return(
    <div className="dashboard-container" >
            <div className="form__box" style={{'margin-right':30}}>
<Jumbotron style={{'background':'rgb(25,32,37)','color':'#fff'}}>
<Form>
<Form.Group controlId="formProductName" bsPrefix="form__element" >
<Form.Label>Product Name:</Form.Label>
<Form.Control type="email" placeholder="Enter product name" onChange={this.handlename} />
</Form.Group>
<Form.Group controlId="formCompanyName" bsPrefix="form__element">
    <Form.Label style={{'color':'white'}}>Model No:</Form.Label>
    <Form.Control placeholder="Enter model no" />
  </Form.Group>
  <Form.Group controlId="formCompanyName" bsPrefix="form__element">
    <Form.Label style={{'color':'white'}}>Version:</Form.Label>
    <Form.Control placeholder="Enter version of the product" />
  </Form.Group>

<div className="form__submit">
<Button variant="dark" type="submit" onClick={this.handleSubmit}>
Submit
</Button>
</div>
</Form>
</Jumbotron>

</div>
    <div></div>
    </div>
)
}  
}  