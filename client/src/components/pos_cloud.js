import React, { Component} from 'react';
import ReactWordCloud from "react-wordcloud";
import {Spinner} from 'react-bootstrap';
import { Resizable } from "re-resizable";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
const resizeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "rgb(25, 32, 37)",
  
};
const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [15, 90],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 1,
  rotationAngles: [0, 25],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};
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
  
  
  const size = [600, 400];
  const fontSizeMapper = (word) => Math.sqrt(word.value) * 20;
const rotate = word => word.value % 15;
  console.log(data)
  return( <div style={{ background:"rgb(25, 32, 37)"}}> {load ?<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
  </Spinner> : <div>
  <Resizable
        
        style={resizeStyle}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <ReactWordCloud 
          words={data} 
          options={options}
           />
        </div>
      </Resizable></div>}</div>);
}

}