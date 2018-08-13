import React, { Component } from 'react';
import LiquidFillGauge from 'react-liquid-gauge';

class CustomGaugeChart extends Component {
  render() {
    const radius = 75;
    return (
      <div>
        <LiquidFillGauge
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
          width={radius * 2}
          height={radius * 2}
          value={this.props.value}
          percent="%"
          textSize={0.5}
          textOffsetX={5}
          textOffsetY={10}
          textRenderer={(props) => {
            const value = Math.round(props.value);
            return (
              <tspan>
                <tspan style={{ fontSize: '30px' }}>{value}</tspan>
                <tspan style={{ fontSize: '30px' }}>{props.percent}</tspan>
              </tspan>
            );
          }}
          riseAnimation
          waveAnimation
          waveFrequency={1}
          waveAmplitude={4}
          innerRadius={0.8}
          margin={0.15}
          outerRadius={1}
          circleStyle={{
            fill: this.props.cColor
          }}
          waveStyle={{
            fill: this.props.wColor
          }}
          textStyle={{
            fill: this.props.cColor,
            fontFamily: 'Arial, sans-serif'
          }}
          waveTextStyle={{
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif'
          }}
        />
      </div>
    );
  }
}

export default CustomGaugeChart;
