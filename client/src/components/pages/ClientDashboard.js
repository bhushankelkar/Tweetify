import React, { Component } from 'react'
import {Table,Button,Modal} from 'react-bootstrap'
import axios from "axios"
import '../../App.css';
import '../ClientDashboard.css';
export default class ClientDashboard extends Component{
  constructor(props){

    super(props)
    
    this.state={
      data:[],
      c:null
      
    }
    this.addProduct=this.addProduct.bind(this)
    } 

   
view(e,name){
  e.preventDefault()
  
  window.location.href="http://localhost:3000/mainpage?name="+name
}

viewc(e,name){
  e.preventDefault()
  
  window.location.href="http://localhost:3000/compare?name="+name
}

delete(e,name){
  e.preventDefault()
  console.log("Name in delete",name)
  axios.get("http://localhost:8000/delete",{params:{name:name,id:this.state.c}}).then((res)=>window.location.href ="http://localhost:3000/dashboard/?c="+this.state.c)
}

componentDidMount(){
  
  var t=Number(window.location.search.split('c=')[1])
  this.state.c=t
  console.log("printurl",this.state.c)
  
  axios.get("http://localhost:8000/login",{params:{id:this.state.c}}).then((res)=>this.setState({data:res.data}))
 
  // var c=window.location.search.split('c=')[1]
  // console.log("printurl",c)
  // axios.get("http://localhost:8000/login",{params:{id:c}}).then((res)=>this.setState({data:res.data}))

}
renderFullnames() { return this.state.data.map((name) => { return (<tr><td>{name}</td> <td><Button variant = "success" onClick={(e) => {
  this.view(e,name);}}>View</Button>  
<Button variant="primary" onClick={(e) => {
  this.viewc(e,name);}}>Compare</Button>
<Button variant="danger" onClick={(e) => {
  this.delete(e,name);}} >Delete</Button>
          </td></tr>); 
}) }

addProduct(e){
  e.preventDefault() 
  window.location.href="http://localhost:3000/addproduct?c="+this.state.c
}
render(){
  
  return(
    
    <div className="dashboard__container">
      <Button variant="primary" onClick={this.addProduct} size="lg" style={{position:'relative',bottom:'70'}}>
      Add Product
    </Button>
    <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      
      <th>Product</th>
      <th>Options</th>
    </tr>
  </thead>
  <tbody>
      
      {this.renderFullnames()}
   
   
  </tbody>
</Table>
   
 
   </div>

   
    
  )
}
}