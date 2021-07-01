import React, { Component} from 'react';
import { ResponsivePie } from '@nivo/pie'
const resizeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "rgb(25, 32, 37)",
  
};
export default class Dough extends Component{

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
      
        // const colors = { 'value': '#b2df8a' }
        // const getColor = bar => colors[bar.id]
        let data= [
          {
            "id": "positive",
            "label": "positive",
            "value": this.state.positive,
            "color": "#3342ff"
          },
          {
            "id": "negative",
            "label": "negative",
            "value":this.state.negative,
            "color": "#ED8D8D"
          },
          {
            "id": "neutral",
            "label": "neutral",
            "value": this.state.neutral,
            "color": "#519872"
          },
          
        ]

          
          const cr={'positive':'#519872','negative':'#ED8D8D','neutral':'#3342ff'}
          const getColor = s => cr[s.id]
          return (
            
   

<ResponsivePie
        style={{border: "solid 1px #ddd",}}
        data={data}
        margin={{
          top: 5,
          right:100,
          bottom: 5,
          left: 0
        }}
        innerRadius={0.73}
        padAngle={0}
        cornerRadius={0}
        colors={getColor}
        borderWidth={1}
        // borderColor="inherit:darker(0.2)"
        enableArcLinkLabels={false}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#fffff"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor="inherit"
        radialLabel={d => `${d.id} (${d.value})`}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={10}
        sortByValue={true}
        defs={[{

          id: 'gradientC',

          type: 'linearGradient',

          colors: [
              { offset: 0, color: '#8FD6E1' },
              { offset: 150, color: '#1597BB' },

              

          ],

      },
    {

          id: 'gradientB',

          type: 'linearGradient',

          colors: [
              { offset: 0, color: '#ED8D8D' },
              { offset: 150, color: '#f0b49c' },

              

          ],

      },
      {

        id: 'gradientA',

        type: 'linearGradient',

        colors: [
            { offset: 0, color: '#A4B494' },
            { offset: 150, color: '#519872' },

            

        ],

    }
    
    ]}

      fill={[

          { match: {id:'positive'}, id: 'gradientA' },
          { match: {id:'negative'}, id: 'gradientB' },
          { match: {id:'neutral'}, id: 'gradientC' },

      ]}
        legends={[
          {
            anchor: "right",
            direction: "column",
            translateX:30,
            itemWidth: 18,
            itemHeight: 15,
            itemTextColor: "#999",
            symbolSize: 10,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000"
                }
              }
            ]
          }
        ]}

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
      />
   
          );
        }
    }