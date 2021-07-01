import { ResponsiveBarCanvas } from '@nivo/bar'
import React, { Component} from 'react';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default class MyResponsiveBarCanvas  extends Component{
    constructor(props){
        super(props)
    
    
    
      this.state = {
        // positive:this.props.counts.positive,
        // negative:this.props.counts.negative,
        // neutral:this.props.counts.neutral,
        hashtag:this.props.hashtag,
    
        }
        
    
      }
      componentWillReceiveProps(nextProps) {
        this.setState({ hashtag: nextProps.hashtag });  
          
         
      }

      render() {
        let data= []
        let keys =[]
        let hashtag = this.state.hashtag
        for (var hash in hashtag)
        {   
            var obj ={"hasht":hash,"neg_hash":hashtag[hash][2],"pos_hash":hashtag[hash][1],"neu_hash":hashtag[hash][0]}
            data.push(obj)
        }
  
            
            const cr={'positive':'#3342ff','negative':'#6c70c2','neutral':'#0c18f7'}
            const getColor = s => cr[s.id]
            return (
    <ResponsiveBarCanvas
        data={data}
        keys={[ 'neg_hash','pos_hash','neu_hash'
            
        ]}
        indexBy="hasht"
        margin={{ top: 50, bottom: 50, left: 130,right:5 }}
        padding={0.15}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band' ,rounf:'true'}}
        colors={{ scheme: 'nivo' }}
        
        
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.9 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 7,
            tickPadding: 15,
            tickRotation: 0,
            
        }}
        axisLeft={{
            tickSize: 2,
            tickPadding: 5,
            tickRotation: 15,
            
        }}
        enableGridY={false}
        labelSkipWidth={4}
        labelSkipHeight={4}
        labelTextColor="#000000"
        
        animate={true}
        motionStiffness={90}
        motionDamping={15}

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
)
}
}