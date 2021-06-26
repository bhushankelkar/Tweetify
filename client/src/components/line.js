import { ResponsiveLine } from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.import { ResponsiveBarCanvas } from '@nivo/bar'
import React, { Component} from 'react';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default class Line  extends Component{
    constructor(props){
        super(props)
    
    
    
      this.state = {
        // positive:this.props.counts.positive,
        // negative:this.props.counts.negative,
        // neutral:this.props.counts.neutral,
        line_daily:this.props.line_daily,
    
        }
        
    
      }
      componentWillReceiveProps(nextProps) {
        this.setState({ line_daily: nextProps.line_daily });  
          
         
      }

      render() {
        let data_neg= []
        let data_pos= []
        let data_neu= []
        let keys =[]
        let daily = this.state.line_daily
        for (var day in daily)
        {   console.log(daily[day])
            var obj1 ={"x":day,"y":daily[day][0]}
                data_neg.push(obj1)
               var  obj2 = {"x":day,"y":daily[day][1]-daily[day][0]}
                data_neu.push(obj2)
                var obj3= {"x":day,"y":daily[day][2]-daily[day][1]}
                data_pos.push(obj3)
                
            
        }
        
        let alldata =[

            {
                "id":"negative",
                "color": "hsl(167, 70%, 50%)",
                "data":data_neg

            },

            {
                "id":"neutral",
                "color": "hsl(282, 70%, 50%)",
                "data":data_neu

            },

            {
                "id":"positive",
                "color": "hsl(344, 70%, 50%)",
                "data":data_pos

            }
        ]
        console.log("alldata",alldata)
            
            const cr={'positive':'#3342ff','negative':'#6c70c2','neutral':'#0c18f7'}
            const getColor = s => cr[s.id]
            return (
                <ResponsiveLine
                data={alldata}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                
                
                axisTop={null}
                axisRight={null}
                axisLeft={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
              
                enableGridY={false}
                enableGridX={false}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                
                pointLabelYOffset={-12}
                enableSlices="x"
                
                isInteractive={true}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 0.5
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
)}}