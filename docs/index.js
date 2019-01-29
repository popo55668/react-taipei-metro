import React from 'react';
import ReactDOM from 'react-dom';
import MetroMap from '../src/index';
import './style.css';

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = { overlay: '' };
    this.hoveredId = -1;
  }

  onMouseEnterStation(station, scale) {
    const position = {
      left: station.center.x + 10,
      top: station.center.y - 10
    };
    this.hoveredId = station.id;
    this.setState({ overlay: (<div className='overlay' style={position}><div className='loader'/></div>) });
    setTimeout(() => {
      const data1 = [10, 50, 90, 130].map((tmp) => [tmp, 10 + (Math.random() * (130 - 30 + 1) + 20) << 0]);
      const line1 = data1.reduce((acc, cur) => `${acc} ${cur[0]},${cur[1]}`, '');
      const data2 = [10, 50, 90, 130].map((tmp) => [tmp, 10 + (Math.random() * (130 - 30 + 1) + 20) << 0]);
      const line2 = data2.reduce((acc, cur) => `${acc} ${cur[0]},${cur[1]}`, '');
      this.setState({ overlay: (<div className='overlay' style={position}><svg height="140" width="140">
            <text x='10' y='12' fontSize='14px' fontFamily='serif' textAnchor='start'>OnMouseEnterStation</text>
            <polyline fill='none' stroke='#0074d9' strokeWidth='3' points={line1}/>
            <polyline fill='none' stroke='red' strokeWidth='3' points={line2}/>
            </svg></div>) });
    }, 500);
  }

  onMouseLeaveStation(station, scale) {
    this.hoveredId = -1;
    this.setState({ overlay: '' });
  }

  onClickStation(station, scale, e) {
    alert(station.name.zh + ' clicked.');
  }

  // Customized rendering
  renderUserData(station, scale) {
    return (<text key={station.id} x={station.center.x} y={station.center.y}
        fontSize={10 * scale} fill={this.textColor} fontWeight='bold'
        dominantBaseline='middle' textAnchor='middle'>{station.name.en.length}</text>);
  }

  render() {
    return (
      <div>
        <MetroMap
          width={800}
          height={900}
          style={{zIndex: -1, position: 'absolute'}}
          showStationName={true}
          showUserData={true}
          onMouseEnterStation={(station, scale) => this.onMouseEnterStation(station, scale)}
          onMouseLeaveStation={(station, scale) => this.onMouseLeaveStation(station, scale)}
          onClickStation={(station, scale, e) => this.onClickStation(station, scale, e)}
          renderUserData={(station, scale) => this.renderUserData(station, scale)} />
        <div style={{ position: 'relative' }}><div>{this.state.overlay}</div></div>
      </div>);
  }
}

ReactDOM.render(
  <Window />,
  document.getElementById('root')
);
