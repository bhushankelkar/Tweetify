import React,{Component} from 'react'
import {GoogleLogin } from 'react-google-login'
import {Form,Button} from 'react-bootstrap'
import '../../App.css';
import '../Login.css';
import axios from 'axios';
const clientID='669860009090-vi91dgmrm7sl1lmqko4u89o2n2uucihq.apps.googleusercontent.com'
export default class SignUp extends Component {
  constructor(props){

    super(props)
    
    this.state={
      email:'',
      password:'',
      id:null,
      google:false
      
    }
    this.onEmail=this.onEmail.bind(this)
    this.onPassword=this.onPassword.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    } 

    onEmail(e){
      this.setState({email:e.target.value})
    }
    onPassword(e){
      this.setState({password:e.target.value})
    }
    success(){
      console.log("ehre")
    }
     fail(){
    
    }
handleSubmit(event) {  
  // this.setState({email:obj.email})
  // this.setState({password:"google auth"})
  event.preventDefault();
  axios.post("http://localhost:8000/signup/",{params:{email:this.state.email,password:this.state.password}})
  .then((res)=>window.location.href ="http://localhost:3000/dashboard/?c="+res.data)
       
    }    
  
googleAuth(obj){
  this.setState({email:obj.email})
  this.setState({password:"google auth"})
  axios.post("http://localhost:8000/signup/",{params:{email:this.state.email,password:this.state.password}})
  .then((res)=>window.location.href ="http://localhost:3000/dashboard/?c="+res.data)

}  
  
  render(){
    const success=(res)=>{
      this.googleAuth(res.profileObj)
    }
  return (

        
<div className="form__box">
<div className="form__container" style={{'background-color': '#212529'}}>
<Form>

<Form.Group controlId="formName">
    <Form.Label style={{'color':'white'}}>Your Name</Form.Label>
    <Form.Control placeholder="1234 Main St" />
  </Form.Group>

  <Form.Group controlId="formCompanyName">
    <Form.Label style={{'color':'white'}}>Company/Institution</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group>

  <Form.Group controlId="formBasicEmail" bsPrefix="form__element">
    <Form.Label style={{'color':'white','text-align':'left'}}>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={this.onEmail}/>
    <Form.Text bsPrefix="form__message">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword" bsPrefix="form__element">
    <Form.Label style={{'color':'white'}}>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={this.onPassword}/>
  </Form.Group>
  
  {/* <Form.Group controlId="formBasicCheckbox" bsPrefix="form__element">
    <Form.Check type="checkbox" label="Check me out"  />
  </Form.Group> */}
  <div className="form__submit">
  <Button variant="primary" type="submit" onClick={this.handleSubmit}>
    Submit
  </Button>
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
</Form>
        </div></div>
    )
}

}
