import React, { Component} from 'react';
import WordCloud from "react-d3-cloud";
import {Spinner} from 'react-bootstrap';
export default class PosCloud extends Component{
  constructor(props){
    super(props);
    this.state = {
      fr:this.props.freq,
      isLoading:this.props.loading
      
      }
      
  
    }
    componentWillReceiveProps(nextProps) {
      this.setState({ fr: nextProps.freq });  
      this.setState({ isLoading: nextProps.loading });
    }
render() {
  let data= this.state.fr
  let load=this.state.isLoading
  console.log(load)
  const fontSizeMapper = word => Math.sqrt(word.value) * 30;
const rotate = word => word.value % 20;
  console.log(data)
  return( <div style={{ background:"rgb(25, 32, 37)"}}> {load ?<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
  </Spinner> : <WordCloud padding={2} height={310} data={data} fontSizeMapper={fontSizeMapper}  />}</div>);
}

}