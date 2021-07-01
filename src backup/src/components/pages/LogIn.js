import React, { Component } from 'react'
import {GoogleLogin } from 'react-google-login'
import Service1 from './Service1'
import {Form,Button} from 'react-bootstrap'
import '../../App.css';
import '../Login.css';
import Footer from '../Footer'
import axios from "axios";

const clientID='669860009090-vi91dgmrm7sl1lmqko4u89o2n2uucihq.apps.googleusercontent.com'

export default class Login extends Component{
  constructor(props){

    super(props)
    
    this.state={
      email:'',
      password:'',
      id:null
      
    }
    this.onEmail=this.onEmail.bind(this)
    this.onPassword=this.onPassword.bind(this)
    this.submit=this.submit.bind(this)
    } 

    onEmail(e){
      this.setState({email:e.target.value})
    }
    onPassword(e){
      this.setState({password:e.target.value})
    }

   fail(){
  
  }
  submit(event)
  {
  event.preventDefault();
  axios.post('http://localhost:8000/login/',{params:{email:this.state.email,password:this.state.password}})
  .then((res)=>this.setState({id:res.data})).catch((err)=>console.log("error ",err)).then(
  (res)=>window.location.href ="http://localhost:3000/dashboard/?c="+this.state.id)
  }
render(){
  const success=(res)=>{
   var  obj=res.profileObj
    // event.preventDefault();
    this.setState({email:obj.email})
    this.setState({password:"google auth"})
    axios.post('http://localhost:8000/login/',{params:{email:this.state.email,password:this.state.password}})
    .then((res)=>this.setState({id:res.data})).catch((err)=>console.log("error ",err)).then(
    (res)=>window.location.href ="http://localhost:3000/dashboard/?c="+this.state.id)
  }
return (
      <div style={{'background-color': '#212529'}}>
   
<div className="form__box">
  <div className="form__container">
<Form>
<Form.Group controlId="formBasicEmail" bsPrefix="form__element">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" onChange={this.onEmail}/>
  <Form.Text bsPrefix="form__message">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>

<Form.Group controlId="formBasicPassword" bsPrefix="form__element">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Password" onChange={this.onPassword}/>
</Form.Group>
<Form.Group controlId="formBasicCheckbox" bsPrefix="form__element">
  <Form.Check type="checkbox" label="Check me out"  />
</Form.Group>
<div className="form__submit">
<Button variant="dark" type="submit" onClick={this.submit}>
  Submit
</Button>
</div>
</Form>
<div className="form__submit">
<GoogleLogin
        clientId={clientID}
        buttonText="login"
        onSuccess={success}
        onFailure={this.fail}
        cookiePolicy={'single_host_origin'}
        
        />
        </div>
</div>

      
</div>
      ]
</div>
  )



  }

}
