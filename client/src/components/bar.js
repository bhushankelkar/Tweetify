import React from "react";

import { ResponsiveBar } from '@nivo/bar'

export default class Bars extends React.Component {
  constructor(props){
    super(props)



  this.state = {
    positive:this.props.counts.positive,
    negative:this.props.counts.negative,
    neutral:this.props.counts.neutral,
    
    }
    

  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ positive: nextProps.counts.positive });  
    this.setState({ neutral: nextProps.counts.neutral });  
    this.setState({ negative: nextProps.counts.negative });  
  }

  render() {
    let data= [

      {
        "id": "negative",
        "label": "negative",
        "value":this.state.negative,
        "color": "hsl(136, 70%, 50%)"
      },
      {
        "id": "neutral",
        "label": "neutral",
        "value": this.state.neutral,
        "color": "hsl(136, 70%, 50%)"
      },
      {
        "id": "positive",
        "label": "positive",
        "value": this.state.positive,
        "color": "hsl(136, 70%, 50%)"
      },
      
    ]
    const colors = { 'value': '#3342ff' }
    const getColor = bar => colors[bar.id]
    console.log("pos",this.state.positive)
 
    console.log("value",data[0].value)
    return (
      <ResponsiveBar
      data={data}
 
      indexBy="id"
      keys={["value"]}
      margin={{ top: 10,  bottom: 50, left: 80 ,right:20}}
      pixelRatio={1.25}
      padding={0.5}
      
      minValue="auto"
      maxValue="auto"
      groupMode="stacked"
      layout="horizontal"
      reverse={false}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      
      colors={getColor}
      borderColor={{ theme: 'background' }}
     
      colorBy="id"
      borderWidth={0}
      // borderColor={{ from: 'color', modifiers: [ [ 'darker', 1 ],['opacity',3] ] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'sentiment',
          legendPosition: 'middle',
          legendOffset: 36
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
         
          legendPosition: 'middle',
          legendOffset: -40
      }}
      enableGridX={false}
      enableGridY={false}
      enableLabel={true}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#ffffff"
      isInteractive={true}
      theme={{
        "background": "rgb(25, 32, 37)",
        "textColor": "white",
        "fontSize": 15,
        "axis": {
            "domain": {
                "line": {
                    "stroke": "#777777",
                    "strokeWidth": 1
                }
            },
            "ticks": {
                "line": {
                    "stroke": "#777777",
                    "strokeWidth": 1
                }
            }
        },
        "grid": {
            "line": {
                "stroke": "#dddddd",
                "strokeWidth": 1
            }
        }
    }}

    defs={[{

      id: 'gradientC',

      type: 'linearGradient',

      colors: [
          { offset: 0, color: '#3342ff' },
          { offset: 150, color: '#659aeb' },

          

      ],

  },


]}

  fill={[

      { match: {id:'value'}, id: 'gradientC' },
 

  ]}
  />
    );
  }
}
