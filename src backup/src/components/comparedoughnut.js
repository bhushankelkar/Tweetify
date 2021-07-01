import React, { Component} from 'react';
import { ResponsivePie } from '@nivo/pie'
export default class CompareDough extends Component{

  constructor(props){
    super(props)



  this.state = {
    sentiment:this.props.counts,
    

    }
    

  }
  componentWillReceiveProps(nextProps) {
    this.setState({ sentiment: nextProps.counts });  
    
     
  }
    
      render() {
      
        // const colors = { 'value': '#b2df8a' }
        // const getColor = bar => colors[bar.id]
        var positive =100
        var negative =100,neutral=100
        let sentiment = this.state.sentiment
        console.log(sentiment)
        for(var key in sentiment)
        {
            positive = sentiment[key][0]
            negative = sentiment[key][1]
            neutral = sentiment[key][2]
        }
        let data= [
          {
            "id": "positive",
            "label": "positive",
            "value": positive,
            "color": "#3342ff"
          },
          {
            "id": "negative",
            "label": "negative",
            "value":negative,
            "color": "#6c70c2"
          },
          {
            "id": "neutral",
            "label": "neutral",
            "value": neutral,
            "color": "#0c18f7"
          },
          
        ]

          
          const cr={'positive':'#3342ff','negative':'#6c70c2','neutral':'#0c18f7'}
          const getColor = s => cr[s.id]
          return (
            
   

<ResponsivePie
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
              { offset: 0, color: '#3342ff' },
              { offset: 150, color: '#659aeb' },

              

          ],

      },
    {

          id: 'gradientB',

          type: 'linearGradient',

          colors: [
              { offset: 0, color: '#f25b1f' },
              { offset: 150, color: '#f0b49c' },

              

          ],

      },
      {

        id: 'gradientA',

        type: 'linearGradient',

        colors: [
            { offset: 0, color: '#7915ed' },
            { offset: 150, color: '#bf8cfa' },

            

        ],

    }
    
    ]}

      fill={[

          { match: {id:'positive'}, id: 'gradientC' },
          { match: {id:'negative'}, id: 'gradientB' },
          { match: {id:'neutral'}, id: 'gradientA' },

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