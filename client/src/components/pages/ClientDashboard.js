import React, { Component } from 'react'
import {Table,Button,Modal,Form} from 'react-bootstrap'
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
componentDidMount(){
  
  var t=Number(window.location.search.split('c=')[1])
  this.state.c=t
  console.log("printurl",this.state.c)
  axios.get("http://localhost:8000/login",{params:{id:this.state.c}}).then((res)=>this.setState({data:res.data}))
 
  // var c=window.location.search.split('c=')[1]
  // console.log("printurl",c)
  // axios.get("http://localhost:8000/login",{params:{id:c}}).then((res)=>this.setState({data:res.data}))

}
renderFullnames() { return this.state.data.map((name) => { return (<div>{name} <button onClick={(e) => {
  this.view(e,name);}}>View</button>  
<button>compare</button> </div>); }) }
addProduct(e){
  e.preventDefault() 
  window.location.href="http://localhost:3000/addproduct?c="+this.state.c
}
render(){
  return(
    

   <div><div>{this.renderFullnames()} </div> 
   <Form>
   <Button type="submit" variant="primary" onClick={this.addProduct}>click here</Button>
   </Form>
   </div>
   
    
  )
}
}