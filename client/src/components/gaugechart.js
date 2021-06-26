import React, { Component} from 'react';
import ReactSpeedometer from "react-d3-speedometer"
import {Spinner} from 'react-bootstrap';
export default class PosCloud extends Component{
  constructor(props){
    super(props);
    this.state = {
      keyword:this.props.keyword,
    //   isLoading:this.props.loading
      
      }
      
  
    }
    componentWillReceiveProps(nextProps) {
      this.setState({ keyword: nextProps.keyword });  
    //   this.setState({ isLoading: nextProps.loading });
    }
    




render() {
    let value = 0
    let keywords = this.state.keyword
    
    for (var key in keywords)
    {
      console.log("keywordssssss array",keywords[key])
      if(keywords[key][0]>keywords[key][1])
      {
        value=50
      }

      else
      {
        value = 75
      }
    }
    
    return(<ReactSpeedometer
    maxValue={100}
    value={value}
    needleColor="red"
    startColor="yellow"
    segments={4}
    endColor="pink"
  />)
}

}