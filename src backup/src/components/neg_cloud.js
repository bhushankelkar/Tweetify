import React, { Component} from 'react';
import ReactWordcloud from 'react-wordcloud';
export default class PosCloud extends Component{
    state={ data: [
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
      
      ]
      }
render() {

    return( <div style={{ background:"rgb(25, 32, 37)" }}><ReactWordcloud options={{rotations: 0}} fontSizes={[30,40]} size={[200,200]} words={this.state.data} /></div>);
}

}