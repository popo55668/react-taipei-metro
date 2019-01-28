import React from 'react';
import ReactDOM from 'react-dom';
import MetroMap from '../src/index';

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight, showUserData: true };
  }

  renderOverlay(station) {
    // Return a Promise if you fetch data with asynchronous methods.
    return new Promise((resolve) => {
      const data1 = [10, 50, 90, 130].map((tmp) => [tmp, 10 + (Math.random() * (130 - 30 + 1) + 20) << 0]);
      const line1 = data1.reduce((acc, cur) => `${acc} ${cur[0]},${cur[1]}`, '');
      const data2 = [10, 50, 90, 130].map((tmp) => [tmp, 10 + (Math.random() * (130 - 30 + 1) + 20) << 0]);
      const line2 = data2.reduce((acc, cur) => `${acc} ${cur[0]},${cur[1]}`, '');
      setTimeout(() => resolve((<svg height="140" width="140">
        <text x='10' y='12' fontSize='14px' fontFamily='serif' textAnchor='start'>Customized Overlay</text>
        <polyline fill='none' stroke='#0074d9' strokeWidth='3' points={line1}/>
        <polyline fill='none' stroke='red' strokeWidth='3' points={line2}/>
        </svg>)), 500);
    });
    // Or simply return a jsx.
    // return (<span>{userData.name.en}</span>);
  }

  // Customized rendering
  renderCustomizedContent(station, i, scale) {
    return (<text key={i} x={station.center.x} y={station.center.y}
        fontSize={10 * scale} fill={this.textColor} fontWeight='bold'
        alignmentBaseline='middle' textAnchor='middle'>{station.name.en.length}</text>);
  }

  toggleUserData(e) {
    this.setState({ showUserData: !this.state.showUserData });
  }
  render() {
    return (<div>
      <button onClick={(e) => this.toggleUserData(e)}>Toggle User Data</button>
      <MetroMap
      width={this.state.width}
      height={this.state.height}
      showStationName={true}
      showOverlay={true}
      showUserData={this.state.showUserData}
      renderOverlay={station => this.renderOverlay(station)}
      renderUserData={(station, i, scale) => this.renderCustomizedContent(station, i, scale)} /></div>);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    });
  }
}

ReactDOM.render(
  <Window />,
  document.getElementById('root')
);
