import React, { Component} from 'react';
import { ResponsiveBar } from '@nivo/bar'
export default class KeyDough extends Component{

  constructor(props){
    super(props)



  this.state = {
    key:this.props.key,
    value:this.props.value,
    

    }
    

  }
  componentWillReceiveProps(nextProps) {
    this.setState({ key: nextProps.key });  
    this.setState({ value: nextProps.value });  
      
     
  }
    
      render() {
      
        // const colors = { 'value': '#b2df8a' }
        // const getColor = bar => colors[bar.id]
        console.log("key",this.state.key)
        console.log("value",this.state.value)
        let data= [
          {
            "id": "positive",
            "label": "positive",
            "value": this.state.value[1],
            "color": "#3342ff"
          },
          {
            "id": "negative",
            "label": "negative",
            "value":this.state.value[0],
            "color": "#6c70c2"
          },
          {
            "id": "neutral",
            "label": "neutral",
            "value": this.state.value[2],
            "color": "#0c18f7"
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
          margin={{ top: 20,  bottom: 50, left: 80 ,right:20}}
          pixelRatio={1.25}
          padding={0.5}
          
          minValue="auto"
          maxValue="auto"
          groupMode="stacked"
          layout="vertical"
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
              legend: this.state.key,
              legendPosition: 'middle',
              legendOffset: 36
          }}
          axisLeft={null}
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