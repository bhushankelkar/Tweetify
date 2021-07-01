import React,{Component} from 'react'
import axios from "axios";
import {Button,Card,Figure,Form,Jumbotron} from 'react-bootstrap'
import image from '../../images/img7.jpg'
export default class DemoModel extends Component{
    constructor(props){
  
    super(props);
    
    this.state ={
     loading:true,
     data:"",
     counts:{
         'label':'loading...',
     },
      
    }
    
     
    this.onTrigger=this.onTrigger.bind(this)
    this.onSearch=this.onSearch.bind(this)
  
  }
  async onTrigger(event) {
      this.setState({loading:true})
      event.preventDefault();
      await axios.get('http://localhost:8000/demo/',{params:{text:this.state.data}}).then((response) => {
      this.setState({counts:response.data})
    //   console.log("counts",this.state.counts.tweets)  
    //   this.props.parentCallback(this.state.counts);
  
        
          
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
    axios.get('http://localhost:8000/demo/',{params:{text:this.state.data}}).then((response) => {
    this.setState({counts:response.data})
     
    // this.props.parentCallback(this.state.counts);
    this.setState({loading:false})
      
        
    }).catch(function (error) {
        console.log(error);
    });
    // console.log(event.target.value)
  }
  render(){
      let img=image
      let sentiment ='enter the sentence...'
      if(this.state.counts.label==0)
      {
            img ='https://i.pinimg.com/originals/86/46/58/8646585c41228ddbd44501c612d3a250.png'
            sentiment ='NEUTRAL'
      }
      else if(this.state.counts.label==1)
      {
           sentiment='POSITIVE' 
        img ='https://png.pngitem.com/pimgs/s/42-421037_emoticon-smiley-emoji-computer-icons-clip-art-happy.png'
      }

      else
      { sentiment ='NEGATIVE'
            img ='https://i.pinimg.com/236x/07/bd/5c/07bd5c46d04b78b0125c32a0428c16f0.jpg'
      }
    return(
        <>
        <Jumbotron style={{'background-color':'#212529','color':'#fff'}}>
        <Form onSubmit= {this.onTrigger}>
        
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Enter the sentence you want to analyse!</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={this.onSearch} />
                
            </Form.Group>
            <Button
                    className="formbutton" variant="primary"  type = "submit" value = "Submit">
                        Submit</Button>
        </Form> 
        <p>{sentiment}</p>
        <img src={img} height="100px"/>
        

        
        </Jumbotron>
        </>)
}
}

